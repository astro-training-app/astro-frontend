"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 opacity-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your Fitness Journey
            </h1>
            <p className="text-lg md:text-xl text-[#A0A4A8] mb-8 max-w-lg">
              Connect with expert coaches or build your coaching business with our all-in-one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup/coach"
                className="btn-transition inline-block bg-[#2464EA] hover:bg-[#1A58C2] text-white font-medium py-3 px-6 rounded-lg text-center"
              >
                Become a Coach
              </Link>
              <Link
                href="/find-coach"
                className="btn-transition inline-block bg-white dark:bg-[#1E1E1E] border border-[#2464EA] text-[#2464EA] font-medium py-3 px-6 rounded-lg text-center hover:shadow-md"
              >
                Find a Coach
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Fitness coaching illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
