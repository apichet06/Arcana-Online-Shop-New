import { API_BASE_URL } from "./api_base"


type FetchOptions = RequestInit & {
    next?: NextFetchRequestConfig
}

export async function apiFetch<T>(path: string, options?: FetchOptions): Promise<T> {
    const url = `${API_BASE_URL}${path}`
    console.log("API_BASE_URL:", API_BASE_URL)
    console.log("FETCH URL:", url)

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
        next: options?.next ?? { revalidate: 60 },
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export { API_BASE_URL }