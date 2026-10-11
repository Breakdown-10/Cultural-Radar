import { NextRequest, NextResponse } from 'next/server';
import { orchestrator } from '@/lib/agent/orchestrator';
import { EventBriefSchema } from '@/lib/schemas/brief';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const brief = EventBriefSchema.parse(body);

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
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to plan research'
      },
      { status: 400 }
    );
  }
}
