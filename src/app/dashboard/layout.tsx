// File: src/app/(dashboard)/layout.tsx
'use client';

import { useAuth } from '@/app/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin, isAuditor } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    
    if (!loading && user && !isAdmin && !isAuditor) {
      router.push('/unauthorized');
    }
  }, [user, loading, isAdmin, isAuditor, router]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading authentication...</div>
      </div>
    );
  }
  
  // CMMI Access Control Enforcement
  if (!user) {
    return null;
  }
  
  if (!isAdmin && !isAuditor) {
    return null; // Redirect will happen in useEffect
  }
 
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              ThisByte Dashboard
            </h1>
            <div className="text-sm text-gray-600">
              {user.email}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 
