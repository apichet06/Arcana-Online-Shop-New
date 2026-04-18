import { useCallback } from 'react';
import { useEffect, useState } from 'react'
import { ProductByStId } from '../types/productShopByStId'
import { getProductByStId } from '../api/get-product-by-id'

export default function useProductStId(st_id: number, lang?: "th" | "en" | "ja") {

    const [data, setData] = useState<ProductByStId[]>([])
    const [loading, setLoading] = useState(true)

    const reload = useCallback(async (options?: { isInitial: boolean }) => {
        try {
            if (options?.isInitial) setLoading(true)

            const res = await getProductByStId({ st_id, lang })
            setData(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [lang, st_id])

    useEffect(() => {
        reload({ isInitial: true })
    }, [reload])

    return ({
        data,
        loading,
        reload
    })
}
