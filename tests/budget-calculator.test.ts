import { describe, it, expect } from 'vitest';
import {
  calculateBudget,
  validateBudgetAllocation,
  BUDGET_PROFILES
} from '../src/lib/budget/calculator';

describe('Budget Calculator Engine', () => {
  it('guarantees exact sum reconciliation for standard budget', () => {
    const total = 100000;
    const allocation = calculateBudget(total, 'music_led');

    expect(allocation.total).toBe(total);
    const sum =
      allocation.talentAndEntertainment +
      allocation.venueAndProduction +
      allocation.foodAndBeverage +
      allocation.experienceDesign +
      allocation.marketingAndPR +
      allocation.operationsAndStaff +
      allocation.contingency;

    expect(sum).toBe(total);
    const validation = validateBudgetAllocation(allocation);
    expect(validation.isValid).toBe(true);
    expect(validation.discrepancy).toBe(0);
  });

  it('handles arbitrary and odd budgets without losing cents or dollars', () => {
    const oddBudgets = [45678, 123456, 9999, 1000000];

    for (const b of oddBudgets) {
      for (const profileKey of Object.keys(BUDGET_PROFILES) as (keyof typeof BUDGET_PROFILES)[]) {
        const allocation = calculateBudget(b, profileKey);
        const sum =
          allocation.talentAndEntertainment +
          allocation.venueAndProduction +
          allocation.foodAndBeverage +
          allocation.experienceDesign +
          allocation.marketingAndPR +
          allocation.operationsAndStaff +
          allocation.contingency;

        expect(sum).toBe(b);
        expect(validateBudgetAllocation(allocation).isValid).toBe(true);
      }
    }
  });

  it('applies distinct category weights according to strategy profile', () => {
    const total = 100000;
    const musicLed = calculateBudget(total, 'music_led');
    const designLed = calculateBudget(total, 'design_lifestyle');
    const culinaryLed = calculateBudget(total, 'culinary_community');

    // Music profile prioritizes talent
    expect(musicLed.talentAndEntertainment).toBeGreaterThan(musicLed.experienceDesign);

    // Design profile prioritizes experience design
    expect(designLed.experienceDesign).toBeGreaterThan(designLed.talentAndEntertainment);

    // Culinary profile prioritizes food and beverage
    expect(culinaryLed.foodAndBeverage).toBeGreaterThan(culinaryLed.talentAndEntertainment);
  });
});
