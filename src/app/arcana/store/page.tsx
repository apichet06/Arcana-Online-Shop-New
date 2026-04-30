import { Suspense } from "react"
import Skeletons from "@/components/shared/common/skeleton"
import StoreDetailCient from "./storeDetailCient"


export default async function Page() {


    return (
        <Suspense
            fallback={
                <div className="flex min-h-100 items-center justify-center">
                    <Skeletons />
                </div>
            }
        >
            <StoreDetailCient />
        </Suspense>
    )
}
