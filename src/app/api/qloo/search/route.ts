import { NextRequest, NextResponse } from 'next/server';
import { qloo } from '@/lib/qloo/client';

import { QlooSearchType } from '@/lib/qloo/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const type = searchParams.get('type') as QlooSearchType | null;
  const take = searchParams.get('take') ? parseInt(searchParams.get('take')!, 10) : 5;

  if (!query) {
    return NextResponse.json({ success: false, error: 'Query parameter is required' }, { status: 400 });
  }

  const res = await qloo.search({
    query,
    types: type ? [type] : undefined,
    take
  });

  return NextResponse.json(res);
}
