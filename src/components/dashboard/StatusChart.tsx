'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function StatusChart() {
  const { applications } = useSelector((state: RootState) => state.jobs);

  const data = [
    { name: 'Applied', value: applications.filter(j => j.applicationStatus === 'Applied').length },
    { name: 'Interviewing', value: applications.filter(j => j.applicationStatus === 'Interviewing').length },
    { name: 'Offer', value: applications.filter(j => j.applicationStatus === 'Offer').length },
    { name: 'Rejected', value: applications.filter(j => j.applicationStatus === 'Rejected').length },
  ].filter(d => d.value > 0);

  const COLORS = ['#3A7EAC', '#3b82f6', '#49DBAD', '#ef4444'];

  return (
    <Card className="col-span-1 lg:col-span-2 border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Application Distribution</CardTitle>
        <CardDescription>Visual breakdown of your current application stages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}