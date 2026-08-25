// src/components/Guides.jsx
import { Link } from 'react-router-dom'
import { getGuidesByCategory } from '../data/guides'

const CATEGORIES = [
  {
    title: 'Costs & pricing',
    description:
      'What quartz, granite and marble worktops actually cost, how specialists price by the metre, and where extra costs like templating or old worktop removal come in.',
  },
  {
    title: 'Choosing a material',
    description:
      'How quartz, granite and marble compare on durability, maintenance, heat resistance and looks — and how to work out which is right for your kitchen.',
  },
  {
    title: 'Brands compared',
    description:
      "How the major quartz and stone brands stack up against each other, so you know what you're paying for before you choose a slab.",
  },
  {
    title: 'Installation & aftercare',
    description:
      'What to expect on installation day, how to prepare your kitchen beforehand, and how to keep a worktop looking new for years.',
  },
]

export default function Guides() {
  return (
    <section className="guides">
      <div className="guides__inner">

        <div className="guides__header">
          <p className="section__eyebrow">Guides</p>
          <h1 className="section__heading">Everything you need to know before you buy a worktop</h1>
          <p className="guides__intro">
            Independent guides on cost, material choice, brands and installation — written to help you go into a quote with the right questions.
          </p>
        </div>

        <div className="guides__grid">
          {CATEGORIES.map((category) => {
            const guides = getGuidesByCategory(category.title)

            return (
              <div className="guides__category" key={category.title}>
                <h2 className="guides__category-title">{category.title}</h2>
                <p className="guides__category-desc">{category.description}</p>

                {guides.length > 0 ? (
                  <ul className="guides__list">
                    {guides.map((guide) => (
                      <li className="guides__list-item" key={guide.slug}>
                        <Link className="guides__link" to={`/guides/${guide.slug}`}>
                          {guide.title}
                        </Link>
                        {guide.draft && <span className="guides__draft-tag">Draft</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="guides__coming-soon">First guides launching soon</span>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
