"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { GatewayLocale } from "@/lib/cookies";

interface LocaleContextValue {
  locale: GatewayLocale;
  setLocale: (l: GatewayLocale) => void;
}

const LocaleCtx = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
});

export function useRole() {
  return useContext(LocaleCtx);
}

/**
 * RoleProvider — Reads locale cookie on mount and exposes
 * locale to the entire component tree.
 * Also provides setLocale() so the Navbar language picker can update locale globally.
 */
export function RoleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<GatewayLocale>("en");

  useEffect(() => {
    // English-only release: force locale to "en"
    setLocaleState("en");
  }, []);

  const setLocale = useCallback((l: GatewayLocale) => {
    // Update cookie
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `kafaah_locale=${l};expires=${date.toUTCString()};path=/;SameSite=Lax`;
    // Update state
    setLocaleState(l);
  }, []);

  useEffect(() => {
    const isRtl = locale === "ar";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleCtx.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleCtx.Provider>
  );
}
