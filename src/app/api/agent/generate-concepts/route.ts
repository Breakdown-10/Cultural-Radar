import { NextRequest, NextResponse } from 'next/server';
import { orchestrator } from '@/lib/agent/orchestrator';
import { EventBriefSchema } from '@/lib/schemas/brief';
import { CulturalEvidenceRecordSchema } from '@/lib/schemas/evidence';
import { z } from 'zod';

const RequestSchema = z.object({
  brief: EventBriefSchema,
  evidence: z.array(CulturalEvidenceRecordSchema)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { brief, evidence } = RequestSchema.parse(body);

    const concepts = await orchestrator.generateConcepts(brief, evidence);

    return NextResponse.json({
      success: true,
      concepts
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to generate concepts'
      },
      { status: 400 }
    );
  }
}
