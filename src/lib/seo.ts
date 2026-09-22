import type { Job } from './types'
import { documentToPlainText } from './richtext'

export const SITE_URL = 'https://detapro.nl'
export const SITE_NAME = 'detapro'
/** Vierkant logo als fallback OG-afbeelding zolang er geen speciale 1200x630 social-share-afbeelding is. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/android-chrome-512x512.png`

/**
 * Zet het vrije-tekst 'contract'-veld uit Contentful om naar een geldige
 * schema.org employmentType-waarde. Valt terug op FULL_TIME als niets herkend wordt,
 * aangezien de meeste Detapro-rollen fulltime detacheringen zijn.
 */
export function toEmploymentType(contract?: string): string {
  const c = (contract || '').toLowerCase()
  if (c.includes('part')) return 'PART_TIME'
  if (c.includes('zzp') || c.includes('freelance') || c.includes('interim')) return 'CONTRACTOR'
  if (c.includes('stage') || c.includes('intern')) return 'INTERN'
  if (c.includes('tijdelijk') || c.includes('temp')) return 'TEMPORARY'
  return 'FULL_TIME'
}

/** Korte platte-tekst omschrijving voor OG/meta description, met een harde lengtelimiet. */
export function jobShortDescription(job: Job, maxLen = 160): string {
  const base = job.intro?.trim() || documentToPlainText(job.body as any) || `${job.title} in ${job.location}`
  return base.length > maxLen ? base.slice(0, maxLen - 1).trimEnd() + '…' : base
}

/** Volledige JobPosting JSON-LD voor Google for Jobs. */
export function buildJobPostingJsonLd(job: Job) {
  const description = job.intro?.trim() || documentToPlainText(job.body as any) || job.title

  const jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description,
    hiringOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    employmentType: toEmploymentType(job.contract),
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'NL',
      },
    },
    directApply: true,
  }

  if (job.postedAt) {
    const d = new Date(job.postedAt)
    if (!isNaN(d.getTime())) jsonLd.datePosted = d.toISOString()
  }

  if (job.hoursPerWeek) {
    jsonLd.workHours = `${job.hoursPerWeek} uur per week`
  }

  return jsonLd
}
