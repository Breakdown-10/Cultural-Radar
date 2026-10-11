import { NextRequest, NextResponse } from 'next/server';
import { EventStrategyReportSchema } from '@/lib/schemas/strategy';
import { calculateBudget, BudgetProfileType } from '@/lib/budget/calculator';
import { z } from 'zod';

const RefineRequestSchema = z.object({
  report: EventStrategyReportSchema,
  instruction: z.string().min(2)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { report, instruction } = RefineRequestSchema.parse(body);

    const lower = instruction.toLowerCase();
    const updatedConcept = { ...report.concept };
    let currentTotal = updatedConcept.budgetAllocation.total;
    let targetProfile: BudgetProfileType = 'balanced';

    // 1. Detect budget change keywords
    const reduceMatch = lower.match(/reduce\s+(?:the\s+)?budget\s+by\s+(\d+)%/);
    const increaseMatch = lower.match(/increase\s+(?:the\s+)?budget\s+by\s+(\d+)%/);
    const directBudgetMatch = lower.match(/(?:budget\s+to|\$)\s*(\d[\d,]*)/);

    if (reduceMatch) {
      const pct = parseInt(reduceMatch[1], 10);
      currentTotal = Math.round(currentTotal * (1 - pct / 100));
    } else if (increaseMatch) {
      const pct = parseInt(increaseMatch[1], 10);
      currentTotal = Math.round(currentTotal * (1 + pct / 100));
    } else if (directBudgetMatch) {
      const raw = directBudgetMatch[1].replace(/,/g, '');
      const parsed = parseInt(raw, 10);
      if (parsed > 0) currentTotal = parsed;
    }

    // 2. Detect strategic focus shift
    if (lower.includes('music') || lower.includes('dj') || lower.includes('concert') || lower.includes('band')) {
      targetProfile = 'music_led';
      updatedConcept.tagline = `${updatedConcept.tagline} (Music-Enhanced Edition)`;
    } else if (lower.includes('design') || lower.includes('art') || lower.includes('spatial')) {
      targetProfile = 'design_lifestyle';
      updatedConcept.tagline = `${updatedConcept.tagline} (Design & Spatial Edition)`;
    } else if (lower.includes('food') || lower.includes('culinary') || lower.includes('dining')) {
      targetProfile = 'culinary_community';
      updatedConcept.tagline = `${updatedConcept.tagline} (Culinary-Centric Edition)`;
    }

    // 3. Remove luxury or specific sponsors if requested
    if (lower.includes('remove luxury') || lower.includes('remove luxury brand')) {
      updatedConcept.brandPartnerships = {
        candidateBrands: updatedConcept.brandPartnerships.candidateBrands.filter(
          (b) => !b.category.toLowerCase().includes('luxury')
        )
      };
    }

    // 4. Deterministically recompute budget
    const newAllocation = calculateBudget(currentTotal, targetProfile);
    updatedConcept.budgetAllocation = newAllocation;

    // 5. Recompute strategy breakdown
    const updatedBreakdown = [
      {
        category: 'Talent & Entertainment',
        allocatedAmount: newAllocation.talentAndEntertainment,
        percentageOfTotal: Number(((newAllocation.talentAndEntertainment / currentTotal) * 100).toFixed(1)),
        notes: 'Updated talent allocation'
      },
      {
        category: 'Venue & Production',
        allocatedAmount: newAllocation.venueAndProduction,
        percentageOfTotal: Number(((newAllocation.venueAndProduction / currentTotal) * 100).toFixed(1)),
        notes: 'Site and technical production'
      },
      {
        category: 'Food & Beverage',
        allocatedAmount: newAllocation.foodAndBeverage,
        percentageOfTotal: Number(((newAllocation.foodAndBeverage / currentTotal) * 100).toFixed(1)),
        notes: 'Curated craft gastronomy'
      },
      {
        category: 'Experience Design',
        allocatedAmount: newAllocation.experienceDesign,
        percentageOfTotal: Number(((newAllocation.experienceDesign / currentTotal) * 100).toFixed(1)),
        notes: 'Interactive sensory touchpoints'
      },
      {
        category: 'Marketing & PR',
        allocatedAmount: newAllocation.marketingAndPR,
        percentageOfTotal: Number(((newAllocation.marketingAndPR / currentTotal) * 100).toFixed(1)),
        notes: 'Campaign & audience outreach'
      },
      {
        category: 'Operations & Staff',
        allocatedAmount: newAllocation.operationsAndStaff,
        percentageOfTotal: Number(((newAllocation.operationsAndStaff / currentTotal) * 100).toFixed(1)),
        notes: 'Operations and guest services'
      },
      {
        category: 'Contingency',
        allocatedAmount: newAllocation.contingency,
        percentageOfTotal: Number(((newAllocation.contingency / currentTotal) * 100).toFixed(1)),
        notes: 'Risk buffer'
      }
    ];

    const updatedReport = {
      ...report,
      concept: updatedConcept,
      budgetBreakdown: updatedBreakdown,
      executiveSummary: `${report.executiveSummary}\n\n[Revision applied: "${instruction}"]`
    };

    return NextResponse.json({
      success: true,
      report: updatedReport,
      changesApplied: {
        newTotal: currentTotal,
        profileApplied: targetProfile,
        instruction
      }
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to refine strategy'
      },
      { status: 400 }
    );
  }
}
