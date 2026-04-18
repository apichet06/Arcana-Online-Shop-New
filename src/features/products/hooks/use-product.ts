import { useCallback, useEffect, useState } from "react"
import { getProducts } from "../api/get-products"
import { Product } from "../types/product"

type Language = "th" | "en" | "ja"
type Website = "arcana"

type UseProductParams = {
    website: Website
    lang?: Language
    page?: number
    limit?: number
}

export default function useProduct({
    website,
    lang = "th",
    page = 1,
    limit = 999,
}: UseProductParams) {
    const [data, setData] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)

    const reload = useCallback(async (options?: { isInitial?: boolean }) => {
        try {
            if (options?.isInitial) setLoading(true)

            setError(null)

            const res = await getProducts({ website, lang, page, limit })
            setData(res.items ?? [])
        } catch (error) {
            console.error(error)
            setError(error)
            setData([])
        } finally {
            setLoading(false)
        }
    }, [website, lang, page, limit])

    useEffect(() => {
        reload({ isInitial: true })
    }, [reload])

    return {
        data,
        loading,
        error,
        reload,
    }
}