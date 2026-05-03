"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RoleProvider } from "@/lib/RoleContext";

/**
 * LayoutShell — Conditionally renders Navbar and Footer.
 * On the /gateway route, the shell is transparent (no nav/footer).
 * On all other routes, the standard site shell is rendered.
 */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGateway = pathname === "/gateway";

  if (isGateway) {
    return <>{children}</>;
  }

  return (
    <RoleProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </RoleProvider>
  );
}
