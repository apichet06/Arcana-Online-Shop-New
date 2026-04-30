"use client"

import { useEffect, useMemo } from "react"
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ParagraphNode, TextNode } from "lexical"
import { ListItemNode, ListNode } from "@lexical/list"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { AutoLinkNode, LinkNode } from "@lexical/link"

// ใช้ theme เดิมของคุณ
// import { editorTheme } from "@/components/editor/themes/editor-theme"

// ถ้ามี custom node เดิมในระบบคุณ ให้ใส่ตามนี้

import { editorTheme } from "@/components/editor/themes/editor-theme"
import { TweetNode } from "@/components/editor/nodes/embeds/tweet-node"
import { YouTubeNode } from "@/components/editor/nodes/embeds/youtube-node"
import { ImageNode } from "@/components/editor/nodes/image-node"
import { LayoutContainerNode } from "@/components/editor/nodes/layout-container-node"
import { LayoutItemNode } from "@/components/editor/nodes/layout-item-node"
import { TikTokNode } from "@/components/editor/nodes/embeds/tiktok-node"

type Props = {
    value?: string | null
}


function ReadOnlyPlugin() {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        editor.setEditable(false)
    }, [editor])

    return null
}

export default function ProductDescriptionLexical({ value }: Props) {
    const editorConfig: InitialConfigType | null = useMemo(() => {
        if (!value) return null

        return {
            namespace: "product-description-viewer",
            theme: editorTheme,
            nodes: [
                HeadingNode,
                ParagraphNode,
                TextNode,
                QuoteNode,
                LinkNode,
                AutoLinkNode,
                TweetNode,
                YouTubeNode,
                TikTokNode,
                ImageNode,
                ListNode,
                ListItemNode,
                LayoutContainerNode,
                LayoutItemNode,
                TableNode,
                TableRowNode,
                TableCellNode,
            ],
            editorState: value,
            onError(error) {
                console.error(error)
            },
        }
    }, [value])

    if (!value || !editorConfig) {
        return null
    }

    return (
        <LexicalComposer initialConfig={editorConfig}>
            <ReadOnlyPlugin />
            <RichTextPlugin
                contentEditable={

                    <ContentEditable
                        className="
    prose prose-slate max-w-none w-full wrap-break-word text-slate-700

    [&_img]:max-w-full!
    [&_img]:h-auto!
    [&_img]:w-auto!
    [&_img]:rounded-xl

    [&_figure]:max-w-full
    [&_.editor-image]:max-w-full

    [&_table]:block
    [&_table]:w-full
    [&_table]:overflow-x-auto

    [&_iframe]:max-w-full
    [&_iframe]:w-full

    [&_ul]:pl-6
    [&_ol]:pl-6
    [&_li]:my-1

    [&_p]:my-3
    [&_h1]:my-4
    [&_h2]:my-4
    [&_h3]:my-3



  "
                    />

                    //                 <ContentEditable
                    //                     className="
                    //           prose max-w-none w-full wrap-break-word text-slate-700
                    //           [&_img]:max-w-full [&_img]:h-auto
                    //       [&_.editor-image]:my-6
                    // [&_.editor-image_img]:max-w-180
                    // [&_.editor-image_img]:mx-auto
                    // [&_.editor-image_img]:rounded-2xl
                    //           [&_table]:w-full
                    //           [&_table]:block
                    //           [&_table]:overflow-x-auto
                    //           [&_ul]:list-disc [&_ul]:pl-6
                    //           [&_ol]:list-decimal [&_ol]:pl-6
                    //           [&_li]:my-1
                    //           [&_p]:my-3
                    //           [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-4
                    //           [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:my-4
                    //           [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:my-3
                    //         "
                    //                 />
                }
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
            />
        </LexicalComposer>
    )
}