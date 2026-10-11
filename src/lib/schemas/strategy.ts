import { z } from 'zod';
import { EventConceptSchema } from './concept';
import { CulturalEvidenceRecordSchema } from './evidence';

export const BudgetBreakdownCategorySchema = z.object({
  category: z.string(),
  allocatedAmount: z.number().nonnegative(),
  percentageOfTotal: z.number().min(0).max(100),
  notes: z.string()
});

export const ProductionMilestoneSchema = z.object({
  milestone: z.string(),
  timelineOffsetWeeks: z.number(),
  deliverables: z.array(z.string())
});

export const RiskItemSchema = z.object({
  risk: z.string(),
  mitigation: z.string(),
  evidenceGap: z.boolean().default(false)
});

export const EventStrategyReportSchema = z.object({
  id: z.string(),
  briefId: z.string(),
  selectedConceptId: z.string(),
  generatedAt: z.string().default(() => new Date().toISOString()),
  executiveSummary: z.string().min(10),
  positioningStatement: z.string(),
  concept: EventConceptSchema,
  evidenceRegistry: z.record(z.string(), CulturalEvidenceRecordSchema),
  budgetBreakdown: z.array(BudgetBreakdownCategorySchema),
  productionTimeline: z.array(ProductionMilestoneSchema),
  riskManagement: z.array(
    z.object({
      risk: z.string(),
      mitigation: z.string(),
      evidenceGap: z.boolean().default(false)
    })
  ),
  baselineComparisonSummary: z
    .object({
      keyDifferences: z.array(z.string()),
      qlooImpactStatement: z.string()
    })
    .optional()
});

export type EventStrategyReport = z.infer<typeof EventStrategyReportSchema>;
