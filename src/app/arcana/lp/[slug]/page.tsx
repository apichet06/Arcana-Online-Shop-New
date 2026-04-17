import { Metadata } from "next"
import { notFound } from "next/navigation"
import { GetLandingPage } from "@/features/products/api/get-landingpage"
import LandingPageDetailView from "./LandingPageDetailView"
import { SITE_URL } from "@/lib/api_base"
import { getLpSlugs } from "@/features/products/api/get-landingpageSluge"


type Props = {
    params: Promise<{
        slug: string
    }>
}

type LexicalNode = {
    type?: string
    text?: string
    children?: LexicalNode[]
}

function extractTextFromLexical(node?: LexicalNode): string {
    if (!node) return ""

    let result = ""

    if (node.text) {
        result += node.text + " "
    }

    if (Array.isArray(node.children)) {
        for (const child of node.children) {
            result += extractTextFromLexical(child)
        }
    }

    return result
}

export function getDescriptionFromLexical(jsonString?: string, maxLength = 160): string {
    if (!jsonString) return ""

    try {
        const parsed = JSON.parse(jsonString)
        const text = extractTextFromLexical(parsed.root).replace(/\s+/g, " ").trim()

        if (!text) return ""
        return text.length > maxLength ? text.slice(0, maxLength).trim() + "..." : text
    } catch (error) {
        console.error("Invalid Lexical JSON:", error)
        return ""
    }
}

export async function generateStaticParams() {
    try {
        const slugs = await getLpSlugs();

        return slugs.map((item) => ({
            slug: item.lp_slug,
        }));
    } catch (error) {
        console.error("Failed to fetch landing page slugs:", error);
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const landingPageData = await GetLandingPage({ slug })

    const landingPage = Array.isArray(landingPageData)
        ? landingPageData[0]
        : landingPageData

    if (!landingPage) {
        return {
            title: "Landing Page Not Found",
            description: "The requested landing page could not be found.",
        }
    }

    const title =
        landingPage.lp_seo_title?.trim() ||
        landingPage.lp_title?.trim() ||
        "Landing Page"

    const description =
        landingPage.lp_seo_description?.trim() ||
        getDescriptionFromLexical(landingPage.lp_description) ||
        "Discover more details on this landing page."

    const imageUrl = landingPage.lp_imag_url
        ? `${SITE_URL}/${landingPage.lp_imag_url}`
        : undefined

    const pageUrl = `${SITE_URL}/arcana/lp/${landingPage.lp_slug}`

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
            images: imageUrl
                ? [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ]
                : [],
            locale:
                landingPage.lg_code === "ja"
                    ? "ja_JP"
                    : landingPage.lg_code === "en"
                        ? "en_US"
                        : "th_TH",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: imageUrl ? [imageUrl] : [],
        },
    }
}

export default async function LandingPageDetail({ params }: Props) {
    const { slug } = await params
    const landingPageData = await GetLandingPage({ slug })

    const landingPage = Array.isArray(landingPageData)
        ? landingPageData[0]
        : landingPageData

    if (!landingPage) {
        notFound()
    }

    return <LandingPageDetailView landingPage={landingPage} />
}