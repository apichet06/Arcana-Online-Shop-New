"use client";

import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE } from "@/lib/i18n";
import { useEffect, useState } from "react";


export default function LanguageSwitcher() {
    const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

    // อ่านค่าจาก cookie
    useEffect(() => {
        const match = document.cookie.match(
            new RegExp(`(^| )${LANGUAGE_COOKIE}=([^;]+)`)
        );
        if (match) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLanguage(match[2]);
        }
    }, []);

    // เปลี่ยนภาษา
    const handleChange = (lang: string) => {
        document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
        setLanguage(lang);

        // รีเฟรชเพื่อให้ Server Component โหลดภาษาใหม่
        window.location.reload();
    };

    return (
        <div className="relative hidden md:block">
            <select
                value={language}
                onChange={(e) => handleChange(e.target.value)}
                className="
          appearance-none rounded-lg border border-slate-200
          bg-white/80 px-3 py-2 pr-8 text-sm font-medium
          text-slate-700 backdrop-blur
          transition hover:border-slate-300
          focus:outline-none focus:ring-2 focus:ring-sky-500
        "
            >
                <option value="th">🇹🇭 TH</option>
                <option value="en">🇺🇸 EN</option>
                <option value="ja">🇯🇵 JP</option>
            </select>

            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-500">
                ▼
            </span>
        </div>
    );
}