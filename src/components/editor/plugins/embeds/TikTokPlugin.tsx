"use client"

import { JSX, useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodeToNearestRoot } from "@lexical/utils"
import { COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from "lexical"
import { $createTikTokNode, TikTokNode } from "../../nodes/embeds/tiktok-node"



export const INSERT_TIKTOK_COMMAND: LexicalCommand<string> = createCommand(
    "INSERT_TIKTOK_COMMAND"
)

export function TikTokPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        if (!editor.hasNodes([TikTokNode])) {
            throw new Error("TikTokPlugin: TikTokNode not registered on editor")
        }

        return editor.registerCommand<string>(
            INSERT_TIKTOK_COMMAND,
            (payload) => {
                const tikTokNode = $createTikTokNode(payload)
                $insertNodeToNearestRoot(tikTokNode)

                return true
            },
            COMMAND_PRIORITY_EDITOR
        )
    }, [editor])

    return null
}