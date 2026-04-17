"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const images = [
    "/images/DoyouwantToSell.webp",
    "/images/FitMC.webp",
]

export default function FullWidthHeroSlider() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
        }, 7000) // 7 วินาที

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative w-full overflow-hidden py-10">
            <div className="relative h-80 sm:h-105 md:h-100 lg:h-160 w-full">
                {images.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ${current === index ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        <Image
                            src={src}
                            alt={`slide-${index + 1}`}
                            fill
                            priority={index === 0}
                            className="object-cover object-top"
                            sizes="100vw"
                        />
                    </div>
                ))}

                {/* จุดบอกสไลด์ */}
                <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-2.5 rounded-full transition-all ${current === index
                                ? "w-8 bg-white"
                                : "w-2.5 bg-white/50 hover:bg-white/80"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}