import { NextRequest, NextResponse } from 'next/server';
import { qloo } from '@/lib/qloo/client';
import { QlooEntityType } from '@/lib/qloo/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filterType = searchParams.get('filterType') as QlooEntityType;
  const entities = searchParams.get('entities');
  const tags = searchParams.get('tags');
  const take = searchParams.get('take') ? parseInt(searchParams.get('take')!, 10) : 4;

  if (!filterType) {
    return NextResponse.json({ success: false, error: 'filterType parameter is required' }, { status: 400 });
  }

  const res = await qloo.getInsights({
    filterType,
    signalInterestsEntities: entities ? entities.split(',') : undefined,
    signalInterestsTags: tags ? tags.split(',') : undefined,
    take
  });

  return NextResponse.json(res);
}
