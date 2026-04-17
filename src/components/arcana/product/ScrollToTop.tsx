"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function ScrollToTop() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const handleScroll = () => {
            const hash = window.location.hash

            if (hash) {
                const target = document.querySelector(hash)

                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    })
                    return
                }
            }

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto",
            })
        }

        const timer = window.setTimeout(handleScroll, 80)

        return () => window.clearTimeout(timer)
    }, [pathname, searchParams])

    return null
}


// "use client"

// import { useEffect } from "react"
// import { usePathname, useSearchParams } from "next/navigation"

// export default function ScrollToTop() {
//     const pathname = usePathname()
//     const searchParams = useSearchParams()

//     useEffect(() => {
//         window.scrollTo({
//             top: 0,
//             left: 0,
//             behavior: "auto",
//         })
//     }, [pathname, searchParams])

//     return null
// }