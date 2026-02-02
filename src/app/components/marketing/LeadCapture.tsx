'use client';

import { useState } from 'react';
import { db } from '@/app/lib/firebase/client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function LeadCapture() {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addDoc(collection(db, 'leads'), {
        email,
        serviceInterest: interest || 'general',
        status: 'new',
        source: 'website-form',
        timestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setSuccess(true);
      setEmail('');
      setInterest('');
    } catch (error) {
      console.error('Lead capture error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg">
        <h3 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h3>
        <p className="text-green-600">We'll contact you shortly about our compliance-ready solutions.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Work Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="name@agency.gov"
        />
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-medium mb-2">
          Primary Interest
        </label>
        <select
          id="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a service...</option>
          <option value="web-dev">Web Development</option>
          <option value="mobile-dev">Mobile Development</option>
          <option value="compliance">Compliance & Audit</option>
          <option value="consulting">Technical Consulting</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Request Compliance Assessment'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting, you agree to our privacy policy. All data is stored with CMMI-compliant audit trails.
      </p>
    </form>
  );
}
