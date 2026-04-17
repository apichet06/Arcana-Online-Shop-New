"use client"

import Container from "@/components/shared/layout/Container"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay,
            ease: [0.22, 1, 0.36, 1] as const
        },
    }),
}
const text = "คัดสรรสินค้าพรีเมียม เพื่อประสบการณ์ที่ดีขึ้นในทุกวัน"

const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" })
const letters = Array.from(segmenter.segment(text), (s) => s.segment)

const images = [
    "/images/FMC.webp",
    "/images/Nourish.webp",
    "/images/swiftletplus.webp",

]




export default function ArcanaHero() {

    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])
    return (
        <section className="relative overflow-hidden border-b text-white bg-linear-to-br from-[#093055] via-[#043447] to-[#1c698d] animate-gradient ">
            {/* <div className="absolute inset-0 bg-linear-to-br from-[#020617] via-[#0b1f3a] to-[#1e3a8a]" /> */}
            <motion.div
                animate={{
                    x: [0, 200, -150, 0],
                    y: [0, -120, 80, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.4, 0.8, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -left-40 top-10 h-128 w-lg rounded-full bg-blue-500/40 blur-[90px]"
            />

            {/* 🔥 Glow 2 - วิ่งสวน + เร่งสปีด */}
            <motion.div
                animate={{
                    x: [0, -220, 180, 0],
                    y: [0, 100, -80, 0],
                    rotate: [0, -180, -360],
                    scale: [1, 1.3, 1.6, 1],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-0 right-0 h-136 w-136 rounded-full bg-cyan-400/40 blur-[110px]"
            />

            {/*   Glow 3 - ยิงทะลุกลาง */}
            <motion.div
                animate={{
                    x: [-300, 300],
                    opacity: [0, 0.6, 0],
                    scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/2 left-0 h-80 w-[20rem] rounded-full bg-indigo-400/30 blur-[80px]"
            />



            {/* <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-blue-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-112 w-md rounded-full bg-cyan-400/10 blur-[140px]" /> */}
            {/* background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
            </div>

            <Container className="relative grid min-h-130 items-center gap-10 py-16 md:grid-cols-2">
                <div className="space-y-5">
                    <motion.span
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={0}
                        className="inline-flex rounded-full border border-white/60 bg-white/80 px-4 py-1 text-sm text-slate-700 shadow-sm backdrop-blur"
                    >
                        Arcana Premium Collection
                    </motion.span>

                    <motion.h1
                        className="text-4xl font-semibold leading-[1.6] text-white/90 md:text-5xl flex flex-wrap"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.06,
                                },
                            },
                        }}
                    >
                        {letters.map((char, i) => (
                            <motion.span
                                key={i}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                    },
                                }}
                                className="inline-block pb-1"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={2}
                        className="max-w-xl text-base leading-7 text-white/90"
                    >
                        ดีไซน์สวย คุณภาพดี และคัดเลือกมาอย่างตั้งใจในสไตล์ Arcana
                    </motion.p>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={3}
                        className="flex flex-wrap gap-3"
                    >
                        <Link
                            href="/arcana/view-all"
                            className="
                            inline-flex items-center justify-center
                            rounded-xl px-6 py-3 text-sm font-semibold text-white
                            bg-linear-to-r from-sky-800 to-sky-600
                            shadow-md shadow-sky-500/25
                            transition-all duration-300
                            hover:from-sky-500 hover:to-sky-600
                            hover:shadow-sky-500/40
                            hover:-translate-y-0.5
                            active:scale-95
                        "
                        >
                            ดูสินค้าทั้งหมด
                        </Link>

                        <Link
                            href="/deadstock"
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-900 transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            ไป DeadStock
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 60, scale: 0.94, rotate: 1.5 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        rotate: 0,
                        y: [0, -8, 0, 6, 0],
                    }}
                    transition={{
                        opacity: { duration: 1.4, ease: "easeOut" },
                        x: { duration: 1.4, ease: "easeOut" },
                        scale: { duration: 1.4, ease: "easeOut" },
                        rotate: { duration: 1.4, ease: "easeOut" },
                        y: {
                            duration: 12, //ปรับความเร็วของการเคลื่อนไหวในแนวแกน Y
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    className="relative"
                >
                    {/* glow background */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative mx-auto w-full max-w-155"
                    >
                        {/* background layers */}
                        <div className="absolute left-6 top-6 h-full w-full rounded-[30px] bg-white/8 -rotate-6 border border-white/10" />
                        <div className="absolute right-4 top-4 h-full w-full rounded-[30px] bg-sky-400/10 rotate-[5deg] blur-sm" />

                        <motion.div
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ duration: 0.4 }}
                            className="relative overflow-hidden rounded-[30px] border border-white/20 bg-slate-950/20 shadow-[0_35px_100px_rgba(2,6,23,0.35)]"
                        >
                            <div className="relative aspect-5/4 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={images[current]}
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${images[current]})` }}
                                        initial={{ opacity: 0, scale: 1.04 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-linear-to-br from-slate-950/40 via-transparent to-sky-400/10" />
                                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/15" />
                            </div>
                        </motion.div>
                    </motion.div>

                </motion.div>
            </Container>
        </section>
    )
}