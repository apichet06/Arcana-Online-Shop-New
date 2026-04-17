import Container from "@/components/shared/layout/Container"
import { Product } from "@/features/products/types/product"
import ArcanaProductGrid from "./ArcanaProductGrid"
import Link from "next/link"

type Props = {
    id: string
    title: string
    description: string
    products: Product[]
    href: string
}

export default function ArcanaProductSection({
    id,
    title,
    description,
    products,
    href,
}: Props) {
    return (
        <section id={id} className="py-12 md:py-16">
            <Container className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">
                            Arcana Collection
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                            {title}
                        </h2>

                        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
                            {description}
                        </p>
                    </div>

                    <Link
                        href={href}
                        className="
                            inline-flex items-center gap-2 rounded-full
                            border border-sky-200/70 bg-white/80 px-4 py-2
                            text-sm font-medium text-sky-700
                            shadow-[0_8px_30px_rgba(14,165,233,0.10)]
                            backdrop-blur-md transition-all duration-300
                            hover:-translate-y-0.5 hover:border-sky-300
                            hover:bg-sky-50 hover:text-sky-800
                            hover:shadow-[0_14px_40px_rgba(37,99,235,0.18)]
                        "
                    >
                        ดูทั้งหมด
                        <span aria-hidden>→</span>
                    </Link>
                </div>

                <ArcanaProductGrid products={products} />
            </Container>
        </section>
    )
}