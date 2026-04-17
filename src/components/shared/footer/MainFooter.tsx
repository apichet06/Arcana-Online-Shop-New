"use client";
import Link from "next/link";

import { WebsiteConfig } from "@/features/website/config/website-config";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

type Props = {
    website: WebsiteConfig;
};

export default function MainFooter({ website }: Props) {
    const [year, setYear] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setYear(String(new Date().getFullYear()));
    }, []);

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-linear-to-b from-[#0c0d10]/95 via-[#14161a]/96 to-[#1a1d22]/97 text-slate-300 shadow-[0_-10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

            <div className="mx-auto max-w-7xl">
                {/* Top bar */}
                <div className="px-4 py-3 md:px-6 md:py-1.25">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1 pr-0 sm:pr-6">
                            <h2 className="text-base font-light tracking-[0.26em] text-white md:text-xl">
                                ARCANA
                            </h2>

                            <p className="mt-1 max-w-xl text-[11px] leading-4 text-slate-400 sm:text-xs sm:leading-5 md:text-sm">
                                {website.key === "arcana"
                                    ? "เว็บไซต์หลักสำหรับสินค้าพรีเมียม คัดสรรคุณภาพและภาพลักษณ์ที่ทันสมัย"
                                    : "เว็บไซต์สำหรับสินค้าค้างสต็อก สินค้า surplus และสินค้าจากโรงงาน"}
                            </p>
                        </div>

                        <div className="shrink-0 self-start sm:self-center">
                            <button
                                type="button"
                                onClick={() => setOpen((prev) => !prev)}
                                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition-all duration-300 hover:border-white/15 hover:bg-white/9 hover:text-white sm:text-sm md:px-4"
                            >
                                {open ? "ซ่อนรายละเอียด" : "ดูรายละเอียด"}
                                <ChevronDown
                                    className={`ml-2 h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Expandable content */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[72vh] opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="border-t border-white/10">
                        <div className="max-h-[72vh] overflow-y-auto px-4 pb-8 pt-5 md:px-6 md:pb-10 md:pt-6">
                            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                                {/* CONTACT */}
                                <div>
                                    <h3 className="mb-5 text-sm font-semibold tracking-wide text-slate-100">
                                        ติดต่อเรา
                                    </h3>

                                    <div className="space-y-4 text-sm leading-7 text-slate-300">
                                        <div>SHIPPO ASAHI MOULDS (THAILAND) CO.,LTD.</div>

                                        <div className="flex gap-3">
                                            <Phone className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                                            <div>
                                                <a
                                                    href="tel:+6627067800"
                                                    className="transition hover:text-white"
                                                >
                                                    Tel: 02-706-7800
                                                </a>
                                                <div>
                                                    Ext. 114 (สอบถามข้อมูลการฝากขายและสั่งซื้อสินค้าบนเว็บไซต์)
                                                </div>
                                                <div>Ext. 104 (สอบถามข้อมูลเกี่ยวกับสินค้าอุตสาหกรรม)</div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Mail className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                                            <a
                                                href="mailto:info_arcana@samt.co.th"
                                                className="transition hover:text-white break-all"
                                            >
                                                info_arcana@samt.co.th
                                            </a>
                                        </div>

                                        <div className="flex gap-3">
                                            <MapPin className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                                            <div>
                                                438 หมู่ 17 นิคมอุตสาหกรรมบางพลี ซอย 7
                                                <br />
                                                ตำบลบางเสาธง อำเภอบางเสาธง
                                                <br />
                                                สมุทรปราการ 10570
                                            </div>
                                        </div>

                                        <a
                                            href="http://www.samt.co.th"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-block underline underline-offset-4 transition hover:text-white break-all"
                                        >
                                            SAMT HP: www.samt.co.th
                                        </a>
                                    </div>
                                </div>

                                {/* POLICY */}
                                <div>
                                    <h3 className="mb-5 text-sm font-semibold tracking-wide text-slate-100">
                                        นโยบาย Arcana
                                    </h3>

                                    <ul className="space-y-3 text-sm text-slate-300">
                                        <li>
                                            <Link href="/terms" className="transition hover:text-white">
                                                เงื่อนไขการให้บริการ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/returns" className="transition hover:text-white">
                                                การเปลี่ยน/คืนสินค้า
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/privacy" className="transition hover:text-white">
                                                นโยบายความเป็นส่วนตัว
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/privacy-details"
                                                className="transition hover:text-white"
                                            >
                                                เกี่ยวกับนโยบายความเป็นส่วนตัว
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* SOCIAL */}
                                <div>
                                    <h3 className="mb-5 text-sm font-semibold tracking-wide text-slate-100">
                                        ติดตามเรา
                                    </h3>

                                    <p className="mb-6 text-sm text-slate-300">
                                        อัปเดตโปรโมชันและสินค้าใหม่ก่อนใคร
                                    </p>

                                    <form className="mb-6 flex overflow-hidden rounded-full border border-white/10 bg-white/6 backdrop-blur-sm">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="h-11 min-w-0 flex-1 bg-transparent px-4 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                                        />
                                        <button
                                            type="submit"
                                            className="shrink-0 border-l border-white/10 px-4 text-xs font-medium text-slate-200 transition hover:bg-white/8 hover:text-white sm:px-5 sm:text-sm"
                                        >
                                            SUBSCRIBE
                                        </button>
                                    </form>

                                    <div className="flex gap-4 text-slate-400">
                                        <a href="#" className="transition hover:text-white">
                                            <FaFacebook className="h-5 w-5" />
                                        </a>
                                        <a href="#" className="transition hover:text-white">
                                            <FaInstagram className="h-5 w-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="my-8 h-px bg-white/10" />

                            <div className="text-center text-sm text-slate-400">
                                © {year || "2024"} ARCANA. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}