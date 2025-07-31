// app/layout.tsx
import { AppLayout } from "@/components/layout/AppLayout"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "PPM Suite",
  description: "Project Portfolio Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TooltipProvider>
            <AppLayout>
              {children}
              <Toaster />
              <Sonner />
            </AppLayout>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}