import { NextRequest, NextResponse } from 'next/server';
import { orchestrator } from '@/lib/agent/orchestrator';
import { EventBriefSchema } from '@/lib/schemas/brief';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = EventBriefSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues
        .map((i) => `${i.path.join('.')}: ${i.message}`)
        .join('; ');
      console.error('[plan-research validation error]:', errorMsg);
      return NextResponse.json(
        {
          success: false,
          error: `Invalid event brief: ${errorMsg}`,
          issues: parseResult.error.issues
        },
        { status: 400 }
      );
    }

    const brief = parseResult.data;

    try {
      const evidence = await orchestrator.gatherEvidence(brief);

      return NextResponse.json({
        success: true,
        brief,
        evidence,
        summary: {
          totalRecords: evidence.length,
          artistsCount: evidence.filter((e) => e.entityType === 'urn:entity:artist').length,
          brandsCount: evidence.filter((e) => e.entityType === 'urn:entity:brand').length,
          placesCount: evidence.filter((e) => e.entityType === 'urn:entity:place').length
        }
      });
    } catch (gatherErr) {
      console.error('[plan-research gather error]:', gatherErr);
      return NextResponse.json(
        {
          success: false,
          error: gatherErr instanceof Error ? gatherErr.message : 'Failed to gather cultural evidence'
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error('[plan-research json error]:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to parse request body'
      },
      { status: 400 }
    );
  }
}
