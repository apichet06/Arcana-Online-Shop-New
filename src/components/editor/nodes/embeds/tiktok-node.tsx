import * as React from "react"
import { JSX } from "react"
import { BlockWithAlignableContents } from "@lexical/react/LexicalBlockWithAlignableContents"
import {
    DecoratorBlockNode,
    SerializedDecoratorBlockNode,
} from "@lexical/react/LexicalDecoratorBlockNode"
import type {
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    EditorConfig,
    ElementFormatType,
    LexicalEditor,
    LexicalNode,
    NodeKey,
    Spread,
} from "lexical"

type TikTokComponentProps = Readonly<{
    className: Readonly<{
        base: string
        focus: string
    }>
    format: ElementFormatType | null
    nodeKey: NodeKey
    videoID: string
}>

function TikTokComponent({
    className,
    format,
    nodeKey,
    videoID,
}: TikTokComponentProps) {
    return (
        <BlockWithAlignableContents
            className={className}
            format={format}
            nodeKey={nodeKey}
        >
            <iframe
                width="325"
                height="780"
                src={`https://www.tiktok.com/embed/v2/${videoID}`}
                frameBorder="0"
                allow="encrypted-media; fullscreen"
                allowFullScreen
                title="TikTok video"
            />
        </BlockWithAlignableContents>
    )
}

export type SerializedTikTokNode = Spread<
    {
        videoID: string
    },
    SerializedDecoratorBlockNode
>

function $convertTikTokElement(
    domNode: HTMLElement
): null | DOMConversionOutput {
    const videoID = domNode.getAttribute("data-lexical-tiktok")

    if (videoID) {
        const node = $createTikTokNode(videoID)
        return { node }
    }

    return null
}

export class TikTokNode extends DecoratorBlockNode {
    __id: string

    static getType(): string {
        return "tiktok"
    }

    static clone(node: TikTokNode): TikTokNode {
        return new TikTokNode(node.__id, node.__format, node.__key)
    }

    static importJSON(serializedNode: SerializedTikTokNode): TikTokNode {
        const node = $createTikTokNode(serializedNode.videoID)
        node.setFormat(serializedNode.format)
        return node
    }

    exportJSON(): SerializedTikTokNode {
        return {
            ...super.exportJSON(),
            type: "tiktok",
            version: 1,
            videoID: this.__id,
        }
    }

    constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
        super(format, key)
        this.__id = id
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement("iframe")

        element.setAttribute("data-lexical-tiktok", this.__id)
        element.setAttribute("width", "325")
        element.setAttribute("height", "780")
        element.setAttribute(
            "src",
            `https://www.tiktok.com/embed/v2/${this.__id}`
        )
        element.setAttribute("frameborder", "0")
        element.setAttribute("allow", "encrypted-media; fullscreen")
        element.setAttribute("allowfullscreen", "true")
        element.setAttribute("title", "TikTok video")

        return { element }
    }

    static importDOM(): DOMConversionMap | null {
        return {
            iframe: (domNode: HTMLElement) => {
                if (!domNode.hasAttribute("data-lexical-tiktok")) {
                    return null
                }

                return {
                    conversion: $convertTikTokElement,
                    priority: 1,
                }
            },
        }
    }

    updateDOM(): false {
        return false
    }

    getId(): string {
        return this.__id
    }

    getTextContent(): string {
        return `https://www.tiktok.com/video/${this.__id}`
    }

    decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
        const embedBlockTheme = config.theme.embedBlock || {}

        const className = {
            base: embedBlockTheme.base || "",
            focus: embedBlockTheme.focus || "",
        }

        return (
            <TikTokComponent
                className={className}
                format={this.__format}
                nodeKey={this.getKey()}
                videoID={this.__id}
            />
        )
    }
}

export function $createTikTokNode(videoID: string): TikTokNode {
    return new TikTokNode(videoID)
}

export function $isTikTokNode(
    node: TikTokNode | LexicalNode | null | undefined
): node is TikTokNode {
    return node instanceof TikTokNode
}