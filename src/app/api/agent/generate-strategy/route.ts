import { NextRequest, NextResponse } from 'next/server';
import { orchestrator } from '@/lib/agent/orchestrator';
import { EventBriefSchema } from '@/lib/schemas/brief';
import { EventConceptSchema } from '@/lib/schemas/concept';
import { CulturalEvidenceRecordSchema } from '@/lib/schemas/evidence';
import { z } from 'zod';

const RequestSchema = z.object({
  brief: EventBriefSchema,
  selectedConcept: EventConceptSchema,
  evidence: z.array(CulturalEvidenceRecordSchema)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { brief, selectedConcept, evidence } = RequestSchema.parse(body);

    const report = orchestrator.generateStrategyReport(brief, selectedConcept, evidence);

    return NextResponse.json({
      success: true,
      report
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to generate strategy'
      },
      { status: 400 }
    );
  }
}
