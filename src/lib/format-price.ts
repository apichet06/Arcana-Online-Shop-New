export function formatPrice(price: number) {
    return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
        maximumFractionDigits: 0,
    }).format(price)
}

export function getDiscountedPrice(price: number, discount?: number | string | null) {
    const discountValue = Number(discount || 0)

    if (discountValue <= 0) return price

    return Math.max(price - (price * discountValue) / 100, 0)
}