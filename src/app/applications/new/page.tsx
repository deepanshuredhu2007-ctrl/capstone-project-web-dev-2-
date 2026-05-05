'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ApplicationForm } from '@/components/applications/ApplicationForm';

export default function NewApplicationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-headline tracking-tight text-center">Add New Opportunity</h1>
          <p className="text-muted-foreground mt-2 text-center max-w-lg mx-auto">
            Fill in the details below to start tracking a new job application.
          </p>
        </div>
        <ApplicationForm />
      </div>
    </DashboardLayout>
  );
}