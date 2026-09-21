import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const rows = await prisma.stockSnapshot.findMany({
    where: { symbol: 'VSTK' },
    orderBy: { createdAt: 'desc' },
    take: 60,
  });

  return NextResponse.json(rows.reverse());
}
