export type ProductByStId = {
    p_id: number
    p_name: string
    p_title: string
    ip_image_url: string
    min_price: number | null
    max_price: number | null
    discount: number
    has_price_range: number
}

export type ProductByStIdResponse = {
    data: ProductByStId[]
}