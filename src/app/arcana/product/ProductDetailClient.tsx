"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    ProductOptionGroup,
    ProductVariant,
} from "@/features/products/types/ProductShopById"
import ProductDescriptionLexical from "@/components/arcana/product/ProductDescriptionLexical"
import { API_BASE_URL } from "@/lib/api"
import { getDiscountedPrice } from "@/lib/format-price"
import { useProductById } from "@/features/products/hooks/use-productById"
import { useLanguage } from "@/features/products/hooks/use-language"
import { usePathname, useSearchParams } from "next/navigation"

function toImageUrl(path?: string | null) {
    if (!path) return "/images/placeholder.png"
    if (path.startsWith("http")) return path
    return `${API_BASE_URL}/${path}`
}

function formatPrice(price: number) {
    return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
        maximumFractionDigits: 0,
    }).format(price)
}

const sectionMotion = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}

const listMotion = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.05,
        },
    },
}

const itemMotion = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}
function parseVariantLabel(label?: string | null) {
    const result: Record<string, string> = {}
    if (!label) return result

    label.split("|").forEach((part) => {
        const [rawKey, ...rawValue] = part.split(":")
        const key = rawKey?.trim()
        const value = rawValue.join(":").trim()

        if (key && value) {
            result[key] = value
        }
    })

    return result
}



