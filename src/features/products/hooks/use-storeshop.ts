import { useEffect, useState } from "react"
import { StoreShop } from "../types/storeShop"
import { storeShopServie } from "../api/get-storeShop"



export function useStoreshop() {
    const [data, setData] = useState<StoreShop[]>()
    const [loading, setLoading] = useState(true)

    async function reload(optiont?: { isInitial: boolean }) {
        try {
            if (optiont?.isInitial) setLoading(true)

            const res = await storeShopServie.getStoreShop()
            setData(res)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        reload({ isInitial: true })
    }, [])
    return ({
        data,
        loading,
        reload
    }
    )
}
