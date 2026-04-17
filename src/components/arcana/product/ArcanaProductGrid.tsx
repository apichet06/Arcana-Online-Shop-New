"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/features/products/types/product"
import ArcanaProductCard from "./ArcanaProductCard"

type Props = {
    products: Product[]
}

const CARD_LIMIT = 10
const DESKTOP_VISIBLE = 4

export default function ArcanaProductGrid({ products }: Props) {
    const visibleProducts = useMemo(() => products.slice(0, CARD_LIMIT), [products])

    const [current, setCurrent] = useState(0)

    const canSlide = visibleProducts.length > DESKTOP_VISIBLE
    // const maxStart = Math.max(visibleProducts.length - DESKTOP_VISIBLE, 0)

    if (!visibleProducts.length) {
        return (
            <div className="rounded-[28px] border border-dashed border-sky-200 bg-white/70 p-10 text-center text-slate-500">
                ยังไม่มีสินค้าในหมวดนี้
            </div>
        )
    }

    const handlePrev = () => {
        setCurrent((prev) =>
            (prev - 1 + visibleProducts.length) % visibleProducts.length
        )
    }

    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % visibleProducts.length)
    }
    const getDesktopWindow = () => {
        const result: Product[] = []

        for (let i = 0; i < Math.min(DESKTOP_VISIBLE, visibleProducts.length); i++) {
            const index = (current + i) % visibleProducts.length
            result.push(visibleProducts[index])
        }

        return result
    }

    const desktopProducts = getDesktopWindow()
    // const desktopProducts = visibleProducts.slice(
    //     current,
    //     current + DESKTOP_VISIBLE
    // )

    return (
        <>
            {/* mobile / tablet */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                variants={{
                    hidden: {},
                    show: {
                        transition: {
                            staggerChildren: 0.08,
                        },
                    },
                }}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:hidden   "
            >
                {visibleProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        variants={{
                            hidden: { opacity: 0, y: 22 },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            },
                        }}
                        className="h-full"
                    >
                        <ArcanaProductCard product={product} />
                    </motion.div>
                ))}
            </motion.div>

            {/* desktop */}
            <div className="hidden xl:block">
                <div className="relative">
                    {canSlide && (
                        <>
                            <button
                                type="button"
                                onClick={handlePrev}
                                // disabled={current === 0}
                                className="
                                    absolute -left-6 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center
                                    rounded-full border border-white/80 bg-white/90 text-sky-700
                                    shadow-[0_16px_40px_rgba(15,23,42,0.10)] backdrop-blur-md
                                    transition-all duration-300
                                    hover:scale-105 hover:bg-white
                                    disabled:pointer-events-none disabled:opacity-35
                                "
                                aria-label="ดูสินค้าก่อนหน้า"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                // disabled={current >= maxStart}
                                className="
                                    absolute -right-6 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center
                                    rounded-full border border-white/80 bg-white/90 text-sky-700
                                    shadow-[0_16px_40px_rgba(15,23,42,0.10)] backdrop-blur-md
                                    transition-all duration-300
                                    hover:scale-105 hover:bg-white
                                    disabled:pointer-events-none disabled:opacity-35
                                "
                                aria-label="ดูสินค้าถัดไป"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </>
                    )}

                    <div className="px-2">
                        <div className="px-2">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.35,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="grid grid-cols-4 gap-6"
                            >
                                {desktopProducts.map((product, index) => (
                                    <motion.div
                                        key={`${product.id}-${current}`}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.45,
                                            delay: index * 0.04,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="h-full"
                                    >
                                        <ArcanaProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}