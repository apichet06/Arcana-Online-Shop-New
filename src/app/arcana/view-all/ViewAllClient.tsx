"use client"

import Link from "next/link"
import { Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion, Variants } from "framer-motion"
import ArcanaProductCard from "@/components/arcana/product/ArcanaProductCard"
import ProductSearchForm from "@/components/arcana/product/ProductSearchForm"
import { PRODUCT_TAGS } from "@/lib/tags"
import type { Product } from "@/features/products/types/product"
import type { Category } from "@/features/products/types/category"
import { useCategories } from "@/features/products/hooks/use-categories"
import useProduct from "@/features/products/hooks/use-product"
import { useLanguage } from "@/features/products/hooks/use-language"

type ViewAllSortType =
    | "all"
    | "new"
    | "popular"
    | "featured"
    | "price-low"
    | "price-high"


type CategoryGroup = {
    c_id: number
    cl_name: string
    ctl_name: string
    ctl_description: string
    c_sort_order: number
}

function groupCategories(categories: Category[]): CategoryGroup[] {
    const map = new Map<number, CategoryGroup>()

    for (const item of categories) {
        if (!map.has(item.c_id)) {
            map.set(item.c_id, {
                c_id: item.c_id,
                cl_name: item.cl_name,
                ctl_name: item.ctl_name,
                ctl_description: item.ctl_description,
                c_sort_order: item.c_sort_order,
            })
        }
    }

    return Array.from(map.values()).sort((a, b) => a.c_sort_order - b.c_sort_order)
}

