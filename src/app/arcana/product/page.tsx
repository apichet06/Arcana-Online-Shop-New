import type { Metadata } from "next";
import { Suspense } from "react";
import ProductDetailClient from "./ProductDetailClient";
import Skeletons from "@/components/shared/common/skeleton";

export const metadata: Metadata = {
    title: "สินค้า | Arcana",
    description: "รายละเอียดสินค้า Arcana",
    robots: {
        index: true,
        follow: true,
    },
};

export default function ProductPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-100 items-center justify-center">
                    <Skeletons />
                </div>
            }
        >
            <ProductDetailClient />
        </Suspense>
    );
}