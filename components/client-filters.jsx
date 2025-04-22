"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"

export default function ClientFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: "",
    gender: "all",
    objective: "all",
    dateRange: {
      start: "",
      end: "",
    },
  })

  const [showFilters, setShowFilters] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "start" || name === "end") {
      setFilters({
        ...filters,
        dateRange: {
          ...filters.dateRange,
          [name]: value,
        },
      })
    } else {
      setFilters({
        ...filters,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilterChange(filters)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      gender: "all",
      objective: "all",
      dateRange: {
        start: "",
        end: "",
      },
    })
    onFilterChange({
      search: "",
      gender: "all",
      objective: "all",
      dateRange: {
        start: "",
        end: "",
      },
    })
  }

  const objectives = ["Weight Loss", "Muscle Gain", "General Fitness", "Sports Performance", "Flexibility"]

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A4A8]" />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleInputChange}
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-colors"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>

          <button
            type="submit"
            className="btn-transition bg-[#2464EA] hover:bg-[#1A58C2] text-white font-medium py-2 px-6 rounded-lg"
          >
            Apply
          </button>
        </div>

        {showFilters && (
          <div className="bg-white dark:bg-[#121212] p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filter Clients</h3>
              <button
                type="button"
                onClick={clearFilters}
                className="text-[#A0A4A8] hover:text-[#2464EA] text-sm flex items-center"
              >
                <X size={16} className="mr-1" />
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={filters.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Objective</label>
                <select
                  name="objective"
                  value={filters.objective}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
                >
                  <option value="all">All Objectives</option>
                  {objectives.map((objective) => (
                    <option key={objective} value={objective}>
                      {objective}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Start Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="date"
                      name="start"
                      value={filters.dateRange.start}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      name="end"
                      value={filters.dateRange.end}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
