"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
}

export default function WhatIsArcanaSection() {
    return (
        <section
            id="what-is-arcana"
            className="relative overflow-hidden bg-linear-to-br from-sky-950 via-sky-950 to-sky-900 py-24 text-white mb-8 scroll-mt-24"
        >
            {/* background effects */}
            <div className="absolute inset-0">
                <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-sky-400/20 blur-[120px]" />
                <div className="absolute -right-15 top-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-[140px]" />
                <div className="absolute -bottom-25 left-1/3 h-72 w-72 rounded-full bg-cyan-300/10 blur-[130px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* heading */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mx-auto mb-16 max-w-3xl text-center"
                >
                    <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-sky-200 backdrop-blur-md">
                        ARCANA STORY
                    </span>

                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        ARCANA คืออะไร?
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-200 sm:text-lg">
                        พื้นที่สื่อกลางในการซื้อขายสินค้าที่ช่วยทั้ง
                        <span className="font-semibold text-white"> ลดค่าใช้จ่าย </span>
                        สำหรับผู้ซื้อ และ
                        <span className="font-semibold text-white"> เพิ่มรายได้ </span>
                        ให้กับผู้ที่มีสินค้าค้างสต็อกหรือสินค้าคุณภาพที่ยังไม่เป็นที่รู้จัก
                    </p>
                </motion.div>

                {/* main layout */}
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    {/* image side */}
                    <motion.div
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-5 rounded-4xl bg-linear-to-br from-sky-400/20 via-blue-500/10 to-cyan-300/10 blur-2xl" />

                        <div className="group relative overflow-hidden rounded-4xl border border-white/15 bg-white/8 p-3 shadow-[0_30px_100px_rgba(2,6,23,0.55)] backdrop-blur-xl">
                            <div className="relative aspect-3/3 overflow-hidden rounded-3xl">
                                <Image
                                    src="/images/whatIsArcana.webp"
                                    alt="What is Arcana"
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-slate-950/65 via-slate-900/10 to-transparent" />

                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
                                >
                                    <p className="text-sm font-medium text-sky-100">
                                        “มีหรือเปล่านะ?”
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-slate-200">
                                        ARCANA เกิดขึ้นจากความตั้งใจที่จะช่วยให้ทุกคนได้พบกับสินค้าที่ใช่
                                        และส่งต่อสินค้าที่มีคุณค่าไปยังคนที่ต้องการจริง ๆ
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* content side */}
                    <div className="space-y-6">
                        <motion.div
                            custom={2}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="rounded-[28px] border border-white/12 bg-white/8 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.35)] backdrop-blur-xl"
                        >
                            <h3 className="text-xl font-semibold text-white">ARCANA คือ</h3>
                            <p className="mt-4 leading-8 text-slate-200">
                                พื้นที่สื่อกลางในการซื้อขายสินค้า
                                ที่ช่วยให้ท่านค้นหาสินค้าเพื่อลดค่าใช้จ่าย
                                หรือช่วยเพิ่มรายได้จากการขายสินค้า dead stock
                                ของท่าน พร้อมร่วมกันเพิ่มมูลค่าให้กับสินค้าค้างสต็อกอย่างมีประสิทธิภาพ
                            </p>
                        </motion.div>

                        <motion.div
                            custom={3}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid gap-6 md:grid-cols-2"
                        >
                            <div className="rounded-[28px] border border-sky-300/15 bg-linear-to-b from-white/10 to-white/5 p-7 backdrop-blur-xl">
                                <div className="mb-4 inline-flex rounded-2xl bg-sky-400/15 px-3 py-1 text-sm font-medium text-sky-200">
                                    ประเภทสินค้าใน ARCANA
                                </div>

                                <div className="space-y-5 text-slate-200">
                                    <div>
                                        <p className="font-semibold text-white">สินค้าซิกเนเจอร์</p>
                                        <p className="mt-2 leading-7">
                                            สินค้าคุณภาพที่สะท้อนตัวตนของผู้ผลิต
                                            อาจยังมีช่องทางขายน้อย หรือยังไม่เคยวางขายบนออนไลน์มาก่อน
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-white">สินค้าเดดสต็อก</p>
                                        <p className="mt-2 leading-7">
                                            สินค้าค้างสต็อกที่ไม่เคยผ่านการใช้งาน
                                            แม้ถูกเก็บไว้เป็นเวลานาน แต่ยังมีคุณค่าและพร้อมส่งต่อ
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[28px] border border-cyan-300/15 bg-linear-to-b from-white/10 to-white/5 p-7 backdrop-blur-xl">
                                <div className="mb-4 inline-flex rounded-2xl bg-cyan-400/15 px-3 py-1 text-sm font-medium text-cyan-200">
                                    ที่มาของชื่อ ARCANA
                                </div>

                                <p className="leading-8 text-slate-200">
                                    ชื่อ <span className="font-semibold text-white">Arcana</span>
                                    มาจากคำภาษาญี่ปุ่นว่า
                                    <span className="mx-1 font-semibold text-sky-200">“Arukana?”</span>
                                    ซึ่งมีความหมายในภาษาไทยว่า
                                    <span className="mx-1 font-semibold text-white">“มีหรือเปล่านะ?”</span>
                                </p>

                                <p className="mt-4 leading-8 text-slate-200">
                                    เรามุ่งหวังให้ลูกค้าทุกท่านได้พบเจอสินค้าที่ต้องการบนเว็บไซต์ของเรา
                                    และได้รับความพึงพอใจสูงสุดจากบริการของบริษัท
                                    จึงเกิดเป็นเว็บไซต์นี้ขึ้นมา
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* bottom cards */}
                <div className="mt-16 grid gap-6 lg:grid-cols-2">
                    <motion.div
                        custom={4}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="group rounded-[30px] border border-white/12 bg-white/8 p-8 shadow-[0_20px_80px_rgba(2,6,23,0.4)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-white/10"
                    >
                        <div className="mb-4 inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-1.5 text-sm font-medium text-sky-200">
                            สำหรับผู้สนใจร่วมลงขายกับเรา
                        </div>

                        <p className="leading-8 text-slate-200">
                            หากท่านสนใจอยากฝากขายกับเรา
                            ทางเราพร้อมให้บริการส่งต่อสินค้าของท่านสู่มือลูกค้า
                        </p>

                        <div className="mt-6 space-y-4 text-slate-200">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                ✔️ สินค้าในอุตสาหกรรมการผลิต / เครื่องจักรที่สามารถขนส่งได้
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                ✔️ สินค้าที่ไม่เคยผ่านการใช้งานและอยากส่งต่อ
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                ✔️ สินค้าคุณภาพที่ยังไม่เป็นที่รู้จัก
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        custom={5}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="group rounded-[30px] border border-white/12 bg-white/8 p-8 shadow-[0_20px_80px_rgba(2,6,23,0.4)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-white/10"
                    >
                        <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-200">
                            สำหรับผู้กำลังมองหาสินค้า
                        </div>

                        <p className="leading-8 text-slate-200">
                            หากท่านกำลังมองหาสินค้าคุณภาพดี ราคาโดนใจ
                            ท่านสามารถเข้ามาลองเลือกสรรสินค้ากับ ARCANA ก่อนได้
                            เราพร้อมให้บริการทุกท่าน
                        </p>

                        <div className="mt-6 rounded-3xl border border-white/10 bg-linear-to-br from-sky-400/10 to-cyan-300/5 p-5">
                            <p className="leading-8 text-slate-200">
                                หากไม่พบสินค้าที่ต้องการ
                                ท่านสามารถส่งคำขอหรือติดต่อเราเพิ่มเติมได้
                                เราพร้อมให้บริการเพื่อส่งมอบสิ่งที่ดีสู่มือลูกค้าทุกท่าน
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}