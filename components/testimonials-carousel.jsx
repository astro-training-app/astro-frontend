"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsCarousel() {
  const sectionRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Fitness Coach",
      photo: "/placeholder.svg?height=100&width=100",
      quote:
        "FitCoach has transformed my business. I've doubled my client base in just 3 months and the tools make tracking progress so much easier.",
    },
    {
      id: 2,
      name: "Jessica Martinez",
      role: "Yoga Instructor",
      photo: "/placeholder.svg?height=100&width=100",
      quote:
        "The platform is intuitive and my clients love the progress tracking features. It's helped me scale my yoga business beyond what I thought was possible.",
    },
    {
      id: 3,
      name: "Ryan Cooper",
      role: "Personal Trainer",
      photo: "/placeholder.svg?height=100&width=100",
      quote:
        "As someone who struggled with the business side of personal training, FitCoach has been a game-changer. The client management tools are exceptional.",
    },
  ]

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section ref={sectionRef} className="py-16 bg-[#F3F4F6] dark:bg-[#1E1E1E] opacity-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Coaches Say</h2>
          <p className="text-[#A0A4A8] max-w-2xl mx-auto">
            Hear from fitness professionals who have transformed their coaching business with our platform
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden" aria-live="polite">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-[#121212] p-8 rounded-lg shadow-sm text-center">
                    <div className="flex justify-center mb-6">
                      <div className="relative h-20 w-20 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.photo || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <blockquote className="text-lg italic mb-6">"{testimonial.quote}"</blockquote>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-[#A0A4A8]">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white dark:bg-[#121212] p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-[#1E1E1E] transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white dark:bg-[#121212] p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-[#1E1E1E] transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                index === currentIndex ? "bg-[#2464EA]" : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
