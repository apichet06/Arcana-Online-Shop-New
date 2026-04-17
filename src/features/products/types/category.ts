export type Category = {
    c_id: number
    cl_id: number
    c_sort_order: number
    e_id: number
    ctl_id: number
    cl_name: string
    lg_code: string
    ctl_name: string
    ctl_description: string
    e_create_at: string
}

export type CategoryResponse = {
    data: Category[]
}