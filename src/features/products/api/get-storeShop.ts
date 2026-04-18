import { apiFetch } from "@/lib/api";
import { StoreShop, StoreShopByIdResponse, StoreShopResponse } from "../types/storeShop";



export const storeShopServie = {
    async getStoreShop(): Promise<StoreShop[]> {
        const res = await apiFetch<StoreShopResponse>("/stores/shop")
        return res.data
    },

    async getStoreShopById(id: number): Promise<StoreShop> {
        const res = await apiFetch<StoreShopByIdResponse>(`/stores/shop/${id}`)
        return res.data

    }
}