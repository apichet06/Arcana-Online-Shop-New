// app/arcana/layout.tsx
import MainHeader from "@/components/shared/navigation/MainHeader"
import MainFooter from "@/components/shared/footer/MainFooter"
import { WEBSITE_CONFIG } from "@/features/website/config/website-config"
import ScrollToTopButton from "@/components/shared/navigation/ScrollToTopButton"

export default function ArcanaLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const website = WEBSITE_CONFIG.arcana

    return (
        <>
            <MainHeader website={website} />
            <main className={`min-h-screen ${website.theme.pageBg}`}>{children}</main>
            <MainFooter website={website} />
            <ScrollToTopButton />
        </>
    )
}