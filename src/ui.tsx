import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { photo } from './content'

/*
  Pieces shared by every page: the rise-in reveal, the eyebrow label, the
  arrow link, and the page hero — a full-bleed photograph that drifts at half
  scroll speed under a staggered headline, the inner-page echo of the home
  scene's choreography.
*/

const EASE = [0.22, 1, 0.36, 1] as const

export function Rise({ children, delay = 0, amount = 0.3 }: { children: ReactNode; delay?: number; amount?: number }) {
  const still = useReducedMotion()
  return (
    <motion.div
      initial={still ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="label" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(244,239,228,0.75)' }}>
      <span style={{ width: 28, height: 1, background: 'var(--color-leaf)', flex: 'none' }} />
      {children}
    </div>
  )
}

export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="btn btn-ghost label" style={{ paddingRight: 8, pointerEvents: 'auto' }}>
      {children}
      <span
        aria-hidden="true"
        style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(244,239,228,0.16)', display: 'grid', placeItems: 'center' }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" />
        </svg>
      </span>
    </a>
  )
}

/** A section wrapper with the site's gutters and measure. */
export function Section({ id, children, tone = 'ink', label }: { id?: string; children: ReactNode; tone?: 'ink' | 'ink-2'; label?: string }) {
  return (
    <section
      id={id}
      aria-label={label}
      style={{ background: `var(--color-${tone})`, padding: 'clamp(72px, 9vw, 128px) clamp(16px, 4vw, 56px)' }}
    >
      <div style={{ maxWidth: 1312, margin: '0 auto' }}>{children}</div>
    </section>
  )
}

export function PageHero({
  img,
  pos,
  eyebrow,
  words,
  intro,
}: {
  img: string
  pos?: string
  eyebrow: string
  words: [string, string]
  intro: string
}) {
  const ref = useRef<HTMLElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', still ? '0%' : '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, still ? 1.08 : 1.18])

  const word = (i: number) => ({
    initial: still ? false : { y: '110%' },
    animate: { y: '0%' },
    transition: { duration: 0.9, delay: 0.15 + i * 0.14, ease: EASE },
  })

  return (
    <header
      ref={ref}
      style={{ position: 'relative', minHeight: 'min(86svh, 900px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}
    >
      <motion.img
        src={photo(img)}
        alt=""
        fetchPriority="high"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: pos ?? 'center',
          y,
          scale,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(8,12,9,0.55) 0%, rgba(8,12,9,0.15) 35%, rgba(8,12,9,0.7) 72%, var(--color-ink) 100%)',
        }}
      />
      <div style={{ position: 'relative', width: '100%', maxWidth: 1312, margin: '0 auto', padding: '140px clamp(16px, 4vw, 56px) clamp(48px, 6vw, 80px)' }}>
        <Rise>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Rise>
        <h1 className="display" style={{ margin: '20px 0 0', fontSize: 'clamp(56px, 9vw, 132px)', lineHeight: 0.95 }}>
          {words.map((w, i) => (
            <span key={w} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
              <motion.span
                {...word(i)}
                style={{ display: 'block', fontStyle: i === 1 ? 'italic' : 'normal', fontWeight: i === 1 ? 400 : 500 }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <Rise delay={0.45}>
          <p style={{ margin: '24px 0 0', maxWidth: 560, fontSize: 'clamp(17px, 1.4vw, 19px)', lineHeight: 1.65, color: 'rgba(244,239,228,0.86)' }}>
            {intro}
          </p>
        </Rise>
      </div>
    </header>
  )
}
