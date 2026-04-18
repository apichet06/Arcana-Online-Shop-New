import { useCallback, useEffect, useState } from "react"
import { LandingPageProduct } from "../types/ProductShopById"
import { GetLandingPage } from "../api/get-landingpage"


export default function useLandingPage(slug: string, lang?: "th" | "en" | "ja") {
    const [data, setData] = useState<LandingPageProduct | null>(null)
    const [loading, setLoading] = useState(true)

    const reload = useCallback(async (options?: { isInitial: boolean }) => {
        try {
            if (options?.isInitial) setLoading(true)

            const res = await GetLandingPage({ slug, lang })

            const normalizedData = Array.isArray(res)
                ? res[0] ?? null
                : res
            setData(normalizedData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [lang, slug])  // เปลี่ยนเมื่อ id เปลี่ยนเท่านั้น


    useEffect(() => {
        reload({ isInitial: true })
    }, [reload])


    return (
        {
            data,
            loading,
            reload
        }
    )
}
