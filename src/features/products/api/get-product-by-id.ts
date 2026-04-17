import { apiFetch } from "@/lib/api"
import { ProductShopByIdResponse } from "../types/ProductShopById"


type GetProductByIdParams = {
    p_id: number
    lang?: "th" | "en" | "ja"
}

export async function getProductById({
    p_id,
    lang = "th",
}: GetProductByIdParams) {
    const res = await apiFetch<ProductShopByIdResponse>(`/productShop/${lang}/${p_id}`)
    return res.data
}

