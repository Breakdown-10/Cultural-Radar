import { z } from 'zod';

export const ConceptComponentItemSchema = z.object({
  name: z.string(),
  rationale: z.string(),
  evidenceIds: z.array(z.string()).default([])
});

export const BudgetAllocationSchema = z.object({
  talentAndEntertainment: z.number().nonnegative(),
  venueAndProduction: z.number().nonnegative(),
  foodAndBeverage: z.number().nonnegative(),
  experienceDesign: z.number().nonnegative(),
  marketingAndPR: z.number().nonnegative(),
  operationsAndStaff: z.number().nonnegative(),
  contingency: z.number().nonnegative(),
  total: z.number().positive()
});

export const EventConceptSchema = z.object({
  id: z.string(),
  conceptNumber: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  title: z.string().min(2),
  tagline: z.string(),
  creativeDirection: z.string(),
  targetAudienceFit: z.string(),
  coreExperience: z.string(),
  programming: z.object({
    headliners: z.array(ConceptComponentItemSchema).default([]),
    supportingActs: z.array(ConceptComponentItemSchema).default([])
  }),
  foodAndLifestyle: z.object({
    fnbDirection: z.string(),
    candidateVendors: z.array(ConceptComponentItemSchema).default([]),
    installations: z.array(z.string()).default([])
  }),
  brandPartnerships: z.object({
    candidateBrands: z
      .array(
        z.object({
          name: z.string(),
          category: z.string(),
          synergyRationale: z.string(),
          evidenceIds: z.array(z.string()).default([])
        })
      )
      .default([])
  }),
  budgetAllocation: BudgetAllocationSchema,
  supportingEvidenceIds: z.array(z.string()).default([]),
  creativeHypotheses: z.array(z.string()).default([]),
  unresolvedRisks: z.array(z.string()).default([])
});

export type EventConcept = z.infer<typeof EventConceptSchema>;
export type BudgetAllocation = z.infer<typeof BudgetAllocationSchema>;
