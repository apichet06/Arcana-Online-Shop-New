import Link from "next/link"
import Container from "../shared/layout/Container"

export default function DeadstockHero() {
    return (
        <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#fafafa_0%,#f4f4f5_45%,#e5e7eb_100%)]">
            <Container className="grid min-h-110 items-center gap-10 py-16 md:grid-cols-2">
                <div className="space-y-6">
                    <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700">
                        Deadstock Website
                    </span>

                    <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-6xl">
                        สินค้าค้างสต็อก
                        <br />
                        และสินค้าจากโรงงาน
                    </h1>

                    <p className="max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                        เว็บไซต์สำหรับสินค้ากลุ่ม outlet, surplus และ deadstock
                        ที่ต้องการแยกอารมณ์การขายออกจาก Arcana อย่างชัดเจน
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <a
                            href="#best-seller"
                            className="inline-flex items-center rounded-full bg-linear-to-r from-slate-700 to-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
                        >
                            ดูสินค้าขายดี
                        </a>

                        <Link
                            href="/arcana"
                            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
                        >
                            ไปเว็บ Arcana
                        </Link>
                    </div>
                </div>

                <div className="rounded-4xl border border-white/60 bg-white/85 p-6 shadow-xl">
                    <div className="space-y-4">
                        <div className="rounded-3xl bg-slate-100 p-6">
                            <p className="text-sm text-slate-500">Website Role</p>
                            <p className="mt-2 text-lg font-semibold text-slate-900">
                                Outlet / Deadstock Store
                            </p>
                        </div>

                        <div className="rounded-3xl bg-zinc-100 p-6">
                            <p className="text-sm text-slate-500">Style</p>
                            <p className="mt-2 text-lg font-semibold text-slate-900">
                                Simple / Strong / Sale-focused
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}