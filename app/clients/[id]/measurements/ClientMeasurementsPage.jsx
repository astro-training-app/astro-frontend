"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ArrowLeft, Calendar, Download, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ClientMeasurementsPage() {
  const params = useParams()
  const clientId = params.id

  const [client, setClient] = useState(null)
  const [measurements, setMeasurements] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMetrics, setSelectedMetrics] = useState(["weight", "chest", "waist"])

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setIsLoading(true)
        // In a real app, this would be an API call
        // For now, we'll simulate fetching data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock client data
        const mockClient = {
          id: clientId,
          firstName: "Jane",
          lastName: "Smith",
          photo: "/placeholder.svg?height=200&width=200",
          dateOfBirth: "1990-05-15",
          gender: "female",
          objective: "Weight Loss",
          startDate: "2023-01-10",
        }

        // Generate mock measurement data
        const mockMeasurements = generateMockMeasurements()

        setClient(mockClient)
        setMeasurements(mockMeasurements)
        setIsLoading(false)
      } catch (err) {
        console.error("Failed to fetch client data:", err)
        setIsLoading(false)
      }
    }

    fetchClientData()
  }, [clientId])

  const generateMockMeasurements = () => {
    const data = []
    const today = new Date()

    // Base values for different metrics
    const baseValues = {
      weight: 70,
      chest: 95,
      waist: 80,
      hips: 100,
      thighs: 55,
      arms: 35,
    }

    // Variation range for different metrics
    const variations = {
      weight: 5,
      chest: 3,
      waist: 4,
      hips: 3,
      thighs: 2,
      arms: 1.5,
    }

    // Generate data for the last 12 weeks
    for (let i = 0; i < 12; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - (11 - i) * 7) // Weekly data points

      const entry = {
        date: date.toISOString().split("T")[0],
      }

      // Add values for each metric with a slight downward trend (for weight loss)
      Object.keys(baseValues).forEach((metric) => {
        const trend = i * (metric === "weight" ? -0.3 : -0.2) // Downward trend
        const random = (Math.random() * variations[metric] * 2 - variations[metric]) / 2 // Less randomness
        entry[metric] = Number.parseFloat((baseValues[metric] + trend + random).toFixed(1))
      })

      data.push(entry)
    }

    return data
  }

  const toggleMetric = (metric) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric))
    } else {
      setSelectedMetrics([...selectedMetrics, metric])
    }
  }

  const metrics = [
    { id: "weight", name: "Weight (kg)", color: "#2464EA" },
    { id: "chest", name: "Chest (cm)", color: "#EA6424" },
    { id: "waist", name: "Waist (cm)", color: "#10B981" },
    { id: "hips", name: "Hips (cm)", color: "#8B5CF6" },
    { id: "thighs", name: "Thighs (cm)", color: "#F59E0B" },
    { id: "arms", name: "Arms (cm)", color: "#EC4899" },
  ]

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return ""

    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const getLatestMeasurements = () => {
    if (measurements.length === 0) return {}
    return measurements[measurements.length - 1]
  }

  const getFirstMeasurements = () => {
    if (measurements.length === 0) return {}
    return measurements[0]
  }

  const calculateChange = (metric) => {
    if (measurements.length < 2) return 0

    const first = getFirstMeasurements()[metric]
    const latest = getLatestMeasurements()[metric]

    return Number.parseFloat((latest - first).toFixed(1))
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2464EA]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href={`/clients/${clientId}`}
          className="flex items-center text-[#2464EA] font-medium hover:underline mb-4"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Client
        </Link>

        {client && (
          <div className="flex items-center">
            <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
              <Image
                src={client.photo || "/placeholder.svg"}
                alt={`${client.firstName} ${client.lastName}`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {client.firstName} {client.lastName}'s Measurements
              </h1>
              <p className="text-[#A0A4A8]">
                {calculateAge(client.dateOfBirth)} years •{" "}
                {client.gender.charAt(0).toUpperCase() + client.gender.slice(1)} • {client.objective}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {metrics.slice(0, 4).map((metric) => {
          const change = calculateChange(metric.id)
          const isPositive = change > 0
          const isNegative = change < 0

          return (
            <div key={metric.id} className="bg-white dark:bg-[#121212] p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">{metric.name}</h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold">{getLatestMeasurements()[metric.id] || "-"}</p>
                  <p
                    className={`text-sm font-medium ${
                      isPositive ? "text-red-500" : isNegative ? "text-green-500" : "text-[#A0A4A8]"
                    }`}
                  >
                    {change !== 0 ? (
                      <>
                        {change > 0 ? "+" : ""}
                        {change} {metric.id === "weight" ? "kg" : "cm"}
                      </>
                    ) : (
                      "No change"
                    )}
                  </p>
                </div>
                <div className="h-12 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={measurements.slice(-5)}>
                      <Line type="monotone" dataKey={metric.id} stroke={metric.color} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white dark:bg-[#121212] p-6 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Measurement History</h2>
            <div className="flex items-center">
              <Calendar size={16} className="text-[#A0A4A8] mr-2" />
              <span className="text-sm text-[#A0A4A8]">
                {measurements.length > 0 ? (
                  <>
                    {formatDate(measurements[0].date)} - {formatDate(measurements[measurements.length - 1].date)}
                  </>
                ) : (
                  "No data available"
                )}
              </span>
            </div>
          </div>

          <div className="flex mt-4 md:mt-0 space-x-3">
            <button className="flex items-center bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 text-[#333333] dark:text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-colors">
              <Plus size={18} className="mr-2" />
              Add Measurement
            </button>
            <button className="flex items-center bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 text-[#333333] dark:text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-colors">
              <Download size={18} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => toggleMetric(metric.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedMetrics.includes(metric.id)
                    ? `bg-${metric.color.replace("#", "")} text-white`
                    : "bg-gray-100 dark:bg-[#1E1E1E] text-[#A0A4A8]"
                }`}
                style={selectedMetrics.includes(metric.id) ? { backgroundColor: metric.color } : {}}
              >
                {metric.name}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={measurements} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tickFormatter={formatDate} stroke="#A0A4A8" />
              <YAxis stroke="#A0A4A8" />
              <Tooltip
                formatter={(value, name) => {
                  const metric = metrics.find((m) => m.id === name)
                  return [`${value} ${name === "weight" ? "kg" : "cm"}`, metric ? metric.name : name]
                }}
                labelFormatter={(label) => formatDate(label)}
              />
              <Legend />
              {selectedMetrics.map((metricId) => {
                const metric = metrics.find((m) => m.id === metricId)
                return (
                  <Line
                    key={metricId}
                    type="monotone"
                    dataKey={metricId}
                    name={metric ? metric.name : metricId}
                    stroke={metric ? metric.color : "#2464EA"}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-[#121212] p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Measurement Data</h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 text-left font-semibold">Date</th>
                {metrics.map((metric) => (
                  <th key={metric.id} className="py-3 px-4 text-left font-semibold">
                    {metric.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {measurements
                .slice()
                .reverse()
                .map((measurement, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1E1E1E]"
                  >
                    <td className="py-3 px-4 font-medium">{formatDate(measurement.date)}</td>
                    {metrics.map((metric) => (
                      <td key={metric.id} className="py-3 px-4">
                        {measurement[metric.id]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
