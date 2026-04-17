import { apiFetch } from "@/lib/api"
import { LandingPageProduct, LandingPageResponse } from "../types/ProductShopById"

type GetLandingPageProps = {
    slug: string
}

export async function GetLandingPage({
    slug,
}: GetLandingPageProps): Promise<LandingPageProduct | null> {
    try {
        const res = await apiFetch<LandingPageResponse>(`/landingpage/lp/${slug}`)
        return res.data ?? null
    } catch (error) {
        console.error("GetLandingPage error:", error)
        return null
    }
}