// src/components/TrustBar.jsx

const TRUST_ITEMS = [
  { icon: '★', text: '127 Five-Star Reviews' },
  { icon: '✓', text: 'Free No-Obligation Quote' },
  { icon: '⚡', text: 'Same Week Fitting Available' },
  { icon: '📍', text: 'West Midlands Based' },
]

export default function TrustBar() {
  return (
    <div className="trustbar">
      {TRUST_ITEMS.map((item) => (
        <div className="trustbar__item" key={item.text}>
          <span className="trustbar__icon">{item.icon}</span>
          <span className="trustbar__text">{item.text}</span>
        </div>
      ))}
    </div>
  )
}