'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, ShieldCheck, User, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (role: 'Admin' | 'Viewer') => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      dispatch(login({
        id: '1',
        email: 'user@jobtrackpro.com',
        name: role === 'Admin' ? 'Alex Johnson' : 'Sam Smith',
        role: role
      }));
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7F8] dark:bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center bg-primary rounded-xl p-2.5 mb-2 shadow-lg shadow-primary/20">
            <Briefcase className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold font-headline tracking-tight text-primary">JobTrack<span className="text-accent">Pro</span></h1>
          <p className="text-muted-foreground">The ultimate career pursuit dashboard</p>
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Select your access role to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="Admin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="Admin" className="gap-2">
                  <ShieldCheck className="w-4 h-4" /> Admin
                </TabsTrigger>
                <TabsTrigger value="Viewer" className="gap-2">
                  <User className="w-4 h-4" /> Viewer
                </TabsTrigger>
              </TabsList>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@company.com" defaultValue="demo@jobtrack.pro" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="px-0 h-auto text-xs">Forgot password?</Button>
                  </div>
                  <Input id="password" type="password" defaultValue="password123" />
                </div>
              </div>

              <TabsContent value="Admin">
                <Button 
                  className="w-full mt-6 bg-primary" 
                  onClick={() => handleLogin('Admin')}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign in as Admin'}
                </Button>
              </TabsContent>
              <TabsContent value="Viewer">
                <Button 
                  className="w-full mt-6 bg-primary" 
                  onClick={() => handleLogin('Viewer')}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign in as Viewer'}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center">
            <p className="text-xs text-muted-foreground">
              By clicking continue, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}