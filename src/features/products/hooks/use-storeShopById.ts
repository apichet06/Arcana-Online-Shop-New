import { useCallback, useEffect, useState } from 'react'
import { StoreShop } from '../types/storeShop'
import { storeShopServie } from '../api/get-storeShop'

export function useStoreShopById(id: number) {
    const [data, setData] = useState<StoreShop>()
    const [loading, setLoading] = useState(true)

    const reload = useCallback(async (options?: { isInitial: boolean }) => {
        try {
            if (options?.isInitial) setLoading(true)

            const res = await storeShopServie.getStoreShopById(id)
            setData(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [id])  // เปลี่ยนเมื่อ id เปลี่ยนเท่านั้น

    useEffect(() => {
        reload({ isInitial: true })
    }, [reload])

    return {
        data,
        loading,
        reload
    }
}