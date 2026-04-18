"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import ProductDescriptionLexical from "@/components/arcana/product/ProductDescriptionLexical"
import { formatPrice } from "@/lib/format-price"
import { useLanguage } from "@/features/products/hooks/use-language"
import useLandingPage from "@/features/products/hooks/use-landingpage"

type Props = {
    slug: string
}

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
}

export default function LandingPageDetailView({ slug }: Props) {


    const { lang } = useLanguage()
    const { data: landingPage, loading } = useLandingPage(slug, lang,)

    if (!landingPage || loading) return <div className="py-20 text-center text-slate-500">Loading...</div>

    const minPrice = Number(landingPage.min_price || 0)
    const maxPrice = Number(landingPage.max_price || 0)
    const discountPercent = Number(landingPage.discount || 0)

    const hasPriceRange = maxPrice > minPrice
    const hasDiscount = discountPercent > 0

    const discountedMinPrice = hasDiscount
        ? minPrice - (minPrice * discountPercent) / 100
        : minPrice

    const discountedMaxPrice = hasDiscount
        ? maxPrice - (maxPrice * discountPercent) / 100
        : maxPrice

    return (
        <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#edf6ff_0%,#f8fbff_38%,#ffffff_100%)] text-slate-900">
            {/* background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-[-8%] top-[-10%] h-80 w-[320px] rounded-full bg-sky-300/20 blur-3xl" />
                <div className="absolute right-[-10%] top-[8%] h-70 w-70 rounded-full bg-blue-200/20 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[20%] h-65 w-65 rounded-full bg-cyan-200/20 blur-3xl" />
            </div>

            {/* floating edge card - desktop only */}
            <div className="pointer-events-none fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
                <motion.div
                    initial={{ x: 140, opacity: 0 }}
                    animate={{ x: 200, opacity: 1 }}
                    whileHover={{ x: -10 }}
                    transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="pointer-events-auto relative"
                >
                    <div className="flex items-center">
                        {/* side tab */}
                        <div className="relative z-10 -mr-2 flex h-36 w-14 items-center justify-center rounded-l-3xl border border-white/70 border-r-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(12,74,110,0.92))] px-2 shadow-[0_20px_50px_rgba(2,6,23,0.22)] backdrop-blur-2xl">
                            <span className="select-none text-[11px] font-semibold uppercase tracking-[0.24em] text-white [writing-mode:vertical-rl]">
                                Buy
                            </span>
                        </div>

                        {/* main card */}
                        <div className="w-72 overflow-hidden rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78))] shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-2xl transition duration-500 ease-out hover:shadow-[0_28px_90px_rgba(15,23,42,0.20)]">
                            <div className="relative overflow-hidden px-6 py-6">
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(186,230,253,0.24),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.35),transparent)]" />

                                <div className="relative z-10">
                                    <div className="inline-flex items-center rounded-full border border-sky-100 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700 shadow-sm">
                                        Product Access
                                    </div>

                                    <h3 className="mt-4 line-clamp-2 text-lg font-semibold leading-snug text-slate-900">
                                        {landingPage.p_name}
                                    </h3>

                                    <div className="mt-3 space-y-2">
                                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                                            Price
                                        </p>

                                        {hasDiscount ? (
                                            <>
                                                <div className="flex flex-wrap items-baseline gap-2">
                                                    {hasPriceRange ? (
                                                        <span className="text-xl font-bold text-slate-900">
                                                            {formatPrice(discountedMinPrice)} - {formatPrice(discountedMaxPrice)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-xl font-bold text-slate-900">
                                                            {formatPrice(discountedMinPrice)}
                                                        </span>
                                                    )}

                                                    <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600">
                                                        -{discountPercent}%
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-baseline gap-2">
                                                    {hasPriceRange ? (
                                                        <span className="text-sm text-slate-400 line-through">
                                                            {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-slate-400 line-through">
                                                            {formatPrice(minPrice)}
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-wrap items-baseline gap-2">
                                                {hasPriceRange ? (
                                                    <span className="text-xl font-bold text-slate-900">
                                                        {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                                                    </span>
                                                ) : (
                                                    <span className="text-xl font-bold text-slate-900">
                                                        {formatPrice(minPrice)}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-5 border-t border-slate-200/70 pt-5">
                                        <Link
                                            href={`../../product/${landingPage.p_id}`}
                                            className="inline-flex w-full items-center justify-center rounded-full bg-blue-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-sky-900"
                                        >
                                            เลือกซื้อสินค้า
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
            >

                {/* hero */}
                <motion.section
                    variants={fadeUp}
                    className="relative overflow-hidden rounded-2xl border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.90),rgba(255,255,255,0.78))] px-6 py-10 shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:px-8 sm:py-12 lg:px-12 lg:py-16"
                >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(186,230,253,0.28),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.26),transparent)]" />
                    <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white to-transparent" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.65 }}
                            className="inline-flex items-center gap-2 rounded-full border border-sky-100/80 bg-white/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 shadow-[0_10px_30px_rgba(59,130,246,0.08)] backdrop-blur-xl"
                        >
                            Arcana Premium
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.06 }}
                            className="mt-6 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl"
                        >
                            {landingPage.lp_title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.14 }}
                            className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base"
                        >
                            Premium landing page ที่ออกแบบให้เนื้อหาดูสะอาด อ่านง่าย
                            และส่งภาพลักษณ์ของแบรนด์ได้แบบ modern มากขึ้น
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.2 }}
                            className="mt-8 flex flex-wrap gap-3"
                        >
                            <a
                                href="#lp-content"
                                className="inline-flex   items-center justify-center rounded-full bg-blue-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-sky-900"
                            >
                                ดูรายละเอียด
                            </a>
                            <Link
                                href={`../../product/${landingPage.p_id}`}
                                className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700"

                            >
                                กลับหน้าก่อนหน้า
                            </Link>
                        </motion.div>
                    </div>
                </motion.section>

                {/* content */}
                <motion.section
                    id="lp-content"
                    variants={fadeUp}
                    className="mt-8 overflow-hidden rounded-2xl border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.84))] shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur-2xl"
                >
                    <div className="border-b border-slate-200/70 px-6 py-6 sm:px-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                            Content
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                            รายละเอียด
                        </h2>
                    </div>

                    <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.12 }}
                            transition={{ duration: 0.7 }}
                            className="
                                prose prose-slate max-w-none
                                prose-headings:text-slate-900
                                prose-p:text-slate-700
                                prose-strong:text-slate-900
                                prose-a:text-sky-700
                                prose-li:text-slate-700
                                [&_.editor-image]:my-6
                                [&_.editor-image_img]:mx-auto
                                [&_.editor-image_img]:max-w-full
                                [&_.editor-image_img]:rounded-2xl
                                [&_img]:h-auto
                                [&_img]:max-w-full
                                [&_table]:block
                                [&_table]:w-full
                                [&_table]:overflow-x-auto
                            "
                        >
                            <ProductDescriptionLexical
                                value={landingPage.lp_description ?? ""}
                            />
                        </motion.div>
                    </div>
                </motion.section>

                {/* bottom cta */}
                <motion.section
                    variants={fadeUp}
                    className="relative mt-8 overflow-hidden rounded-2xl border border-slate-900/10 bg-[linear-gradient(135deg,rgba(2,6,23,0.96),rgba(15,23,42,0.94),rgba(12,74,110,0.88))] px-6 py-8 text-white shadow-[0_24px_90px_rgba(2,6,23,0.28)] sm:px-8 sm:py-10 mb-30"
                >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.20),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.10),transparent_28%)]" />

                    <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                                Arcana Experience
                            </p>
                            <h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
                                Modern, clean, and premium presentation
                            </h3>
                            <p className="mt-4 text-sm leading-7 text-sky-50/85">
                                หน้านี้ออกแบบให้เน้นการเล่าเรื่องด้วยเนื้อหาหลัก
                                เพื่อให้ผู้ชมโฟกัสกับสารที่ต้องการสื่อได้มากที่สุด
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <a
                                href="#lp-content"
                                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
                            >
                                อ่านรายละเอียด
                            </a>

                            <Link
                                href="/arcana"
                                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/14"
                            >
                                กลับหน้าแรก
                            </Link>
                        </div>
                    </div>
                </motion.section>
            </motion.div>
        </main>
    )
}