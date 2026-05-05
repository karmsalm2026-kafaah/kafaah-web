/**
 * Cookie Utilities
 * Manages kafaah_locale cookie for i18n persistence
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

export type GatewayLocale = "en" | "ar" | "zh";

export function setLocaleCookie(locale: GatewayLocale) {
  setCookie("kafaah_locale", locale);
}

export function getLocaleCookie(): GatewayLocale | null {
  return getCookie("kafaah_locale") as GatewayLocale | null;
}
