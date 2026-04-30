import { API_BASE_URL } from "./api_base"

type FetchOptions = RequestInit & {
    next?: NextFetchRequestConfig
}

export async function apiFetch<T>(path: string, options?: FetchOptions): Promise<T> {
    const url = `${API_BASE_URL}${path}`
    console.log("API_BASE_URL:", API_BASE_URL)
    console.log("FETCH URL:", url)

    const headers = new Headers(options?.headers)

    // const method = (options?.method || "GET").toUpperCase()
    const hasBody = options?.body != null

    if (hasBody && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json")
    }

    const response = await fetch(url, {
        ...options,
        headers,
        next: options?.next ?? { revalidate: 60 },
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export { API_BASE_URL }