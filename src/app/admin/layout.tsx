"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppLogo } from '@/components/shared/AppLogo';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { LayoutDashboard, FileText, ShoppingBag, Tag, Users, Settings, LogOut, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/invoices', label: 'Invoices', icon: FileText },
  { href: '/admin/products', label: 'Products', icon: ShoppingBag },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && user?.role !== 'admin') {
      router.push('/shop'); // Or a dedicated "access denied" page
    }
  }, [user, loading, router]);

  if (loading || user?.role !== 'admin') {
    return <div className="flex items-center justify-center h-screen"><p>Loading or Access Denied...</p></div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-card border-r flex flex-col shadow-lg">
        <div className="p-4 border-b">
          <AppLogo iconSize={24} textSize="text-xl" />
        </div>
        <ScrollArea className="flex-grow">
          <nav className="py-4 px-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  "w-full justify-start mb-1",
                  pathname === item.href && "font-semibold text-primary"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t mt-auto">
           <Button variant="outline" className="w-full justify-start mb-2" asChild>
             <Link href="/shop"><ChevronLeft className="mr-2 h-4 w-4" />Back to Shop</Link>
           </Button>
           <Button variant="destructive" className="w-full justify-start" onClick={() => { logout(); router.push('/');}}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
         {children}
        </div>
      </main>
    </div>
  );
}
