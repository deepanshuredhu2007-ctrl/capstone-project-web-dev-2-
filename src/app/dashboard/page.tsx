
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
  const { user } = useSelector((state: RootState) => state.auth);
  
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 4);

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
      <div className="space-y-10 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground">Welcome, {user?.name || 'Friend'}!</h1>
            <p className="text-muted-foreground">Here's a look at how your job search is going today.</p>
          </div>
          <Button onClick={() => router.push('/applications/new')} className="gap-2 rounded-full h-11 px-6 shadow-md">
            <Plus className="w-5 h-5" />
            Add a New Job
          </Button>
        </div>

        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <StatusChart />
          
          <Card className="col-span-1 lg:col-span-3 border shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-muted/20 pb-4">
              <div>
                <CardTitle className="text-lg">Recent Updates</CardTitle>
                <CardDescription>Your most recent activity.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => router.push('/applications')} className="text-primary font-semibold">
                See all <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {recentApplications.length > 0 ? (
                  recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 rounded-2xl border bg-card hover:border-primary/30 transition-all group">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm group-hover:text-primary transition-colors">{app.companyName}</span>
                        <span className="text-xs text-muted-foreground">{app.jobRole}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`${getStatusColor(app.applicationStatus)} font-semibold rounded-full px-3`}>
                          {app.applicationStatus}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => router.push('/applications')}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground italic">
                    You haven't added any jobs yet. Let's start tracking!
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
