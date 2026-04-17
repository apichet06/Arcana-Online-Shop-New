"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="
                        fixed bottom-6 right-6 z-50
                        flex h-12 w-12 items-center justify-center
                        rounded-full
                        bg-linear-to-r from-blue-600 to-indigo-600
                        text-white shadow-lg
                        hover:shadow-xl hover:scale-105
                        transition-all duration-300
                        backdrop-blur
                    "
                    aria-label="Scroll to top"
                >
                    <ChevronUp size={22} />
                </motion.button>
            )}
        </AnimatePresence>
    )
}