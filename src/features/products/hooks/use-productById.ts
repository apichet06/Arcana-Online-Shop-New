import { useCallback, useEffect, useState } from "react"
import { ProductShopByIdData } from "../types/ProductShopById"
import { getProductById } from "../api/get-product-by-id"


export function useProductById(productId: number, lang?: "th" | "en" | "ja") {
    const [data, setData] = useState<ProductShopByIdData | null>(null)
    const [loading, setLoading] = useState(true)

    const reload = useCallback(async (options?: { isInitial: boolean }) => {
        try {
            if (options?.isInitial) setLoading(true)

            const res = await getProductById({ p_id: Number(productId), lang: lang ?? "th" })
            setData(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [productId, lang])  // เปลี่ยนเมื่อ id เปลี่ยนเท่านั้น

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
