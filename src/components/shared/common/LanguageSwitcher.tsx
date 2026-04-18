"use client";

import { DEFAULT_LANGUAGE, Language, LANGUAGE_COOKIE } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
    const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
    const [isChanging, setIsChanging] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const match = document.cookie.match(
            new RegExp(`(?:^|; )${LANGUAGE_COOKIE}=([^;]+)`)
        );

        if (match) {
            const cookieLang = match[1] as Language;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLanguage(cookieLang);
        }

        setIsReady(true);
    }, []);

    const handleChange = (lang: Language) => {
        if (lang === language) return;

        setIsChanging(true);
        document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
        setLanguage(lang);
        window.location.reload();
    };

    if (!isReady) {
        return (
            <div className="hidden md:block">
                <div className="h-10.5 w-23 animate-pulse rounded-lg border border-slate-200 bg-white/80" />
            </div>
        );
    }

    return (
        <div className="group relative hidden md:block">
            <select
                value={language}
                onChange={(e) => handleChange(e.target.value as Language)}
                disabled={isChanging}
                className="
                    h-9 appearance-none rounded-md border border-slate-200
                    bg-white/85 px-2.5 pr-7 text-xs font-medium
                    text-slate-700 shadow-sm backdrop-blur
                    transition duration-200
                    hover:border-sky-300 hover:bg-white
                    group-hover:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-sky-500/70
                    disabled:pointer-events-none disabled:opacity-60
                "
            >
                <option value="th">TH</option>
                <option value="en">EN</option>
                <option value="ja">JP</option>
            </select>

            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400 transition duration-200 group-hover:text-sky-500 group-hover:translate-y-px">
                <ChevronDown size={18} />
            </span>
        </div>
    );
}