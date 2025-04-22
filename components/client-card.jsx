import Image from "next/image"
import Link from "next/link"
import { Calendar, Target, ArrowRight } from "lucide-react"

export default function ClientCard({ client }) {
  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="bg-white dark:bg-[#121212] rounded-lg overflow-hidden shadow-sm card-hover">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
            <Image
              src={client.photo || "/placeholder.svg"}
              alt={`${client.firstName} ${client.lastName}`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              {client.firstName} {client.lastName}
            </h3>
            <p className="text-[#A0A4A8]">
              {calculateAge(client.dateOfBirth)} years •{" "}
              {client.gender.charAt(0).toUpperCase() + client.gender.slice(1)}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <Target size={18} className="text-[#A0A4A8] mr-2" />
            <span>{client.objective}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="text-[#A0A4A8] mr-2" />
            <span>Started {formatDate(client.startDate)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link href={`/clients/${client.id}`} className="text-[#2464EA] font-medium hover:underline">
            View Details
          </Link>
          <Link
            href={`/clients/${client.id}/measurements`}
            className="flex items-center text-[#2464EA] font-medium hover:underline"
          >
            Measurements
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
