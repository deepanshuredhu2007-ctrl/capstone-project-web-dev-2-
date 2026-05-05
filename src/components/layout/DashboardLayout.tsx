
'use client';

import { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  PlusCircle, 
  LogOut, 
  User,
  Settings,
  Smile
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
    { title: 'Home', icon: LayoutDashboard, href: '/dashboard' },
    { title: 'My Jobs', icon: Briefcase, href: '/applications' },
    { title: 'Add Job', icon: PlusCircle, href: '/applications/new' },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="px-6 py-6">
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
              <div className="bg-primary text-primary-foreground rounded-lg p-1">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="font-headline font-bold text-xl tracking-tight">JobBuddy</span>
            </div>
            <div className="hidden group-data-[collapsible=icon]:flex justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    isActive={pathname === item.href}
                    onClick={() => router.push(item.href)}
                    tooltip={item.title}
                    className="h-10 px-4 rounded-xl"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden p-2 rounded-2xl bg-muted/30">
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback><Smile className="w-5 h-5" /></AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold truncate">Hi, {user?.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="justify-start px-3 h-10 w-full rounded-xl hover:bg-destructive/10 hover:text-destructive" 
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex flex-col flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-background/80 backdrop-blur px-6 border-none">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
