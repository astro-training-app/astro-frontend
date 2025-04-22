import HeroSection from "@/components/hero-section"
import HowItWorks from "@/components/how-it-works"
import CoachesList from "@/components/coaches-list"
import TestimonialsCarousel from "@/components/testimonials-carousel"

export const metadata = {
  title: "FitCoach - Transform Your Fitness Journey",
  description: "Connect with expert fitness coaches or become a coach and grow your business",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <HowItWorks />
      <CoachesList />
      <TestimonialsCarousel />
    </div>
  )
}
