
import { Suspense } from "react"
import Skeletons from "@/components/shared/common/skeleton"
import LandingPageDetailView from "./LandingPageDetailView"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: "Arcana Landing Page",
    description: "Landing page และโปรโมชั่นจาก Arcana",
    robots: {
        index: true,
        follow: true,
    },
};


export default function LandingPageDetail() {

    return (
        <Suspense
            fallback={
                <div className="flex min-h-100 items-center justify-center">
                    <Skeletons />
                </div>
            }
        >
            <LandingPageDetailView />
        </Suspense>
    )
}