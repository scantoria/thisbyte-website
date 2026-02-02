// File: src/app/lib/analytics/gtag.ts
import { GoogleAnalytics } from '@next/third-parties/google';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Page view tracking
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    custom_map: {
      dimension1: 'user_role',
      dimension2: 'service_interest'
    }
  });
};

// CMMI-compliant event tracking
export const event = ({
  action,
  category,
  label,
  value,
  serviceInterest
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
  serviceInterest?: string;
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    service_interest: serviceInterest, // Custom dimension
    non_interaction: false
  });
};

// Specific events for federal compliance tracking
export const ANALYTICS_EVENTS = {
  FORM_START: 'form_start',
  FORM_COMPLETE: 'form_complete',
  FORM_ABANDON: 'form_abandon',
  SERVICE_CLICK: 'service_click',
  LEAD_STATUS_CHANGE: 'lead_status_change',
  ADMIN_LOGIN: 'admin_login',
  AUDIT_VIEW: 'audit_view'
} as const;
