"use client"

import Image from "next/image"
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion"
import { Product } from "@/features/products/types/product"
import { formatPrice } from "@/lib/format-price"
import Link from "next/link"

type Props = {
    product: Product
}

export default function ArcanaProductCard({ product }: Props) {
    const mouseX = useMotionValue(50)
    const mouseY = useMotionValue(50)
    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)

    const smoothX = useSpring(mouseX, {
        stiffness: 240,
        damping: 20,
        mass: 0.25,
    })

    const smoothY = useSpring(mouseY, {
        stiffness: 240,
        damping: 20,
        mass: 0.25,
    })

    const smoothRotateX = useSpring(rotateX, {
        stiffness: 220,
        damping: 18,
        mass: 0.35,
    })

    const smoothRotateY = useSpring(rotateY, {
        stiffness: 220,
        damping: 18,
        mass: 0.35,
    })

    const auroraGlow = useMotionTemplate`
    radial-gradient(
        420px circle at ${smoothX}% ${smoothY}%,
        rgba(186,230,253,0.18),
        rgba(147,197,253,0.14) 20%,
        rgba(96,165,250,0.10) 35%,
        rgba(59,130,246,0.06) 50%,
        transparent 70%
    )
`

    const glassReflection = useMotionTemplate`
    linear-gradient(
        120deg,
        transparent 0%,
        rgba(255,255,255,0.18) 35%,
        rgba(255,255,255,0.08) 50%,
        transparent 70%
    )
`

    const luxuryBorderGlow = useMotionTemplate`
        radial-gradient(
            420px circle at ${smoothX}% ${smoothY}%,
            rgba(147,197,253,0.18),
            transparent 60%
        )
    `



    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height

        const x = px * 100
        const y = py * 100

        mouseX.set(x)
        mouseY.set(y)

        rotateY.set((px - 0.5) * 7)
        rotateX.set((0.5 - py) * 7)
    }

    const handleMouseLeave = () => {
        mouseX.set(50)
        mouseY.set(50)
        rotateX.set(0)
        rotateY.set(0)
    }

    return (
        <Link href={`/arcana/product/${product.id}`} className="block h-full">
            <div className="relative overflow-hidden rounded-[30px] md:overflow-visible">
                {/* shadow layers */}
                <div className="absolute inset-0 hidden rounded-[30px] border border-white/10 bg-white/10 md:block md:translate-x-2 md:translate-y-2 md:rotate-1" />
                <div className="absolute inset-0 hidden rounded-[30px] border border-white/10 bg-sky-300/10 lg:block lg:translate-x-4 lg:translate-y-4 lg:rotate-2" />

                <motion.article
                    initial={{ opacity: 0, y: 18, scale: 0.985 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.18 }}
                    whileHover={{ y: -4 }}
                    transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 24,
                        mass: 0.55,
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX: smoothRotateX,
                        rotateY: smoothRotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.82))] shadow-[0_18px_50px_rgba(15,23,42,0.10),0_6px_18px_rgba(59,130,246,0.08)] backdrop-blur-2xl transition-[box-shadow,border-color,transform] duration-200 hover:border-sky-100 hover:shadow-[0_30px_90px_rgba(30,64,175,0.16),0_12px_30px_rgba(59,130,246,0.14)]"
                >
                    {/* outer luxury light */}
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-0 opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-100"
                        style={{ background: luxuryBorderGlow }}
                    />

                    {/* base skin */}
                    <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.85),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(186,230,253,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.40),rgba(255,255,255,0.06))]" />

                    {/* mouse-follow aurora */}
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        style={{ background: auroraGlow }}
                    />

                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: glassReflection }}
                    />

                    {/* inner ring */}
                    <div className="pointer-events-none absolute inset-px z-10 rounded-[29px] border border-white/60" />

                    {/* top polished line */}
                    <div className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-linear-to-r from-transparent via-white/90 to-transparent" />

                    {/* refined shimmer */}
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/2 skew-x-[-18deg] bg-linear-to-r from-transparent via-white/35 to-transparent blur-2xl opacity-0 group-hover:opacity-100"
                        animate={{ x: ["0%", "185%"] }}
                        transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    <div
                        className="relative aspect-[4/4.3] overflow-hidden bg-slate-100"
                        style={{ transform: "translateZ(22px)" }}
                    >
                        <motion.div
                            className="absolute inset-0"
                            whileHover={{ scale: 1.045 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 24,
                            }}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 100vw"
                                priority
                            />
                        </motion.div>

                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/28 via-transparent to-white/10" />
                        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white/30 to-transparent" />
                        <div
                            className="
                                pointer-events-none absolute left-4 bottom-5 z-20
                                translate-y-2 opacity-0
                                transition-all duration-300
                                group-hover:translate-y-0 group-hover:opacity-100
                            "
                        >
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/78 px-3.5 py-2 text-[11px] font-semibold text-sky-800 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
                                ดูรายละเอียด
                                <span className="text-[10px]">↗</span>
                            </div>
                        </div>
                        {product.discount > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.94, y: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.28, delay: 0.08 }}
                                className="absolute left-3 top-3 z-20 rounded-full border border-white/80 bg-white/82 px-3 py-1 text-xs font-semibold text-sky-700 shadow-[0_10px_30px_rgba(14,165,233,0.14)] backdrop-blur-xl"
                            >
                                ลด {product.discount}%
                            </motion.div>
                        )}
                    </div>

                    <div
                        className="relative z-20 flex flex-1 flex-col p-5"
                        style={{ transform: "translateZ(28px)" }}
                    >
                        {/* <motion.div
                            className="flex flex-wrap gap-2"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={{
                                hidden: {},
                                show: {
                                    transition: {
                                        staggerChildren: 0.04,
                                    },
                                },
                            }}
                        >
                            {product.tags.slice(0, 3).map((tag) => (
                                <motion.span
                                    key={tag.ptag_id}
                                    variants={{
                                        hidden: { opacity: 0, y: 6 },
                                        show: { opacity: 1, y: 0 },
                                    }}
                                    transition={{ duration: 1 }}
                                    className="rounded-full border border-sky-100/80 bg-white/72 px-2 py-1 text-[11px] font-medium text-sky-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md"
                                >
                                    {tag.ptag_name}
                                </motion.span>
                            ))}
                        </motion.div> */}

                        <div className="mt-4 space-y-2">
                            <h3 className="line-clamp-2 min-h-12 text-[15px] font-semibold leading-6 text-slate-900 transition-colors duration-200 group-hover:text-sky-900">
                                {product.name}
                            </h3>

                            <div className="flex min-h-6 items-center gap-2">
                                <div className="flex items-center gap-0.5 text-[13px] leading-none">
                                    {[1, 2, 3, 4, 5].map((star) => {
                                        const filled = star <= Math.floor(product.rating ?? 0)

                                        return (
                                            <span
                                                key={star}
                                                className={filled ? "text-[#d9b86c]" : "text-slate-200"}
                                            >
                                                ★
                                            </span>
                                        )
                                    })}
                                </div>

                                <span className="text-xs font-medium text-slate-600">
                                    {product.rating?.toFixed(1) ?? "0.0"}
                                </span>

                                <span className="text-xs text-slate-400">
                                    ({product.reviewCount ?? 0})
                                </span>
                            </div>

                            <div className="h-px w-full bg-linear-to-r from-sky-100 via-slate-200 to-transparent" />
                        </div>

                        <div className="mt-auto pt-4">
                            <div className="flex items-end justify-between gap-3">
                                <div className="space-y-1">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                                        Price
                                    </p>

                                    {product.hasPriceRange ? (
                                        <motion.p
                                            className="text-sm font-semibold text-slate-900"
                                            whileHover={{ x: 1.5 }}
                                            transition={{ duration: 0.16 }}
                                        >
                                            {formatPrice(product.minPrice)} - {formatPrice(product.maxPrice)}
                                        </motion.p>
                                    ) : (
                                        <motion.p
                                            className="text-sm font-semibold text-slate-900"
                                            whileHover={{ x: 1.5 }}
                                            transition={{ duration: 0.16 }}
                                        >
                                            {formatPrice(product.price)}
                                        </motion.p>
                                    )}
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.18 }}
                                    className="shrink-0 rounded-full border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(239,246,255,0.78),rgba(219,234,254,0.84))] px-3 py-1 text-xs font-semibold text-sky-700 shadow-[0_8px_22px_rgba(59,130,246,0.12),inset_0_1px_0_rgba(255,255,255,0.85)]"
                                >
                                    Premium
                                </motion.div>
                            </div>

                        </div>
                    </div>

                </motion.article>
            </div>
        </Link>
    )
}