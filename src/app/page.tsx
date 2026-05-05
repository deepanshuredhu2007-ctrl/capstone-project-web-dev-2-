
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Briefcase, Heart, Sparkles, Smile } from 'lucide-react';

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
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-headline tracking-tight">JobBuddy</span>
        </div>
        <Button onClick={() => router.push('/login')} variant="ghost">Sign In</Button>
      </nav>

      <main className="container mx-auto px-6 pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight">
            Your friendly career <span className="text-primary">companion.</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Simple, stress-free job tracking. Keep your applications organized, get helpful suggestions, and focus on landing that dream role.
          </p>
          <div className="pt-8">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg hover:scale-105 transition-transform" onClick={() => router.push('/login')}>
              Get Started for Free
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <Card 
            icon={<Heart className="w-6 h-6 text-primary" />}
            title="Keep it Simple"
            description="No complex spreadsheets. Just a clean list of where you stand with every company."
          />
          <Card 
            icon={<Sparkles className="w-6 h-6 text-accent" />}
            title="Helpful AI"
            description="Not sure what to say in a follow-up? Our little assistant can draft a note for you."
          />
          <Card 
            icon={<Smile className="w-6 h-6 text-orange-400" />}
            title="Your Progress"
            description="See how far you've come with a clear view of your interviews and offers."
          />
        </div>
      </main>

      <footer className="container mx-auto px-6 py-12 mt-12 border-t text-center text-sm text-muted-foreground">
        Made with ❤️ for everyone looking for their next big thing.
      </footer>
    </div>
  );
}

function Card({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-card border shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 bg-muted w-12 h-12 flex items-center justify-center rounded-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-headline mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
