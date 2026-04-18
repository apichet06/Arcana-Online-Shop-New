export type StoreShop = {
    st_id: number;
    st_company_name: string;
    st_phone: string;
    st_image: string;
    st_email: string;
    st_isAccept: string;
}

export type StoreShopResponse = {
    data: StoreShop[]
}
export type StoreShopByIdResponse = {
    data: StoreShop
}