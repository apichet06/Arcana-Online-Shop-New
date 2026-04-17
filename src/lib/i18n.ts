export const LANGUAGE_COOKIE = "arcana-lang";

export const DEFAULT_LANGUAGE = "th";

export const SUPPORTED_LANGUAGES = ["th", "en", "ja"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export function isValidLanguage(lang: string): lang is Language {
    return SUPPORTED_LANGUAGES.includes(lang as Language);
}