import React, { useState } from "react";
import AllocationResult from "./components/AllocationResult";

const backendApi = "https://descount-allocation-engine-backend.onrender.com";

const initialAgent = {
  id: "",
  performanceScore: 0,
  seniorityMonths: 0,
  targetAchievedPercent: 0,
  activeClients: 0
};

function App() {
  const [siteKitty, setSiteKitty] = useState(10000);
  const [agents, setAgents] = useState([
    { ...initialAgent, id: "A1" },
    { ...initialAgent, id: "A2" }
  ]);
  const [allocations, setAllocations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAgentChange = (index, field, value) => {
    setAgents((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleAgentRemove = (index) => {
    setAgents((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddAgent = () => {
    setAgents((prev) => [...prev, { ...initialAgent }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAllocations([]);
    setError("");
    setLoading(true);
    try {
      const response = await fetch(backendApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteKitty, salesAgents: agents })
      });
      if (!response.ok) throw new Error("Failed to allocate: " + (await response.text()));
      const data = await response.json();
      setAllocations(data.allocations || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Smart Discount Allocation Engine</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-medium">Total Discount Kitty:</label>
            <input
              type="number"
              value={siteKitty}
              min={1}
              className="ml-3 px-2 py-1 border rounded w-32"
              onChange={e => setSiteKitty(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className="font-medium mb-2 block">Sales Agents:</label>
            <div className="overflow-x-auto">
              <table className="table-auto w-full mb-2">
                <thead>
                  <tr>
                    <th className="px-2 py-1">Agent ID</th>
                    <th className="px-2 py-1">Performance Score<br /><span className="text-xs text-gray-400">(0–100)</span></th>
                    <th className="px-2 py-1">Seniority (months)</th>
                    <th className="px-2 py-1">Target Achieved %<br /><span className="text-xs text-gray-400">(0–100)</span></th>
                    <th className="px-2 py-1">Active Clients</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent, i) => (
                    <tr key={i}>
                      <td>
                        <input
                          type="text"
                          value={agent.id}
                          onChange={e => handleAgentChange(i, "id", e.target.value)}
                          placeholder="Agent ID"
                          className="px-2 py-1 border rounded w-full"
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={agent.performanceScore}
                          onChange={e => handleAgentChange(i, "performanceScore", +e.target.value)}
                          placeholder="Performance"
                          className="px-2 py-1 border rounded w-full"
                          min={0} max={100}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={agent.seniorityMonths}
                          onChange={e => handleAgentChange(i, "seniorityMonths", +e.target.value)}
                          placeholder="Seniority (mo)"
                          className="px-2 py-1 border rounded w-full"
                          min={0}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={agent.targetAchievedPercent}
                          onChange={e => handleAgentChange(i, "targetAchievedPercent", +e.target.value)}
                          placeholder="Target %"
                          className="px-2 py-1 border rounded w-full"
                          min={0} max={100}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={agent.activeClients}
                          onChange={e => handleAgentChange(i, "activeClients", +e.target.value)}
                          placeholder="Clients"
                          className="px-2 py-1 border rounded w-full"
                          min={0}
                          required
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="text-red-500 ml-2"
                          onClick={() => handleAgentRemove(i)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
              onClick={handleAddAgent}
            >
              + Add Agent
            </button>
          </div>
          <button
            type="submit"
            className="mt-6 w-full py-2 bg-green-600 text-white rounded text-lg font-semibold hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Allocating..." : "Allocate Discounts"}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-2 bg-red-100 text-red-600 rounded">{error}</div>
        )}
        {allocations.length > 0 && <AllocationResult allocations={allocations} />}
      </div>
      <footer className="mt-8 text-gray-500 text-sm">Admin Bhaskar Singh | MERN Stack Discount Allocation Engine </footer>
    </div>
  );
}

export default App;
