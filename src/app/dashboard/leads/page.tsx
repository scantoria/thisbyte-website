'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/firebase/auth';
import { db } from '@/app/lib/firebase/client';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import {
  LeadStatus,
  LeadPriority,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  getStatusLabel,
  getPriorityLabel,
  isValidLeadStatus
} from '@/app/lib/constants';

interface Lead {
  id: string;
  email: string;
  serviceInterest: string[];
  status: LeadStatus;
  priority?: LeadPriority;
  company?: string;
  notes?: Array<{ text: string; createdAt: any; createdBy: string }>;
  assignedTo?: string;
  createdAt: any;
  updatedAt: any;
}

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { isAdmin, isAuditor } = useAuth();

  // Real-time Firestore subscription
  useEffect(() => {
    if (!isAdmin && !isAuditor) return;

    const q = query(
      collection(db, 'leads'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => {
        const data = doc.data();
        // Ensure status is valid, default to NEW if invalid
        const status = isValidLeadStatus(data.status) ? data.status : LeadStatus.NEW;
        return {
          id: doc.id,
          ...data,
          status
        } as Lead;
      });

      setLeads(leadsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin, isAuditor]);

  // Update lead status
  const updateStatus = async (leadId: string, newStatus: LeadStatus) => {
    if (!isAdmin) return; // Only admins can update

    setUpdating(leadId);
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  // Update priority
  const updatePriority = async (leadId: string, priority: LeadPriority) => {
    if (!isAdmin) return;

    setUpdating(leadId);
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        priority,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating priority:', error);
    } finally {
      setUpdating(null);
    }
  };

  // Statistics
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === LeadStatus.NEW).length,
    contacted: leads.filter(l => l.status === LeadStatus.CONTACTED).length,
    qualified: leads.filter(l => l.status === LeadStatus.QUALIFIED).length,
    proposal: leads.filter(l => l.status === LeadStatus.PROPOSAL).length,
    closed: leads.filter(l => l.status === LeadStatus.CLOSED).length
  };

  // Status color mapping
  const getStatusColor = (status: LeadStatus) => {
    const colors = {
      [LeadStatus.NEW]: 'bg-blue-100 text-blue-800',
      [LeadStatus.CONTACTED]: 'bg-yellow-100 text-yellow-800',
      [LeadStatus.QUALIFIED]: 'bg-green-100 text-green-800',
      [LeadStatus.PROPOSAL]: 'bg-purple-100 text-purple-800',
      [LeadStatus.CLOSED]: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Priority color mapping
  const getPriorityColor = (priority?: LeadPriority) => {
    const colors = {
      [LeadPriority.LOW]: 'bg-green-100 text-green-800',
      [LeadPriority.MEDIUM]: 'bg-yellow-100 text-yellow-800',
      [LeadPriority.HIGH]: 'bg-orange-100 text-orange-800',
      [LeadPriority.CRITICAL]: 'bg-red-100 text-red-800'
    };
    return priority ? colors[priority] : 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total</h3>
          <p className="mt-2 text-3xl font-bold">{stats.total}</p>
        </div>
        {STATUS_OPTIONS.map((option) => (
          <div key={option.value} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">{option.label}</h3>
            <p className={`mt-2 text-3xl font-bold ${
              option.value === LeadStatus.NEW ? 'text-blue-600' :
              option.value === LeadStatus.CONTACTED ? 'text-yellow-600' :
              option.value === LeadStatus.QUALIFIED ? 'text-green-600' :
              option.value === LeadStatus.PROPOSAL ? 'text-purple-600' :
              'text-gray-600'
            }`}>
              {stats[option.value as keyof typeof stats] || 0}
            </p>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b">
          <h2 className="text-lg font-medium text-gray-900">Lead Pipeline</h2>
          <p className="mt-1 text-sm text-gray-600">
            CMMI-compliant lead management with corrected enums
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isAdmin ? (
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                        disabled={updating === lead.id}
                        className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(lead.status)} ${
                          updating === lead.id ? 'opacity-50' : 'cursor-pointer'
                        }`}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {getStatusLabel(lead.status)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isAdmin ? (
                      <select
                        value={lead.priority || LeadPriority.MEDIUM}
                        onChange={(e) => updatePriority(lead.id, e.target.value as LeadPriority)}
                        disabled={updating === lead.id}
                        className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(lead.priority)} ${
                          updating === lead.id ? 'opacity-50' : 'cursor-pointer'
                        }`}
                      >
                        {PRIORITY_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(lead.priority)}`}>
                        {lead.priority ? getPriorityLabel(lead.priority) : 'Medium'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.serviceInterest?.join(', ') || 'General'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800">CMMI Compliance Active</h3>
        <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
          <li>Lead Status: 5 validated values (new, contacted, qualified, proposal, closed)</li>
          <li>Priority: 4 validated values (low, medium, high, critical)</li>
          <li>Role-based access: Admins only can modify</li>
        </ul>
      </div>
    </div>
  );
}
