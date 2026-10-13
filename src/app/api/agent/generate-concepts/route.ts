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
    const parseResult = RequestSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues
        .map((i) => `${i.path.join('.')}: ${i.message}`)
        .join('; ');
      console.error('[generate-concepts validation error]:', errorMsg);
      return NextResponse.json(
        {
          success: false,
          error: `Invalid concept generation request: ${errorMsg}`,
          issues: parseResult.error.issues
        },
        { status: 400 }
      );
    }

    const { brief, evidence } = parseResult.data;

    try {
      const concepts = await orchestrator.generateConcepts(brief, evidence);

      return NextResponse.json({
        success: true,
        concepts
      });
    } catch (genErr) {
      console.error('[generate-concepts orchestrator error]:', genErr);
      return NextResponse.json(
        {
          success: false,
          error: genErr instanceof Error ? genErr.message : 'Failed to generate concepts'
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error('[generate-concepts json error]:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to parse request body'
      },
      { status: 400 }
    );
  }
}
