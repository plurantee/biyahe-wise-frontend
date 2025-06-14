import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [form, setForm] = useState({
    origin: "SM North EDSA",
    destination: "Glorietta 5",
    dateTime: "Tomorrow at 8PM",
    mode: "",
    carDetails: "Honda City RS 2022",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setShowResult(false);
    setLoading(true);
    try {
      const res = await axios.post("https://biyahewise-backend-80fd70d1f08e.herokuapp.com/api/estimate", form);
      setResult(res.data);
      setShowResult(true);
    } catch (err) {
      console.error(err);
      alert("Error calling backend");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <h1 className="text-5xl font-bold mb-8 text-blue-600">BiyaheWise 🚗</h1>

    
      {/*<div className="w-full max-w-4xl mb-8">
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg text-center">
          🔥 Ad Slot (Future: AdSense goes here)
        </div>
      </div>*/}

      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-lg z-10">
        <div className="flex flex-col gap-4">

          <div className="flex flex-col">
            <label className="font-medium mb-2">Mode</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value="DRIVE"
                  checked={form.mode === "DRIVE"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Drive
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value="COMMUTE"
                  checked={form.mode === "COMMUTE"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Commute
              </label>
            </div>
          </div>

          {form.mode && (
            <>
              <div className="flex flex-col">
                <label className="font-medium mb-1">Origin</label>
                <input name="origin" value={form.origin} onChange={handleChange} className="input" />
              </div>

              <div className="flex flex-col">
                <label className="font-medium mb-1">Destination</label>
                <input name="destination" value={form.destination} onChange={handleChange} className="input" />
              </div>

              <div className="flex flex-col">
                <label className="font-medium mb-1">Date and Time</label>
                <input name="dateTime" value={form.dateTime} onChange={handleChange} className="input" />
              </div>

              {form.mode === "DRIVE" && (
                <div className="flex flex-col">
                  <label className="font-medium mb-1">Car Model and Year</label>
                  <input name="carDetails" value={form.carDetails} onChange={handleChange} className="input" />
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
              >
                {loading ? "Calculating..." : "Estimate Trip"}
              </button>
            </>
          )}
        </div>
      </div>

      <div
        className={`absolute top-0 right-0 h-full bg-white shadow-xl w-96 p-8 transition-transform duration-500 ease-in-out ${showResult ? "translate-x-0" : "translate-x-full"}`}
        style={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        {result && (
          <>
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Results:</h3>

            {form.mode === "DRIVE" && (
              <>
                <p className="text-lg mb-2">
                  Estimated Time: {result.options[0].estimatedTimeMinutes} minutes
                </p>
                <p className="text-lg mb-2">
                  Estimated Cost: ₱{result.options[0].estimatedCostPHP}
                </p>
                <p className="text-lg">
                  Estimated Fuel Used: {result.estimatedLitersUsed} liters
                </p>
              </>
            )}

            {form.mode === "COMMUTE" && (
              <div className="text-left text-lg mt-4">
                <h4 className="font-bold mb-4 text-blue-600">Commute Options:</h4>

                {result.options.map((option, optIdx) => (
                  <div key={optIdx} className="mb-6">
                    <h5 className="font-semibold mb-2 text-blue-500">{option.optionTitle}</h5>
                    <p className="mb-1">Time: {option.estimatedTimeMinutes} minutes</p>
                    <p className="mb-2">Cost: ₱{option.estimatedCostPHP}</p>

                    {option.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="mb-2">
                        <span className="font-bold">Step {stepIdx + 1}:</span> {step.description}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>


      {/* <div className="w-full max-w-4xl mt-8">
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg text-center">

        </div>
      </div> */}
    </div>
  );
}

export default App;
