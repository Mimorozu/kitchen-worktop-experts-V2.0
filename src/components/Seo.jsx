// src/components/Seo.jsx
// Per-route metadata. React 19 hoists any <title>/<meta>/<link> rendered
// anywhere in the tree into <head> (deduping by tag + key attribute), so this
// can be dropped into any page component with no provider/router wiring.
const SITE_URL = 'https://www.kitchenworktopexperts.co.uk'
const SITE_NAME = 'Kitchen Worktop Experts'

export default function Seo({ title, description, path, jsonLd, noIndex = false }) {
  const url = `${SITE_URL}${path}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  )
}
