import { DEFAULT_LANGUAGE, Language, LANGUAGE_COOKIE } from "./i18n";

// lib/cookies.ts
export function getInitialLanguage(): Language {
    if (typeof document === "undefined") return DEFAULT_LANGUAGE
    const cookieLang = getCookie(LANGUAGE_COOKIE)
    return (cookieLang as Language) || DEFAULT_LANGUAGE
}

/**
 * อ่านค่า Cookie จากฝั่ง Client
 */
export function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(";").shift() ?? null;
    }

    return null;
}

/**
 * ตั้งค่า Cookie
 */
export function setCookie(
    name: string,
    value: string,
    days: number = 365
): void {
    if (typeof document === "undefined") return;

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/**
 * ลบ Cookie
 */
export function deleteCookie(name: string): void {
    if (typeof document === "undefined") return;

    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}