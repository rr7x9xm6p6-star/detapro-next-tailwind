import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Wordt aangeroepen door een Contentful-webhook zodra een vacature wordt
// gepubliceerd/gewijzigd/verwijderd. Verifieert eerst een gedeeld geheim
// (in de query-string, ?secret=...) - zonder die check zou iedereen die
// deze URL kent de site-cache kunnen laten legen.
//
// Er zijn geen aparte content-tags ingesteld op de Contentful-fetches
// (zie src/lib/contentful.ts), dus in plaats van een gerichte tag te
// verversen, verversen we simpelweg de paden waar vacaturedata getoond
// wordt: de homepage (Roles/LatestJobs-componenten), de vacaturelijst, en
// alle losse vacaturepagina's ineens via het dynamische-route-patroon.
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.CONTENTFUL_REVALIDATE_SECRET || secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: 'Ongeldig of ontbrekend secret' }, { status: 401 })
  }

  try {
    revalidatePath('/')
    revalidatePath('/jobs')
    revalidatePath('/jobs/[slug]', 'page')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (e: any) {
    return NextResponse.json({ revalidated: false, message: e?.message || 'Onbekende fout' }, { status: 500 })
  }
}
