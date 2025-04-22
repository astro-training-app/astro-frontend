"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Calendar, ChevronDown } from "lucide-react"

export default function MeasurementsChart() {
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedMetric, setSelectedMetric] = useState("weight")
  const [chartData, setChartData] = useState([])
  const [clients, setClients] = useState([])
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false)
  const [isMetricDropdownOpen, setIsMetricDropdownOpen] = useState(false)

  useEffect(() => {
    // Simulate fetching clients
    const mockClients = [
      { id: "1", name: "Jane Smith" },
      { id: "2", name: "John Doe" },
      { id: "3", name: "Emily Johnson" },
    ]

    setClients(mockClients)
    setSelectedClient(mockClients[0].id)
  }, [])

  useEffect(() => {
    if (selectedClient) {
      fetchMeasurements(selectedClient)
    }
  }, [selectedClient, selectedMetric])

  const fetchMeasurements = (clientId) => {
    // Simulate fetching measurements data
    // In a real app, this would be an API call

    // Generate random data for the selected metric
    const generateRandomData = () => {
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

      const baseValue = baseValues[selectedMetric]
      const variation = variations[selectedMetric]

      for (let i = 0; i < 12; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - (11 - i) * 7) // Weekly data points

        // Create some realistic variation in the data
        const value = baseValue + (Math.random() * variation * 2 - variation)

        data.push({
          date: date.toISOString().split("T")[0],
          [selectedMetric]: Number.parseFloat(value.toFixed(1)),
        })
      }

      return data
    }

    setChartData(generateRandomData())
  }

  const metrics = [
    { id: "weight", name: "Weight (kg)", color: "#2464EA" },
    { id: "chest", name: "Chest (cm)", color: "#EA6424" },
    { id: "waist", name: "Waist (cm)", color: "#10B981" },
    { id: "hips", name: "Hips (cm)", color: "#8B5CF6" },
    { id: "thighs", name: "Thighs (cm)", color: "#F59E0B" },
    { id: "arms", name: "Arms (cm)", color: "#EC4899" },
  ]

  const getSelectedMetricName = () => {
    const metric = metrics.find((m) => m.id === selectedMetric)
    return metric ? metric.name : ""
  }

  const getSelectedMetricColor = () => {
    const metric = metrics.find((m) => m.id === selectedMetric)
    return metric ? metric.color : "#2464EA"
  }

  const getSelectedClientName = () => {
    const client = clients.find((c) => c.id === selectedClient)
    return client ? client.name : ""
  }

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="bg-white dark:bg-[#121212] p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Measurements Chart</h2>
        <p className="text-[#A0A4A8]">Track and visualize your clients' body measurements over time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <label className="block text-sm font-medium mb-2">Select Client</label>
          <button
            onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
            className="w-full flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
          >
            <span>{getSelectedClientName() || "Select a client"}</span>
            <ChevronDown size={18} className={`transition-transform ${isClientDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isClientDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
              {clients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    setSelectedClient(client.id)
                    setIsClientDropdownOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1E1E1E] transition-colors"
                >
                  {client.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-2">Select Measurement</label>
          <button
            onClick={() => setIsMetricDropdownOpen(!isMetricDropdownOpen)}
            className="w-full flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
          >
            <span>{getSelectedMetricName() || "Select a measurement"}</span>
            <ChevronDown size={18} className={`transition-transform ${isMetricDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isMetricDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
              {metrics.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => {
                    setSelectedMetric(metric.id)
                    setIsMetricDropdownOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1E1E1E] transition-colors"
                >
                  {metric.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#F3F4F6] dark:bg-[#1E1E1E] p-4 rounded-lg mb-6">
        <div className="flex items-center mb-4">
          <Calendar size={18} className="text-[#A0A4A8] mr-2" />
          <span className="text-sm text-[#A0A4A8]">Showing data for the last 12 weeks</span>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tickFormatter={formatDate} stroke="#A0A4A8" />
              <YAxis stroke="#A0A4A8" />
              <Tooltip
                formatter={(value) => [
                  `${value} ${selectedMetric === "weight" ? "kg" : "cm"}`,
                  getSelectedMetricName(),
                ]}
                labelFormatter={(label) => formatDate(label)}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                name={getSelectedMetricName()}
                stroke={getSelectedMetricColor()}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-transition flex items-center bg-[#2464EA] hover:bg-[#1A58C2] text-white font-medium py-2 px-4 rounded-lg">
          Export Data
        </button>
      </div>
    </div>
  )
}
