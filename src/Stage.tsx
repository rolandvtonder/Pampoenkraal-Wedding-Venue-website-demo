import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { animate, useScroll, useMotionValueEvent } from 'motion/react'
import { SCROLL_VH, P, I, G, INTRO_MS, STOPS, span, ramp, ease, lerp } from './scroll'
import { WELCOME, CAPACITY, VENUE, DINING, photo, link } from './content'
import { MoreLink } from './ui'

/*
  The desktop scene. A fixed 1280x720 artboard, every element absolutely
  placed at its design coordinate, scaled to fit the window and centred:

      scale = min(width / STAGE_W, height / STAGE_H)

  The reference scales by width alone, but desktop browser windows are
  usually wider than 16:9 once the toolbars take their share, and a
  width-locked artboard then runs off the bottom of the screen and cuts the
  copy. Fitting instead never crops anything, and there are no bars: the
  photographs and scrims are viewport-wide layers under the artboard, so the
  spare margin is always picture.

  Do not wrap the coordinates in a flex or grid — change them on the artboard.
  Narrow or portrait screens never see this; they get PhoneScene instead,
  because a 0.3x artboard turns body copy into 5px type.
*/

export const STAGE_W = 1280
export const STAGE_H = 720

const SAFE_L = 88
const GROUP_W = STAGE_W - SAFE_L * 2

const LEAF = '#6aa851'
const BONE = '#f4efe4'

const px = (n: number) => `${n}px`
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  position: 'absolute',
  left: px(x),
  top: px(y),
  ...(w != null ? { width: px(w) } : null),
  ...(h != null ? { height: px(h) } : null),
})

const CARD_W = 230
const CARD_H = 190
/* the four venue cards, at the corners around the couple in the field */
const CARD_AT = [
  { x: 0, y: 0 },
  { x: GROUP_W - CARD_W, y: 0 },
  { x: 100, y: 220 },
  { x: GROUP_W - CARD_W - 100, y: 220 },
]

const RAIL = [
  { n: '01', t: 'Welcome', at: STOPS.welcome },
  { n: '02', t: 'The venue', at: STOPS.venue },
  { n: '03', t: 'Dining', at: STOPS.dining },
]

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Reveals behind a clip mask, rising. */
function Mask({ t, children, style }: { t: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ ...style, overflow: 'hidden' }}>
      <div style={{ height: '100%', transform: `translateY(${(1 - t) * 115}%)`, willChange: 'transform' }}>
        {children}
      </div>
    </div>
  )
}

/** One full-bleed photograph with a scroll-driven push-in. */
function Layer({ src, opacity, zoom, pos }: { src: string; opacity: number; zoom: number; pos?: string }) {
  if (opacity <= 0.001) return null
  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <img
        src={src}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: pos ?? 'center',
          transform: `scale(${zoom})`,
          willChange: 'transform',
        }}
      />
    </div>
  )
}

export function jumpTo(progress: number) {
  const el = document.getElementById('stage')
  if (!el) return
  const travel = el.offsetHeight - window.innerHeight
  window.scrollTo({ top: el.offsetTop + travel * progress, behavior: reducedMotion() ? 'auto' : 'smooth' })
}

