import { apiFetch } from "@/lib/api"
import { ProductShopByIdResponse } from "../types/ProductShopById"
import { ProductByStIdResponse } from "../types/productShopByStId"


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


type GetProductByStIdParams = {
    st_id: number
    lang?: "th" | "en" | "ja"
}

export async function getProductByStId({
    st_id,
    lang = "th",
}: GetProductByStIdParams) {
    const res = await apiFetch<ProductByStIdResponse>(`/productShop/store/${lang}/${st_id}`)
    return res.data
}
