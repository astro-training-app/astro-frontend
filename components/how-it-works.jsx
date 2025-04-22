"use client"

import { useEffect, useRef } from "react"
import { Dumbbell, Users, TrendingUp } from "lucide-react"

export default function HowItWorks() {
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

  const steps = [
    {
      icon: <Dumbbell size={48} className="text-[#2464EA]" />,
      title: "Create Your Profile",
      description: "Set up your coaching profile with your specialties, experience, and coaching philosophy.",
    },
    {
      icon: <Users size={48} className="text-[#2464EA]" />,
      title: "Connect with Clients",
      description: "Build your client base and manage all your client relationships in one place.",
    },
    {
      icon: <TrendingUp size={48} className="text-[#2464EA]" />,
      title: "Track Progress",
      description: "Use our tools to track client progress, set goals, and celebrate achievements.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 bg-[#F3F4F6] dark:bg-[#1E1E1E] opacity-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-[#A0A4A8] max-w-2xl mx-auto">
            Our platform makes it easy to start and grow your fitness coaching business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white dark:bg-[#121212] p-8 rounded-lg shadow-sm text-center card-hover">
              <div className="flex justify-center mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-[#A0A4A8]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
