import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductDetailClient from "./ProductDetailClient"
import { getProductById } from "@/features/products/api/get-product-by-id"
import { getProducts } from "@/features/products/api/get-products"
import { API_BASE_URL } from "@/lib/api"
import type { ProductShopByIdData } from "@/features/products/types/ProductShopById"
import { getDescriptionFromLexical } from "../../lp/[slug]/page"
import { SITE_URL } from "@/lib/api_base"

type Props = {
    params: Promise<{
        id: string
    }>
}


function toAbsoluteImageUrl(path?: string | null) {
    if (!path) return "/images/placeholder.png"
    if (path.startsWith("http")) return path
    return `${API_BASE_URL}/${path}`
}

export async function generateStaticParams() {
    const products = await getProducts({
        website: "arcana",
        lang: "th",
    })

    return products.items.map((product) => ({
        id: String(product.id),
    }))
}

export function buildProductJsonLd(data: ProductShopByIdData, productId: number) {
    const { product, images, variants } = data

    const defaultVariant =
        variants.find((v) => v.is_default === 1) || variants[0] || null

    const image =
        defaultVariant?.image_url ||
        images[0]?.ip_image_url ||
        product.thumbnail ||
        "/images/placeholder.png"

    const price = defaultVariant?.pv_price ?? product.min_price ?? 0
    const totalStock = variants.reduce((sum, variant) => sum + Number(variant.on_hand || 0), 0)

    const description =
        getDescriptionFromLexical(product.p_description)?.slice(0, 160) ||
        `เลือกซื้อ ${product.title || product.name || "สินค้า"} จาก Arcana`

    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title || product.name || "Product",
        image: [toAbsoluteImageUrl(image)],
        description,
        sku: defaultVariant?.pv_sku || undefined,
        brand: {
            "@type": "Brand",
            name: product.b_name || "Arcana",
        },
        category: product.cl_name || undefined,
        itemCondition: "https://schema.org/NewCondition",
        offers: {
            "@type": "Offer",
            priceCurrency: "THB",
            price: String(price),
            availability:
                totalStock > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
            url: `/arcana/product/${productId}`,
        },
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params

    if (!id || Number.isNaN(Number(id))) {
        return {
            title: "ไม่พบสินค้า | Arcana",
            description: "ไม่พบข้อมูลสินค้าที่คุณต้องการ",
            robots: {
                index: false,
                follow: false,
            },
        }
    }

    const data = await getProductById({
        p_id: Number(id),
        lang: "th",
    })

    if (!data) {
        return {
            title: "ไม่พบสินค้า | Arcana",
            description: "ไม่พบข้อมูลสินค้าที่คุณต้องการ",
            robots: {
                index: false,
                follow: false,
            },
        }
    }

    const { product, images, variants } = data

    const defaultVariant =
        variants.find((v) => v.is_default === 1) || variants[0] || null

    const image =
        defaultVariant?.image_url ||
        images[0]?.ip_image_url ||
        product.thumbnail ||
        "/images/placeholder.png"

    const productName = product.title || product.name || "สินค้า"
    const title = `${productName} | Arcana`

    const description =
        getDescriptionFromLexical(product.p_description, 160) ||
        `เลือกซื้อ ${productName} จาก Arcana`

    const pageUrl = `${SITE_URL}/arcana/product/${id}`
    const absoluteImageUrl = toAbsoluteImageUrl(image)

    return {
        title,
        description,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: "Arcana",
            type: "website",
            locale: "th_TH",
            images: [
                {
                    url: absoluteImageUrl,
                    alt: productName,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [absoluteImageUrl],
        },
        robots: {
            index: true,
            follow: true,
        },
    }
}

export default async function Page({ params }: Props) {
    const { id } = await params

    if (!id || Number.isNaN(Number(id))) {
        notFound()
    }

    const data = await getProductById({
        p_id: Number(id),
        lang: "th",
    })

    if (!data) {
        notFound()
    }

    const jsonLd = buildProductJsonLd(data, Number(id))

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailClient id={Number(id)} />
        </>
    )
}