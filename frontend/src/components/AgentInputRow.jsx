import React from "react";

const AgentsInputTable = ({ agents, onChange, onRemove, onAdd }) => (
  <div>
    <label className="font-medium mb-2 block">Sales Agents:</label>
    <div className="overflow-x-auto">
      <table className="table-auto w-full mb-2">
        <thead>
          <tr>
            <th className="px-2 py-1">Agent ID</th>
            <th className="px-2 py-1">Performance Score<br /><span className="text-xs text-gray-400">(0–100)</span></th>
            <th className="px-2 py-1">Seniority (mo)</th>
            <th className="px-2 py-1">Target Achieved %<br /><span className="text-xs text-gray-400">(0–100)</span></th>
            <th className="px-2 py-1">Active Clients</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={agent.id}
                  onChange={e => onChange(index, "id", e.target.value)}
                  placeholder="Agent ID"
                  className="px-2 py-1 border rounded w-[70px]"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={agent.performanceScore}
                  onChange={e => onChange(index, "performanceScore", +e.target.value)}
                  placeholder="Performance"
                  className="px-2 py-1 border rounded w-[110px]"
                  min={0} max={100}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={agent.seniorityMonths}
                  onChange={e => onChange(index, "seniorityMonths", +e.target.value)}
                  placeholder="Seniority (mo)"
                  className="px-2 py-1 border rounded w-[110px]"
                  min={0}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={agent.targetAchievedPercent}
                  onChange={e => onChange(index, "targetAchievedPercent", +e.target.value)}
                  placeholder="Target %"
                  className="px-2 py-1 border rounded w-[90px]"
                  min={0} max={100}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={agent.activeClients}
                  onChange={e => onChange(index, "activeClients", +e.target.value)}
                  placeholder="Clients"
                  className="px-2 py-1 border rounded w-[80px]"
                  min={0}
                  required
                />
              </td>
              <td>
                <button
                  type="button"
                  className="text-red-500 ml-2"
                  onClick={() => onRemove(index)}
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
      onClick={onAdd}
    >
      + Add Agent
    </button>
  </div>
);

export default AgentsInputTable;
