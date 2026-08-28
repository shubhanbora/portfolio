import { useState } from 'react'

const items = [
  { src: '/web development.jpeg', alt: 'Web Development', title: 'Web Development', sub: 'Building modern websites',   cat: 'tech' },
  { src: '/clg event.jpeg',        alt: 'College Event',   title: 'College Life',     sub: 'Learning and growing',     cat: 'education' },
  { src: '/programming.jpeg',      alt: 'Programming',     title: 'Programming',      sub: 'Coding solutions',         cat: 'tech' },
  { src: '/libray.jpeg',           alt: 'Study',           title: 'Academic Projects',sub: 'Research and development', cat: 'education' },
  { src: '/databse.png',           alt: 'Database',        title: 'Database Design',  sub: 'Data management',          cat: 'tech' },
  { src: '/IMG_0113-scaled.jpg',   alt: 'Workshop',        title: 'Workshops',        sub: 'Skill development',        cat: 'education' },
]

const filters = ['all', 'tech', 'education']

export default function Gallery() {
  const [active, setActive] = useState('all')
  const visible = items.filter(i => active === 'all' || i.cat === active)

  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Photo Gallery</h2>
          <p>A visual journey through my experiences</p>
        </div>
        <div className="gallery-filters">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {visible.map(item => (
            <div key={item.src} className="gallery-item">
              <img src={item.src} alt={item.alt} />
              <div className="gallery-overlay">
                <h4>{item.title}</h4>
                <p>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
