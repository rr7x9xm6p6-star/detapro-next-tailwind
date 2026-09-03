// Gedeelde hulpfuncties voor het weergeven van werfbare opdrachten uit de
// IT Marktmonitor - gebruikt door zowel Roles.tsx (homepage) als de
// persoonlijke /voor/[naam]/[functie]-pagina, zodat deze logica maar op
// één plek hoeft te worden onderhouden.

export type WerfbareOpdracht = {
  titel: string
  locatie: string | null
  uren: string | null
  bron_url: string
  profiel: string | null
}

// Brontitels bevatten vaak een intern referentienummer aan het eind,
// soms voorafgegaan door "(Nfte)" - ruis voor een bezoeker, geen
// onderdeel van de eigenlijke functietitel.
// "Platform Engineer Big Data (2fte) 24461292" -> "Platform Engineer Big Data"
// "E-learning Ontwikkelaar 24461328" -> "E-learning Ontwikkelaar"
// Titels zonder zo'n lang getal (bv. "3 Werkplekmigratie specialisten
// (ZZP only)") blijven ongemoeid - de drempel van 5+ cijfers voorkomt dat
// kleine, betekenisvolle getallen ("Fase 2") per ongeluk verdwijnen.
export function schoneTitel(titel: string): string {
  return titel.replace(/\s*(\(\d+fte\))?\s*\d{5,}\s*$/i, '').trim()
}

// Brondata voor uren is inconsistent ("36u p/w", "36 uur per week",
// losse getallen) - normaliseert naar "N uur" of "N-M uur" bij een bereik.
export function normaliseerUren(ruweTekst: string | null): string {
  if (!ruweTekst) return 'onbekend'
  const schoon = ruweTekst.trim().toLowerCase()
  const bereikMatch = schoon.match(/(\d+)\s*-\s*(\d+)/)
  if (bereikMatch) return `${bereikMatch[1]}-${bereikMatch[2]} uur`
  const enkelMatch = schoon.match(/(\d+)/)
  if (enkelMatch) return `${enkelMatch[1]} uur`
  return ruweTekst
}

export async function haalWerfbareOpdrachten(): Promise<WerfbareOpdracht[]> {
  const basisUrl = process.env.MARKTMONITOR_PUBLIEKE_API || 'https://zzpbaas.nl'
  try {
    const res = await fetch(`${basisUrl}/api/publiek/werfbare-opdrachten`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.opdrachten) ? data.opdrachten : []
  } catch {
    return []
  }
}
