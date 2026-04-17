import type { ReactNode } from "react"

export type LexicalNode = {
  type?: string
  text?: string
  tag?: string
  listType?: string
  children?: LexicalNode[]
}

export function parseLexicalDescription(
  jsonString?: string | null
): LexicalNode | null {
  if (!jsonString) return null

  try {
    return JSON.parse(jsonString) as LexicalNode
  } catch (error) {
    console.error("Invalid Lexical JSON:", error)
    return null
  }
}

function renderTextChildren(children?: LexicalNode[]): ReactNode {
  if (!children || children.length === 0) return null

  return children.map((child, index) => {
    if (child.type === "linebreak") {
      return <br key={index} />
    }

    return child.text ?? ""
  })
}

export function renderLexicalNodes(nodes?: LexicalNode[]): ReactNode {
  if (!nodes || nodes.length === 0) return null

  return nodes.map((node, index) => {
    if (node.type === "paragraph") {
      return (
        <p key={index} className="leading-7 text-slate-700">
          {renderTextChildren(node.children)}
        </p>
      )
    }

    if (node.type === "list") {
      const isOrdered = node.tag === "ol"
      const ListTag = isOrdered ? "ol" : "ul"

      return (
        <ListTag
          key={index}
          className={
            isOrdered
              ? "list-decimal space-y-2 pl-5 text-slate-700"
              : "list-disc space-y-2 pl-5 text-slate-700"
          }
        >
          {node.children?.map((item, itemIndex) => (
            <li key={itemIndex}>
              {renderTextChildren(item.children)}
            </li>
          )) ?? null}
        </ListTag>
      )
    }

    return null
  })
}