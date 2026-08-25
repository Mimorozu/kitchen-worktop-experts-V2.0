// src/components/Guide.jsx
import { Link, useNavigate, useParams } from 'react-router-dom'
import Seo from './Seo'
import { getGuideBySlug } from '../data/guides'

// Guide content is plain data, not markdown/HTML, but supports one small
// piece of syntax so writers can link out inline: [label](/path).
const INLINE_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g

function scrollToQuote(navigate, e) {
  e.preventDefault()
  const el = document.getElementById('quote')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else {
    navigate('/')
    setTimeout(() => {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }
}

function renderInlineText(text, navigate) {
  const parts = []
  let lastIndex = 0
  let match
  let key = 0

  INLINE_LINK_PATTERN.lastIndex = 0
  while ((match = INLINE_LINK_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const [, label, href] = match
    const isExternal = /^https?:\/\//.test(href)

    if (isExternal) {
      parts.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="guides__inline-link">
          {label}
        </a>
      )
    } else if (href === '/#quote') {
      parts.push(
        <a key={key++} href="/#quote" className="guides__inline-link" onClick={(e) => scrollToQuote(navigate, e)}>
          {label}
        </a>
      )
    } else {
      parts.push(
        <Link key={key++} to={href} className="guides__inline-link">
          {label}
        </Link>
      )
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

export default function Guide() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return (
      <section className="guides guide">
        <Seo
          title="Guide Not Found | Kitchen Worktop Experts"
          description="This guide could not be found."
          path={`/guides/${slug}`}
          noIndex
        />
        <div className="guides__inner guide__inner">
          <p className="guide__not-found">Guide not found.</p>
          <Link className="guide__back" to="/guides">← Back to Guides</Link>
        </div>
      </section>
    )
  }

  const faqJsonLd = guide.faq && guide.faq.length > 0
    ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }
    : null

  return (
    <section className="guides guide">
      <Seo
        title={guide.title}
        description={guide.excerpt}
        path={`/guides/${guide.slug}`}
        jsonLd={faqJsonLd}
        noIndex={guide.draft}
      />
      <div className="guides__inner guide__inner">

        {guide.draft && (
          <div className="guide__draft-banner">Draft placeholder — not yet published</div>
        )}

        <Link className="guide__back" to="/guides">← Back to Guides</Link>

        <p className="section__eyebrow">{guide.category}</p>
        <h1 className="guide__title">{guide.title}</h1>

        <div className="guide__content">
          {guide.content.map((block, index) => {
            if (block.type === 'heading') {
              return <h2 key={index} className="guide__heading">{block.text}</h2>
            }

            if (block.type === 'subheading') {
              return <h3 key={index} className="guide__subheading">{block.text}</h3>
            }

            if (block.type === 'list') {
              return (
                <ul key={index} className="guide__list">
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{renderInlineText(item, navigate)}</li>
                  ))}
                </ul>
              )
            }

            if (block.type === 'table') {
              return (
                <div key={index} className="guide__table-wrap">
                  <table className="guide__table">
                    <thead>
                      <tr>
                        {block.headers.map((header) => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            }

            return <p key={index} className="guide__paragraph">{renderInlineText(block.text, navigate)}</p>
          })}
        </div>

        {guide.faq && guide.faq.length > 0 && (
          <div className="guide__faq">
            <h2 className="guide__heading">Frequently asked questions</h2>
            <div className="guide__faq-list">
              {guide.faq.map((item) => (
                <div className="guide__faq-item" key={item.question}>
                  <h3 className="guide__faq-question">{item.question}</h3>
                  <p className="guide__paragraph">{renderInlineText(item.answer, navigate)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="guide__cta">
          <h2 className="guide__cta-heading">Ready to get a quote?</h2>
          <p className="guide__cta-sub">Speak to our specialists about your kitchen worktop.</p>
          <a className="guide__cta-button" href="/#quote" onClick={(e) => scrollToQuote(navigate, e)}>
            Get My Free Quote →
          </a>
        </div>

      </div>
    </section>
  )
}
