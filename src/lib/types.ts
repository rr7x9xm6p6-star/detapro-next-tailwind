
import type { Document } from '@contentful/rich-text-types'
export type Job = {
  id: string
  title: string
  slug: string
  intro?: string
  location: string
  workMode?: string
  contract?: string
  discipline?: 'frontend' | 'backend' | 'cloud' | 'data' | string
  technologies?: string[]
  body?: Document
  requirements?: string[]
  niceToHave?: string[]
  postedAt?: string
  startDate?: string
  hoursPerWeek?: number
}
