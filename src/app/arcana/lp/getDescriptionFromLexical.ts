
type LexicalNode = {
    type?: string
    text?: string
    children?: LexicalNode[]
}

function extractTextFromLexical(node?: LexicalNode): string {
    if (!node) return ""

    let result = ""

    if (node.text) {
        result += node.text + " "
    }

    if (Array.isArray(node.children)) {
        for (const child of node.children) {
            result += extractTextFromLexical(child)
        }
    }

    return result
}

export function getDescriptionFromLexical(jsonString?: string, maxLength = 160): string {
    if (!jsonString) return ""

    try {
        const parsed = JSON.parse(jsonString)
        const text = extractTextFromLexical(parsed.root).replace(/\s+/g, " ").trim()

        if (!text) return ""
        return text.length > maxLength ? text.slice(0, maxLength).trim() + "..." : text
    } catch (error) {
        console.error("Invalid Lexical JSON:", error)
        return ""
    }
}
