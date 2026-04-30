"use client"

import { VideoIcon } from "lucide-react"
import { useState } from "react"

import { useToolbarContext } from "@/components/editor/context/toolbar-context"
import { SelectItem } from "@/components/ui/select"
import { INSERT_TIKTOK_COMMAND } from "../../embeds/TikTokPlugin"

export function InsertTikTok() {
    const { activeEditor, showModal } = useToolbarContext()

    return (
        <SelectItem
            value="tiktok"
            onPointerUp={() =>
                showModal("Insert TikTok Video", (onClose) => (
                    <TikTokDialog
                        editor={activeEditor}
                        onClose={onClose}
                    />
                ))
            }
        >
            <div className="flex items-center gap-1">
                <VideoIcon className="size-4" />
                <span>TikTok Video</span>
            </div>
        </SelectItem>
    )
}

function TikTokDialog({
    editor,
    onClose,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editor: any
    onClose: () => void
}) {
    const [url, setUrl] = useState("")

    const handleInsert = () => {
        const videoId = getTikTokVideoId(url)

        if (!videoId) {
            alert("Invalid TikTok URL")
            return
        }

        editor.dispatchCommand(
            INSERT_TIKTOK_COMMAND,
            videoId
        )

        onClose()
    }

    return (
        <div className="space-y-4">
            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste TikTok URL"
                className="w-full border px-3 py-2 rounded-md"
            />

            <button
                onClick={handleInsert}
                className="px-4 py-2 bg-black text-white rounded-md"
            >
                Insert
            </button>
        </div>
    )
}

function getTikTokVideoId(url: string) {
    const match = url.match(/video\/(\d+)/)
    return match?.[1] ?? null
}