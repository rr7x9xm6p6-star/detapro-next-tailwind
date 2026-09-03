import type { Metadata } from 'next'
import { haalWerfbareOpdrachten, normaliseerUren, schoneTitel, dedupliceerOpTitel, type WerfbareOpdracht } from '@/lib/werfbareOpdrachten'

function hoofdletterVoornaam(naam: string): string {
  const schoon = decodeURIComponent(naam).trim()
  if (!schoon) return 'daar'
  return schoon.charAt(0).toUpperCase() + schoon.slice(1).toLowerCase()
}

function matchtFunctie(functieZoekterm: string, opdracht: WerfbareOpdracht): boolean {
  const zoek = functieZoekterm.toLowerCase()
  const titel = (opdracht.titel || '').toLowerCase()
  const profiel = (opdracht.profiel || '').toLowerCase()
  return titel.includes(zoek) || profiel.includes(zoek)
}

// Next.js 15+: `params` is een Promise geworden (voorheen een direct
// object) - vergeten te awaiten leverde overal "undefined" op.
type Props = { params: Promise<{ naam: string; functie: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { naam } = await params
  const voornaam = hoofdletterVoornaam(naam)
  return { title: `Voor ${voornaam} – detapro`, robots: { index: false, follow: false } }
}

export default async function PersoonlijkeLandingspagina({ params }: Props) {
  const { naam, functie } = await params
  const voornaam = hoofdletterVoornaam(naam)
  const functieRuw = decodeURIComponent(functie).replace(/-/g, ' ').trim()
  const functieWeergave = functieRuw.charAt(0).toUpperCase() + functieRuw.slice(1)

  const opdrachten = await haalWerfbareOpdrachten()
  const relevant = opdrachten.filter((o) => matchtFunctie(functieRuw, o))
  const heeftSpecifiekeMatch = relevant.length > 0
  const gededuped = dedupliceerOpTitel(heeftSpecifiekeMatch ? relevant : opdrachten)
  const getoond = gededuped.slice(0, 4)

  const introRegel = heeftSpecifiekeMatch
    ? `We zien doorlopend vraag naar ${functieWeergave.toLowerCase()}s zoals jij - op dit moment ${relevant.length} opdrachten die daar direct bij aansluiten.`
    : `We houden de markt voor ${functieWeergave.toLowerCase()}s continu in de gaten - hieronder een greep uit wat er nu breder speelt in ons netwerk.`

  return (
    <div className="container section">
      <div className="mb-8">
        <p className="text-sm text-neutral-600 mb-1">Speciaal voor jou samengesteld</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
          Hoi {voornaam}, goed dat je een kijkje neemt.
        </h1>
        <p className="mt-3 text-neutral-600 max-w-2xl">
          Je bent benaderd met {functieWeergave} in gedachten. {introRegel}
        </p>
      </div>
      <div className="flex gap-2 mb-8">
        <span className="btn btn-solid" aria-disabled="true" style={{ pointerEvents: 'none', opacity: 0.7, cursor: 'default' }}>Plan een kennismakingsgesprek</span>
        <a className="btn" href="/about">Over detapro</a>
      </div>
      {getoond.length > 0 ? (
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
      ) : (
        <div className="panel">
          <p className="text-neutral-600">
            Op dit moment geen actuele opdrachten beschikbaar om te tonen - neem gerust contact op, dan bespreken we het persoonlijk.
          </p>
        </div>
      )}
    </div>
  )
}
