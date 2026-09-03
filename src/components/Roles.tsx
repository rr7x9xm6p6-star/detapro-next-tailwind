import SectionHeading from '@/components/SectionHeading'
import { haalWerfbareOpdrachten, normaliseerUren, schoneTitel, dedupliceerOpTitel } from '@/lib/werfbareOpdrachten'

// Alleen deze profielcategorieen tonen ("beheer, infrastructuur en cloud")
// - dit is waar Detapro daadwerkelijk in specialiseert, in plaats van een
// willekeurige mix van alles wat de marktmonitor scrapet.
const RELEVANTE_PROFIELEN = [
  'Cloud / Infrastructure Engineer',
  'Technisch Applicatiebeheerder',
  'Functioneel Beheerder',
]

export default async function Roles() {
  const alleOpdrachten = await haalWerfbareOpdrachten()
  const gefilterd = alleOpdrachten.filter((o) => o.profiel && RELEVANTE_PROFIELEN.includes(o.profiel))
  const opdrachten = dedupliceerOpTitel(gefilterd)
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
      <div className="grid md:grid-cols-2 gap-3">
        {getoond.map((o, i) => (
          <article key={`${o.bron_url}-${i}`} className="panel">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{schoneTitel(o.titel)}</h3>
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
