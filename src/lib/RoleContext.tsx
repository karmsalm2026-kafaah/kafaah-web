"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { GatewayRole, GatewayLocale } from "@/lib/cookies";

interface RoleContextValue {
  role: GatewayRole | null;
  locale: GatewayLocale;
  country: string | null;
}

const RoleCtx = createContext<RoleContextValue>({
  role: null,
  locale: "en",
  country: null,
});

export function useRole() {
  return useContext(RoleCtx);
}

/**
 * RoleProvider — Reads gateway cookies on mount and exposes
 * role / locale / country to the entire component tree.
 */
export function RoleProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RoleContextValue>({
    role: null,
    locale: "en",
    country: null,
  });

  useEffect(() => {
    // Read cookies client-side
    const get = (name: string) => {
      const m = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return m ? decodeURIComponent(m[2]) : null;
    };
    setState({
      role: (get("kafaah_role") as GatewayRole) || null,
      locale: (get("kafaah_locale") as GatewayLocale) || "en",
      country: get("kafaah_country"),
    });
  }, []);

  return <RoleCtx.Provider value={state}>{children}</RoleCtx.Provider>;
}
