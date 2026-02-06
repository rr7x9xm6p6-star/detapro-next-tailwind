
import React, { isValidElement, cloneElement } from 'react'
import { notFound } from 'next/navigation'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document, Block, Inline, Text } from '@contentful/rich-text-types'
import { BLOCKS } from '@contentful/rich-text-types'
import { getJobBySlug, getJobSlugs, getRevalidate } from '@/lib/contentful'

export const revalidate = 60

const LF = String.fromCharCode(10)
const CR = String.fromCharCode(13)
const CRLF = CR + LF

function normalizeStr(s: string): string {
  return s.split(CRLF).join(LF).split(CR).join(LF)
}

function renderTextWithBRs(node: React.ReactNode): React.ReactNode {
  if (typeof node === 'string') {
    const n = normalizeStr(node)
    const parts = n.split(LF)
    const out: React.ReactNode[] = []
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) out.push(<br key={`br-${i}`} />)
      out.push(parts[i])
    }
    return out
  }
  if (Array.isArray(node)) {
    return node.map((n, i) => <React.Fragment key={i}>{renderTextWithBRs(n)}</React.Fragment>)
  }
  if (isValidElement(node)) {
    const props: any = {}
    if (node.props && 'children' in node.props) props.children = renderTextWithBRs(node.props.children)
    return cloneElement(node as any, props)
  }
  return node
}

function nodePlainText(n: any): string {
  if (!n || !n.content) return ''
  let s = ''
  for (const c of n.content as any[]) {
    if (c && c.nodeType === 'text') s += (c as Text).value || ''
  }
  return normalizeStr(s)
}

function isBulletLine(line: string): boolean {
  const t = line.trim()
  return t.startsWith('•') || t.startsWith('-') || t.startsWith('–')
}

function stripBulletPrefix(line: string): string {
  let t = line.trim()
  if (isBulletLine(t)) {
    t = t.slice(1)
    while (t.length && (t[0] === ' ' || t[0] === '	')) t = t.slice(1)
  }
  return t
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => {
      const raw = nodePlainText(node as any)
      const lines = raw.split(LF)
      const nonEmpty = lines.filter(l => l.trim().length > 0)
      const bulletish = nonEmpty.length > 1 && nonEmpty.every(isBulletLine)

      if (bulletish) {
        return (
          <ul className="rtul">
            {nonEmpty.map((l, i) => (
              <li key={i}>{stripBulletPrefix(l)}</li>
            ))}
          </ul>
        )
      }

      return <p className="rtp">{renderTextWithBRs(children)}</p>
    },
  },
}

export async function generateStaticParams(){
  const slugs = await getJobSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }){
  const { slug } = await props.params
  const job = await getJobBySlug(slug)
  if (!job) return {}
  return { title: `${job.title} — detapro`, description: job.intro || `${job.title} in ${job.location}` }
}

export default async function JobDetail(props: { params: Promise<{ slug: string }> }){
  const { slug } = await props.params
  const job = await getJobBySlug(slug)
  if (!job) return notFound()

  return (
    <section className="container section">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="eyebrow">{job.discipline ? job.discipline.toUpperCase() : 'VACATURE'}</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">{job.title}</h1>
          <p className="meta mt-2">{job.location} {job.workMode ? `• ${job.workMode}` : ''} {job.contract ? `• ${job.contract}` : ''}</p>
        </div>
        <div className="hidden md:block">
          <a href={`mailto:info@detapro.nl?subject=Sollicitatie:%20${encodeURIComponent(job.title)}`} 
          className="btn btn-solid">
            Solliciteer direct
          </a>
        </div>
      </div>

      {job.intro && <p className="mt-6 text-lg text-neutral-800 max-w-3xl">{job.intro}</p>}

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-6">
          {job.body && (
            <article className="prose prose-neutral max-w-none">
              {documentToReactComponents(job.body as Document, richTextOptions)}
            </article>
          )}
            <a href={`mailto:info@detapro.nl?subject=Sollicitatie:%20${encodeURIComponent(job.title)}`} 
              className="btn btn-solid">
            Solliciteer direct
           </a>
        </div>
      </div>

      <div id="solliciteer" className="mt-12 panel">
        <h3 className="text-xl font-semibold mb-2">Solliciteer</h3>
        <p className="meta mb-3">Stuur je CV, GitHub of LinkedIn profiel. We reageren binnen één werkdag.</p>
        <div className="flex flex-wrap gap-2">
          <a className="btn btn-solid" href={`mailto:join@detapro.example?subject=Sollicitatie:%20${encodeURIComponent(job.title)}`}>Mail je profiel</a>
          <a className="btn" href="#">Plan een kennismaking</a>
        </div>
      </div>
    </section>
  )
}
