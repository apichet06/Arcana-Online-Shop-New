
import { useCallback, useEffect, useState } from "react"
import { Category } from "../types/category"
import { getCategories } from "../api/get-category"


export function useCategories(lang?: "th" | "en" | "ja") {
    const [data, setData] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    const reload = useCallback(async (options?: { isInitial: boolean }) => {
        try {
            if (options?.isInitial) setLoading(true)
            const res = await getCategories({ lang })
            setData(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [lang])  // เปลี่ยนเมื่อ id เปลี่ยนเท่านั้น

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
