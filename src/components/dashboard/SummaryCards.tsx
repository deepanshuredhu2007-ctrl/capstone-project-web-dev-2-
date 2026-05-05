'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Briefcase, 
  UserCheck, 
  CheckCircle2, 
  XCircle,
  TrendingUp
} from 'lucide-react';

export function SummaryCards() {
  const { applications } = useSelector((state: RootState) => state.jobs);
  
  const stats = [
    {
      title: 'Total Applications',
      value: applications.length,
      icon: Briefcase,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      title: 'Interviews',
      value: applications.filter(j => j.applicationStatus === 'Interviewing').length,
      icon: UserCheck,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Offers',
      value: applications.filter(j => j.applicationStatus === 'Offer').length,
      icon: CheckCircle2,
      color: 'text-accent',
      bg: 'bg-accent/10'
    },
    {
      title: 'Rejections',
      value: applications.filter(j => j.applicationStatus === 'Rejected').length,
      icon: XCircle,
      color: 'text-destructive',
      bg: 'bg-destructive/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-accent" />
              <span>+2.5% from last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}