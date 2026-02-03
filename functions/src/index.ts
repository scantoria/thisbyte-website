import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { UserRole, isValidUserRole, AuditAction } from './types';

admin.initializeApp();

// Helper: Get permissions for role
function getPermissionsForRole(role: UserRole): string[] {
  const permissions: Record<UserRole, string[]> = {
    [UserRole.ADMIN]: ['leads:read', 'leads:write', 'leads:delete', 'users:read', 'users:write', 'audit:read', 'config:write'],
    [UserRole.AUDITOR]: ['leads:read', 'audit:read', 'users:read'],
    [UserRole.VIEWER]: ['leads:read']
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

  // 3. Validate role enum using type-safe validation
  if (!isValidUserRole(role)) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid role');
  }

  return admin.auth().verifyIdToken(context.auth.token)
    .then((callerToken: any) => {
      // 4. Verify caller is admin
      if (callerToken.role !== UserRole.ADMIN) {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can set roles');
      }

      // 5. Get user and set claims
      return Promise.all([
        admin.auth().getUser(uid),
        admin.auth().getUser(uid).then(user => (user.customClaims as any)?.role || UserRole.VIEWER)
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
        action: AuditAction.UPDATE,
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
        action: AuditAction.UPDATE,
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

// Contact Form Email Function
export const sendContactEmail = functions.https.onCall(async (data: any) => {
  const { name, email, company, message } = data;

  // Validate required fields
  if (!name || !email || !message) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Name, email, and message are required'
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Invalid email format'
    );
  }

  // Configure nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: `"ThisByte Contact Form" <${process.env.EMAIL_USER}>`,
    to: 'support@thisbyte.com',
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error: any) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email');
  }
});
