import { WEBSITE_CONFIG } from "@/features/website/config/website-config"
import { WebsiteKey } from "@/features/website/types/website"
import { apiFetch } from "@/lib/api"
import { PRODUCT_TAGS } from "@/lib/tags"
import { Product, ProductApiResponse } from "../types/product"
import { mapProduct } from "../lib/product-mapper"

type GetProductsParams = {
  website: WebsiteKey
  lang?: "th" | "en" | "ja",
  keyword?: string
  sort?: string
  category?: number
  page?: number
  limit?: number
}



export async function getProducts({ website, lang = "th", keyword = "", sort = "all", page = 1, category, limit = 12, }: GetProductsParams): Promise<{
  items: Product[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}> {
  const ctlId = WEBSITE_CONFIG[website].ctlId

  const params = new URLSearchParams()
  if (keyword.trim()) {
    params.set("keyword", keyword.trim())
  }
  if (sort && sort !== "all") {
    params.set("sort", sort)
  }
  if (typeof category === "number" && category > 0) {
    params.set("category", String(category))
  }
  params.set("page", String(page))
  params.set("limit", String(limit))

  const res = await apiFetch<ProductApiResponse>(`/productShop/${lang}?${params.toString()}`)

  const items = (res.data.items || [])
    .filter((item) => item.p_isActive === 1 && item.ctl_id === ctlId)
    .map(mapProduct)

  return {
    items,
    pagination: res.data.pagination,
  }
}

export async function getHomeProducts({
  website,
  lang = "th",
}: GetProductsParams) {
  const products = await getProducts({ website, lang })

  return {
    bestSeller: products.items.filter((product) =>
      product.tags.some((tag) => tag.ptag_id === PRODUCT_TAGS.BEST_SELLER)
    ),
    newProducts: products.items.filter((product) =>
      product.tags.some((tag) => tag.ptag_id === PRODUCT_TAGS.NEW)
    ),
    featuredProducts: products.items.filter((product) =>
      product.tags.some((tag) => tag.ptag_id === PRODUCT_TAGS.FEATURED)
    ),
  }
}

export type ViewAllSortType =
  | "all"
  | "new"
  | "popular"
  | "featured"
  | "price-low"
  | "price-high"

type GetViewAllProductsParams = {
  website: WebsiteKey
  lang?: "th" | "en" | "ja"
  sort?: string
  page?: number
  pageSize?: number
}

export async function getViewAllProducts({
  website,
  lang = "th",
  sort = "all",
  page = 1,
  pageSize = 12,
}: GetViewAllProductsParams) {
  const products = await getProducts({ website, lang })

  let filteredProducts = [...products.items]

  switch (sort as ViewAllSortType) {
    case "new":
      filteredProducts = filteredProducts.filter((product) =>
        product.tags.some((tag) => tag.ptag_id === PRODUCT_TAGS.NEW)
      )
      break

    case "popular":
      filteredProducts = filteredProducts.filter((product) =>
        product.tags.some((tag) => tag.ptag_id === PRODUCT_TAGS.BEST_SELLER)
      )
      break

    case "featured":
      filteredProducts = filteredProducts.filter((product) =>
        product.tags.some((tag) => tag.ptag_id === PRODUCT_TAGS.FEATURED)
      )
      break

    case "price-low":
      filteredProducts.sort((a, b) => {
        const aPrice = Number(a.price ?? 0)
        const bPrice = Number(b.price ?? 0)
        return aPrice - bPrice
      })
      break

    case "price-high":
      filteredProducts.sort((a, b) => {
        const aPrice = Number(a.price ?? 0)
        const bPrice = Number(b.price ?? 0)
        return bPrice - aPrice
      })
      break

    case "all":
    default:
      break
  }

  const totalItems = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)

  const startIndex = (safePage - 1) * pageSize
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize)

  return {
    products: paginatedProducts,
    totalItems,
    totalPages,
    currentPage: safePage,
    pageSize,
    sort,
  }
}