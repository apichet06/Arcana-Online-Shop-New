// app/deadstock/layout.tsx
import MainHeader from "@/components/shared/navigation/MainHeader"
import MainFooter from "@/components/shared/footer/MainFooter"
import { WEBSITE_CONFIG } from "@/features/website/config/website-config"

export default function DeadstockLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const website = WEBSITE_CONFIG.deadstock

    return (
        <>
            <MainHeader website={website} />
            <main>{children}</main>
            <MainFooter website={website} />
        </>
    )
}