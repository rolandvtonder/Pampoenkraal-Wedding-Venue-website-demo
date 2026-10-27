import type { ReactNode } from 'react'
import { WELCOME, CAPACITY, VENUE, DINING, photo, link } from './content'
import { MoreLink, Rise } from './ui'

/*
  The same three chapters for phones and portrait tablets, in ordinary flow.
  A width-scaled artboard is unreadable here, so each chapter is a full-height
  photograph with its copy rising in as it enters the viewport — the stage's
  stagger, kept, but triggered by view rather than by a pinned timeline.
*/

const LEAF = '#6aa851'

function Chapter({ id, img, pos, shade, children }: { id: string; img: string; pos?: string; shade: string; children: ReactNode }) {
  return (
    <section
      id={id}
      style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}
    >
      <img
        src={photo(img)}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos ?? 'center' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: shade }} />
      <div style={{ position: 'relative', width: '100%', padding: '120px 20px 56px', maxWidth: 720, margin: '0 auto' }}>{children}</div>
    </section>
  )
}

export default function PhoneScene() {
  const bottomShade = 'linear-gradient(180deg, rgba(8,12,9,0.45) 0%, rgba(8,12,9,0.25) 30%, rgba(8,12,9,0.88) 68%, rgba(8,12,9,0.96) 100%)'
  return (
    <div id="stage">
      <Chapter
        id="welcome"
        img="lapa-lights"
        shade="linear-gradient(180deg, rgba(8,12,9,0.72) 0%, rgba(8,12,9,0.58) 40%, rgba(8,12,9,0.9) 72%, rgba(8,12,9,0.97) 100%)"
      >
        <Rise>
          <div className="label" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(244,239,228,0.85)', fontSize: 11 }}>
            <span style={{ width: 24, height: 1, background: LEAF }} />
            {WELCOME.eyebrow}
          </div>
        </Rise>
        <h1 className="display" style={{ margin: '18px 0 0', fontSize: 'clamp(54px, 15vw, 88px)', lineHeight: 0.95 }}>
          {WELCOME.words.map((w, i) => (
            <Rise key={w} delay={0.1 + i * 0.12}>
              <span style={{ display: 'block', fontStyle: i === 1 ? 'italic' : 'normal', fontWeight: i === 1 ? 400 : 500 }}>{w}</span>
            </Rise>
          ))}
        </h1>
        <Rise delay={0.45}>
          <p style={{ margin: '20px 0 0', fontSize: 17, lineHeight: 1.6, color: 'rgba(244,239,228,0.86)', maxWidth: 440 }}>
            {WELCOME.body.join(' ')}
          </p>
        </Rise>
        <Rise delay={0.55}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <a href={link('/enquire/')} className="btn btn-solid label">Enquire now</a>
            <a href={link('/gallery/')} className="btn btn-ghost label">View gallery</a>
          </div>
        </Rise>
        <Rise delay={0.65}>
          <div className="glass" style={{ marginTop: 32, borderRadius: 28, padding: '22px 22px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
              <div>
                <div className="label" style={{ fontSize: 11 }}>{CAPACITY.label[0]}</div>
                <div style={{ marginTop: 6, fontSize: 14, color: 'rgba(244,239,228,0.75)' }}>Guests {CAPACITY.label[1]}</div>
              </div>
              <div className="display" style={{ fontSize: 60, lineHeight: 0.85, fontWeight: 400 }}>{CAPACITY.seated}</div>
            </div>
            <div style={{ marginTop: 16, height: 4, borderRadius: 999, background: 'rgba(244,239,228,0.16)', overflow: 'hidden' }}>
              <div style={{ width: `${(CAPACITY.seated / CAPACITY.max) * 100}%`, height: '100%', background: LEAF }} />
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: 'rgba(244,239,228,0.62)' }}>{CAPACITY.note}</div>
            <div style={{ display: 'flex', marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(244,239,228,0.14)' }}>
              {CAPACITY.readouts.map((r, i) => (
                <div key={r.k} style={{ flex: 1, paddingLeft: i ? 14 : 0, borderLeft: i ? '1px solid rgba(244,239,228,0.14)' : undefined }}>
                  <div className="display" style={{ fontSize: 28 }}>{r.v}</div>
                  <div className="label" style={{ marginTop: 4, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(244,239,228,0.62)' }}>{r.k}</div>
                </div>
              ))}
            </div>
          </div>
        </Rise>
      </Chapter>

      <Chapter id="venue" img="couple-field" pos="50% 30%" shade={bottomShade}>
        <Rise>
          <h2 className="display" style={{ margin: 0, fontSize: 'clamp(44px, 12vw, 72px)' }}>
            Hidden in <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Durbanville</span>
          </h2>
        </Rise>
        <Rise delay={0.1}>
          <p style={{ margin: '16px 0 0', fontSize: 17, lineHeight: 1.6, color: 'rgba(244,239,228,0.86)' }}>{VENUE.body}</p>
        </Rise>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 28 }}>
          {VENUE.cards.map((c, i) => (
            <Rise key={c.art} delay={0.15 + i * 0.06}>
              <div style={{ position: 'relative', aspectRatio: '6 / 5', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(244,239,228,0.28)' }}>
                <img src={photo(c.art)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(8,12,9,0.82) 0%, rgba(8,12,9,0.2) 70%)' }} />
                <div className="display" style={{ position: 'absolute', left: 14, top: 14, fontSize: 20, lineHeight: 1, fontWeight: 600 }}>
                  {c.label[0]}
                  <br />
                  <span style={{ fontStyle: 'italic', fontWeight: 400 }}>{c.label[1]}</span>
                </div>
              </div>
            </Rise>
          ))}
        </div>
        <Rise delay={0.2}>
          <div style={{ marginTop: 28 }}>
            <MoreLink href={link('/venue/')}>Explore the venue</MoreLink>
          </div>
        </Rise>
      </Chapter>

      <Chapter id="dining" img="fire-pit" pos="35% 50%" shade={bottomShade}>
        <Rise>
          <div style={{ width: 48, height: 2, background: LEAF, marginBottom: 20 }} />
          <h2 className="display" style={{ margin: 0, fontSize: 'clamp(44px, 12vw, 72px)' }}>
            {DINING.title[0]}
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>{DINING.title[1]}</span>
          </h2>
        </Rise>
        <Rise delay={0.1}>
          <p style={{ margin: '18px 0 0', fontSize: 17, lineHeight: 1.6, color: 'rgba(244,239,228,0.86)' }}>{DINING.body}</p>
        </Rise>
        <Rise delay={0.2}>
          <ul style={{ margin: '20px 0 0', padding: 0, listStyle: 'none', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {DINING.courses.map((c) => (
              <li key={c} className="label" style={{ padding: '9px 14px', borderRadius: 999, border: '1px solid rgba(244,239,228,0.24)', fontSize: 10.5 }}>
                {c}
              </li>
            ))}
          </ul>
        </Rise>
        <Rise delay={0.25}>
          <div style={{ marginTop: 28 }}>
            <MoreLink href={link('/dining/')}>See how we dine</MoreLink>
          </div>
        </Rise>
      </Chapter>
    </div>
  )
}
