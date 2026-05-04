"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { GatewayRole, GatewayLocale } from "@/lib/cookies";

interface RoleContextValue {
  role: GatewayRole | null;
  locale: GatewayLocale;
  country: string | null;
  setLocale: (l: GatewayLocale) => void;
}

const RoleCtx = createContext<RoleContextValue>({
  role: null,
  locale: "en",
  country: null,
  setLocale: () => {},
});

export function useRole() {
  return useContext(RoleCtx);
}

/**
 * RoleProvider — Reads gateway cookies on mount and exposes
 * role / locale / country to the entire component tree.
 * Also provides setLocale() so the Navbar language picker can update locale globally.
 */
export function RoleProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Omit<RoleContextValue, "setLocale">>({
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

  const setLocale = useCallback((l: GatewayLocale) => {
    // Update cookie
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `kafaah_locale=${l};expires=${date.toUTCString()};path=/;SameSite=Lax`;
    // Update state
    setState((prev) => ({ ...prev, locale: l }));
  }, []);

  return (
    <RoleCtx.Provider value={{ ...state, setLocale }}>
      {children}
    </RoleCtx.Provider>
  );
}
