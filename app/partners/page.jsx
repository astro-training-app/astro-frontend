import PartnerGrid from "@/components/partner-grid"

export const metadata = {
  title: "Partners - FitCoach",
  description: "Our trusted partners in the fitness industry",
}

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Our Partners</h1>
        <p className="text-[#A0A4A8] max-w-2xl mx-auto">
          We collaborate with leading brands and organizations in the fitness industry to provide the best experience
          for our coaches and clients
        </p>
      </div>

      <PartnerGrid />
    </div>
  )
}
