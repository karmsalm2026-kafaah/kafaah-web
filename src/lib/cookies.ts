/**
 * Gateway Cookie Utilities
 * Manages kafaah_role, kafaah_locale, and kafaah_country cookies
 * Used by the gateway page and middleware for personalization
 */

const COOKIE_EXPIRY_DAYS = 365;

function setCookie(name: string, value: string, days: number = COOKIE_EXPIRY_DAYS) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
}

export type GatewayRole = "owner" | "epc";
export type GatewayLocale = "en" | "ar";

export function setGatewayCookies(
  role: GatewayRole,
  locale: GatewayLocale,
  country?: string
) {
  setCookie("kafaah_role", role);
  setCookie("kafaah_locale", locale);
  if (country) {
    setCookie("kafaah_country", country);
  }
}

export function getGatewayCookies() {
  return {
    role: getCookie("kafaah_role") as GatewayRole | null,
    locale: getCookie("kafaah_locale") as GatewayLocale | null,
    country: getCookie("kafaah_country"),
  };
}

export function clearGatewayCookies() {
  deleteCookie("kafaah_role");
  deleteCookie("kafaah_locale");
  deleteCookie("kafaah_country");
}
