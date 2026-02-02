// CORRECTED ENUMS per Compliance Guidance

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
export const isValidLeadStatus = (status: string): status is LeadStatus =>
  Object.values(LeadStatus).includes(status as LeadStatus);

export const isValidPriority = (priority: string): priority is LeadPriority =>
  Object.values(LeadPriority).includes(priority as LeadPriority);

export const isValidAuditAction = (action: string): action is AuditAction =>
  Object.values(AuditAction).includes(action as AuditAction);

// UI display helpers
export const getStatusLabel = (status: LeadStatus): string => {
  const labels: Record<LeadStatus, string> = {
    [LeadStatus.NEW]: 'New',
    [LeadStatus.CONTACTED]: 'Contacted',
    [LeadStatus.QUALIFIED]: 'Qualified',
    [LeadStatus.PROPOSAL]: 'Proposal',
    [LeadStatus.CLOSED]: 'Closed'
  };
  return labels[status] || status;
};

export const getPriorityLabel = (priority: LeadPriority): string => {
  const labels: Record<LeadPriority, string> = {
    [LeadPriority.LOW]: 'Low',
    [LeadPriority.MEDIUM]: 'Medium',
    [LeadPriority.HIGH]: 'High',
    [LeadPriority.CRITICAL]: 'Critical'
  };
  return labels[priority] || priority;
};

// Status options for dropdowns
export const STATUS_OPTIONS = [
  { value: LeadStatus.NEW, label: 'New' },
  { value: LeadStatus.CONTACTED, label: 'Contacted' },
  { value: LeadStatus.QUALIFIED, label: 'Qualified' },
  { value: LeadStatus.PROPOSAL, label: 'Proposal' },
  { value: LeadStatus.CLOSED, label: 'Closed' }
];

// Priority options for dropdowns
export const PRIORITY_OPTIONS = [
  { value: LeadPriority.LOW, label: 'Low' },
  { value: LeadPriority.MEDIUM, label: 'Medium' },
  { value: LeadPriority.HIGH, label: 'High' },
  { value: LeadPriority.CRITICAL, label: 'Critical' }
];
