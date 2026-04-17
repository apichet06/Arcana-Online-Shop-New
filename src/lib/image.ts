import { API_BASE_URL } from "./api"

export function getImageUrl(path?: string | null) {
    if (!path) return "/placeholder-product.jpg"

    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path
    }

    return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`
}