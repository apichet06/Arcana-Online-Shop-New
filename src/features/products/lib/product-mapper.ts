
import { PRODUCT_TAGS } from "@/lib/tags"
import { getImageUrl } from "@/lib/image"
import { Product, ProductApiItem } from "../types/product"
import { WebsiteKey } from "../../website/types/website"

export function mapCtlIdToWebsite(ctlId: number): WebsiteKey {
    return ctlId === 1 ? "arcana" : "deadstock"
}

export function hasTag(item: ProductApiItem, tagId: number) {
    return item.tags?.some((tag) => tag.ptag_id === tagId) ?? false
}

export function mapProduct(item: ProductApiItem): Product {
    return {
        id: String(item.p_id),
        name: item.name,
        title: item.title,
        image: getImageUrl(item.ip_image_url),
        price: item.min_price,
        minPrice: item.min_price,
        maxPrice: item.max_price,
        hasPriceRange: item.has_price_range === 1,
        discount: item.discount,
        website: mapCtlIdToWebsite(item.ctl_id),
        catalogId: item.ctl_id,
        catalogName: item.ctl_name,
        brandName: item.b_name,
        tags: item.tags || [],
        isBestSeller: hasTag(item, PRODUCT_TAGS.BEST_SELLER),
        isNew: hasTag(item, PRODUCT_TAGS.NEW),
        isFeatured: hasTag(item, PRODUCT_TAGS.FEATURED),
        //   mock ตรงนี้
        rating: 4 + Math.random(),       // 4.0 - 5.0
        reviewCount: Math.floor(Math.random() * 50) + 1,
    }
}