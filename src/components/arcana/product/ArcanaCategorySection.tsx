"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { ArrowUpRight, Layers3, Sparkles } from "lucide-react"
import { Category } from "@/features/products/types/category"

type Props = {
    categories: Category[]
    lang?: string
}

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

const sectionVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.08,
        },
    },
}

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 22,
        scale: 0.985,
        filter: "blur(10px)",
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

export default function ArcanaCategorySection({ categories }: Props) {
    const groupedCategories = groupCategories(categories)

    if (!groupedCategories.length) return null

    return (
        <section className="relative overflow-hidden py-16 sm:py-20">
            {/* Background */}
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(186,230,253,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(147,197,253,0.20),transparent_30%),linear-gradient(to_bottom,#f8fbff,#eef5ff,#f8fbff)]" />
            <div className="absolute inset-0 -z-10 opacity-30 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[28px_28px]" />

            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto mb-10 max-w-3xl text-center"
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700 shadow-[0_8px_25px_rgba(2,132,199,0.08)] backdrop-blur-xl">
                        <Sparkles className="h-4 w-4" />
                        Explore Categories
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                        หมวดหมู่สินค้า
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                        เลือกชมสินค้าในแต่ละหมวดหมู่ได้อย่างสะดวก พร้อมดีไซน์ที่เรียบหรูและทันสมัย
                    </p>
                </motion.div>

                {/* Module Grid */}
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.12 }}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
                >
                    {groupedCategories.map((category) => (
                        <motion.div
                            key={category.c_id}
                            variants={itemVariants}
                            whileHover={{
                                y: -4,
                                transition: {
                                    duration: 0.28,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            }}
                            className="group"
                        >
                            <Link
                                href={`/arcana/view-all?category=${category.c_id}`}
                                className="relative block overflow-hidden rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl transition duration-300 hover:border-sky-200/80 hover:bg-white hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
                            >
                                {/* soft glow */}
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.18),transparent_28%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                                {/* top line shine */}
                                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-sky-200/80 to-transparent opacity-70" />

                                <div className="relative flex items-center gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.04, rotate: -2 }}
                                        transition={{ duration: 0.25 }}
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-100/80 bg-[linear-gradient(135deg,#ffffff,#e0f2fe)] text-sky-700 shadow-inner"
                                    >
                                        <Layers3 className="h-5 w-5" />
                                    </motion.div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate text-sm font-semibold tracking-tight text-slate-900">
                                            {category.cl_name}
                                        </h3>
                                        <p className="truncate text-xs text-slate-500">
                                            {category.ctl_name || "Arcana"}
                                        </p>
                                    </div>

                                    <motion.div
                                        whileHover={{ x: 2, y: -2 }}
                                        transition={{ duration: 0.22 }}
                                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-400 transition duration-300 group-hover:border-sky-100 group-hover:text-sky-700"
                                    >
                                        <ArrowUpRight className="h-4 w-4" />
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}