
"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, Variants } from "framer-motion"
import ArcanaProductCard from "@/components/arcana/product/ArcanaProductCard"
import ProductSearchForm from "@/components/arcana/product/ProductSearchForm"
import { PRODUCT_TAGS } from "@/lib/tags"
import type { Product } from "@/features/products/types/product"
import { DEFAULT_LANGUAGE, Language, LANGUAGE_COOKIE } from "@/lib/i18n"
import { getCookie, getInitialLanguage } from "@/lib/cookies"
import { getProducts } from "@/features/products/api/get-products"

type ViewAllSortType =
    | "all"
    | "new"
    | "popular"
    | "featured"
    | "price-low"
    | "price-high"

function getSortTitle(sort?: string) {
    switch (sort) {
        case "new":
            return "สินค้ามาใหม่"
        case "popular":
            return "สินค้าขายดี"
        case "featured":
            return "สินค้าแนะนำ"
        case "price-low":
            return "เรียงราคาจากน้อยไปมาก"
        case "price-high":
            return "เรียงราคาจากมากไปน้อย"
        default:
            return "สินค้าทั้งหมด"
    }
}

function createPageHref(page: number, sort: string, keyword: string) {
    const params = new URLSearchParams()

    if (sort && sort !== "all") {
        params.set("sort", sort)
    }

    if (keyword.trim()) {
        params.set("keyword", keyword.trim())
    }

    params.set("page", String(page))

    return `/arcana/view-all?${params.toString()}`
}

function createSortHref(sort: string, keyword: string) {
    const params = new URLSearchParams()

    if (sort && sort !== "all") {
        params.set("sort", sort)
    }

    if (keyword.trim()) {
        params.set("keyword", keyword.trim())
    }

    params.set("page", "1")

    return `/arcana/view-all?${params.toString()}`
}

const gridVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
}

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 28,
        filter: "blur(8px)",
        scale: 0.97,
    },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

