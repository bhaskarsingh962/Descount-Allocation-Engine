// tests/allocator.test.js

import { allocateDiscount } from '../src/services/allocator.js';

describe('allocateDiscount', () => {
  it('should allocate according to weights (normal case)', () => {
    const input = {
      siteKitty: 10000,
      salesAgents: [
        {id: "A1", performanceScore: 90, seniorityMonths: 10, targetAchievedPercent: 80, activeClients: 10},
        {id: "A2", performanceScore: 70, seniorityMonths: 5, targetAchievedPercent: 60, activeClients: 8},
        {id: "A3", performanceScore: 60, seniorityMonths: 20, targetAchievedPercent: 70, activeClients: 12},
      ]
    };
    const result = allocateDiscount(input);
    expect(result.allocations.length).toBe(3);
    expect(result.allocations.reduce((sum, a) => sum + a.assignedDiscount, 0)).toBe(10000);
  });

  it('should handle all agents with the same scores', () => {
    const input = {
      siteKitty: 900,
      salesAgents: [
        {id: "A1", performanceScore: 50, seniorityMonths: 10, targetAchievedPercent: 80, activeClients: 10},
        {id: "A2", performanceScore: 50, seniorityMonths: 10, targetAchievedPercent: 80, activeClients: 10},
        {id: "A3", performanceScore: 50, seniorityMonths: 10, targetAchievedPercent: 80, activeClients: 10}
      ]
    };
    const result = allocateDiscount(input);
    expect(result.allocations.every(a => a.assignedDiscount === 300)).toBe(true);
  });

  it('should handle rounding edge case', () => {
    const input = {
      siteKitty: 100,
      salesAgents: [
        {id: "A1", performanceScore: 90, seniorityMonths: 18, targetAchievedPercent: 85, activeClients: 12},
        {id: "A2", performanceScore: 70, seniorityMonths: 6, targetAchievedPercent: 60, activeClients: 8}
      ]
    };
    const result = allocateDiscount(input);
    expect(result.allocations.reduce((sum, a) => sum + a.assignedDiscount, 0)).toBe(100);
  });
});
