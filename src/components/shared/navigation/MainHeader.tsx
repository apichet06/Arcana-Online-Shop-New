"use client"

import Link from "next/link"
import Container from "../layout/Container"
import { WebsiteConfig } from "@/features/website/config/website-config"
import Image from "next/image"
import { ShoppingBasket } from "lucide-react"
import ProductSearchForm from "@/components/arcana/product/ProductSearchForm"
import LanguageSwitcher from "../common/LanguageSwitcher"

type Props = {
    website: WebsiteConfig
}

export default function MainHeader({ website }: Props) {

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-slate-200">
            <Container className="mx-auto flex h-16 w-full max-w-350 items-center justify-between px-6">
                {/* Logo / Brand */}
                <Link href={website.basePath} className="flex shrink-0 items-center gap-3">
                    <Image
                        src="/images/arcanalogo.jpg"
                        width={35}
                        height={35}
                        alt="Arcana Logo"
                        className="rounded-xl border border-slate-200 bg-white/70 shadow-sm"
                    />

                    <div className="leading-tight">
                        <div className="text-sm font-semibold text-slate-900 md:text-base">
                            {website.title || website.name}
                        </div>
                        <div className="hidden text-[11px] text-slate-500 sm:block"></div>
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className="ml-4 hidden items-center gap-1 xl:flex">
                    <Link
                        href={website.basePath}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-slate-900"
                    >
                        หน้าแรก
                    </Link>

                    <Link
                        href="/arcana#what-is-arcana"
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-slate-900"
                    >
                        เกี่ยวกับเรา
                    </Link>

                    <Link
                        href="/seller/register"
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-slate-900"
                    >
                        สมัครเป็นผู้ขาย
                    </Link>

                    <Link
                        href={website.basePath}
                        className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-white/70 hover:text-slate-900"
                    >
                        <ShoppingBasket size={18} />
                    </Link>
                </nav>

                {/* Search */}
                <div className="hidden flex-1 justify-center lg:flex">
                    <ProductSearchForm className="w-full max-w-md" />
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2">
                    {/* Language Selector */}
                    <LanguageSwitcher />

                    <Link
                        href="/login"
                        className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-slate-900 lg:inline-flex"
                    >
                        เข้าสู่ระบบ
                    </Link>

                    <Link
                        href="/register"
                        className="
                            hidden lg:inline-flex items-center justify-center
                            rounded-full px-3.5 py-1.5 text-xs font-medium text-white
                            bg-linear-to-r from-sky-500 to-blue-600
                            shadow-sm shadow-blue-500/20
                            transition-all duration-300
                            hover:from-sky-400 hover:to-blue-500
                            hover:shadow-blue-500/40
                            hover:-translate-y-0.5
                        "
                    >
                        สมัครสมาชิก
                    </Link>
                </div>
            </Container>
        </header>
    )
}