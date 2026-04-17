import Image from "next/image"
import { Product } from "@/features/products/types/product"
import { formatPrice } from "@/lib/format-price"

type Props = {
    product: Product
}

export default function DeadstockProductCard({ product }: Props) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="relative aspect-square overflow-hidden bg-slate-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 100vw"
                />

                {product.discount > 0 && (
                    <div className="absolute left-3 top-3 rounded-md bg-rose-500 px-2.5 py-1 text-xs font-bold text-white">
                        -{product.discount}%
                    </div>
                )}
            </div>

            <div className="space-y-3 p-4">
                <div className="flex flex-wrap gap-2">
                    {product.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag.ptag_id}
                            className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-700"
                        >
                            {tag.ptag_name}
                        </span>
                    ))}
                </div>

                <h3 className="line-clamp-2 text-sm font-semibold leading-6 text-slate-900 md:text-base">
                    {product.name}
                </h3>

                <div className="space-y-1">
                    {product.hasPriceRange ? (
                        <p className="text-base font-bold text-slate-900">
                            {formatPrice(product.minPrice)} - {formatPrice(product.maxPrice)}
                        </p>
                    ) : (
                        <p className="text-base font-bold text-slate-900">
                            {formatPrice(product.price)}
                        </p>
                    )}

                    <p className="text-xs text-slate-500">สินค้าในกลุ่ม outlet / deadstock</p>
                </div>
            </div>
        </article>
    )
}