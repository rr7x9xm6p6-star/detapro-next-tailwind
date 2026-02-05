
import { createClient, EntrySkeletonType } from 'contentful'
import type { Job } from './types'

const space = process.env.CONTENTFUL_SPACE_ID
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master'
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN
const revalidate = Number(process.env.REVALIDATE_SECONDS || 300)

export function getRevalidate(){ return revalidate }

function client(){
  if (!space || !accessToken) return null
  return createClient({ space, environment, accessToken })
}

type VacatureFields = EntrySkeletonType & {
  title: string
  slug: string
  intro?: string
  location: string
  workMode?: string
  contract?: string
  discipline?: string
  technologies?: string[]
  body?: any
  requirements?: string[]
  niceToHave?: string[]
  postedAt?: string
  startDate?: string
  hoursPerWeek?: number
}

function mapJob(it: any): Job {
  const f = it.fields as any
  return {
    id: it.sys.id,
    title: f.title,
    slug: f.slug,
    intro: f.intro,
    location: f.location,
    workMode: f.workMode,
    contract: f.contract,
    discipline: f.discipline,
    technologies: f.technologies,
    body: f.body,
    requirements: f.requirements,
    niceToHave: f.niceToHave,
    postedAt: f.postedAt,
    startDate: f.startDate,
    hoursPerWeek: f.hoursPerWeek,
  }
}

export async function getLatestJobs(limit = 8): Promise<Job[]> {
  const c = client(); if (!c) return []
  const res = await c.getEntries<VacatureFields>({ content_type: 'vacature', order: ['-fields.postedAt'], limit })
  return res.items.map(mapJob)
}

export async function getRoles(limit = 6): Promise<Job[]> {
  const c = client(); if (!c) return []
  const res = await c.getEntries<VacatureFields>({ content_type: 'vacature', order: ['fields.title'], limit })
  return res.items.map(mapJob)
}

export async function getJobSlugs(): Promise<string[]> {
  const c = client(); if (!c) return []
  const res = await c.getEntries<VacatureFields>({ content_type: 'vacature', select: ['fields.slug'], limit: 1000 })
  return res.items.map((it:any) => (it.fields as any).slug).filter(Boolean)
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const c = client(); if (!c) return null
  const res = await c.getEntries<VacatureFields>({ content_type: 'vacature', 'fields.slug': slug, limit: 1 })
  const item = res.items[0]
  return item ? mapJob(item) : null
}
