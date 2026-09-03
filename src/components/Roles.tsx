import SectionHeading from '@/components/SectionHeading'

// Type voor een werfbare opdracht uit de IT Marktmonitor - los van het
// Contentful-gebaseerde Job-type in lib/types.ts, want dit komt uit een
// heel andere bron (live scraper-data, geen CMS-content).
type WerfbareOpdracht = {
  titel: string
  locatie: string | null
  uren: string | null
  bron_url: string
  profiel: string | null
}

// Zelfde "1 maand opzegtermijn"-uren-normalisatie als de lokale kloon:
// brondata is inconsistent ("36u p/w", "36 uur per week", losse getallen),
// dit maakt er overal "N uur" of "N-M uur" van.
function normaliseerUren(ruweTekst: string | null): string {
  if (!ruweTekst) return 'onbekend'
  const schoon = ruweTekst.trim().toLowerCase()
  const bereikMatch = schoon.match(/(\d+)\s*-\s*(\d+)/)
  if (bereikMatch) return `${bereikMatch[1]}-${bereikMatch[2]} uur`
  const enkelMatch = schoon.match(/(\d+)/)
  if (enkelMatch) return `${enkelMatch[1]} uur`
  return ruweTekst
}

async function haalWerfbareOpdrachten(): Promise<WerfbareOpdracht[]> {
  const basisUrl = process.env.MARKTMONITOR_PUBLIEKE_API || 'https://zzpbaas.nl'
  try {
    const res = await fetch(`${basisUrl}/api/publiek/werfbare-opdrachten`, {
      // Zelfde hergebruik-interval als de rest van de site (zie
      // REVALIDATE_SECONDS in lib/contentful.ts) - deze marktdata hoeft
      // niet op elke paginaload vers opgehaald te worden.
      next: { revalidate: 300 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.opdrachten) ? data.opdrachten : []
  } catch {
    // Als de Mac mini even niet bereikbaar is, laat deze sectie gewoon
    // leeg zien in plaats van de hele pagina te breken.
    return []
  }
}

export default async function Roles() {
  const opdrachten = await haalWerfbareOpdrachten()
  const getoond = opdrachten.slice(0, 6)

  return (
    <section className="container section">
      <div className="mb-8">
        <SectionHeading
          title="Actuele marktvraag"
          subtitle="Een greep uit de opdrachten die dagelijks via ons netwerk binnenkomen."
          className="mb-6"
        />
      </div>
      {opdrachten.length > 0 && (
        <p className="text-sm text-neutral-600 mb-3">
          <strong className="text-black">{opdrachten.length} werfbare opdrachten</strong> op dit moment via ons netwerk - een doorlopende stroom, geen vaste lijst.
        </p>
      )}
      <div className="grid md:grid-cols-2 gap-3">
        {getoond.map((o, i) => (
          <article key={`${o.bron_url}-${i}`} className="panel">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{o.titel}</h3>
              <span className="pill" style={{ whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '.5rem' }}>
                {normaliseerUren(o.uren)}
              </span>
            </div>
            <div className="meta mt-1">{o.locatie || 'locatie onbekend'}</div>
          </article>
        ))}
      </div>
      <div className="panel mt-4">
        <strong>Open sollicitatie</strong> — Deel je profiel en voorkeursstack; we pingen je zodra er een match is.
      </div>
    </section>
  )
}
