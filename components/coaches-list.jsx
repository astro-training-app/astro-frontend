"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CoachesList() {
  const sectionRef = useRef(null)
  const [coaches, setCoaches] = useState([])

  useEffect(() => {
    // Simulate fetching coaches data
    const fetchCoaches = async () => {
      // In a real app, this would be an API call
      const mockCoaches = [
        {
          id: 1,
          name: "Sarah Johnson",
          specialty: "Strength & Conditioning",
          photo: "/placeholder.svg?height=300&width=300",
          rating: 4.9,
        },
        {
          id: 2,
          name: "Michael Chen",
          specialty: "Nutrition & Weight Loss",
          photo: "/placeholder.svg?height=300&width=300",
          rating: 4.8,
        },
        {
          id: 3,
          name: "Emma Rodriguez",
          specialty: "Yoga & Flexibility",
          photo: "/placeholder.svg?height=300&width=300",
          rating: 4.7,
        },
        {
          id: 4,
          name: "David Kim",
          specialty: "Sports Performance",
          photo: "/placeholder.svg?height=300&width=300",
          rating: 4.9,
        },
        {
          id: 5,
          name: "Lisa Patel",
          specialty: "Functional Training",
          photo: "/placeholder.svg?height=300&width=300",
          rating: 4.6,
        },
        {
          id: 6,
          name: "James Wilson",
          specialty: "Bodybuilding",
          photo: "/placeholder.svg?height=300&width=300",
          rating: 4.8,
        },
      ]

      setCoaches(mockCoaches)
    }

    fetchCoaches()
  }, [])

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
    <section ref={sectionRef} className="py-16 opacity-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Coaches</h2>
          <p className="text-[#A0A4A8] max-w-2xl mx-auto">
            Connect with our top-rated fitness professionals specializing in various disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach) => (
            <div key={coach.id} className="bg-white dark:bg-[#121212] rounded-lg overflow-hidden shadow-sm card-hover">
              <div className="relative h-64 w-full">
                <Image src={coach.photo || "/placeholder.svg"} alt={coach.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{coach.name}</h3>
                <p className="text-[#A0A4A8] mb-4">{coach.specialty}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-[#EA6424] font-medium">{coach.rating}</span>
                    <div className="ml-1 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(coach.rating) ? "text-[#EA6424]" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3-.921-1.603-.921-1.902 0l-2.8 2.034a1 1 0 01-1.175 0l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <Link href={`/coaches/${coach.id}`} className="text-[#2464EA] font-medium hover:underline">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/coaches"
            className="btn-transition inline-block bg-[#2464EA] hover:bg-[#1A58C2] text-white font-medium py-3 px-6 rounded-lg"
          >
            View All Coaches
          </Link>
        </div>
      </div>
    </section>
  )
}
