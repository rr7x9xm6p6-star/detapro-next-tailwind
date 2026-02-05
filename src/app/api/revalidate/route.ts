
import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest){
  // Optional: add a secret header check here
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
