'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { StatusChart } from '@/components/dashboard/StatusChart';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { applications } = useSelector((state: RootState) => state.jobs);
  const recentApplications = [...applications].sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()).slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-primary/10 text-primary border-primary/20';
      case 'Interviewing': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Offer': return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'Rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-1">Welcome back. Here's a summary of your job search progress.</p>
          </div>
          <Button onClick={() => router.push('/applications/new')} className="gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            Add Application
          </Button>
        </div>

        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <StatusChart />
          
          <Card className="col-span-1 lg:col-span-3 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Applications</CardTitle>
                <CardDescription>Your most recent submissions.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => router.push('/applications')} className="text-primary hover:text-primary/80">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.length > 0 ? (
                  recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 transition-all group">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm group-hover:text-primary transition-colors">{app.companyName}</span>
                        <span className="text-xs text-muted-foreground">{app.jobRole}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`${getStatusColor(app.applicationStatus)} font-medium`}>
                          {app.applicationStatus}
                        </Badge>
                        <Link href={`/applications`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No applications yet. Start tracking your journey!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}