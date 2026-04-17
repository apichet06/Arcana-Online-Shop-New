import DeadstockHero from "@/components/deadstock/DeadstockHero"
import DeadstockProductSection from "@/components/deadstock/product/DeadstockProductSection"

import { getHomeProducts } from "@/features/products/api/get-products"

import { WEBSITE_CONFIG } from "@/features/website/config/website-config"

export default async function DeadstockPage() {
    const website = WEBSITE_CONFIG.deadstock
    const { bestSeller, newProducts, featuredProducts } = await getHomeProducts({
        website: "deadstock",
        lang: "th",
    })

    return (
        <main className={`min-h-screen ${website.theme.pageBg}`}>
            <DeadstockHero />

            <DeadstockProductSection
                id="best-seller"
                title="สินค้าขายดี"
                description="รายการที่กำลังได้รับความสนใจในกลุ่ม deadstock"
                products={bestSeller}
            />

            <DeadstockProductSection
                id="new-products"
                title="สินค้ามาใหม่"
                description="สินค้าใหม่ล่าสุดในเว็บไซต์ Deadstock"
                products={newProducts}
            />

            <DeadstockProductSection
                id="featured-products"
                title="สินค้าแนะนำ"
                description="รายการเด่นที่คัดมาให้ดูบนหน้าแรก"
                products={featuredProducts}
            />


        </main>
    )
}