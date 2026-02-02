import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Helper: Get permissions for role
function getPermissionsForRole(role: string): string[] {
  const permissions: Record<string, string[]> = {
    admin: ['leads:read', 'leads:write', 'leads:delete', 'users:read', 'users:write', 'audit:read', 'config:write'],
    auditor: ['leads:read', 'audit:read', 'users:read'],
    viewer: ['leads:read']
  };
  return permissions[role] || [];
}

// TR-006: Custom Claims Cloud Function
export const setUserRole = functions.https.onCall((data: any, context: any) => {
  // 1. Verify caller is authenticated
  if (!context || !context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
  }

  // 2. Validate input
  const { uid, role } = data;
  if (!uid || !role) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing uid or role');
  }

  // 3. Validate role enum
  if (!['admin', 'auditor', 'viewer'].includes(role)) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid role');
  }

  return admin.auth().verifyIdToken(context.auth.token)
    .then((callerToken: any) => {
      // 4. Verify caller is admin
      if (callerToken.role !== 'admin') {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can set roles');
      }

      // 5. Get user and set claims
      return Promise.all([
        admin.auth().getUser(uid),
        admin.auth().getUser(uid).then(user => (user.customClaims as any)?.role || 'viewer')
      ]);
    })
    .then(([userRecord, oldRole]) => {
      // 6. Set custom claims
      return admin.auth().setCustomUserClaims(uid, {
        role,
        email: userRecord.email,
        permissions: getPermissionsForRole(role),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        updatedBy: context.auth.uid
      }).then(() => ({ userRecord, oldRole }));
    })
    .then(({ userRecord, oldRole }) => {
      // 7. Log to audit
      return admin.firestore().collection('auditLogs').add({
        action: 'update',
        resource: `users/${uid}`,
        resourceId: uid,
        resourceType: 'user',
        before: { role: oldRole },
        after: { role },
        userId: context.auth.uid,
        userEmail: userRecord.email,
        userRole: role,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: 'success'
      }).then(() => userRecord);
    })
    .then((userRecord) => {
      // 8. Return success
      return {
        success: true,
        message: `Role ${role} set for ${userRecord.email}`,
        user: { uid, email: userRecord.email, role }
      };
    })
    .catch((error: any) => {
      // 9. Log error
      return admin.firestore().collection('auditLogs').add({
        action: 'update',
        resource: `users/${uid}`,
        resourceId: uid,
        resourceType: 'user',
        error: error.message,
        userId: context.auth?.uid,
        userEmail: context.auth?.token?.email,
        userRole: 'unknown',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: 'error'
      }).then(() => {
        throw new functions.https.HttpsError('internal', error.message);
      });
    });
});

// Note: syncUserToFirestore removed - add later
