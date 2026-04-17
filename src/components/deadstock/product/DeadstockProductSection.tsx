import Container from "@/components/shared/layout/Container"
import { Product } from "@/features/products/types/product"
import DeadstockProductGrid from "./DeadstockProductGrid"

type Props = {
    id: string
    title: string
    description: string
    products: Product[]
}

export default function DeadstockProductSection({
    id,
    title,
    description,
    products,
}: Props) {
    return (
        <section id={id} className="py-12">
            <Container className="space-y-6">
                <div className="space-y-2">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                        Deadstock Selection
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                        {title}
                    </h2>
                    <p className="text-sm text-slate-600 md:text-base">{description}</p>
                </div>

                <DeadstockProductGrid products={products} />
            </Container>
        </section>
    )
}