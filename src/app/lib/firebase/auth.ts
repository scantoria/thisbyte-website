import { auth } from './client';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  IdTokenResult
} from 'firebase/auth';
import { useState, useEffect } from 'react';

// Custom claims interface for CMMI role management
export interface CustomClaims {
  role: 'admin' | 'auditor' | 'viewer';
  department?: string;
  clearanceLevel?: number;
  createdAt: string;
}

// Type guard to check if claims match our interface
function isCustomClaims(claims: any): claims is CustomClaims {
  return (
    claims &&
    typeof claims === 'object' &&
    ['admin', 'auditor', 'viewer'].includes(claims.role) &&
    typeof claims.createdAt === 'string'
  );
}

// Parse claims safely from Firebase token
function parseClaims(tokenResult: IdTokenResult): CustomClaims | null {
  const claims = tokenResult.claims;
  
  if (isCustomClaims(claims)) {
    return claims;
  }
  
  // If Firebase doesn't have our custom claims yet, return default
  return {
    role: 'viewer', // Default role
    createdAt: new Date().toISOString()
  };
}

// Role-based access constants
export const ROLES = {
  ADMIN: 'admin',
  AUDITOR: 'auditor', 
  VIEWER: 'viewer'
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

// Authentication utilities
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email: string, password: string): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

// Custom hook for authentication state
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<CustomClaims | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          const parsedClaims = parseClaims(tokenResult);
          setClaims(parsedClaims);
        } catch (error) {
          console.error('Error fetching claims:', error);
          setClaims({
            role: 'viewer',
            createdAt: new Date().toISOString()
          });
        }
      } else {
        setClaims(null);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  const hasRole = (role: UserRole): boolean => {
    return claims?.role === role;
  };
  
  const isAdmin = hasRole('admin');
  const isAuditor = hasRole('auditor') || isAdmin;
  
  return { 
    user, 
    claims, 
    loading, 
    hasRole, 
    isAdmin, 
    isAuditor,
    isAuthenticated: !!user 
  };
};

// Helper to get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
