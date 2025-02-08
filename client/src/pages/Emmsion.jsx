import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from "react-router-dom";
import { FiCloud, FiDroplet, FiActivity, FiArrowLeft, FiSave } from "react-icons/fi";

const Emission = () => {
  const [searchParams] = useSearchParams();
  const [emissionData, setEmissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const topic = searchParams.get("topic");

  useEffect(() => {
    console.log("Fetching emission data for:", topic);

    const fetchEmissionData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Create prompt for generating emission data
        const prompt = `Provide carbon emission details for "${topic}". Return ONLY a JSON object with no additional text or formatting. The object should have exactly these properties:
        {
          "co2": "CO2 emission in kg",
          "ch4": "CH4 emission in kg",
          "n2o": "N2O emission in kg",
          "total": "Total emission in kg"
        }
        Make sure the response is valid JSON that can be parsed directly.`;

        // Generate content (Fixed API call)
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        // Extract response
        const response = await result.response;
        const text = await response.text();

        console.log("Raw AI Response:", text);

        // Clean and parse JSON
        const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
        console.log("Cleaned JSON Response:", cleanText);

        // Attempt to parse JSON
        try {
          const parsedData = JSON.parse(cleanText);
          setEmissionData(parsedData);
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError);
          setError("Failed to parse AI response. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching emission data:", err);
        setError("Failed to generate emission data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (topic) {
      fetchEmissionData();
    }
  }, [topic]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500 space-y-4">
        <div className="text-4xl">⚠️</div>
        <div className="text-xl font-medium">{error}</div>
        <Link
          to="/calculate"
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to="/calculate"
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Calculator
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Carbon Emissions for {topic}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <EmissionCard
            icon={<FiCloud className="w-6 h-6" />}
            title="CO₂ Emissions"
            value={emissionData.co2}
            unit="kg"
            color="bg-blue-100"
          />
          <EmissionCard
            // icon={< className="w-6 h-6" />}
            title="CH₄ Emissions"
            value={emissionData.ch4}
            unit="kg"
            color="bg-orange-100"
          />
          <EmissionCard
            icon={<FiDroplet className="w-6 h-6" />}
            title="N₂O Emissions"
            value={emissionData.n2o}
            unit="kg"
            color="bg-red-100"
          />
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <FiActivity className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-semibold">Total Carbon Footprint</h2>
                <p className="opacity-90">Combined greenhouse gas emissions</p>
              </div>
            </div>
            <div className="text-3xl font-bold">{emissionData.total} kg</div>
          </div>
        </div>

        <div className="mt-8 flex space-x-4 justify-end">
          <Link
            to="/dashboard/performance"
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiSave className="mr-2" /> Save Results
          </Link>
          <Link
            to="/calculate"
            className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            Calculate New
          </Link>
        </div>
      </div>
    </div>
  );
};

const EmissionCard = ({ icon, title, value, unit, color }) => (
  <div className={`${color} p-6 rounded-xl transition-transform hover:scale-105`}>
    <div className="flex items-center space-x-4 mb-4">
      <div className="p-3 bg-white rounded-lg shadow-sm">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="text-3xl font-bold text-gray-900">
      {value} <span className="text-lg text-gray-600">{unit}</span>
    </div>
    <div className="mt-4 h-2 bg-white rounded-full">
      <div 
        className="h-full bg-green-500 rounded-full transition-all duration-500" 
        style={{ width: `${Math.min(100, (value / 1000) * 100)}%` }}
      ></div>
    </div>
  </div>
);

export default Emission;