export default function ProductDetailClient() {

    const searchParams = useSearchParams();
    const pathname = usePathname()

    const { lang } = useLanguage()

    const productId = useMemo(() => {
        const queryId = searchParams.get("id")
        if (queryId && !Number.isNaN(Number(queryId))) {
            return Number(queryId)
        }

        const segments = pathname.split("/").filter(Boolean)
        const lastSegment = segments[segments.length - 1]

        if (lastSegment && !Number.isNaN(Number(lastSegment))) {
            return Number(lastSegment)
        }

        return undefined
    }, [searchParams, pathname])

    const { data } = useProductById(Number(productId), lang)

    const [selectedImage, setSelectedImage] = useState("")
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

    useEffect(() => {
        if (!data) return

        // const defaultVariant =
        //     data.variants.find((v) => v.is_default === 1) || data.variants[0] || null
        const defaultVariant =
            data.variants.find((v) => v.is_default === 1 && Number(v.available_qty) > 0) ||
            data.variants.find((v) => Number(v.available_qty) > 0) ||
            data.variants.find((v) => v.is_default === 1) ||
            data.variants[0] ||
            null
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedVariant(defaultVariant)
        setSelectedOptions(parseVariantLabel(defaultVariant?.variant_label))
        setSelectedImage(
            defaultVariant?.image_url ||
            data.images[0]?.ip_image_url ||
            data.product.thumbnail ||
            ""
        )
        setQuantity(1)
    }, [data])

    useEffect(() => {
        if (!selectedVariant) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setQuantity(1)
            return
        }

        const stock = Number(selectedVariant.available_qty || 0)

        if (stock <= 0) {
            setQuantity(1)
            return
        }

        if (quantity > stock) {
            setQuantity(stock)
        }
    }, [selectedVariant, quantity])

    const displayPrice = useMemo(() => {
        if (!data) return ""

        if (selectedVariant) {
            const originalPrice = Number(selectedVariant.pv_price || 0)
            const discountPercent = Number(selectedVariant.discount || 0)
            const finalPrice = getDiscountedPrice(originalPrice, discountPercent)

            if (discountPercent > 0) {
                return `${formatPrice(finalPrice)}`
            }

            return formatPrice(originalPrice)
        }

        const { min_price, max_price, has_price_range } = data.product

        return has_price_range
            ? `${formatPrice(min_price)} - ${formatPrice(max_price)}`
            : formatPrice(min_price)
    }, [data, selectedVariant])

    if (!data) {
        return <div className="py-20 text-center text-slate-500">Loading...</div>
    }
    const { product, images, variants, options, InventoryStore, landingPage } = data



    const handleVariantSelect = (variant: ProductVariant) => {
        setSelectedVariant(variant)
        setSelectedOptions(parseVariantLabel(variant.variant_label))
        setQuantity(1)

        if (variant.image_url) {
            setSelectedImage(variant.image_url)
        }
    }

    function findMatchingVariant(
        variants: ProductVariant[],
        nextOptions: Record<string, string>
    ) {
        return variants.find((variant) => {
            const parsed = parseVariantLabel(variant.variant_label)

            return Object.entries(nextOptions).every(([key, value]) => {
                return parsed[key] === value
            })
        })
    }

    const increaseQuantity = () => {
        if (!selectedVariant) return
        const stock = Number(selectedVariant.available_qty || 0)
        setQuantity((prev) => Math.min(prev + 1, stock || 1))
    }

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(prev - 1, 1))
    }

    const handleQuantityChange = (value: string) => {
        const numericValue = Number(value)

        if (Number.isNaN(numericValue)) {
            setQuantity(1)
            return
        }

        if (!selectedVariant) {
            setQuantity(Math.max(1, numericValue))
            return
        }

        const stock = Number(selectedVariant.available_qty || 0)

        if (stock <= 0) {
            setQuantity(1)
            return
        }

        setQuantity(Math.min(Math.max(1, numericValue), stock))
    }
    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(96,165,250,0.12),transparent_24%),linear-gradient(to_bottom,#eef7ff,#ffffff,#edf4ff)] px-4 py-8 md:px-6 lg:px-8">
            <motion.div
                className="mx-auto max-w-6xl space-y-8"
                initial="hidden"
                animate="show"
                variants={listMotion}
            >
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    {/* Left */}
                    <motion.section variants={sectionMotion} className="space-y-4">
                        <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                            <div className="relative aspect-square w-full overflow-hidden bg-white">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.28 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={toImageUrl(selectedImage)}
                                            alt={product.title}
                                            fill
                                            priority
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <motion.div
                            variants={listMotion}
                            className="grid grid-cols-4 gap-3 sm:grid-cols-5"
                        >
                            {images.map((img) => {
                                const isActive = selectedImage === img.ip_image_url

                                return (
                                    <motion.button
                                        key={`img-${img.ip_id}`}
                                        variants={itemMotion}
                                        type="button"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedImage(img.ip_image_url)}
                                        className={`relative aspect-square overflow-hidden rounded-2xl border bg-white shadow-sm transition ${isActive
                                            ? "border-sky-500 ring-2 ring-sky-200"
                                            : "border-slate-200 hover:border-sky-300"
                                            }`}
                                    >
                                        <Image
                                            src={toImageUrl(img.ip_image_url)}
                                            alt={product.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.button>
                                )
                            })}

                            {variants
                                .filter((v) => v.image_url)
                                .map((variant) => {
                                    const isActive = selectedImage === variant.image_url

                                    return (
                                        <motion.button
                                            key={`variant-${variant.pv_id}`}
                                            variants={itemMotion}
                                            type="button"
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleVariantSelect(variant)}
                                            className={`relative aspect-square overflow-hidden rounded-2xl border bg-white shadow-sm transition ${isActive
                                                ? "border-sky-500 ring-2 ring-sky-200"
                                                : "border-slate-200 hover:border-sky-300"
                                                }`}
                                        >
                                            <Image
                                                src={toImageUrl(variant.image_url)}
                                                alt={variant.variant_label as string}
                                                fill
                                                className="object-cover"
                                            />
                                        </motion.button>
                                    )
                                })}
                        </motion.div>
                    </motion.section>

                    {/* Right */}
                    <motion.section
                        variants={sectionMotion}
                        className="rounded-2xl border border-white/70 bg-white/88 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-8"
                    >
                        <div className="space-y-5">
                            <div className="border-b border-slate-200 pb-5">
                                <p className="text-sm font-medium tracking-wide text-sky-700">
                                    {product.b_name} • {product.ctl_name}
                                </p>
                                <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
                                    {product.title}
                                </h1>
                            </div>


                            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4">
                                <p className="text-sm text-slate-500">ราคา</p>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`${selectedVariant?.pv_id || "default"}-${selectedVariant?.discount || 0}-${selectedVariant?.pv_price || 0}`}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2 }}
                                        className="mt-1"
                                    >
                                        {selectedVariant && Number(selectedVariant.discount || 0) > 0 ? (
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm text-slate-400 line-through">
                                                    {formatPrice(Number(selectedVariant.pv_price || 0))}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-2xl font-bold text-sky-700">
                                                        {formatPrice(
                                                            getDiscountedPrice(
                                                                Number(selectedVariant.pv_price || 0),
                                                                Number(selectedVariant.discount || 0)
                                                            )
                                                        )}
                                                    </p>
                                                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-600">
                                                        -{Number(selectedVariant.discount || 0)}%
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-2xl font-bold text-slate-900">
                                                {displayPrice}
                                            </p>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            {selectedVariant && (
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <p className="text-sm font-medium text-slate-800">ตัวเลือกที่เลือก</p>
                                    <p className="mt-1 text-slate-600">{selectedVariant.variant_label}</p>

                                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-600">
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <span className="block text-xs text-slate-400">SKU</span>
                                            {selectedVariant.pv_sku}
                                        </div>

                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <span className="block text-xs text-slate-400">คงเหลือ</span>
                                            {selectedVariant.available_qty} {selectedVariant.unit_name}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {options.map((option: ProductOptionGroup) => (
                                <div key={option.potn_id} className="space-y-3">
                                    <h2 className="text-sm font-semibold text-slate-800">
                                        {option.otype_name}
                                    </h2>

                                    <div className="flex flex-wrap gap-2">
                                        {option.items.map((item) => {
                                            const isSelected =
                                                selectedOptions[option.otype_name] === item.poi_value

                                            return (
                                                <button
                                                    key={item.poi_id}
                                                    type="button"
                                                    onClick={() => {
                                                        const nextOptions = {
                                                            ...selectedOptions,
                                                            [option.otype_name]: item.poi_value,
                                                        }

                                                        const matchedVariant = findMatchingVariant(
                                                            variants,
                                                            nextOptions
                                                        )

                                                        setSelectedOptions(nextOptions)

                                                        if (matchedVariant) {
                                                            handleVariantSelect(matchedVariant)
                                                        }
                                                    }}
                                                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isSelected
                                                        ? "border-sky-600 bg-sky-600 text-white"
                                                        : "border-slate-300 bg-white text-slate-700 hover:border-sky-400 hover:text-sky-700"
                                                        }`}
                                                >
                                                    {item.poi_value}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-3">
                                <h2 className="text-sm font-semibold text-slate-800">จำนวน</h2>

                                <div className="flex items-center gap-3">
                                    <div className="inline-flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                        <button
                                            type="button"
                                            onClick={decreaseQuantity}
                                            disabled={quantity <= 1}
                                            className="flex h-12 w-12 items-center justify-center text-lg font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            -
                                        </button>

                                        <input
                                            type="number"
                                            min={1}
                                            max={selectedVariant?.available_qty || 1}
                                            value={quantity}
                                            onChange={(e) => handleQuantityChange(e.target.value)}
                                            className="h-12 w-20 border-x border-slate-200 text-center text-sm font-semibold text-slate-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />

                                        <button
                                            type="button"
                                            onClick={increaseQuantity}
                                            disabled={
                                                !selectedVariant ||
                                                quantity >= Number(selectedVariant.available_qty || 0)
                                            }
                                            className="flex h-12 w-12 items-center justify-center text-lg font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className="text-sm text-slate-500">
                                        {selectedVariant
                                            ? `มีสินค้า ${selectedVariant.available_qty} ${selectedVariant.unit_name}`
                                            : "กรุณาเลือกตัวเลือกสินค้า"}
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-3 pt-2 sm:grid-cols-2">
                                <button
                                    type="button"
                                    disabled={!selectedVariant || Number(selectedVariant.available_qty || 0) <= 0}
                                    onClick={() => {
                                        if (!selectedVariant) return

                                        console.log({
                                            pv_id: selectedVariant.pv_id,
                                            quantity,
                                        })
                                    }}
                                    className="rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    เพิ่มลงตะกร้า
                                </button>

                                <button className="rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-sky-400 hover:text-sky-700">
                                    สอบถามสินค้า
                                </button>
                            </div>

                            <div className="grid gap-3 pt-2 text-sm text-slate-600 sm:grid-cols-2">
                                <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                                    <p className="font-medium text-slate-900">น้ำหนัก</p>
                                    <p className="mt-1">{selectedVariant?.weight_g || "-"} g</p>
                                </div>

                                <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                                    <p className="font-medium text-slate-900">ขนาด</p>
                                    <p className="mt-1">
                                        {selectedVariant?.length_cm || "-"} ×{" "}
                                        {selectedVariant?.width_cm || "-"} ×{" "}
                                        {selectedVariant?.height_cm || "-"} cm
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </div>

                {/* Product Info */}
                {/* ------------------------------------ */}
                <motion.section
                    variants={sectionMotion}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="rounded-2xl border border-white/70 bg-white/88 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-8"
                >
                    <div className="mx-auto max-w-5xl">
                        {/* Section Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55 }}
                            className="border-b border-slate-200/80 pb-5"
                        >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700/90">
                                Product Information
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                                ข้อมูลสินค้า
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                ภาพรวมของสินค้า ร้านค้า แบรนด์ หมวดหมู่ สถานะสินค้า และข้อมูลที่เกี่ยวข้อง
                            </p>
                        </motion.div>

                        <div className="mt-6 space-y-5">
                            {/* STORE CARD */}
                            {/* <motion.div
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: 0.05 }}
                            >
                                <Link href={`/arcana/store/${product.st_id}`} className="block group">
                                    <div
                                        className="
                                                    relative overflow-hidden rounded-2xl
                                                    border border-sky-100/80
                                                    bg-linear-to-br from-sky-50 via-white to-blue-50
                                                    p-5 shadow-[0_18px_60px_rgba(14,165,233,0.08)]
                                                    transition-all duration-300
                                                    group-hover:-translate-y-1
                                                    group-hover:shadow-[0_24px_70px_rgba(14,165,233,0.14)]
                                                    md:p-6
                                                "
                                    >
                                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_35%)]" />

                                        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-18 w-18 overflow-hidden rounded-2xl border border-white bg-white shadow-sm md:h-20 md:w-20">
                                                    {product.st_image ? (
                                                        <Image
                                                            src={`${API_BASE_URL}/${product.st_image}`}
                                                            alt={product.st_company_name}
                                                            fill
                                                            className="object-cover transition duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xs text-slate-400">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                                                        Store
                                                    </p>
                                                    <h3 className="mt-1 text-lg font-semibold text-slate-900 md:text-xl">
                                                        {product.st_company_name || "-"}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-slate-500">
                                                        คลิกเพื่อเข้าสู่หน้าร้านค้า
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition duration-300 group-hover:border-sky-200 group-hover:text-sky-700">
                                                ไปที่ร้านค้า
                                                <span className="ml-2 transition duration-300 group-hover:translate-x-0.5">
                                                    ↗
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div> */}

                            {/* SUPPORTING CARDS */}
                            <div className="grid gap-4 lg:grid-cols-2">
                                {/* Landing Page */}
                                <motion.div
                                    initial={{ opacity: 0, y: 22 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.08 }}
                                    whileHover={{ y: -4 }}
                                    className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur"
                                >
                                    <div className="mb-4">
                                        <p className="text-sm font-semibold text-slate-900">
                                            Landing Page
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            หน้าที่เกี่ยวข้องกับสินค้านี้
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {landingPage?.length > 0 ? (
                                            landingPage.map((lp, index) => (
                                                <motion.div
                                                    key={lp.lp_id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.3, delay: 0.05 * index }}
                                                >
                                                    <Link
                                                        href={`/arcana/lp?slug=${lp.lp_slug}`}
                                                        className="group inline-flex"
                                                    >
                                                        <span
                                                            className="
                                                            inline-flex items-center gap-2 rounded-full
                                                            border border-emerald-100 bg-emerald-50
                                                            px-3 py-1.5 text-xs font-medium text-emerald-700
                                                            transition-all duration-200
                                                            hover:-translate-y-0.5
                                                            hover:border-emerald-200
                                                            hover:bg-emerald-100
                                                            hover:shadow-[0_8px_20px_rgba(16,185,129,0.12)]
                                                        "
                                                        >
                                                            <span className="line-clamp-1">{lp.lp_title}</span>
                                                            <span className="text-[10px] opacity-60 transition-transform duration-200 group-hover:translate-x-0.5">
                                                                ↗
                                                            </span>
                                                        </span>
                                                    </Link>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <span className="text-sm text-slate-400">
                                                ไม่มี Landing Page
                                            </span>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Tags */}
                                <motion.div
                                    initial={{ opacity: 0, y: 22 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.11 }}
                                    whileHover={{ y: -4 }}
                                    className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur"
                                >
                                    <div className="mb-4">
                                        <p className="text-sm font-semibold text-slate-900">
                                            แท็กสินค้า
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            คีย์เวิร์ดและหมวดการจัดกลุ่มสินค้า
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {product.tags?.length > 0 ? (
                                            product.tags.map((tag, index) => (
                                                <motion.span
                                                    key={tag.ptag_id}
                                                    initial={{ opacity: 0, scale: 0.94 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.28, delay: 0.04 * index }}
                                                    whileHover={{ y: -2, scale: 1.03 }}
                                                    className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 shadow-sm"
                                                >
                                                    {tag.ptag_name}
                                                </motion.span>
                                            ))
                                        ) : (
                                            <span className="text-sm text-slate-400">
                                                ไม่มีแท็กสินค้า
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* META LIST CARD */}
                            <motion.div
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: 0.14 }}
                                whileHover={{ y: -3 }}
                                className="rounded-2xl border border-slate-200/80 bg-white/92 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
                            >
                                <div className="mb-4">
                                    <p className="text-sm font-semibold text-slate-900">
                                        รายละเอียดเพิ่มเติม
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        ข้อมูลเชิงโครงสร้างของสินค้า
                                    </p>
                                </div>

                                <ul className="divide-y divide-slate-100">
                                    <motion.li
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35 }}
                                        className="flex items-center justify-between gap-4 py-3"
                                    >
                                        <span className="text-sm text-slate-500">แบรนด์</span>
                                        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                            {product.b_name || "-"}
                                        </span>
                                    </motion.li>

                                    <motion.li
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35, delay: 0.03 }}
                                        className="flex items-center justify-between gap-4 py-3"
                                    >
                                        <span className="text-sm text-slate-500">หมวดหมู่</span>
                                        <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                                            {product.cl_name || "-"}
                                        </span>
                                    </motion.li>

                                    <motion.li
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35, delay: 0.06 }}
                                        className="flex items-center justify-between gap-4 py-3"
                                    >
                                        <span className="text-sm text-slate-500">สถานะสินค้า</span>
                                        <span
                                            className={
                                                product.ps_name === "In Stock"
                                                    ? "rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                                                    : "rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700"
                                            }
                                        >
                                            {product.ps_name || "-"}
                                        </span>
                                    </motion.li>

                                    <motion.li
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35, delay: 0.09 }}
                                        className="flex items-start justify-between gap-4 py-3"
                                    >
                                        <span className="pt-1 text-sm text-slate-500">คลังสินค้า</span>
                                        <div className="flex max-w-[70%] flex-wrap justify-end gap-2">
                                            {InventoryStore?.length > 0 ? (
                                                InventoryStore.map((store, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
                                                    >
                                                        {store.InventoryStoreProvince}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-sm text-slate-400">
                                                    ไม่มีข้อมูลคลังสินค้า
                                                </span>
                                            )}
                                        </div>
                                    </motion.li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
                {/* ---------------------------------- */}

                {/* Product Details */}
                <motion.section
                    variants={sectionMotion}
                    className="mb-30 rounded-2xl border border-white/70 bg-white/88 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-8"
                >
                    <div className="mx-auto max-w-4xl space-y-5">
                        <div className="border-b border-slate-200 pb-4">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">
                                Product Details
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
                                รายละเอียดสินค้า
                            </h2>
                        </div>

                        <div className="relative">
                            <div
                                className={`prose prose-slate max-w-none overflow-hidden prose-headings:text-slate-900 prose-p:text-slate-700 ${isDescriptionExpanded ? "" : "max-h-55"
                                    }`}
                            >
                                <ProductDescriptionLexical value={product.p_description} />
                            </div>

                            {!isDescriptionExpanded && (
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-white via-white/90 to-transparent" />
                            )}
                        </div>

                        <div className="flex justify-center pt-2">
                            <button
                                type="button"
                                onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-400 hover:text-sky-700"
                            >
                                {isDescriptionExpanded ? "ซ่อนรายละเอียด" : "ดูเพิ่มเติม"}
                            </button>
                        </div>
                    </div>
                </motion.section>
            </motion.div>
        </main>
    )
}