/**
 * Deterministic Budget Calculation and Allocation Engine
 * Enforces PRD Requirement FR-05 & FR-08:
 * - Deterministic arithmetic, never relying on LLM math guesses
 * - Allocates across 7 standard production categories
 * - Guarantees sum(allocations) === totalBudget exactly down to the dollar
 */

import { BudgetAllocation } from '../schemas/concept';

export type BudgetProfileType =
  | 'music_led'
  | 'design_lifestyle'
  | 'culinary_community'
  | 'balanced';

export interface BudgetProfile {
  name: BudgetProfileType;
  label: string;
  weights: {
    talentAndEntertainment: number;
    venueAndProduction: number;
    foodAndBeverage: number;
    experienceDesign: number;
    marketingAndPR: number;
    operationsAndStaff: number;
    contingency: number;
  };
}

export const BUDGET_PROFILES: Record<BudgetProfileType, BudgetProfile> = {
  music_led: {
    name: 'music_led',
    label: 'Music & Performance Led',
    weights: {
      talentAndEntertainment: 0.35,
      venueAndProduction: 0.25,
      foodAndBeverage: 0.10,
      experienceDesign: 0.10,
      marketingAndPR: 0.10,
      operationsAndStaff: 0.05,
      contingency: 0.05
    }
  },
  design_lifestyle: {
    name: 'design_lifestyle',
    label: 'Design & Spatial Atmosphere Led',
    weights: {
      talentAndEntertainment: 0.15,
      venueAndProduction: 0.25,
      foodAndBeverage: 0.10,
      experienceDesign: 0.30,
      marketingAndPR: 0.10,
      operationsAndStaff: 0.05,
      contingency: 0.05
    }
  },
  culinary_community: {
    name: 'culinary_community',
    label: 'Gastronomy & Community Centric',
    weights: {
      talentAndEntertainment: 0.15,
      venueAndProduction: 0.25,
      foodAndBeverage: 0.30,
      experienceDesign: 0.10,
      marketingAndPR: 0.10,
      operationsAndStaff: 0.05,
      contingency: 0.05
    }
  },
  balanced: {
    name: 'balanced',
    label: 'Balanced Experiential Gathering',
    weights: {
      talentAndEntertainment: 0.25,
      venueAndProduction: 0.25,
      foodAndBeverage: 0.15,
      experienceDesign: 0.15,
      marketingAndPR: 0.10,
      operationsAndStaff: 0.05,
      contingency: 0.05
    }
  }
};

/**
 * Calculates deterministic budget allocations that guarantee exact reconciliation with total.
 */
export function calculateBudget(
  totalBudget: number,
  profileType: BudgetProfileType = 'balanced'
): BudgetAllocation {
  if (totalBudget <= 0) {
    throw new Error('Total budget must be greater than zero');
  }

  const profile = BUDGET_PROFILES[profileType] || BUDGET_PROFILES.balanced;
  const w = profile.weights;

  // Round individual categories to whole integers
  const talentAndEntertainment = Math.round(totalBudget * w.talentAndEntertainment);
  const venueAndProduction = Math.round(totalBudget * w.venueAndProduction);
  const foodAndBeverage = Math.round(totalBudget * w.foodAndBeverage);
  const experienceDesign = Math.round(totalBudget * w.experienceDesign);
  const marketingAndPR = Math.round(totalBudget * w.marketingAndPR);
  const operationsAndStaff = Math.round(totalBudget * w.operationsAndStaff);

  // Contingency absorbs the difference so total equals exactly totalBudget
  const allocatedSubtotal =
    talentAndEntertainment +
    venueAndProduction +
    foodAndBeverage +
    experienceDesign +
    marketingAndPR +
    operationsAndStaff;

  const contingency = totalBudget - allocatedSubtotal;

  return {
    talentAndEntertainment,
    venueAndProduction,
    foodAndBeverage,
    experienceDesign,
    marketingAndPR,
    operationsAndStaff,
    contingency,
    total: totalBudget
  };
}

/**
 * Validates whether an existing allocation matches the stated total.
 */
export function validateBudgetAllocation(allocation: BudgetAllocation): {
  isValid: boolean;
  discrepancy: number;
} {
  const sum =
    allocation.talentAndEntertainment +
    allocation.venueAndProduction +
    allocation.foodAndBeverage +
    allocation.experienceDesign +
    allocation.marketingAndPR +
    allocation.operationsAndStaff +
    allocation.contingency;

  const discrepancy = sum - allocation.total;

  return {
    isValid: Math.abs(discrepancy) < 0.01,
    discrepancy
  };
}

/**
 * Recalculates a budget when modified (e.g. "reduce budget by 20%").
 */
export function adjustTotalBudget(
  currentAllocation: BudgetAllocation,
  newTotalBudget: number,
  profileType: BudgetProfileType = 'balanced'
): BudgetAllocation {
  return calculateBudget(newTotalBudget, profileType);
}
