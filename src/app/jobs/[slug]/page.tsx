
import React, { isValidElement, cloneElement } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document, Block, Inline, Text } from '@contentful/rich-text-types'
import { BLOCKS } from '@contentful/rich-text-types'
import { getJobBySlug, getJobSlugs } from '@/lib/contentful'
import { formatRelativeDate } from '@/lib/date'

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
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="eyebrow">{job.discipline ? job.discipline.toUpperCase() : 'VACATURE'}</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">{job.title}</h1>
          <p className="meta mt-2">{job.location} {job.workMode ? `• ${job.workMode}` : ''} {job.contract ? `• ${job.contract}` : ''}</p>
        </div>
        <div className="hidden md:block">
          <a href={`mailto:info@detapro.nl?subject=Sollicitatie:%20${encodeURIComponent(job.title)}`} className="btn btn-solid">Solliciteer direct</a>
        </div>
      </div>

      {job.intro && <p className="mt-6 text-lg text-neutral-800 max-w-3xl">{job.intro}</p>}

      {/* Content + Aside (image + info) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-[minmax(0,1fr),380px] gap-8 md:gap-12">
        {/* Left: vacancy body + CTA */}
        <div className="space-y-6">
          {job.body && (
            <article className="prose prose-neutral max-w-none">
              {documentToReactComponents(job.body as Document, richTextOptions)}
            </article>
          )}
        </div>

        {/* Right: image and info box */}
        <aside className="space-y-6">
          <div className="rounded-xl overflow-hidden shadow-sm border">
            <Image
              src="/images/jobs/vacature-aside.png"
              alt="Vacature beeld — Detapro"
              width={760}
              height={760}
              className="w-full h-[340px] md:h-[380px] object-cover rounded-xl"
              priority
              sizes="(min-width: 768px) 380px, 100vw"
            />
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-5">
            <h3 className="font-semibold text-lg tracking-tight">Vacature informatie</h3>
            <ul className="space-y-1 text-sm text-neutral-700">
              {job.location && (<li><strong>Locatie:</strong> {job.location}</li>)}
              {job.workMode && (<li><strong>Dienstverband:</strong> {job.workMode}</li>)}
              {job.hoursPerWeek && (<li><strong>Uren:</strong> {job.hoursPerWeek} uur per week</li>)}
              {job.postedAt && (<li><strong>Publicatie:</strong> {formatRelativeDate(job.postedAt)}</li>)}
              {job.startDate && (<li><strong>Startdatum:</strong> {job.startDate}</li>)}
            </ul>

            <hr />

            <h3 className="font-semibold text-lg tracking-tight">Jouw contactpersoon</h3>
            <p className="text-sm text-neutral-700">
              Detapro Recruitment Team<br />
              <a href={`mailto:info@detapro.nl?subject=Vraag%20over%20${encodeURIComponent(job.title)}`} className="text-blue-600 hover:underline">info@detapro.nl</a><br />
              +31 (0)76 887 87 31
            </p>

            <a
              href={`mailto:info@detapro.nl?subject=Sollicitatie:%20${encodeURIComponent(job.title)}`}
              className="block text-center bg-neutral-900 text-white py-2.5 rounded-lg font-medium hover:bg-neutral-800 transition"
            >
              Solliciteer direct
            </a>
          </div>
        </aside>
      </div>

      {/* Bottom sollicitatie panel */}
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
