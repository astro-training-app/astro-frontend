"use client"

import { useState } from "react"
import { Info } from "lucide-react"

export default function BMRCalculator() {
  const [formData, setFormData] = useState({
    gender: "male",
    age: "",
    weight: "",
    height: "",
    activityLevel: "sedentary",
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

  const calculateBMR = (e) => {
    e.preventDefault()

    let weight = Number.parseFloat(formData.weight)
    let height = Number.parseFloat(formData.height)
    const age = Number.parseFloat(formData.age)

    // Convert imperial to metric for calculation
    if (formData.unit === "imperial") {
      weight = weight * 0.453592 // lbs to kg
      height = height * 2.54 // inches to cm
    }

    // Mifflin-St Jeor Equation
    let bmr
    if (formData.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    let tdee
    switch (formData.activityLevel) {
      case "sedentary":
        tdee = bmr * 1.2
        break
      case "light":
        tdee = bmr * 1.375
        break
      case "moderate":
        tdee = bmr * 1.55
        break
      case "active":
        tdee = bmr * 1.725
        break
      case "very-active":
        tdee = bmr * 1.9
        break
      default:
        tdee = bmr * 1.2
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      maintenance: Math.round(tdee),
      weightLoss: Math.round(tdee - 500),
      weightGain: Math.round(tdee + 500),
    })
  }

  return (
    <div className="bg-white dark:bg-[#121212] p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Basal Metabolic Rate (BMR) Calculator</h2>
        <p className="text-[#A0A4A8]">
          BMR is the number of calories your body needs to maintain basic functions at rest.
        </p>
      </div>

      <form onSubmit={calculateBMR} className="mb-6">
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

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Gender</label>
          <div className="flex">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, gender: "male" })}
              className={`flex-1 py-2 px-4 text-center ${
                formData.gender === "male" ? "bg-[#2464EA] text-white" : "bg-gray-100 dark:bg-[#1E1E1E] text-[#A0A4A8]"
              } rounded-l-lg transition-colors`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, gender: "female" })}
              className={`flex-1 py-2 px-4 text-center ${
                formData.gender === "female"
                  ? "bg-[#2464EA] text-white"
                  : "bg-gray-100 dark:bg-[#1E1E1E] text-[#A0A4A8]"
              } rounded-r-lg transition-colors`}
            >
              Female
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="age">
              Age (years)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g., 30"
              required
              min="15"
              max="100"
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
            />
          </div>

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

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor="activityLevel">
            Activity Level
          </label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Lightly active (light exercise 1-3 days/week)</option>
            <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
            <option value="active">Active (hard exercise 6-7 days/week)</option>
            <option value="very-active">Very active (very hard exercise & physical job)</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn-transition w-full bg-[#2464EA] hover:bg-[#1A58C2] text-white font-medium py-3 px-6 rounded-lg"
        >
          Calculate BMR
        </button>
      </form>

      {result && (
        <div className="bg-[#F3F4F6] dark:bg-[#1E1E1E] p-6 rounded-lg">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-1">Your BMR Result</h3>
            <p className="text-4xl font-bold text-[#2464EA]">{result.bmr} calories/day</p>
            <p className="text-[#A0A4A8] mt-2">This is the number of calories your body needs at complete rest</p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-3">Total Daily Energy Expenditure (TDEE)</h4>
            <p className="text-lg mb-2">
              <span className="font-medium">Maintenance:</span> {result.maintenance} calories/day
            </p>
            <p className="text-sm text-[#A0A4A8] mb-4">Calories needed to maintain your current weight</p>

            <p className="text-lg mb-2">
              <span className="font-medium">Weight Loss:</span> {result.weightLoss} calories/day
            </p>
            <p className="text-sm text-[#A0A4A8] mb-4">Suggested calorie intake for weight loss (0.5 kg/week)</p>

            <p className="text-lg mb-2">
              <span className="font-medium">Weight Gain:</span> {result.weightGain} calories/day
            </p>
            <p className="text-sm text-[#A0A4A8]">Suggested calorie intake for weight gain (0.5 kg/week)</p>
          </div>

          <div className="flex items-start mt-4 bg-white dark:bg-[#121212] p-4 rounded-lg">
            <Info size={20} className="text-[#2464EA] mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#A0A4A8]">
                These calculations are estimates based on the Mifflin-St Jeor equation. Individual results may vary.
                Consult with a healthcare professional before making significant changes to your diet or exercise
                routine.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
