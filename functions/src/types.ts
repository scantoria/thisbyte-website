/**
 * Type definitions for Cloud Functions
 * Matches firestore.rules validation and src/app/lib/constants.ts
 * Per Data Dictionary v1.1 (Corrected)
 */

// Lead Status - ONLY 5 values
export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  PROPOSAL = 'proposal',
  CLOSED = 'closed'
}

// Lead Priority - critical NOT urgent
export enum LeadPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Audit Actions - ONLY CRUD verbs
export enum AuditAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  LOGIN = 'login',
  LOGOUT = 'logout'
}

// User Roles
export enum UserRole {
  VIEWER = 'viewer',
  AUDITOR = 'auditor',
  ADMIN = 'admin'
}

// Validation functions
export function isValidLeadStatus(status: string): status is LeadStatus {
  return Object.values(LeadStatus).includes(status as LeadStatus);
}

export function isValidPriority(priority: string): priority is LeadPriority {
  return Object.values(LeadPriority).includes(priority as LeadPriority);
}

export function isValidAuditAction(action: string): action is AuditAction {
  return Object.values(AuditAction).includes(action as AuditAction);
}

export function isValidUserRole(role: string): role is UserRole {
  return Object.values(UserRole).includes(role as UserRole);
}
