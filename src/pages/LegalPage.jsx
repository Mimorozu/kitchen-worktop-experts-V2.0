// src/pages/LegalPage.jsx
// Shared layout for the privacy policy, terms of use and cookie notice.
import Seo from '../components/Seo'

export default function LegalPage({ doc }) {
  return (
    <>
      <Seo title={`${doc.title} | Kitchen Worktop Experts`} description={doc.description} path={doc.path} />

      <article className="legal">
        <h1 className="legal__title">{doc.title}</h1>
        <p className="legal__updated">Last updated: {doc.updated}</p>

        {doc.sections.map((section) => (
          <section className="legal__section" key={section.heading}>
            <h2 className="legal__heading">{section.heading}</h2>
            {section.body.map((text) => (
              <p className="legal__text" key={text}>{text}</p>
            ))}
          </section>
        ))}
      </article>
    </>
  )
}
