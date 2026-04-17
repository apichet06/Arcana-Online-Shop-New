import { Product } from "@/features/products/types/product"
import DeadstockProductCard from "./DeadstockProductCard"

type Props = {
    products: Product[]
}

export default function DeadstockProductGrid({ products }: Props) {
    if (!products.length) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                ยังไม่มีสินค้าในหมวดนี้
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
                <DeadstockProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}