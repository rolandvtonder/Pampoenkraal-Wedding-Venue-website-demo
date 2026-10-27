import { mount } from '../Layout'
import { Eyebrow, MoreLink, PageHero, Rise, Section } from '../ui'
import { CAPACITY, CONTACT, VENUE_PAGE, photo } from '../content'

/*
  The venue — the lapa and its numbers, the spaces, and the story of the
  name. Capacities come from the venue's own site: 140 seated with the dance
  floor in the main lapa, 200 when dancing moves to the smaller lapa.
*/

const LEAF = 'var(--color-leaf)'

function CapacityCard() {
  return (
    <div className="glass" style={{ borderRadius: 36, padding: 'clamp(24px, 3vw, 40px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <div>
          <div className="label">{CAPACITY.label[0]}</div>
          <div style={{ marginTop: 8, fontSize: 15, lineHeight: 1.4, color: 'rgba(244,239,228,0.75)', maxWidth: 170 }}>
            Guests {CAPACITY.label[1]}
          </div>
        </div>
        <div className="display" style={{ fontSize: 'clamp(64px, 7vw, 96px)', lineHeight: 0.8, fontWeight: 400 }}>
          {CAPACITY.seated}
        </div>
      </div>
      <div style={{ marginTop: 28, height: 4, borderRadius: 999, background: 'rgba(244,239,228,0.16)', overflow: 'hidden' }}>
        <div style={{ width: `${(CAPACITY.seated / CAPACITY.max) * 100}%`, height: '100%', background: LEAF, boxShadow: `0 0 12px ${LEAF}` }} />
      </div>
      <div style={{ marginTop: 12, fontSize: 14, color: 'rgba(244,239,228,0.62)' }}>{CAPACITY.note}</div>
      <div style={{ display: 'flex', marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(244,239,228,0.14)' }}>
        {CAPACITY.readouts.map((r, i) => (
          <div key={r.k} style={{ flex: 1, paddingLeft: i ? 18 : 0, borderLeft: i ? '1px solid rgba(244,239,228,0.14)' : undefined }}>
            <div className="display" style={{ fontSize: 'clamp(30px, 3vw, 40px)' }}>{r.v}</div>
            <div className="label" style={{ marginTop: 6, fontSize: 10.5, letterSpacing: '0.14em', color: 'rgba(244,239,228,0.62)' }}>{r.k}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Venue() {
  const { lapa, spaces, history } = VENUE_PAGE
  return (
    <>
      <PageHero img="couple-field" pos="50% 30%" eyebrow="The venue" words={['Hidden in', 'Durbanville']} intro={VENUE_PAGE.intro} />

      {/* ---- the lapa + capacity ---- */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center' }}>
          <Rise>
            <Eyebrow>Capacity</Eyebrow>
            <h2 className="display" style={{ margin: '18px 0 0', fontSize: 'clamp(40px, 5vw, 68px)' }}>
              {lapa.title[0]}
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>{lapa.title[1]}</span>
            </h2>
            {lapa.body.map((t) => (
              <p key={t} style={{ margin: '20px 0 0', fontSize: 17, lineHeight: 1.7, color: 'var(--color-mist)', maxWidth: 520 }}>{t}</p>
            ))}
          </Rise>
          <Rise delay={0.12}>
            <div style={{ position: 'relative', borderRadius: 40, overflow: 'hidden', padding: 'clamp(16px, 3vw, 40px)' }}>
              <img src={photo('lapa-lights')} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,12,9,0.45)' }} />
              <div style={{ position: 'relative', paddingTop: 'clamp(80px, 12vw, 180px)' }}>
                <CapacityCard />
              </div>
            </div>
          </Rise>
        </div>
      </Section>

      {/* ---- the spaces ---- */}
      <Section tone="ink-2">
        <Rise>
          <Eyebrow>The spaces</Eyebrow>
          <h2 className="display" style={{ margin: '18px 0 0', fontSize: 'clamp(40px, 5vw, 68px)' }}>
            Every part of <span style={{ fontStyle: 'italic', fontWeight: 400 }}>your day</span>
          </h2>
        </Rise>
        <ul style={{ listStyle: 'none', margin: '48px 0 0', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
          {spaces.map((s, i) => (
            <li key={s.art}>
              <Rise delay={i * 0.06} amount={0.2}>
                <article style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(244,239,228,0.2)' }}>
                  <img src={photo(s.art)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,9,0.1) 30%, rgba(8,12,9,0.9) 100%)' }} />
                  <div className="label" style={{ position: 'absolute', top: 22, left: 24, fontSize: 11, color: LEAF }}>0{i + 1}</div>
                  <div style={{ position: 'absolute', left: 24, right: 24, bottom: 24 }}>
                    <h3 className="display" style={{ margin: 0, fontSize: 32 }}>{s.title}</h3>
                    <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.55, color: 'rgba(244,239,228,0.82)' }}>{s.text}</p>
                  </div>
                </article>
              </Rise>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---- the name, the estate, the way there ---- */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center' }}>
          <Rise>
            <img
              src={photo('sunset-fields')}
              alt="Sunset over the fields of the Altydgedacht Wine Estate"
              loading="lazy"
              width={959}
              height={430}
              style={{ width: '100%', height: 'auto', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 40, display: 'block' }}
            />
          </Rise>
          <Rise delay={0.12}>
            <Eyebrow>History &amp; location</Eyebrow>
            <h2 className="display" style={{ margin: '18px 0 0', fontSize: 'clamp(40px, 5vw, 68px)' }}>
              {history.title[0]} <span style={{ fontStyle: 'italic', fontWeight: 400 }}>{history.title[1]}</span>
            </h2>
            {history.body.map((t) => (
              <p key={t} style={{ margin: '20px 0 0', fontSize: 17, lineHeight: 1.7, color: 'var(--color-mist)' }}>{t}</p>
            ))}
            <address style={{ fontStyle: 'normal', margin: '32px 0 0', paddingTop: 24, borderTop: '1px solid rgba(244,239,228,0.14)', fontSize: 16, lineHeight: 1.7 }}>
              {CONTACT.address.map((l) => (
                <div key={l}>{l}</div>
              ))}
              <div style={{ color: 'rgba(244,239,228,0.6)', fontSize: 14 }}>GPS 33°50′55″S 18°37′33″E</div>
            </address>
            <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={CONTACT.map} target="_blank" rel="noopener noreferrer" className="btn btn-ghost label">Open in Google Maps</a>
              <MoreLink href="/enquire/">Book a viewing</MoreLink>
            </div>
          </Rise>
        </div>
      </Section>
    </>
  )
}

mount('venue', <Venue />)
