"use client"

import { useEffect, useState } from "react"
import ArcanaHero from "@/components/arcana/ArcanaHero"
import FullWidthHeroSlider from "@/components/arcana/FullWidthHeroSlider"
import ArcanaProductSection from "@/components/arcana/product/ArcanaProductSection"
import WhatIsArcanaSection from "@/components/arcana/WhatIsArcanaSection"

import { getHomeProducts } from "@/features/products/api/get-products"
import { DEFAULT_LANGUAGE, Language, LANGUAGE_COOKIE } from "@/lib/i18n"
import { Product } from "@/features/products/types/product"
import { getCookie, getInitialLanguage } from "@/lib/cookies"
import { Category } from "@/features/products/types/category"
import { getCategories } from "@/features/products/api/get-category"
import ArcanaCategorySection from "@/components/arcana/product/ArcanaCategorySection"

type HomeProductsResult = {
    bestSeller: Product[]
    newProducts: Product[]
    featuredProducts: Product[]
}

export default function ArcanaPageClient() {
    const [lang, setLang] = useState<Language>(getInitialLanguage)
    const [data, setData] = useState<HomeProductsResult | null>(null)
    const [categoryData, setCategoryData] = useState<Category[] | null>(null)

    useEffect(() => {
        const cookieLang = getCookie(LANGUAGE_COOKIE) || DEFAULT_LANGUAGE
        if (cookieLang !== lang) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLang(cookieLang as Language)
        }
    }, [lang])

    useEffect(() => {
        let cancelled = false

        async function loadProducts() {
            const result = await getHomeProducts({
                website: "arcana",
                lang,
            })

            if (!cancelled) {
                setData(result)
            }
        }

        async function loadCategory() {
            const result = await getCategories({
                lang,
            })

            if (!cancelled) {
                setCategoryData(result)
            }
        }

        loadProducts()
        loadCategory()

        return () => {
            cancelled = true
        }
    }, [lang])

    if (!data) {
        return <div className="py-20 text-center text-slate-500">Loading...</div>
    }

    const { bestSeller, newProducts, featuredProducts } = data

    return (
        <>
            <ArcanaHero />

            {categoryData && categoryData.length > 0 ? (
                <ArcanaCategorySection categories={categoryData} lang={lang} />
            ) : null}

            <ArcanaProductSection
                id="best-seller"
                title="สินค้าขายดี"
                description="สินค้าที่ได้รับความนิยมและถูกเลือกซื้อมากที่สุด"
                products={bestSeller}
                href="/arcana/view-all?sort=popular"
            />

            <ArcanaProductSection
                id="new-products"
                title="สินค้ามาใหม่"
                description="อัปเดตสินค้าล่าสุดของเว็บไซต์ Arcana"
                products={newProducts}
                href="/arcana/view-all?sort=new"
            />

            <ArcanaProductSection
                id="featured-products"
                title="สินค้าแนะนำ"
                description="รายการที่คัดมาเป็นพิเศษสำหรับหน้าแรก"
                products={featuredProducts}
                href="/arcana/view-all?sort=featured"
            />

            <FullWidthHeroSlider />
            <WhatIsArcanaSection />
        </>
    )
}