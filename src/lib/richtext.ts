import type { Document } from '@contentful/rich-text-types'

/**
 * Zet een Contentful rich-text document (of los node) recursief om naar platte tekst.
 * Gebruikt voor SEO-doeleinden (OG description, JobPosting description) waar geen
 * opgemaakte HTML nodig is, maar wel de volledige inhoud.
 */
export function richTextToPlainText(node: any): string {
  if (!node) return ''

  if (node.nodeType === 'text') {
    return typeof node.value === 'string' ? node.value : ''
  }

  if (Array.isArray(node.content)) {
    const isBlock = typeof node.nodeType === 'string' && node.nodeType !== 'text'
    const parts = node.content.map((child: any) => richTextToPlainText(child))
    // Blok-elementen (paragraaf, list-item, etc.) krijgen een regeleinde erna
    return isBlock ? parts.join('') + '\n' : parts.join('')
  }

  return ''
}

export function documentToPlainText(doc?: Document): string {
  if (!doc) return ''
  return richTextToPlainText(doc).replace(/\n{2,}/g, '\n').trim()
}
