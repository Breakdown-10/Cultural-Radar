import { NextRequest, NextResponse } from 'next/server';
import { generateBaselineConcept } from '@/lib/agent/baseline';
import { EventBriefSchema } from '@/lib/schemas/brief';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const brief = EventBriefSchema.parse(body);

    const baseline = generateBaselineConcept(brief);

    return NextResponse.json({
      success: true,
      baseline
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to generate baseline'
      },
      { status: 400 }
    );
  }
}