export default function ViewAllClient() {
    const searchParams = useSearchParams()

    const sort = (searchParams.get("sort") ?? "all") as ViewAllSortType
    const keyword = searchParams.get("keyword") ?? ""
    const page = Number(searchParams.get("page") ?? "1")
    const pageSize = 12

    const [lang, setLang] = useState<Language>(getInitialLanguage)
    const [products, setData] = useState<Product[]>([])

    useEffect(() => {
        const cookieLang = getCookie(LANGUAGE_COOKIE) || DEFAULT_LANGUAGE
        if (cookieLang !== lang) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLang(cookieLang as Language)
        }
    }, [lang])

    useEffect(() => {
        let cancelled = false

        async function loadProducts() {
            const result = await getProducts({
                website: "arcana",
                lang,
                page: 1,
                limit: 9999,
            })

            if (!cancelled) {
                setData(result.items)
            }
        }

        loadProducts()

        return () => {
            cancelled = true
        }
    }, [lang])


    const filteredProducts = useMemo(() => {
        let nextProducts = [...products]

        if (keyword.trim()) {
            const q = keyword.trim().toLowerCase()

            nextProducts = nextProducts.filter((product) => {
                return (
                    product.name.toLowerCase().includes(q) ||
                    product.title.toLowerCase().includes(q) ||
                    product.brandName.toLowerCase().includes(q) ||
                    product.catalogName.toLowerCase().includes(q) ||
                    product.tags.some((tag) =>
                        tag.ptag_name.toLowerCase().includes(q)
                    )
                )
            })
        }

        switch (sort) {
            case "new":
                nextProducts = nextProducts.filter((product) =>
                    product.tags.some((tag) => tag.ptag_id === PRODUCT_TAGS.NEW)
                )
                break

            case "popular":
                nextProducts = nextProducts.filter((product) =>
                    product.tags.some((tag) => tag.ptag_id === PRODUCT_TAGS.BEST_SELLER)
                )
                break

            case "featured":
                nextProducts = nextProducts.filter((product) =>
                    product.tags.some((tag) => tag.ptag_id === PRODUCT_TAGS.FEATURED)
                )
                break

            case "price-low":
                nextProducts = nextProducts.sort((a, b) => a.price - b.price)
                break

            case "price-high":
                nextProducts = nextProducts.sort((a, b) => b.price - a.price)
                break
        }

        return nextProducts
    }, [products, keyword, sort])

    const totalItems = filteredProducts.length
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    const currentPage = Math.min(Math.max(1, page), totalPages)

    const startIndex = (currentPage - 1) * pageSize
    const visibleProducts = filteredProducts.slice(startIndex, startIndex + pageSize)

    const title = getSortTitle(sort)

    return (
        <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-sky-100 pb-16">
            <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
                <div className="mb-8 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">
                                Arcana Collection
                            </p>
                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                                {title}
                            </h1>
                            <p className="mt-3 text-sm text-slate-600 md:text-base">
                                พบสินค้า {totalItems} รายการ
                                {keyword ? ` สำหรับ "${keyword}"` : ""}
                            </p>
                        </div>

                        <div className="w-full md:max-w-md">
                            <ProductSearchForm />
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link href={createSortHref("all", keyword)} className={`rounded-xl px-4 py-2 text-sm transition ${sort === "all" ? "bg-sky-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"}`}>
                            ทั้งหมด
                        </Link>
                        <Link href={createSortHref("new", keyword)} className={`rounded-xl px-4 py-2 text-sm transition ${sort === "new" ? "bg-sky-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"}`}>
                            สินค้าใหม่
                        </Link>
                        <Link href={createSortHref("popular", keyword)} className={`rounded-xl px-4 py-2 text-sm transition ${sort === "popular" ? "bg-sky-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"}`}>
                            ขายดี
                        </Link>
                        <Link href={createSortHref("featured", keyword)} className={`rounded-xl px-4 py-2 text-sm transition ${sort === "featured" ? "bg-sky-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"}`}>
                            แนะนำ
                        </Link>
                        <Link href={createSortHref("price-low", keyword)} className={`rounded-xl px-4 py-2 text-sm transition ${sort === "price-low" ? "bg-sky-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"}`}>
                            ราคาน้อยไปมาก
                        </Link>
                        <Link href={createSortHref("price-high", keyword)} className={`rounded-xl px-4 py-2 text-sm transition ${sort === "price-high" ? "bg-sky-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"}`}>
                            ราคามากไปน้อย
                        </Link>
                    </div>
                </div>

                {visibleProducts.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center text-slate-500">
                        ไม่พบสินค้าที่ต้องการ
                    </div>
                ) : (
                    <motion.div
                        variants={gridVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {visibleProducts.map((product) => (
                            <motion.div key={product.id} variants={cardVariants} className="will-change-transform">
                                <ArcanaProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {totalPages > 1 && (
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                        <Link
                            href={createPageHref(Math.max(1, currentPage - 1), sort, keyword)}
                            className={`rounded-xl border px-4 py-2 text-sm transition ${currentPage === 1 ? "pointer-events-none border-slate-200 bg-slate-100 text-slate-400" : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"}`}
                        >
                            ก่อนหน้า
                        </Link>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                            const isActive = pageNumber === currentPage

                            return (
                                <Link
                                    key={pageNumber}
                                    href={createPageHref(pageNumber, sort, keyword)}
                                    className={`rounded-xl px-4 py-2 text-sm transition ${isActive ? "bg-sky-600 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"}`}
                                >
                                    {pageNumber}
                                </Link>
                            )
                        })}

                        <Link
                            href={createPageHref(Math.min(totalPages, currentPage + 1), sort, keyword)}
                            className={`rounded-xl border px-4 py-2 text-sm transition ${currentPage === totalPages ? "pointer-events-none border-slate-200 bg-slate-100 text-slate-400" : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"}`}
                        >
                            ถัดไป
                        </Link>
                    </div>
                )}
            </section>
        </main>
    )
}
