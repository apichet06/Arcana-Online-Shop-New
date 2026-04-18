

import type { Metadata } from "next"
import ViewAllClient from "./ViewAllClient"
import { getCategories } from "@/features/products/api/get-category"

export const metadata: Metadata = {
    title: "สินค้าทั้งหมด | Arcana",
    description: "รวมสินค้าคุณภาพพรีเมียมจาก Arcana พร้อมสินค้าใหม่ สินค้าขายดี และสินค้าแนะนำ",
    alternates: {
        canonical: "/arcana/view-all",
    },
    openGraph: {
        title: "สินค้าทั้งหมด | Arcana",
        description: "รวมสินค้าคุณภาพพรีเมียมจาก Arcana พร้อมสินค้าใหม่ สินค้าขายดี และสินค้าแนะนำ",
        url: "/arcana/view-all",
        siteName: "Arcana",
        type: "website",
        locale: "th_TH",
    },
    twitter: {
        card: "summary_large_image",
        title: "สินค้าทั้งหมด | Arcana",
        description: "รวมสินค้าคุณภาพพรีเมียมจาก Arcana พร้อมสินค้าใหม่ สินค้าขายดี และสินค้าแนะนำ",
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default async function ViewAllPage() {

    return <ViewAllClient />
}

