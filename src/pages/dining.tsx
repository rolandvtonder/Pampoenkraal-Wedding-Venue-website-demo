import { mount } from '../Layout'
import { Eyebrow, MoreLink, PageHero, Rise, Section } from '../ui'
import { DINING, DINING_PAGE, SIZE, photo } from '../content'

/*
  Dining — how a meal at Pampoenkraal is served, course by course, and the
  fire it comes from. Service style is as the venue describes it: plated
  starters and desserts, a carvery buffet main course.
*/

function Dining() {
  const [a, b, c, d, e] = DINING_PAGE.photos
  const tile = (p: { src: string; alt: string }, ratio: string) => (
    <img
      src={photo(p.src)}
      alt={p.alt}
      loading="lazy"
      width={SIZE[p.src][0]}
      height={SIZE[p.src][1]}
      style={{ display: 'block', width: '100%', height: '100%', aspectRatio: ratio, objectFit: 'cover', borderRadius: 28 }}
    />
  )

  return (
    <>
      <PageHero img="fire-pit" pos="40% 45%" eyebrow="Dining" words={[DINING.title[0], DINING.title[1]]} intro={DINING_PAGE.intro} />

      {/* ---- the three courses ---- */}
      <Section>
        <Rise>
          <Eyebrow>How we serve</Eyebrow>
          <h2 className="display" style={{ margin: '18px 0 0', fontSize: 'clamp(40px, 5vw, 68px)', maxWidth: 760 }}>
            Three courses, <span style={{ fontStyle: 'italic', fontWeight: 400 }}>one fire</span>
          </h2>
        </Rise>
        <ol style={{ listStyle: 'none', margin: '56px 0 0', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
          {DINING_PAGE.service.map((s, i) => (
            <li key={s.n}>
              <Rise delay={i * 0.08} amount={0.2}>
                <div className="glass" style={{ borderRadius: 32, padding: '32px 30px 36px', height: '100%', boxSizing: 'border-box' }}>
                  <div className="label" style={{ color: 'var(--color-leaf)', fontSize: 12 }}>{s.n}</div>
                  <h3 className="display" style={{ margin: '40px 0 0', fontSize: 38 }}>{s.title}</h3>
                  <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.65, color: 'var(--color-mist)' }}>{s.text}</p>
                </div>
              </Rise>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---- the fire, in pictures ---- */}
      <Section tone="ink-2" label="From the fire">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
          <Rise amount={0.15}>{tile(a, '4 / 5')}</Rise>
          <div style={{ display: 'grid', gap: 16 }}>
            <Rise delay={0.06} amount={0.15}>{tile(b, '3 / 2')}</Rise>
            <Rise delay={0.12} amount={0.15}>{tile(c, '3 / 2')}</Rise>
          </div>
          <div style={{ display: 'grid', gap: 16 }}>
            <Rise delay={0.1} amount={0.15}>{tile(d, '3 / 2')}</Rise>
            <Rise delay={0.16} amount={0.15}>{tile(e, '3 / 2')}</Rise>
          </div>
        </div>
      </Section>

      {/* ---- the promise ---- */}
      <Section>
        <Rise>
          <figure style={{ margin: '0 auto', maxWidth: 980, textAlign: 'center' }}>
            <span className="mark" aria-hidden="true" style={{ width: 66, height: 44 }} />
            <blockquote className="display" style={{ margin: '28px 0 0', fontSize: 'clamp(30px, 3.6vw, 50px)', lineHeight: 1.18, fontWeight: 400, fontStyle: 'italic' }}>
              {DINING_PAGE.quote}
            </blockquote>
            <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <MoreLink href="/enquire/">Plan your menu with us</MoreLink>
            </div>
          </figure>
        </Rise>
      </Section>
    </>
  )
}

mount('dining', <Dining />)
