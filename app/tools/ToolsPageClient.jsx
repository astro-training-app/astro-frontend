"use client"

import { useState } from "react"
import BMICalculator from "@/components/bmi-calculator"
import BMRCalculator from "@/components/bmr-calculator"
import MeasurementsChart from "@/components/measurements-chart"

export default function ToolsPageClient() {
  const [activeTab, setActiveTab] = useState("bmi")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Fitness Tools</h1>
        <p className="text-[#A0A4A8] max-w-2xl mx-auto">
          Use these tools to help your clients understand their fitness metrics and track progress
        </p>
      </div>

      <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("bmi")}
          className={`px-6 py-3 font-medium text-center ${
            activeTab === "bmi"
              ? "text-[#2464EA] border-b-2 border-[#2464EA]"
              : "text-[#A0A4A8] hover:text-[#333333] dark:hover:text-white"
          }`}
        >
          BMI Calculator
        </button>
        <button
          onClick={() => setActiveTab("bmr")}
          className={`px-6 py-3 font-medium text-center ${
            activeTab === "bmr"
              ? "text-[#2464EA] border-b-2 border-[#2464EA]"
              : "text-[#A0A4A8] hover:text-[#333333] dark:hover:text-white"
          }`}
        >
          BMR Calculator
        </button>
        <button
          onClick={() => setActiveTab("measurements")}
          className={`px-6 py-3 font-medium text-center ${
            activeTab === "measurements"
              ? "text-[#2464EA] border-b-2 border-[#2464EA]"
              : "text-[#A0A4A8] hover:text-[#333333] dark:hover:text-white"
          }`}
        >
          Measurements Chart
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === "bmi" && <BMICalculator />}
        {activeTab === "bmr" && <BMRCalculator />}
        {activeTab === "measurements" && <MeasurementsChart />}
      </div>
    </div>
  )
}
