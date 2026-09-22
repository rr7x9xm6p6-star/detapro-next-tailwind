/**
 * Zet een (Contentful) datumstring om naar een relatieve tijdsaanduiding in het Nederlands,
 * zodat vacatures niet "oud" aanvoelen door een vaste kalenderdatum te tonen.
 * Voorbeelden: "Vandaag", "Gisteren", "5 dagen geleden", "3 weken geleden", "2 maanden geleden".
 *
 * Valt terug op de originele string als de datum niet geparsed kan worden.
 */
export function formatRelativeDate(dateStr?: string): string | undefined {
  if (!dateStr) return undefined

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'Vandaag'
  if (diffDays === 1) return 'Gisteren'
  if (diffDays < 7) return `${diffDays} dagen geleden`

  const diffWeeks = Math.floor(diffDays / 7)
  if (diffDays < 30) return diffWeeks === 1 ? '1 week geleden' : `${diffWeeks} weken geleden`

  const diffMonths = Math.floor(diffDays / 30)
  if (diffDays < 365) return diffMonths === 1 ? '1 maand geleden' : `${diffMonths} maanden geleden`

  const diffYears = Math.floor(diffDays / 365)
  return diffYears === 1 ? '1 jaar geleden' : `${diffYears} jaar geleden`
}
