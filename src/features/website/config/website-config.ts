import { WebsiteKey } from "../types/website"

export type WebsiteConfig = {
    key: WebsiteKey
    name: string
    title: string
    basePath: string
    otherWebsitePath: string
    otherWebsiteLabel: string
    ctlId: number
    theme: {
        pageBg: string
        headerClass: string
        footerClass: string
        primaryButton: string
        secondaryButton: string
        border: string
        text: string
        mutedText: string
    }
}

export const WEBSITE_CONFIG: Record<WebsiteKey, WebsiteConfig> = {
    arcana: {
        key: "arcana",
        name: "Arcana",
        title: "Arcana Premium Online Shop",
        basePath: "/arcana",
        otherWebsitePath: "/deadstock",
        otherWebsiteLabel: "Deadstock",
        ctlId: 1,
        theme: {
            pageBg:
                "bg-[linear-gradient(135deg,#ffffff_0%,#eef5ff_20%,#d9e8ff_45%,#b8d0f5_72%,#7fa7de_100%)]",
            headerClass:
                "border-b border-white/60 bg-white/80 backdrop-blur-xl",
            footerClass:
                "border-t border-white/60 bg-white/70 backdrop-blur-xl",
            primaryButton:
                "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500",
            secondaryButton:
                "border border-sky-200 bg-white/85 text-slate-800 hover:bg-sky-50",
            border: "border-sky-100",
            text: "text-slate-900",
            mutedText: "text-slate-600",
        },
    },

    deadstock: {
        key: "deadstock",
        name: "Deadstock",
        title: "Deadstock Factory Goods",
        basePath: "/deadstock",
        otherWebsitePath: "/arcana",
        otherWebsiteLabel: "Arcana",
        ctlId: 2,
        theme: {
            pageBg:
                "bg-[linear-gradient(180deg,#fafafa_0%,#f3f4f6_50%,#fafafa_100%)]",
            headerClass:
                "border-b border-slate-200 bg-white/90 backdrop-blur-xl",
            footerClass:
                "border-t border-slate-200 bg-white/90 backdrop-blur-xl",
            primaryButton:
                "bg-gradient-to-r from-slate-700 via-slate-800 to-zinc-900 text-white hover:from-slate-600 hover:via-slate-700 hover:to-zinc-800",
            secondaryButton:
                "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
            border: "border-slate-200",
            text: "text-slate-900",
            mutedText: "text-slate-600",
        },
    },
}