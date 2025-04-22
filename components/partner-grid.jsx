"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function PartnerGrid() {
  const sectionRef = useRef(null)

  const partners = [
    {
      id: 1,
      name: "FitTech",
      logo: "/placeholder.svg?height=200&width=200",
      description: "Leading provider of fitness tracking technology",
      website: "https://example.com/fittech",
    },
    {
      id: 2,
      name: "NutriLife",
      logo: "/placeholder.svg?height=200&width=200",
      description: "Nutrition supplements and meal planning",
      website: "https://example.com/nutrilife",
    },
    {
      id: 3,
      name: "GymGear",
      logo: "/placeholder.svg?height=200&width=200",
      description: "Premium fitness equipment and apparel",
      website: "https://example.com/gymgear",
    },
    {
      id: 4,
      name: "WellnessHub",
      logo: "/placeholder.svg?height=200&width=200",
      description: "Holistic wellness and recovery services",
      website: "https://example.com/wellnesshub",
    },
    {
      id: 5,
      name: "FitCert",
      logo: "/placeholder.svg?height=200&width=200",
      description: "Fitness certification and continuing education",
      website: "https://example.com/fitcert",
    },
    {
      id: 6,
      name: "ActiveLife",
      logo: "/placeholder.svg?height=200&width=200",
      description: "Outdoor fitness events and community",
      website: "https://example.com/activelife",
    },
    {
      id: 7,
      name: "MindBody",
      logo: "/placeholder.svg?height=200&width=200",
      description: "Mental wellness and meditation resources",
      website: "https://example.com/mindbody",
    },
    {
      id: 8,
      name: "FitInsure",
      logo: "/placeholder.svg?height=200&width=200",
      description: "Insurance solutions for fitness professionals",
      website: "https://example.com/fitinsure",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add a slight delay for each card to create a cascade effect
            setTimeout(() => {
              entry.target.classList.add("animate-fade-in")
            }, index * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = document.querySelectorAll(".partner-card")
    cards.forEach((card) => {
      observer.observe(card)
    })

    return () => {
      cards.forEach((card) => {
        observer.unobserve(card)
      })
    }
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {partners.map((partner) => (
        <div
          key={partner.id}
          className="partner-card opacity-0 bg-white dark:bg-[#121212] rounded-lg overflow-hidden shadow-sm card-hover"
        >
          <div className="p-6 flex flex-col items-center text-center">
            <div className="relative h-24 w-24 mb-4">
              <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
            <p className="text-[#A0A4A8] mb-4">{partner.description}</p>
            <Link
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center text-[#2464EA] font-medium hover:underline"
            >
              Visit Website
              <ExternalLink size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
