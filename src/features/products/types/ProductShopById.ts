export type ProductTag = {
    ptag_id: number
    ptag_name: string
}

export type ProductImage = {
    ip_id: number
    ip_image_url: string
    is_primary: number | null
}

export type ProductVariant = {
    pv_id: number
    pv_sku: string
    pv_cost: number
    pv_price: number
    discount: number
    is_default: number
    image_url: string | null
    weight_g: string
    length_cm: string
    width_cm: string
    height_cm: string
    unit_id: number
    unit_name: string
    on_hand: number
    reserved_qty: number
    variant_label: string
}

export type ProductOptionItem = {
    poi_id: number
    poi_value: string
}

export type ProductOptionGroup = {
    potn_id: number
    otype_id: number
    otype_code: string
    otype_name: string
    items: ProductOptionItem[]
}

export type ProductDetail = {
    st_id: number
    p_id: number
    p_isActive: number
    name: string
    title: string
    ps_name: string
    c_id: number
    ctl_id: number
    ctl_name: string
    cl_name: string
    b_id: number
    b_name: string
    p_description: string
    st_company_name: string
    st_image: string | null
    min_price: number
    max_price: number
    discount: number
    has_price_range: number
    thumbnail: string | null
    tags: ProductTag[]

}

export type InventoryStore = {
    InventoryStoreProvince: string
}


export type LandingPageNameDTO = {
    lp_id: number
    lp_title: string
    lp_imag_url: string
    lp_slug: string
    p_id: number
    lg_code: string
    st_id: number
};

export type ProductShopByIdData = {
    product: ProductDetail
    images: ProductImage[]
    variants: ProductVariant[]
    options: ProductOptionGroup[]
    InventoryStore: InventoryStore[]
    landingPage: LandingPageNameDTO[]
}

export type ProductShopByIdResponse = {
    data: ProductShopByIdData
}

export type LandingPageProduct = {
    lp_id: number
    lp_title: string
    lp_imag_url: string
    lp_slug: string
    p_id: number
    lg_code: string
    st_id: number
    lp_description: string
    lp_seo_title?: string | null
    lp_seo_description?: string | null

}


export type LandingPageResponse = {
    data: LandingPageProduct
}