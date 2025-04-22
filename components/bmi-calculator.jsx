"use client"

import { useState } from "react"
import { Info } from "lucide-react"

export default function BMICalculator() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    unit: "metric", // metric or imperial
  })

  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const calculateBMI = (e) => {
    e.preventDefault()

    let bmi
    const weight = Number.parseFloat(formData.weight)
    const height = Number.parseFloat(formData.height)

    if (formData.unit === "metric") {
      // Weight in kg, height in cm
      bmi = weight / Math.pow(height / 100, 2)
    } else {
      // Weight in lbs, height in inches
      bmi = (weight * 703) / Math.pow(height, 2)
    }

    let category
    if (bmi < 18.5) {
      category = "Underweight"
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal weight"
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight"
    } else {
      category = "Obesity"
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
    })
  }

  const getBMICategoryColor = (category) => {
    switch (category) {
      case "Underweight":
        return "text-yellow-500"
      case "Normal weight":
        return "text-green-500"
      case "Overweight":
        return "text-orange-500"
      case "Obesity":
        return "text-red-500"
      default:
        return ""
    }
  }

  return (
    <div className="bg-white dark:bg-[#121212] p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Body Mass Index (BMI) Calculator</h2>
        <p className="text-[#A0A4A8]">
          BMI is a measure of body fat based on height and weight that applies to adult men and women.
        </p>
      </div>

      <form onSubmit={calculateBMI} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Unit System</label>
          <div className="flex">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, unit: "metric" })}
              className={`flex-1 py-2 px-4 text-center ${
                formData.unit === "metric" ? "bg-[#2464EA] text-white" : "bg-gray-100 dark:bg-[#1E1E1E] text-[#A0A4A8]"
              } rounded-l-lg transition-colors`}
            >
              Metric (kg/cm)
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, unit: "imperial" })}
              className={`flex-1 py-2 px-4 text-center ${
                formData.unit === "imperial"
                  ? "bg-[#2464EA] text-white"
                  : "bg-gray-100 dark:bg-[#1E1E1E] text-[#A0A4A8]"
              } rounded-r-lg transition-colors`}
            >
              Imperial (lb/in)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="weight">
              Weight {formData.unit === "metric" ? "(kg)" : "(lb)"}
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder={formData.unit === "metric" ? "e.g., 70" : "e.g., 154"}
              required
              min="1"
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="height">
              Height {formData.unit === "metric" ? "(cm)" : "(in)"}
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder={formData.unit === "metric" ? "e.g., 175" : "e.g., 69"}
              required
              min="1"
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-transition w-full bg-[#2464EA] hover:bg-[#1A58C2] text-white font-medium py-3 px-6 rounded-lg"
        >
          Calculate BMI
        </button>
      </form>

      {result && (
        <div className="bg-[#F3F4F6] dark:bg-[#1E1E1E] p-6 rounded-lg">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-1">Your BMI Result</h3>
            <p className="text-4xl font-bold text-[#2464EA]">{result.bmi}</p>
            <p className={`text-lg font-medium mt-2 ${getBMICategoryColor(result.category)}`}>{result.category}</p>
          </div>

          <div className="flex items-start mt-4 bg-white dark:bg-[#121212] p-4 rounded-lg">
            <Info size={20} className="text-[#2464EA] mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#A0A4A8]">
                BMI Categories:
                <br />
                Underweight = Less than 18.5
                <br />
                Normal weight = 18.5–24.9
                <br />
                Overweight = 25–29.9
                <br />
                Obesity = 30 or greater
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
