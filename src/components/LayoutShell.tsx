"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RoleProvider } from "@/lib/RoleContext";
import { FloatingActions } from "@/components/FloatingActions";

/**
 * LayoutShell — Renders Navbar and Footer around site content.
 */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <Navbar />
      <main className="flex-1 overflow-x-hidden w-full">{children}</main>
      <Footer />
      <FloatingActions />
    </RoleProvider>
  );
}
