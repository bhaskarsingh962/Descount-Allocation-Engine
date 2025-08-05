// src/services/allocator.js

export const FACTOR_WEIGHTS = {
  performanceScore: 0.4,
  seniorityMonths: 0.2,
  targetAchievedPercent: 0.25,
  activeClients: 0.15,
};

export function normalize(fieldValues) {
  const min = Math.min(...fieldValues);
  const max = Math.max(...fieldValues);
  if (min === max) return fieldValues.map(() => 1);
  return fieldValues.map(val => (val - min) / (max - min));
}

export function allocateDiscount({ siteKitty, salesAgents, minPerAgent = 0, maxPerAgent = Infinity }) {
  if (!siteKitty || !Array.isArray(salesAgents) || salesAgents.length === 0) {
    throw new Error('Invalid input! siteKitty and salesAgents are required.');
  }
  const keys = Object.keys(FACTOR_WEIGHTS);
  const fields = keys.map(key => salesAgents.map(agent => agent[key]));
  const normalizedFields = fields.map(normalize);

  const scores = salesAgents.map((_, i) =>
    keys.reduce((sum, key, j) => sum + normalizedFields[j][i] * FACTOR_WEIGHTS[key], 0)
  );
  const totalScore = scores.reduce((a, b) => a + b, 0);

  const allocations = [];
  let assignedSum = 0;
  salesAgents.forEach((agent, i) => {
    let amt = Math.round((scores[i] / totalScore) * siteKitty);
    amt = Math.max(minPerAgent, Math.min(maxPerAgent, amt));
    allocations.push(amt);
    assignedSum += amt;
  });

  if (assignedSum !== siteKitty && allocations.length > 0) {
    allocations[allocations.length - 1] += (siteKitty - assignedSum);
  }

  const justifications = salesAgents.map((_, idx) => {
    let maxKey = keys[0];
    let maxVal = normalizedFields[0][idx];
    for (let k = 1; k < keys.length; k++) {
      if (normalizedFields[k][idx] > maxVal) {
        maxKey = keys[k];
        maxVal = normalizedFields[k][idx];
      }
    }
    switch (maxKey) {
      case 'performanceScore': return 'High performance driving value.';
      case 'seniorityMonths': return 'Long-term loyal contribution.';
      case 'targetAchievedPercent': return 'Excellent target achievement.';
      case 'activeClients': return 'High responsibility for clients.';
      default: return 'Solid contribution across criteria.';
    }
  });

  return {
    allocations: salesAgents.map((agent, i) => ({
      id: agent.id,
      assignedDiscount: allocations[i],
      justification: justifications[i]
    }))
  };
}
