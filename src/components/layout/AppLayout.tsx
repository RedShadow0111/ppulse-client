// components/layout/AppLayout.tsx
'use client';

import { AppFooter } from "./AppFooter"
import { AppHeader } from "./AppHeader"
import { AppSidebar } from "./AppSidebar"
// import { Toaster } from "@/components/ui/toaster"; // Временно закомментируйте

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        
        <main className="flex-1 p-6 bg-background">
          <div className="max-w-none mx-auto">
            {children}
          </div>
        </main>
        
        <AppFooter />
      </div>
      
      {/* <Toaster /> Временно закомментируйте */}
    </div>
  );
}