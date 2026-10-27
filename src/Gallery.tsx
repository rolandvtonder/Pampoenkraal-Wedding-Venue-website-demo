import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { GALLERY, SIZE, photo } from './content'

/*
  Photo grid: a masonry of the venue's own photographs, each one a button
  that opens a lightbox. Used whole on the gallery page and as a teaser on home. The lightbox traps
  focus on its controls, closes on Escape or a backdrop click, steps with the
  arrow keys, and hands focus back to the tile that opened it.
*/

function Lightbox({ items, index, onClose, onStep }: { items: typeof GALLERY; index: number; onClose: () => void; onStep: (d: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[index]

  useEffect(() => {
    closeRef.current?.focus()
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
      if (e.key === 'Tab') {
        const els = [...document.querySelectorAll<HTMLElement>('[data-lightbox] button')]
        const i = els.indexOf(document.activeElement as HTMLElement)
        const next = e.shiftKey ? (i <= 0 ? els.length - 1 : i - 1) : (i + 1) % els.length
        e.preventDefault()
        els[next]?.focus()
      }
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('keydown', key)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, onStep])

  const ctl = {
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: '1px solid rgba(244,239,228,0.3)',
    background: 'rgba(11,16,12,0.6)',
    color: '#f4efe4',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
  } as const

  return (
    <div
      data-lightbox
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${items.length}: ${item.alt}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        background: 'rgba(6,9,7,0.94)',
        display: 'grid',
        placeItems: 'center',
        padding: '72px 16px',
      }}
    >
      <img
        src={photo(item.src)}
        alt={item.alt}
        style={{ maxWidth: 'min(1200px, 100%)', maxHeight: '100%', objectFit: 'contain', borderRadius: 12 }}
      />
      <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="label" style={{ color: 'rgba(244,239,228,0.7)' }}>
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo" style={ctl}>
          <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M2 2l10 10M12 2 2 12" />
          </svg>
        </button>
      </div>
      <button type="button" onClick={() => onStep(-1)} aria-label="Previous photo" style={{ ...ctl, position: 'absolute', left: 16, top: '50%', marginTop: -24 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M9 2 4 7l5 5" />
        </svg>
      </button>
      <button type="button" onClick={() => onStep(1)} aria-label="Next photo" style={{ ...ctl, position: 'absolute', right: 16, top: '50%', marginTop: -24 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="m5 2 5 5-5 5" />
        </svg>
      </button>
    </div>
  )
}

export default function PhotoGrid({ items = GALLERY }: { items?: typeof GALLERY }) {
  const [open, setOpen] = useState<number | null>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const still = useReducedMotion()

  const close = useCallback(() => {
    setOpen(null)
    opener.current?.focus()
  }, [])
  const step = useCallback((d: number) => setOpen((i) => (i == null ? i : (i + d + items.length) % items.length)), [items.length])

  return (
    <>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, columns: '3 280px', columnGap: 16 }}>
        {items.map((g, i) => (
          <motion.li
            key={g.src}
            initial={still ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            style={{ breakInside: 'avoid', marginBottom: 16 }}
          >
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget
                setOpen(i)
              }}
              aria-label={`Open photo: ${g.alt}`}
              className="tile"
              style={{ display: 'block', width: '100%', padding: 0, border: 0, background: 'none', cursor: 'zoom-in', borderRadius: 20, overflow: 'hidden' }}
            >
              <img
                src={photo(g.src)}
                alt=""
                width={SIZE[g.src][0]}
                height={SIZE[g.src][1]}
                loading="lazy"
                decoding="async"
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </button>
          </motion.li>
        ))}
      </ul>
      {open != null && <Lightbox items={items} index={open} onClose={close} onStep={step} />}
    </>
  )
}
