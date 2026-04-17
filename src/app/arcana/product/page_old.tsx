"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { getProductById } from "@/features/products/api/get-product-by-id"
import {
    ProductOptionGroup,
    ProductShopByIdData,
    ProductVariant,
} from "@/features/products/types/ProductShopById"
import ProductDescriptionLexical from "@/components/arcana/product/ProductDescriptionLexical"
import { API_BASE_URL } from "@/lib/api"
import Link from "next/link"

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

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
}

const staggerWrap = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
}

const softReveal = {
    hidden: { opacity: 0, scale: 0.98, y: 18 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
}
function extractVariantOptionValue(label?: string | null) {
    if (!label) return ""
    return label.split(":")[1]?.trim().toLowerCase() || ""
}

export default function ProductDetailPagePId() {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const lang_code = (searchParams.get("lang") || "th") as "th" | "en" | "ja"

    const [data, setData] = useState<ProductShopByIdData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [selectedImage, setSelectedImage] = useState<string>("")
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)



    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true)
                setError(null)

                if (!id || Number.isNaN(Number(id))) {
                    setError("ไม่พบรหัสสินค้า")
                    return
                }

                const result = await getProductById({
                    p_id: Number(id),
                    lang: lang_code,
                })

                setData(result)

                const defaultVariant =
                    result.variants.find((v) => v.is_default === 1) || result.variants[0] || null

                setSelectedVariant(defaultVariant)

                const firstImage =
                    defaultVariant?.image_url ||
                    result.images[0]?.ip_image_url ||
                    result.product.thumbnail ||
                    ""

                setSelectedImage(firstImage)
            } catch (err) {
                console.error(err)
                setError("โหลดข้อมูลสินค้าไม่สำเร็จ")
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id, lang_code])

    const displayPrice = useMemo(() => {
        if (!data) return ""
        if (selectedVariant) return formatPrice(selectedVariant.pv_price)

        const { min_price, max_price, has_price_range } = data.product
        return has_price_range
            ? `${formatPrice(min_price)} - ${formatPrice(max_price)}`
            : formatPrice(min_price)
    }, [data, selectedVariant])

    const handleVariantSelect = (variant: ProductVariant) => {
        setSelectedVariant(variant)
        if (variant.image_url) {
            setSelectedImage(variant.image_url)
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_32%),linear-gradient(to_bottom,#f0f9ff,#ffffff,#eff6ff)] px-4 py-10">
                <div className="mx-auto max-w-7xl animate-pulse">
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="aspect-square rounded-2xl bg-white/70 shadow-sm" />
                        <div className="space-y-4">
                            <div className="h-8 w-40 rounded bg-white/70" />
                            <div className="h-10 w-3/4 rounded bg-white/70" />
                            <div className="h-6 w-32 rounded bg-white/70" />
                            <div className="h-24 w-full rounded bg-white/70" />
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    if (error || !data) {
        return (
            <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),linear-gradient(to_bottom,#f0f9ff,#ffffff,#eff6ff)] px-4 py-10">
                <div className="mx-auto max-w-4xl rounded-2xl border border-red-100 bg-white/90 p-8 text-center shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                    <h1 className="text-xl font-semibold text-slate-900">เกิดข้อผิดพลาด</h1>
                    <p className="mt-3 text-slate-600">{error || "ไม่พบข้อมูลสินค้า"}</p>
                </div>
            </main>
        )
    }

    const { product, images, variants, options, InventoryStore, landingPage } = data

    return (
        <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(96,165,250,0.18),transparent_28%),linear-gradient(to_bottom,#eef8ff,#ffffff,#edf4ff)] px-4 py-8 md:px-6 lg:px-8">
            {/* floating premium background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -left-30 -top-20 h-80 w-[320px] rounded-full bg-sky-300/20 blur-3xl"
                    animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -right-25 top-30 h-70 w-70 rounded-full bg-blue-400/15 blur-3xl"
                    animate={{ x: [0, -35, 0], y: [0, -10, 0], scale: [1, 1.06, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -bottom-20 left-[20%] h-65 w-65 rounded-full bg-cyan-300/15 blur-3xl"
                    animate={{ x: [0, 20, 0], y: [0, -25, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <motion.div
                className="relative mx-auto max-w-6xl space-y-8"
                variants={staggerWrap}
                initial="hidden"
                animate="show"
            >
                {/* Top section */}
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    {/* Left */}
                    <motion.section variants={fadeUp} className="space-y-4">
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl"
                        >
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),transparent_35%,rgba(255,255,255,0.16)_60%,transparent)] opacity-80" />
                            <motion.div
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                style={{
                                    background:
                                        "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.45), transparent 30%), radial-gradient(circle at 70% 80%, rgba(56,189,248,0.16), transparent 35%)",
                                }}
                            />
                            <div className="relative aspect-square w-full overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImage}
                                        initial={{ opacity: 0, scale: 1.04 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={toImageUrl(selectedImage)}
                                            alt={product.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={staggerWrap}
                            className="grid grid-cols-4 gap-3 sm:grid-cols-5"
                        >
                            {images.map((img) => {
                                const isActive = selectedImage === img.ip_image_url

                                return (
                                    <motion.button
                                        variants={softReveal}
                                        key={`img-${img.ip_id}`}
                                        type="button"
                                        whileHover={{ y: -4, scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedImage(img.ip_image_url)}
                                        className={`group relative aspect-square overflow-hidden rounded-2xl border bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition ${isActive
                                            ? "border-sky-500 ring-2 ring-sky-200"
                                            : "border-slate-200 hover:border-sky-300"
                                            }`}
                                    >
                                        <Image
                                            src={toImageUrl(img.ip_image_url)}
                                            alt={product.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/10 via-transparent to-white/20 opacity-70" />
                                    </motion.button>
                                )
                            })}

                            {variants
                                .filter((v) => v.image_url)
                                .map((variant) => {
                                    const isActive = selectedImage === variant.image_url

                                    return (
                                        <motion.button
                                            variants={softReveal}
                                            key={`variant-${variant.pv_id}`}
                                            type="button"
                                            whileHover={{ y: -4, scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleVariantSelect(variant)}
                                            className={`group relative aspect-square overflow-hidden rounded-2xl border bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition ${isActive
                                                ? "border-sky-500 ring-2 ring-sky-200"
                                                : "border-slate-200 hover:border-sky-300"
                                                }`}
                                        >
                                            <Image
                                                src={toImageUrl(variant.image_url)}
                                                alt={variant.variant_label}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/10 via-transparent to-white/20 opacity-70" />
                                        </motion.button>
                                    )
                                })}
                        </motion.div>
                    </motion.section>

                    {/* Right */}
                    <motion.section
                        variants={fadeUp}
                        className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 p-6 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl md:p-8"
                    >
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.62),transparent_34%,rgba(59,130,246,0.05)_70%,transparent)]" />
                        <div className="relative space-y-5">
                            <motion.div
                                variants={staggerWrap}
                                initial="hidden"
                                animate="show"
                                className="space-y-5"
                            >
                                <motion.div variants={fadeUp} className="space-y-2 border-b border-slate-200 pb-5">
                                    <p className="text-sm font-medium tracking-wide text-sky-700">
                                        {product.b_name} • {product.ctl_name}
                                    </p>
                                    <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
                                        {product.title}
                                    </h1>
                                </motion.div>

                                <motion.div
                                    variants={fadeUp}
                                    whileHover={{ y: -2, scale: 1.01 }}
                                    className="rounded-2xl border border-white/70 bg-linear-to-br from-slate-50 via-white to-sky-50 px-4 py-4 shadow-[0_10px_30px_rgba(56,189,248,0.08)]"
                                >
                                    <p className="text-sm text-slate-500">ราคา</p>
                                    <motion.p
                                        key={displayPrice}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35 }}
                                        className="mt-1 text-2xl font-bold text-slate-900"
                                    >
                                        {displayPrice}
                                    </motion.p>
                                </motion.div>

                                {selectedVariant && (
                                    <motion.div
                                        variants={fadeUp}
                                        whileHover={{ y: -2 }}
                                        className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                                    >
                                        <p className="text-sm font-medium text-slate-800">ตัวเลือกที่เลือก</p>
                                        <p className="mt-1 text-slate-600">{selectedVariant.variant_label}</p>

                                        <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-600">
                                            <motion.div
                                                whileHover={{ y: -2 }}
                                                className="rounded-xl bg-slate-50 p-3"
                                            >
                                                <span className="block text-xs text-slate-400">SKU</span>
                                                {selectedVariant.pv_sku}
                                            </motion.div>

                                            <motion.div
                                                whileHover={{ y: -2 }}
                                                className="rounded-xl bg-slate-50 p-3"
                                            >
                                                <span className="block text-xs text-slate-400">คงเหลือ</span>
                                                {selectedVariant.on_hand} {selectedVariant.unit_name}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}

                                {options.map((option: ProductOptionGroup) => (
                                    <motion.div variants={fadeUp} key={option.potn_id} className="space-y-3">
                                        <h2 className="text-sm font-semibold text-slate-800">{option.otype_name}</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {option.items.map((item) => {
                                                const itemValue = item.poi_value.trim().toLowerCase()

                                                const matchedVariant = variants.find(
                                                    (variant) => extractVariantOptionValue(variant.variant_label) === itemValue
                                                )

                                                const isSelected =
                                                    extractVariantOptionValue(selectedVariant?.variant_label) === itemValue

                                                return (
                                                    <motion.button
                                                        key={item.poi_id}
                                                        type="button"
                                                        whileHover={{ y: -2, scale: 1.03 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={() =>
                                                            matchedVariant && handleVariantSelect(matchedVariant)
                                                        }
                                                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isSelected
                                                            ? "border-sky-600 bg-sky-600 text-white shadow-lg shadow-sky-200"
                                                            : "border-slate-300 bg-white text-slate-700 hover:border-sky-400 hover:text-sky-700"
                                                            }`}
                                                    >
                                                        {item.poi_value}
                                                    </motion.button>
                                                )
                                            })}
                                        </div>
                                    </motion.div>
                                ))}

                                <motion.div variants={fadeUp} className="grid gap-3 pt-2 sm:grid-cols-2">
                                    <motion.button
                                        whileHover={{ y: -3, scale: 1.01 }}
                                        whileTap={{ scale: 0.985 }}
                                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-linear-to-r from-sky-500 via-blue-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)] transition"
                                    >
                                        <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.35)_50%,transparent_80%)] bg-size-[200%_100%] animate-[shine_1.8s_linear_infinite]" />
                                        <span className="relative">เพิ่มลงตะกร้า</span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ y: -3, scale: 1.01 }}
                                        whileTap={{ scale: 0.985 }}
                                        className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white/90 px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-[0_10px_25px_rgba(15,23,42,0.05)] transition hover:border-sky-400 hover:text-sky-700"
                                    >
                                        สอบถามสินค้า
                                    </motion.button>
                                </motion.div>

                                <motion.div variants={fadeUp} className="grid gap-3 pt-2 text-sm text-slate-600 sm:grid-cols-2">
                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        className="rounded-3xl border border-sky-100/70 bg-sky-50/80 p-4"
                                    >
                                        <p className="font-medium text-slate-900">น้ำหนัก</p>
                                        <p className="mt-1">{selectedVariant?.weight_g || "-"} g</p>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        className="rounded-3xl border border-sky-100/70 bg-sky-50/80 p-4"
                                    >
                                        <p className="font-medium text-slate-900">ขนาด</p>
                                        <p className="mt-1">
                                            {selectedVariant?.length_cm || "-"} ×{" "}
                                            {selectedVariant?.width_cm || "-"} ×{" "}
                                            {selectedVariant?.height_cm || "-"} cm
                                        </p>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.section>
                </div>

                <motion.section
                    variants={fadeUp}
                    className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl md:p-8"
                >
                    <div className="mx-auto max-w-5xl">
                        <div className="border-b border-slate-200/80 pb-5">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700/90">
                                Product Information
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                                ข้อมูลสินค้า
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                ภาพรวมของสินค้า ร้านค้า แบรนด์ หมวดหมู่ สถานะ และคลังสินค้าที่เกี่ยวข้อง
                            </p>
                        </div>

                        <div className="mt-6 space-y-4">
                            <Link href={`/store/${product.st_id}`} className="block">
                                <motion.div
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    transition={{ duration: 0.28 }}
                                    className="group rounded-[1.75rem] border border-sky-100 bg-linear-to-br from-sky-50 via-white to-blue-50 p-5 shadow-[0_18px_40px_rgba(14,165,233,0.08)]"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white bg-white shadow-sm">
                                                {product.st_image ? (
                                                    <Image
                                                        src={`${API_BASE_URL}/${product.st_image}`}
                                                        alt={product.st_company_name}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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

                                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition group-hover:border-sky-200 group-hover:text-sky-700">
                                            ไปที่ร้านค้า
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>

                            <div className="grid gap-4 md:grid-cols-2">
                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 md:col-span-2"
                                >
                                    <p className="mb-3 text-sm font-semibold text-slate-900">
                                        Landing Page
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {landingPage?.length > 0 ? (
                                            landingPage.map((lp) => (
                                                <Link
                                                    key={lp.lp_id}
                                                    href={`/arcana/lp/${lp.lp_slug}`} //   ใช้ slug
                                                    className="group"
                                                >
                                                    <motion.div
                                                        whileHover={{ y: -2, scale: 1.03 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        className="
                                                                flex items-center gap-2
                                                                rounded-full
                                                                border border-emerald-100
                                                                bg-emerald-50
                                                                px-3 py-1.5
                                                                text-xs font-medium text-emerald-700
                                                                transition-all duration-200
                                                                hover:border-emerald-200
                                                                hover:bg-emerald-100
                                                                hover:shadow-[0_6px_20px_rgba(16,185,129,0.15)]
                                                            "
                                                    >
                                                        <span className="line-clamp-1">
                                                            {lp.lp_title}
                                                        </span>

                                                        {/* icon */}
                                                        <span className="text-[10px] opacity-60 transition-transform duration-200 group-hover:translate-x-0.5">
                                                            ↗
                                                        </span>
                                                    </motion.div>
                                                </Link>
                                            ))
                                        ) : (
                                            <span className="text-sm text-slate-400">
                                                ไม่มี Landing Page
                                            </span>
                                        )}
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 md:col-span-2"
                                >
                                    <p className="mb-3 text-sm font-semibold text-slate-900">แท็กสินค้า</p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags?.length > 0 ? (
                                            product.tags.map((tag) => (
                                                <motion.span
                                                    whileHover={{ y: -2, scale: 1.04 }}
                                                    key={tag.ptag_id}
                                                    className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700"
                                                >
                                                    {tag.ptag_name}
                                                </motion.span>
                                            ))
                                        ) : (
                                            <span className="text-sm text-slate-400">ไม่มีแท็กสินค้า</span>
                                        )}
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5"
                                >
                                    <p className="mb-3 text-sm font-semibold text-slate-900">แบรนด์</p>
                                    <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                                        {product.b_name || "-"}
                                    </span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5"
                                >
                                    <p className="mb-3 text-sm font-semibold text-slate-900">หมวดหมู่</p>
                                    <span className="inline-flex rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700">
                                        {product.cl_name || "-"}
                                    </span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5"
                                >
                                    <p className="mb-3 text-sm font-semibold text-slate-900">สถานะสินค้า</p>
                                    <span
                                        className={
                                            product.ps_name === "In Stock"
                                                ? "inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
                                                : "inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700"
                                        }
                                    >
                                        {product.ps_name || "-"}
                                    </span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5"
                                >
                                    <p className="mb-3 text-sm font-semibold text-slate-900">คลังสินค้า</p>
                                    <div className="flex flex-wrap gap-2">
                                        {InventoryStore?.length > 0 ? (
                                            InventoryStore.map((store, index) => (
                                                <motion.span
                                                    whileHover={{ y: -2, scale: 1.04 }}
                                                    key={index}
                                                    className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700"
                                                >
                                                    {store.InventoryStoreProvince}
                                                </motion.span>
                                            ))
                                        ) : (
                                            <span className="text-sm text-slate-400">ไม่มีข้อมูลคลังสินค้า</span>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    variants={fadeUp}
                    className="mb-30 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl md:p-8"
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
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.65 }}
                                animate={{
                                    height: isDescriptionExpanded ? "auto" : 220,
                                }}
                                className={`
                    prose prose-slate max-w-none overflow-hidden
                    prose-headings:text-slate-900 prose-p:text-slate-700
                `}
                            >
                                <ProductDescriptionLexical value={product.p_description} />
                            </motion.div>

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

            <style jsx global>{`
                @keyframes shine {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
            `}</style>
        </main>
    )
}