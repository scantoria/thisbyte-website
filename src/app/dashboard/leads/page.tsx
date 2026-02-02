'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/firebase/auth';
import { db } from '@/app/lib/firebase/client';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

interface Lead {
  id: string;
  email: string;
  serviceInterest: string[];
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  createdAt: any;
}

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, isAuditor } = useAuth();
  
  useEffect(() => {
    if (!isAdmin && !isAuditor) return;
    
    const q = query(
      collection(db, 'leads'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      
      setLeads(leadsData);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [isAdmin, isAuditor]);
  
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Leads</h3>
          <p className="mt-2 text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">New</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.new}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Contacted</h3>
          <p className="mt-2 text-3xl font-bold text-yellow-600">{stats.contacted}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Qualified</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{stats.qualified}</p>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b">
          <h2 className="text-lg font-medium text-gray-900">Lead Pipeline</h2>
          <p className="mt-1 text-sm text-gray-600">
            All captured leads with CMMI-compliant audit trail
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.serviceInterest?.join(', ') || 'General'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${lead.status === 'new' ? 'bg-blue-100 text-blue-800' : ''}
                      ${lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${lead.status === 'qualified' ? 'bg-green-100 text-green-800' : ''}
                      ${lead.status === 'proposal' ? 'bg-purple-100 text-purple-800' : ''}
                      ${lead.status === 'closed' ? 'bg-gray-100 text-gray-800' : ''}`}>
                      {lead.status}
                    </span>
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
    </div>
  );
}
