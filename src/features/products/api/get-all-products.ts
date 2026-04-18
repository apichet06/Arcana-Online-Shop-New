
import { API_BASE_URL, apiFetch } from "@/lib/api"
import type { Product } from "@/features/products/types/product"
import { PRODUCT_TAGS } from "@/lib/tags"
import { WebsiteKey } from "@/features/website/types/website"

export type GetProductsParams = {
    website: string
    lang?: string
    keyword?: string
    sort?: string
    page?: number
    limit?: number
}

type ProductTag = {
    ptag_id: number
    ptag_name: string
}

type ProductShopApiItem = {
    p_id: number
    p_isActive: number
    name: string
    title: string
    ip_image_url: string | null
    min_price: number
    max_price: number
    discount: number
    c_id: number | null
    ctl_id: number | null
    ctl_name: string | null
    b_id: number | null
    b_name: string | null
    has_price_range: number
    st_id: number
    tags: ProductTag[]
}

type ProductShopApiResponse = {
    data: {
        items: ProductShopApiItem[]
        pagination: {
            total: number
            page: number
            limit: number
            totalPages: number
        }
    }
}

export type ProductListResult = {
    items: Product[]
    pagination: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

function buildQuery(params: Record<string, string | number | undefined>) {
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return
        searchParams.set(key, String(value))
    })

    return searchParams.toString()
}

export async function getAllProducts({
    website,
    lang = "th",
    keyword = "",
    sort = "all",
    page = 1,
    limit = 12,
}: GetProductsParams): Promise<ProductListResult> {
    const qs = buildQuery({
        keyword,
        sort,
        page,
        limit,
    })

    const res = await apiFetch<ProductShopApiResponse>(
        `${API_BASE_URL}/${website}/product-shop/${lang}?${qs}`
    )

    const items: Product[] = res.data.items.map((item) => {
        const minPrice = Number(item.min_price ?? 0)
        const maxPrice = Number(item.max_price ?? 0)
        const discount = Number(item.discount ?? 0)

        return {
            id: String(item.p_id),
            name: String(item.name ?? ""),
            title: String(item.title ?? ""),
            image: item.ip_image_url ?? "/images/placeholder.png",
            price: minPrice,
            minPrice,
            maxPrice,
            hasPriceRange: Boolean(item.has_price_range),
            discount,
            categoryId: Number(item.c_id ?? 0),
            website: website as WebsiteKey,
            catalogId: Number(item.ctl_id ?? 0),
            catalogName: String(item.ctl_name ?? ""),
            brandName: String(item.b_name ?? ""),
            st_id: Number(item.st_id),
            tags: item.tags ?? [],
            isBestSeller: (item.tags ?? []).some(
                (tag) => tag.ptag_id === PRODUCT_TAGS.BEST_SELLER
            ),
            isNew: (item.tags ?? []).some(
                (tag) => tag.ptag_id === PRODUCT_TAGS.NEW
            ),
            isFeatured: (item.tags ?? []).some(
                (tag) => tag.ptag_id === PRODUCT_TAGS.FEATURED
            ),
            isActive: Boolean(item.p_isActive),
        }
    })

    return {
        items,
        pagination: res.data.pagination,
    }
}