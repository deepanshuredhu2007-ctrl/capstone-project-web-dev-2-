
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulating a quick sign in
    setTimeout(() => {
      dispatch(login({
        id: '1',
        email: 'user@example.com',
        name: 'Friend',
        role: 'Admin'
      }));
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-2xl p-3 mb-2 shadow-lg">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground">Sign in to see your jobs.</p>
        </div>

        <Card className="border shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your details below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@example.com" defaultValue="demo@jobbuddy.me" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="password123" />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full h-11 rounded-xl text-lg" 
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sign In'}
            </Button>
          </CardFooter>
        </Card>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account? <Button variant="link" className="p-0 h-auto font-semibold">Join the waitlist</Button>
        </p>
      </div>
    </div>
  );
}
