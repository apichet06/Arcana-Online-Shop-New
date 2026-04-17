import { apiFetch } from "@/lib/api"
import { Category, CategoryResponse } from "../types/category"

// type GetProductByIdParams = {
//     lang?: "th" | "en" | "ja"
// }

export async function getCategories({ lang = "th" }): Promise<Category[]> {
    const res = await apiFetch<CategoryResponse>(`/categorys/lgcode/${lang}`);
    return res.data;
}