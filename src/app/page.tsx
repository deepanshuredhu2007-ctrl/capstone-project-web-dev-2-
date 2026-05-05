'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Briefcase, Sparkles, TrendingUp, Shield } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold font-headline text-primary">JobTrack<span className="text-accent">Pro</span></span>
        </div>
        <Button onClick={() => router.push('/login')} variant="outline">Sign In</Button>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 mb-4 px-4 py-1 text-sm rounded-full">
            Version 2.0 Now Live
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter leading-tight">
            Stop Searching. <br /><span className="text-primary italic">Start Executing.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The professional suite for managing your career transition. Track applications, interviews, and offers with AI-powered insights and visual analytics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button size="lg" className="h-14 px-8 text-lg font-medium shadow-xl shadow-primary/20" onClick={() => router.push('/login')}>
              Start Tracking Pro
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium">
              View Features
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <FeatureCard 
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
            title="Visual Analytics"
            description="Understand your conversion rates from applied to interviewed to offered with beautiful interactive charts."
          />
          <FeatureCard 
            icon={<Sparkles className="w-6 h-6 text-accent" />}
            title="AI Application Assistant"
            description="Get status-aware suggestions for your notes and drafted follow-up messages using our intelligent AI engine."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-blue-500" />}
            title="Role-Based Security"
            description="Manage your job data with confidence using secure authentication and tiered access controls."
          />
        </div>
      </main>

      <footer className="container mx-auto px-6 py-10 mt-20 border-t text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} JobTrack Pro. Developed for the Modern Career Explorer.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all duration-300">
      <div className="mb-4 bg-muted/30 w-12 h-12 flex items-center justify-center rounded-xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-headline mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function Badge({ children, className, ...props }: React.ComponentProps<'div'>) {
  return <div className={`inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`} {...props}>{children}</div>
}