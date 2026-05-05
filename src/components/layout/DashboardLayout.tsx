'use client';

import { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  PlusCircle, 
  LogOut, 
  User,
  Search,
  Settings
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const userAvatar = PlaceHolderImages.find(img => img.id === 'avatar-user')?.imageUrl;

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const navItems = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { title: 'Applications', icon: Briefcase, href: '/applications' },
    { title: 'New Application', icon: PlusCircle, href: '/applications/new' },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
              <div className="bg-primary rounded-lg p-1.5">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-headline font-bold text-xl tracking-tight text-primary">JobTrack<span className="text-accent">Pro</span></span>
            </div>
            <div className="hidden group-data-[collapsible=icon]:flex justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2 py-4">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    isActive={pathname === item.href}
                    onClick={() => router.push(item.href)}
                    tooltip={item.title}
                    className="h-11 px-4"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium truncate">{user?.name}</span>
                  <Badge variant="secondary" className="text-[10px] py-0 w-fit">{user?.role}</Badge>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="justify-start px-3 h-10 w-full" 
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex flex-col flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}