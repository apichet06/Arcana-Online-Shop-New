import { useEffect, useState } from "react"
import {
    DEFAULT_LANGUAGE,
    LANGUAGE_COOKIE,
    Language
} from "@/lib/i18n"

import { getCookie, getInitialLanguage } from "@/lib/cookies"

export function useLanguage() {
    const [lang, setLang] = useState<Language>(getInitialLanguage)

    useEffect(() => {
        const cookieLang =
            (getCookie(LANGUAGE_COOKIE) as Language) || DEFAULT_LANGUAGE

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLang(cookieLang)
    }, [])

    return {
        lang,
        setLang,
    }
}