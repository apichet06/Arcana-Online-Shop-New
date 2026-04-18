import { storeShopServie } from "@/features/products/api/get-storeShop"
import StoreDetailCient from "./storeDetailCient"

type Props = {
    params: Promise<{
        id: string
    }>
}

export async function generateStaticParams() {
    const stores = await storeShopServie.getStoreShop()

    const params = stores.map((store) => ({
        id: String(store.st_id),
    }))

    return params
}


export default async function Page({ params }: Props) {
    const { id } = await params

    return (
        <StoreDetailCient st_id={id} />
    )
}
