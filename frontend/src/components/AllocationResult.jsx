import React from "react";

const AllocationResult = ({ allocations }) => (
  <div className="mt-6 border rounded p-4 bg-white">
    <h3 className="text-lg font-semibold mb-3">Allocation Results</h3>
    <div className="mb-4">
      <ul className="list-disc list-inside text-sm text-gray-700">
        <li>
          <b>Agent ID:</b> Unique identifier for the sales agent.
        </li>
        <li>
          <b>Assigned Discount:</b> Amount (from the total kitty) allocated to the agent, based on their scores.
        </li>
        <li>
          <b>Justification:</b> The main reason (sales metric) driving the allocation for this agent.
        </li>
      </ul>
    </div>
    <div className="overflow-x-auto">
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-2 border">Agent ID</th>
            <th className="px-3 py-2 border">Assigned Discount</th>
            <th className="px-3 py-2 border">Justification</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map((a) => (
            <tr key={a.id}>
              <td className="px-3 py-2 border">{a.id}</td>
              <td className="px-3 py-2 border font-mono">{a.assignedDiscount}</td>
              <td className="px-3 py-2 border">{a.justification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AllocationResult;
