"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import ClientCard from "@/components/client-card"
import ClientFilters from "@/components/client-filters"
import AddClientModal from "@/components/add-client-modal"
import { UserPlus, Loader } from "lucide-react"

export default function ClientPage() {
  const { user } = useAuth()
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true)
        // In a real app, this would be an API call
        // For now, we'll simulate fetching data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockClients = [
          {
            id: 1,
            firstName: "Jane",
            lastName: "Smith",
            photo: "/placeholder.svg?height=200&width=200",
            dateOfBirth: "1990-05-15",
            gender: "female",
            objective: "Weight Loss",
            startDate: "2023-01-10",
          },
          {
            id: 2,
            firstName: "John",
            lastName: "Doe",
            photo: "/placeholder.svg?height=200&width=200",
            dateOfBirth: "1985-09-22",
            gender: "male",
            objective: "Muscle Gain",
            startDate: "2023-02-05",
          },
          {
            id: 3,
            firstName: "Emily",
            lastName: "Johnson",
            photo: "/placeholder.svg?height=200&width=200",
            dateOfBirth: "1992-11-30",
            gender: "female",
            objective: "General Fitness",
            startDate: "2023-03-15",
          },
          {
            id: 4,
            firstName: "Michael",
            lastName: "Brown",
            photo: "/placeholder.svg?height=200&width=200",
            dateOfBirth: "1988-07-12",
            gender: "male",
            objective: "Sports Performance",
            startDate: "2023-01-20",
          },
          {
            id: 5,
            firstName: "Sarah",
            lastName: "Wilson",
            photo: "/placeholder.svg?height=200&width=200",
            dateOfBirth: "1995-03-25",
            gender: "female",
            objective: "Flexibility",
            startDate: "2023-04-10",
          },
        ]

        setClients(mockClients)
        setFilteredClients(mockClients)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch clients. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchClients()
  }, [])

  const handleAddClient = (newClient) => {
    // In a real app, this would be an API call
    const clientWithId = {
      ...newClient,
      id: clients.length + 1,
      photo: "/placeholder.svg?height=200&width=200",
    }

    setClients([...clients, clientWithId])
    setFilteredClients([...clients, clientWithId])
    setIsModalOpen(false)
  }

  const applyFilters = (filters) => {
    let filtered = [...clients]

    if (filters.gender && filters.gender !== "all") {
      filtered = filtered.filter((client) => client.gender === filters.gender)
    }

    if (filters.objective && filters.objective !== "all") {
      filtered = filtered.filter((client) => client.objective === filters.objective)
    }

    if (filters.dateRange.start) {
      filtered = filtered.filter((client) => new Date(client.startDate) >= new Date(filters.dateRange.start))
    }

    if (filters.dateRange.end) {
      filtered = filtered.filter((client) => new Date(client.startDate) <= new Date(filters.dateRange.end))
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (client) =>
          client.firstName.toLowerCase().includes(searchLower) || client.lastName.toLowerCase().includes(searchLower),
      )
    }

    setFilteredClients(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Clients</h1>
          <p className="text-[#A0A4A8]">Manage and track progress for {clients.length} clients</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-transition mt-4 md:mt-0 flex items-center bg-[#2464EA] hover:bg-[#1A58C2] text-white font-medium py-2 px-4 rounded-lg"
        >
          <UserPlus size={18} className="mr-2" />
          Add Client
        </button>
      </div>

      <ClientFilters onFilterChange={applyFilters} />

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <Loader size={32} className="animate-spin text-[#2464EA]" />
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-center">
          {error}
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="bg-[#F3F4F6] dark:bg-[#1E1E1E] p-8 rounded-lg text-center">
          <p className="text-[#A0A4A8] mb-4">No clients match your filters</p>
          <button onClick={() => applyFilters({})} className="text-[#2464EA] font-medium hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}

      {isModalOpen && <AddClientModal onClose={() => setIsModalOpen(false)} onAddClient={handleAddClient} />}
    </div>
  )
}
