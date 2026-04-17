import { WebsiteKey } from "../../website/types/website"



export type ProductTag = {
    ptag_id: number
    ptag_name: string
}

export type ProductApiItem = {
    p_id: number
    p_isActive: number
    name: string
    title: string
    ip_image_url: string
    min_price: number
    max_price: number
    discount: number
    c_id: number
    ctl_id: number
    ctl_name: string
    b_id: number
    b_name: string
    has_price_range: number
    tags: ProductTag[]
}

export type ProductApiResponse = {
    data: {
        items: ProductApiItem[]
        pagination: {
            total: number
            page: number
            limit: number
            totalPages: number
        }
    }
}

export type Product = {
    id: string
    name: string
    title: string
    image: string
    price: number
    minPrice: number
    maxPrice: number
    hasPriceRange: boolean
    discount: number
    website: WebsiteKey
    catalogId: number
    catalogName: string
    brandName: string
    tags: ProductTag[]
    isBestSeller: boolean
    isNew: boolean
    rating?: number
    reviewCount?: number
    isFeatured: boolean
    isActive: boolean
}