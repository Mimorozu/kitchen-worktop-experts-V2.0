// src/components/GoogleReviews.jsx
// Hard-coded Google reviews copied from the Google Business Profile.
// Update this list by hand when new reviews arrive.
const RATING = 5.0

const REVIEWS = [
  {
    author: 'Dan Round',
    meta: '1 review',
    when: 'a week ago',
    rating: 5,
    text: 'Really easy to work with! Results are great. Would recommend!',
  },
  {
    author: 'Lu Blades',
    meta: 'Local Guide · 15 reviews',
    when: '6 hours ago',
    rating: 5,
    text: 'Great team, who did a fantastic job. They helped me pick the right stone. Thank you!',
  },
]

function Stars({ count }) {
  return (
    <span className="reviews__stars" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
    </span>
  )
}

export default function GoogleReviews() {
  return (
    <section className="reviews" aria-label="Google reviews">
      <div className="reviews__head">
        <span className="reviews__score">{RATING.toFixed(1)}</span>
        <Stars count={5} />
        <span className="reviews__label">Google reviews</span>
      </div>

      <div className="reviews__grid">
        {REVIEWS.map((r) => (
          <figure className="reviews__card" key={r.author}>
            <div className="reviews__top">
              <span className="reviews__avatar" aria-hidden="true">{r.author.charAt(0)}</span>
              <div>
                <span className="reviews__name">{r.author}</span>
                <span className="reviews__meta">{r.meta}</span>
              </div>
            </div>
            <Stars count={r.rating} />
            <blockquote className="reviews__text">{r.text}</blockquote>
          </figure>
        ))}
      </div>
    </section>
  )
}