export default function Stage() {
  const wrap = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState({ scale: 1, x: 0, y: 0 })
  const [p, setP] = useState(0)
  const [ms, setMs] = useState(0)
  const [still, setStill] = useState(false)

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(v))

  useLayoutEffect(() => {
    /* clientWidth, not innerWidth — the latter includes the scrollbar and
       would push the right margin under it */
    const fit = () => {
      const w = document.documentElement.clientWidth
      const h = window.innerHeight
      const s = Math.min(w / STAGE_W, h / STAGE_H)
      setFrame({ scale: s, x: (w - STAGE_W * s) / 2, y: (h - STAGE_H * s) / 2 })
    }
    fit()
    setP(scrollYProgress.get())
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [scrollYProgress])

  /* The welcome plays once on a clock so the first screen is never empty. */
  useEffect(() => {
    if (reducedMotion()) {
      setStill(true)
      setMs(INTRO_MS)
      return
    }
    const c = animate(0, INTRO_MS, { duration: INTRO_MS / 1000, ease: 'linear', onUpdate: setMs })
    return () => c.stop()
  }, [])

  const t = (w: readonly [number, number]) => span(ms, w)

  /* group positions */
  const m1 = ramp(p, P.move1)
  const m2 = ramp(p, P.move2)
  const yWelcome = lerp(G.welcome.start, G.welcome.end, m1)
  const yVenue = lerp(lerp(G.venue.enter, G.venue.mid, m1), G.venue.end, m2)
  const yDining = lerp(lerp(G.dining.enter, G.dining.mid, m1), G.dining.end, m2)

  /* photographs: crossfade in the middle of each move, each pushing in slowly */
  const bVenue = ease(p, P.bgVenue)
  const bDining = ease(p, P.bgDining)
  const zoom = (a: number, b: number) => (still ? 1.04 : lerp(1.14, 1.02, ramp(p, [a, b])))

  const active = p < 0.3 ? 0 : p < 0.66 ? 1 : 2

  return (
    <div id="stage" ref={wrap} style={{ height: `${SCROLL_VH}vh`, background: 'var(--color-ink)' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Layer src={photo('lapa-lights')} opacity={1} zoom={zoom(0, 0.36)} pos="50% 40%" />
        <Layer src={photo('couple-field')} opacity={bVenue} zoom={zoom(0.2, 0.62)} pos="50% 35%" />
        <Layer src={photo('fire-pit')} opacity={bDining} zoom={zoom(0.58, 1)} pos="50% 45%" />

        {/* section scrims, viewport-wide so they never leave bare photo at the edges */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(8,12,9,0.90) 0%, rgba(8,12,9,0.62) 36%, rgba(8,12,9,0.12) 70%, rgba(8,12,9,0.30) 100%)',
            opacity: 1 - ramp(p, P.move1),
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(70% 50% at 50% 86%, rgba(8,12,9,0.88) 0%, rgba(8,12,9,0.40) 60%, rgba(8,12,9,0) 100%), linear-gradient(180deg, rgba(8,12,9,0.35) 0%, rgba(8,12,9,0) 30%)',
            opacity: ramp(p, P.move1) * (1 - ramp(p, P.move2)),
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(8,12,9,0.25) 0%, rgba(8,12,9,0) 30%, rgba(8,12,9,0.82) 70%, rgba(8,12,9,0.94) 100%)',
            opacity: ramp(p, P.move2),
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: px(frame.x),
            top: px(frame.y),
            width: px(STAGE_W),
            height: px(STAGE_H),
            transform: `scale(${frame.scale})`,
            transformOrigin: 'top left',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          {/* ---- index rail, in the right margin so it never crosses the copy ---- */}
          <nav aria-label="Sections" style={{ ...box(STAGE_W - 60, 290, 40, 150), pointerEvents: 'auto' }}>
            {RAIL.map((r, i) => (
              <button
                key={r.n}
                type="button"
                onClick={() => jumpTo(r.at)}
                aria-label={r.t}
                aria-current={i === active ? 'step' : undefined}
                className="label"
                style={{
                  position: 'absolute',
                  top: px(i * 50),
                  right: 0,
                  width: px(40),
                  height: px(40),
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: px(6),
                  padding: 0,
                  background: 'none',
                  border: 0,
                  cursor: 'pointer',
                  fontSize: px(13),
                  color: i === active ? LEAF : 'rgba(244,239,228,0.45)',
                  transition: 'color 300ms ease',
                }}
              >
                {r.n}
                <span
                  aria-hidden="true"
                  style={{ width: i === active ? px(22) : px(10), height: 1, background: 'currentColor', transition: 'width 300ms ease' }}
                />
              </button>
            ))}
          </nav>

          {/* ================= WELCOME ================= */}
          <section
            id="welcome"
            inert={m1 > 0.5}
            style={{ ...box(SAFE_L, 0, GROUP_W, 600), transform: `translateY(${yWelcome}px)`, willChange: 'transform' }}
          >
            <Mask t={t(I.eyebrow)} style={{ position: 'absolute', left: 0, top: 0, width: px(520), height: px(22) }}>
              <div className="label" style={{ display: 'flex', alignItems: 'center', gap: px(10), color: 'rgba(244,239,228,0.85)' }}>
                <span style={{ width: px(28), height: 1, background: LEAF }} />
                {WELCOME.eyebrow}
              </div>
            </Mask>
            <h1 style={{ margin: 0 }}>
              {WELCOME.words.map((w, i) => (
                <Mask
                  key={w}
                  t={t([I.word1, I.word2, I.word3][i])}
                  style={{ position: 'absolute', left: 0, top: px(34 + i * 92), width: px(640), height: px(112) }}
                >
                  <span
                    className="display"
                    style={{
                      display: 'block',
                      fontSize: px(104),
                      lineHeight: px(112),
                      fontStyle: i === 1 ? 'italic' : 'normal',
                      fontWeight: i === 1 ? 400 : 500,
                      paddingLeft: i === 1 ? px(64) : 0,
                    }}
                  >
                    {w}
                  </span>
                </Mask>
              ))}
            </h1>

            {WELCOME.body.map((line, i) => (
              <Mask
                key={line}
                t={t([I.body1, I.body2, I.body3][i])}
                style={{ position: 'absolute', left: 0, top: px(352 + i * 28), width: px(460), height: px(30) }}
              >
                <div style={{ fontSize: px(18), lineHeight: px(28), color: 'rgba(244,239,228,0.84)' }}>{line}</div>
              </Mask>
            ))}

            <div
              style={{
                position: 'absolute',
                left: 0,
                top: px(470),
                opacity: t(I.cta),
                transform: `translateY(${(1 - t(I.cta)) * 16}px)`,
                display: 'flex',
                gap: px(14),
                pointerEvents: 'auto',
              }}
            >
              <a href={link('/enquire/')} className="btn btn-solid label">
                Enquire now
              </a>
              <a href={link('/gallery/')} className="btn btn-ghost label" style={{ paddingRight: px(8) }}>
                View gallery
                <span
                  aria-hidden="true"
                  style={{
                    width: px(34),
                    height: px(34),
                    borderRadius: '50%',
                    background: 'rgba(244,239,228,0.16)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={BONE} strokeWidth="1.5">
                    <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" />
                  </svg>
                </span>
              </a>
            </div>

            {/* the capacity card — the venue's numbers as a reading, not a list */}
            <div
              className="glass"
              style={{
                position: 'absolute',
                left: px(GROUP_W - 420),
                top: px(250),
                width: px(420),
                height: px(268),
                borderRadius: px(40),
                opacity: t(I.card),
                transform: `translateY(${(1 - t(I.card)) * 28}px)`,
              }}
            >
              <div style={{ position: 'absolute', inset: `${px(32)} ${px(36)}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="label" style={{ color: BONE, fontSize: px(12) }}>
                      {CAPACITY.label[0]}
                    </div>
                    <div style={{ marginTop: px(8), fontSize: px(15), lineHeight: px(21), color: 'rgba(244,239,228,0.75)', width: px(150) }}>
                      Guests {CAPACITY.label[1]}
                    </div>
                  </div>
                  <div className="display" style={{ fontSize: px(84), lineHeight: px(70), fontWeight: 400 }}>
                    {Math.round(CAPACITY.seated * t(I.card))}
                  </div>
                </div>

                {/* seated out of the maximum, as a track */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: px(96),
                    height: px(4),
                    borderRadius: 999,
                    background: 'rgba(244,239,228,0.16)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${(CAPACITY.seated / CAPACITY.max) * 100 * t(I.card)}%`,
                      height: '100%',
                      borderRadius: 999,
                      background: LEAF,
                      boxShadow: `0 0 12px ${LEAF}`,
                    }}
                  />
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: px(110), fontSize: px(12.5), color: 'rgba(244,239,228,0.6)' }}>
                  {CAPACITY.note}
                </div>

                <div style={{ position: 'absolute', left: 0, right: 0, top: px(142), height: 1, background: 'rgba(244,239,228,0.14)' }} />

                <div style={{ position: 'absolute', left: 0, right: 0, top: px(160), display: 'flex' }}>
                  {CAPACITY.readouts.map((r, i) => (
                    <div
                      key={r.k}
                      style={{
                        flex: 1,
                        paddingLeft: i ? px(18) : 0,
                        borderLeft: i ? '1px solid rgba(244,239,228,0.14)' : undefined,
                      }}
                    >
                      <div className="display" style={{ fontSize: px(34), lineHeight: px(36), fontWeight: 500 }}>
                        {r.v > 1000 ? r.v : Math.round(r.v * t(I.card))}
                      </div>
                      <div className="label" style={{ marginTop: px(6), fontSize: px(10.5), letterSpacing: '0.14em', color: 'rgba(244,239,228,0.62)' }}>
                        {r.k}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= THE VENUE ================= */}
          <section
            id="venue"
            aria-labelledby="venue-title"
            inert={m1 < 0.5 || m2 > 0.5}
            style={{ ...box(SAFE_L, 0, GROUP_W, 640), transform: `translateY(${yVenue}px)`, willChange: 'transform' }}
          >
            {VENUE.cards.map((c, i) => {
              const k = span(p, [P.venueIn[0] + i * 0.012, P.venueIn[1]])
              const at = CARD_AT[i]
              return (
                <div
                  key={c.art}
                  style={{
                    position: 'absolute',
                    left: px(at.x),
                    top: px(at.y),
                    width: px(CARD_W),
                    height: px(CARD_H),
                    opacity: k,
                    transform: `translateY(${(1 - k) * 40}px)`,
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, borderRadius: px(40), overflow: 'hidden' }}>
                    <img
                      src={photo(c.art)}
                      alt=""
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* the label sits on a photograph, so it gets its own ground */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(160deg, rgba(8,12,9,0.82) 0%, rgba(8,12,9,0.30) 55%, rgba(8,12,9,0.05) 100%)',
                      }}
                    />
                  </div>
                  <div
                    style={{ position: 'absolute', inset: 0, borderRadius: px(40), border: '1px solid rgba(244,239,228,0.28)' }}
                  />
                  <div
                    className="display"
                    style={{ position: 'absolute', left: px(24), top: px(24), fontSize: px(26), lineHeight: px(26), fontWeight: 600 }}
                  >
                    {c.label[0]}
                    <br />
                    <span style={{ fontStyle: 'italic', fontWeight: 400 }}>{c.label[1]}</span>
                  </div>
                  <div className="label" style={{ position: 'absolute', right: px(24), top: px(28), fontSize: px(11), color: LEAF }}>
                    0{i + 1}
                  </div>
                </div>
              )
            })}

            <h2
              id="venue-title"
              className="display"
              style={{ position: 'absolute', left: 0, top: px(404), width: px(GROUP_W), margin: 0, textAlign: 'center', fontSize: px(80) }}
            >
              Hidden in <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Durbanville</span>
            </h2>
            <p
              style={{
                position: 'absolute',
                left: px((GROUP_W - 620) / 2),
                top: px(488),
                width: px(620),
                margin: 0,
                fontSize: px(19),
                lineHeight: px(30),
                textAlign: 'center',
                color: 'rgba(244,239,228,0.86)',
              }}
            >
              {VENUE.teaser}
            </p>
            <div style={{ position: 'absolute', left: 0, top: px(560), width: px(GROUP_W), display: 'flex', justifyContent: 'center' }}>
              <MoreLink href={link('/venue/')}>Explore the venue</MoreLink>
            </div>
          </section>

          {/* ================= DINING ================= */}
          <section
            id="dining"
            aria-labelledby="dining-title"
            inert={m2 < 0.5}
            style={{ ...box(SAFE_L, 0, GROUP_W, 720), transform: `translateY(${yDining}px)`, willChange: 'transform' }}
          >
            <div style={{ position: 'absolute', left: 0, top: px(392), width: px(56), height: px(2), background: LEAF }} />
            <h2
              id="dining-title"
              className="display"
              style={{ position: 'absolute', left: 0, top: px(414), width: px(600), margin: 0, fontSize: px(76), lineHeight: px(74) }}
            >
              {DINING.title[0]}
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>{DINING.title[1]}</span>
            </h2>
            <p
              style={{
                position: 'absolute',
                left: px(GROUP_W - 440),
                top: px(418),
                width: px(440),
                margin: 0,
                fontSize: px(16),
                lineHeight: px(27),
                color: 'rgba(244,239,228,0.82)',
              }}
            >
              {DINING.body}
            </p>
            <div style={{ position: 'absolute', left: 0, top: px(588) }}>
              <MoreLink href={link('/dining/')}>See how we dine</MoreLink>
            </div>
            <ul
              style={{
                position: 'absolute',
                left: px(GROUP_W - 440),
                top: px(548),
                width: px(440),
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                gap: px(8),
                flexWrap: 'wrap',
              }}
            >
              {DINING.courses.map((c) => (
                <li
                  key={c}
                  className="label"
                  style={{
                    padding: `${px(9)} ${px(14)}`,
                    borderRadius: 999,
                    border: '1px solid rgba(244,239,228,0.24)',
                    fontSize: px(10.5),
                    color: 'rgba(244,239,228,0.86)',
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
