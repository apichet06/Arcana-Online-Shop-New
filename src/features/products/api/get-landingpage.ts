import { apiFetch } from "@/lib/api"
import { LandingPageProduct, LandingPageResponse } from "../types/ProductShopById"

type GetLandingPageProps = {
    slug: string,
    lang?: "th" | "en" | "ja"
}

export async function GetLandingPage({
    slug,
    lang
}: GetLandingPageProps): Promise<LandingPageProduct | null> {
    try {
        const res = await apiFetch<LandingPageResponse>(`/landingpage/lp/${slug}/${lang}`)
        return res.data ?? null
    } catch (error) {
        console.error("GetLandingPage error:", error)
        return null
    }
}