import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/arcana/product/ScrollToTop";
import { Suspense } from "react";

const kanit = Kanit({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Arcana / Deadstock",
  description: "Two websites in one Next.js project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${kanit.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        {children}

      </body>
    </html>
  );
}