function getSortTitle(sort?: string, activeCategoryName?: string) {
    if (activeCategoryName) {
        switch (sort) {
            case "new":
                return `${activeCategoryName} • สินค้าใหม่`
            case "popular":
                return `${activeCategoryName} • สินค้าขายดี`
            case "featured":
                return `${activeCategoryName} • สินค้าแนะนำ`
            case "price-low":
                return `${activeCategoryName} • เรียงราคาจากน้อยไปมาก`
            case "price-high":
                return `${activeCategoryName} • เรียงราคาจากมากไปน้อย`
            default:
                return activeCategoryName
        }
    }

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

function createPageHref(
    page: number,
    sort: string,
    keyword: string,
    category: string
) {
    const params = new URLSearchParams()

    if (sort && sort !== "all") {
        params.set("sort", sort)
    }

    if (keyword.trim()) {
        params.set("keyword", keyword.trim())
    }

    if (category.trim()) {
        params.set("category", category.trim())
    }

    params.set("page", String(page))

    return `/arcana/view-all?${params.toString()}`
}

function createSortHref(sort: string, keyword: string, category: string) {
    const params = new URLSearchParams()

    if (sort && sort !== "all") {
        params.set("sort", sort)
    }

    if (keyword.trim()) {
        params.set("keyword", keyword.trim())
    }

    if (category.trim()) {
        params.set("category", category.trim())
    }

    params.set("page", "1")

    return `/arcana/view-all?${params.toString()}`
}

function createCategoryHref(category: string, sort: string, keyword: string) {
    const params = new URLSearchParams()

    if (sort && sort !== "all") {
        params.set("sort", sort)
    }

    if (keyword.trim()) {
        params.set("keyword", keyword.trim())
    }

    if (category.trim()) {
        params.set("category", category)
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
    const categoryParam = searchParams.get("category") ?? ""
    const page = Number(searchParams.get("page") ?? "1")
    const pageSize = 12


    const { lang } = useLanguage()
    const { data: categories } = useCategories(lang)
    const { data: products } = useProduct({ website: "arcana", lang, page: 1, limit: 9999 })

    const groupedCategories = useMemo(() => groupCategories(categories), [categories])

    const activeCategory = useMemo(() => {
        const categoryId = Number(categoryParam)
        if (!categoryId) return null
        return groupedCategories.find((item) => item.c_id === categoryId) ?? null
    }, [groupedCategories, categoryParam])


    const filteredProducts = useMemo(() => {
        let nextProducts = [...products]

        if (categoryParam) {
            const targetCategoryId = Number(categoryParam)

            nextProducts = nextProducts.filter((product) => {
                // ปรับตรงนี้ให้ตรงกับชื่อ field จริงของ product ในระบบคุณ
                // รองรับหลายชื่อไว้ก่อน เผื่อ type ยังไม่อัปเดต
                const productCategoryId =
                    Number(
                        (product as Product & {
                            c_id?: number
                            categoryId?: number
                        }).c_id ??
                        (product as Product & {
                            c_id?: number
                            categoryId?: number
                        }).categoryId ??
                        0
                    )

                return productCategoryId === targetCategoryId
            })
        }

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
    }, [products, keyword, sort, categoryParam])

    const totalItems = filteredProducts.length
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    const currentPage = Math.min(Math.max(1, page), totalPages)

    const startIndex = (currentPage - 1) * pageSize
    const visibleProducts = filteredProducts.slice(startIndex, startIndex + pageSize)

    const title = getSortTitle(sort, activeCategory?.cl_name)

    return (
        <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-sky-100 pb-16">
            <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[290px_minmax(0,1fr)]">
                    {/* Sidebar */}
                    <aside className="xl:sticky xl:top-24 xl:self-start">
                        <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                                    Filter
                                </p>
                                <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                                    หมวดหมู่สินค้า
                                </h2>
                                <p className="mt-2 text-sm text-slate-500">
                                    เลือกหมวดหมู่เพื่อค้นหาสินค้าได้สะดวกยิ่งขึ้น
                                </p>
                            </div>

                            <div className="mt-5 space-y-2">
                                <Link
                                    href={createCategoryHref("", sort, keyword)}
                                    className={`block rounded-2xl px-4 py-3 text-sm transition ${!categoryParam
                                        ? "bg-sky-600 text-white shadow-sm"
                                        : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                                        }`}
                                >
                                    ทั้งหมด
                                </Link>

                                {groupedCategories.map((category) => {
                                    const isActive = Number(categoryParam) === category.c_id

                                    return (
                                        <Link
                                            key={category.c_id}
                                            href={createCategoryHref(String(category.c_id), sort, keyword)}
                                            className={`block rounded-2xl px-4 py-3 text-sm transition ${isActive
                                                ? "bg-sky-600 text-white shadow-sm"
                                                : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="truncate">{category.cl_name}</span>
                                                <span
                                                    className={`text-xs ${isActive ? "text-white/80" : "text-slate-400"
                                                        }`}
                                                >
                                                    →
                                                </span>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>

                            <div className="mt-6 border-t border-slate-200 pt-6">
                                <h3 className="text-sm font-semibold text-slate-900">
                                    เรียงลำดับ
                                </h3>

                                <div className="mt-3 flex flex-wrap gap-2 xl:flex-col">
                                    <Link
                                        href={createSortHref("all", keyword, categoryParam)}
                                        className={`rounded-2xl px-4 py-2.5 text-sm transition ${sort === "all"
                                            ? "bg-sky-600 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                                            }`}
                                    >
                                        ทั้งหมด
                                    </Link>
                                    <Link
                                        href={createSortHref("new", keyword, categoryParam)}
                                        className={`rounded-2xl px-4 py-2.5 text-sm transition ${sort === "new"
                                            ? "bg-sky-600 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                                            }`}
                                    >
                                        สินค้าใหม่
                                    </Link>
                                    <Link
                                        href={createSortHref("popular", keyword, categoryParam)}
                                        className={`rounded-2xl px-4 py-2.5 text-sm transition ${sort === "popular"
                                            ? "bg-sky-600 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                                            }`}
                                    >
                                        ขายดี
                                    </Link>
                                    <Link
                                        href={createSortHref("featured", keyword, categoryParam)}
                                        className={`rounded-2xl px-4 py-2.5 text-sm transition ${sort === "featured"
                                            ? "bg-sky-600 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                                            }`}
                                    >
                                        แนะนำ
                                    </Link>
                                    <Link
                                        href={createSortHref("price-low", keyword, categoryParam)}
                                        className={`rounded-2xl px-4 py-2.5 text-sm transition ${sort === "price-low"
                                            ? "bg-sky-600 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                                            }`}
                                    >
                                        ราคาน้อยไปมาก
                                    </Link>
                                    <Link
                                        href={createSortHref("price-high", keyword, categoryParam)}
                                        className={`rounded-2xl px-4 py-2.5 text-sm transition ${sort === "price-high"
                                            ? "bg-sky-600 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                                            }`}
                                    >
                                        ราคามากไปน้อย
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main content */}
                    <div>
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
                                        {activeCategory ? ` ในหมวด "${activeCategory.cl_name}"` : ""}
                                    </p>
                                </div>

                                <div className="w-full md:max-w-md">
                                    <Suspense fallback={
                                        <div className="h-12 rounded-full bg-slate-100 animate-pulse" />
                                    }>
                                        <ProductSearchForm />
                                    </Suspense>

                                </div>
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
                                    <motion.div
                                        key={product.id}
                                        variants={cardVariants}
                                        className="will-change-transform"
                                    >
                                        <ArcanaProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {totalPages > 1 && (
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                                <Link
                                    href={createPageHref(
                                        Math.max(1, currentPage - 1),
                                        sort,
                                        keyword,
                                        categoryParam
                                    )}
                                    className={`rounded-xl border px-4 py-2 text-sm transition ${currentPage === 1
                                        ? "pointer-events-none border-slate-200 bg-slate-100 text-slate-400"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                                        }`}
                                >
                                    ก่อนหน้า
                                </Link>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                                    const isActive = pageNumber === currentPage

                                    return (
                                        <Link
                                            key={pageNumber}
                                            href={createPageHref(pageNumber, sort, keyword, categoryParam)}
                                            className={`rounded-xl px-4 py-2 text-sm transition ${isActive
                                                ? "bg-sky-600 text-white shadow-sm"
                                                : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                                                }`}
                                        >
                                            {pageNumber}
                                        </Link>
                                    )
                                })}

                                <Link
                                    href={createPageHref(
                                        Math.min(totalPages, currentPage + 1),
                                        sort,
                                        keyword,
                                        categoryParam
                                    )}
                                    className={`rounded-xl border px-4 py-2 text-sm transition ${currentPage === totalPages
                                        ? "pointer-events-none border-slate-200 bg-slate-100 text-slate-400"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                                        }`}
                                >
                                    ถัดไป
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )

}