import { apiFetch } from "@/lib/api";
import { Sluge, SlugeResponse } from "../types/landingpage";

export async function getLpSlugs(): Promise<Sluge[]> {
    const res = await apiFetch<SlugeResponse>("/landingpage/slug/");
    return res.data;
}