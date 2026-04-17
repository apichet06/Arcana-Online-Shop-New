"use client"

import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

type Props = {
    className?: string
    placeholder?: string
    basePath?: string
}

export default function ProductSearchForm({
    className = "",
    placeholder = "ค้นหาสินค้า...",
    basePath = "/arcana/view-all",
}: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "")

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const params = new URLSearchParams(searchParams.toString())

        if (keyword.trim()) {
            params.set("keyword", keyword.trim())
        } else {
            params.delete("keyword")
        }

        params.set("page", "1")

        router.push(`${basePath}?${params.toString()}`)
    }

    return (
        <form onSubmit={onSubmit} className={className}>
            <div className="relative">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={placeholder}
                    className="h-11 w-full rounded-full border border-slate-200 bg-white/80 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
                <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
            </div>
        </form>
    )
}