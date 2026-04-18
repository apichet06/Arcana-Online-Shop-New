"use client"

import Image from "next/image"
import { Mail, Phone, ShieldCheck } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { useStoreShopById } from "@/features/products/hooks/use-storeShopById"
import { API_BASE_URL } from "@/lib/api_base"
import { useLanguage } from "@/features/products/hooks/use-language"
import ArcanaProductCard from "@/components/arcana/product/ArcanaProductCard"
import useProduct from "@/features/products/hooks/use-product"
import { useCategories } from "@/features/products/hooks/use-categories"
import { Product } from "@/features/products/types/product"

type Props = {
    st_id: string
}

type Category = {
    c_id: number
    cl_name: string
    ctl_name?: string
    ctl_description?: string
    c_sort_order?: number
}

type CategoryGroup = {
    c_id: number
    cl_name: string
    ctl_name?: string
    ctl_description?: string
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
                c_sort_order: item.c_sort_order ?? 0,
            })
        }
    }

    return Array.from(map.values()).sort(
        (a, b) => a.c_sort_order - b.c_sort_order
    )
}

export default function StoreDetailCient({ st_id }: Props) {
    const { data, loading } = useStoreShopById(Number(st_id))
    const { lang } = useLanguage()
    const { data: categories } = useCategories(lang)
    const { data: products = [] } = useProduct({
        website: "arcana",
        lang,
        limit: 9999,
    })

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | "all">("all")

    const storeProducts = useMemo(() => {
        return (products as Product[]).filter(
            (item) => Number(item.st_id) === Number(st_id)
        )
    }, [products, st_id])

    const groupedCategories = useMemo(() => {
        return groupCategories((categories ?? []) as Category[])
    }, [categories])

    const visibleCategories = useMemo(() => {
        const categoryIdsInStore = new Set(
            storeProducts
                .map((item) => Number(item.categoryId ?? item.categoryId ?? 0))
                .filter((id) => id > 0)
        )

        return groupedCategories.filter((category) =>
            categoryIdsInStore.has(Number(category.c_id))
        )
    }, [groupedCategories, storeProducts])

    useEffect(() => {
        if (selectedCategoryId === "all") return

        const exists = visibleCategories.some(
            (category) => Number(category.c_id) === Number(selectedCategoryId)
        )

        if (!exists) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedCategoryId("all")
        }
    }, [selectedCategoryId, visibleCategories])

    const filteredProducts = useMemo(() => {
        let nextProducts = [...storeProducts]

        if (selectedCategoryId !== "all") {
            nextProducts = nextProducts.filter((product) => {
                const productCategoryId = Number(
                    product.categoryId ?? product.categoryId ?? 0
                )

                return productCategoryId === Number(selectedCategoryId)
            })
        }

        return nextProducts
    }, [storeProducts, selectedCategoryId])

    if (loading) {
        return (
            <section className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_45%,#f9fcff_100%)] px-4 py-6 md:px-8 md:py-10">
                <div className="mx-auto max-w-6xl animate-pulse space-y-4">
                    <div className="h-62.5 rounded-2xl bg-slate-200/80" />
                    <div className="h-30 rounded-2xl bg-slate-200/80" />
                </div>
            </section>
        )
    }

    if (!data) {
        return (
            <section className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_45%,#f9fcff_100%)] px-4">
                <div className="rounded-2xl border border-white/70 bg-white/80 px-6 py-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl">
                    <p className="text-sm font-semibold text-slate-700">
                        ไม่พบข้อมูลร้านค้า
                    </p>
                </div>
            </section>
        )
    }

    const isApproved = Number(data.st_isAccept) === 1

    return (
        <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_45%,#f9fcff_100%)]">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-25 -top-20 h-65 w-65 rounded-full bg-sky-200/35 blur-3xl" />
                <div className="absolute -right-20 top-27.5 h-55 w-55 rounded-full bg-cyan-200/30 blur-3xl" />
                <div className="absolute -bottom-22.5 left-[22%] h-55 w-55 rounded-full bg-blue-200/20 blur-3xl" />
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
            </div>

            <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
                <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-[linear-gradient(135deg,rgba(15,23,42,0.97),rgba(3,105,161,0.92),rgba(8,145,178,0.88))] shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(186,230,253,0.16),transparent_35%)]" />

                    <div className="relative grid gap-6 px-5 py-6 md:px-8 md:py-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
                        <div className="flex justify-center lg:justify-start">
                            <div className="relative">
                                <div className="absolute inset-0 scale-110 rounded-full bg-cyan-300/20 blur-3xl" />
                                <div className="relative h-36 w-36 overflow-hidden rounded-full border border-white/25 bg-white/10 p-2 backdrop-blur-xl shadow-[0_16px_50px_rgba(255,255,255,0.10)] md:h-40 md:w-40">
                                    <div className="relative h-full w-full overflow-hidden rounded-full">
                                        <Image
                                            src={`${API_BASE_URL}/${data.st_image}`}
                                            alt={data.st_company_name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center text-white lg:text-left">
                            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-100 backdrop-blur-xl">
                                Official Store
                            </div>

                            <h1 className="mt-3 text-2xl font-bold leading-tight md:text-4xl">
                                {data.st_company_name}
                            </h1>

                            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                                <div
                                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${isApproved
                                        ? "bg-emerald-400/15 text-emerald-100 ring-1 ring-emerald-300/20"
                                        : "bg-amber-400/15 text-amber-100 ring-1 ring-amber-300/20"
                                        }`}
                                >
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    {isApproved ? "Approved Store" : "Pending Review"}
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
                                {data.st_phone && (
                                    <a
                                        href={`tel:${data.st_phone}`}
                                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-sky-800 shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition hover:-translate-y-0.5"
                                    >
                                        <Phone className="h-4 w-4" />
                                        โทรหาร้าน
                                    </a>
                                )}

                                {data.st_email && (
                                    <a
                                        href={`mailto:${data.st_email}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/15"
                                    >
                                        <Mail className="h-4 w-4" />
                                        ส่งอีเมล
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.82))] shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-2xl">
                    <div className="grid lg:grid-cols-2">
                        <DetailBlock
                            title="Store Details"
                            rows={[
                                { label: "Company", value: data.st_company_name },
                                {
                                    label: "Status",
                                    value: isApproved ? "Approved Store" : "Pending Review",
                                    isStatus: true,
                                },
                            ]}
                            rightBorder
                        />

                        <DetailBlock
                            title="Contact"
                            rows={[
                                { label: "Phone", value: data.st_phone || "-" },
                                { label: "Email", value: data.st_email || "-" },
                            ]}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    {storeProducts.length > 0 && (
                        <section className="py-10">
                            <div className="mx-auto max-w-7xl px-4">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        สินค้าประจำร้าน
                                    </h2>

                                    <span className="rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700">
                                        {filteredProducts.length} รายการ
                                    </span>
                                </div>

                                {visibleCategories.length > 0 && (
                                    <div className="mb-6 flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedCategoryId("all")}
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedCategoryId === "all"
                                                ? "bg-sky-600 text-white shadow"
                                                : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300"
                                                }`}
                                        >
                                            ทั้งหมด
                                        </button>

                                        {visibleCategories.map((category) => (
                                            <button
                                                key={category.c_id}
                                                type="button"
                                                onClick={() => setSelectedCategoryId(category.c_id)}
                                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedCategoryId === category.c_id
                                                    ? "bg-sky-600 text-white shadow"
                                                    : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300"
                                                    }`}
                                            >
                                                {category.cl_name}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {filteredProducts.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                        {filteredProducts.map((product) => (
                                            <ArcanaProductCard
                                                key={product.id}
                                                product={product}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 px-6 py-10 text-center text-sm font-medium text-slate-500">
                                        ไม่พบสินค้าในหมวดหมู่นี้
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {storeProducts.length === 0 && (
                        <section className="py-10">
                            <div className="mx-auto max-w-7xl px-4">
                                <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 px-6 py-10 text-center text-sm font-medium text-slate-500">
                                    ร้านนี้ยังไม่มีสินค้า
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </section>
    )
}

function DetailBlock({
    title,
    rows,
    rightBorder = false,
}: {
    title: string
    rows: {
        label: string
        value: string
        isStatus?: boolean
    }[]
    rightBorder?: boolean
}) {
    return (
        <div
            className={`${rightBorder ? "border-b border-slate-100 lg:border-b-0 lg:border-r" : ""
                } border-slate-100`}
        >
            <div className="px-5 pb-2 pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {title}
                </p>
            </div>

            <div className="divide-y divide-slate-100">
                {rows.map((row) => (
                    <div
                        key={row.label}
                        className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3 px-5 py-4"
                    >
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            {row.label}
                        </span>

                        <div className="min-w-0">
                            {row.isStatus ? (
                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                                    {row.value}
                                </span>
                            ) : (
                                <p className="truncate text-sm font-semibold text-slate-900">
                                    {row.value}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}