import { useEffect, useRef, useState } from 'react'
import { CONTACT, link } from './content'

/*
  The navbar sits outside the scaled stage, fixed to the window at natural
  size, so it stays readable at any width. Over the photographs it is a
  gradient rather than a bar — a solid fill draws a hard seam across the
  image. Once the opening photograph has scrolled away it firms up into ink.

  Below tablet width the centre links fold into a full-screen menu.
*/

export type Page = 'home' | 'venue' | 'dining' | 'gallery' | 'enquire'

const LINKS: { t: string; to: Exclude<Page, 'home'> }[] = [
  { t: 'Venue', to: 'venue' },
  { t: 'Dining', to: 'dining' },
  { t: 'Gallery', to: 'gallery' },
  { t: 'Enquire', to: 'enquire' },
]

export const href = (p: Page) => link(p === 'home' ? '/' : `/${p}/`)

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span className="mark" aria-hidden="true" style={{ width: size * 1.5, height: size }} />
      <span className="display" style={{ fontSize: size * 0.78, fontWeight: 600, letterSpacing: '0.02em' }}>
        Pampoenkraal
      </span>
    </span>
  )
}

export default function Nav({ current }: { current: Page }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    /* on home, firm up after the pinned stage; elsewhere, after most of the hero */
    const check = () => {
      const stage = document.getElementById('stage')
      const end = stage ? stage.offsetTop + stage.offsetHeight - window.innerHeight : window.innerHeight * 0.6
      setSolid(window.scrollY > end - 8)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    firstLink.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    window.addEventListener('keydown', key)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', key)
    }
  }, [open])

  const firm = solid || open

  return (
    <header style={{ position: 'fixed', inset: '0 0 auto 0', zIndex: 50, pointerEvents: 'none' }}>
      {/* the tint, with the blur masked by the same falloff */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          height: firm ? 76 : 120,
          background: firm
            ? 'rgba(11,16,12,0.9)'
            : 'linear-gradient(180deg, rgba(8,12,9,0.78) 0%, rgba(8,12,9,0.40) 48%, rgba(8,12,9,0) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maskImage: firm ? 'none' : 'linear-gradient(180deg, #000 0%, #000 42%, transparent 100%)',
          WebkitMaskImage: firm ? 'none' : 'linear-gradient(180deg, #000 0%, #000 42%, transparent 100%)',
          borderBottom: firm ? '1px solid rgba(244,239,228,0.08)' : '1px solid transparent',
          transition: 'height 300ms ease, background 300ms ease',
        }}
      />
      <nav
        aria-label="Main"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          height: 76,
          padding: '0 clamp(16px, 3vw, 40px)',
          pointerEvents: 'auto',
        }}
      >
        <a href={link('/')} className="link" aria-label="Pampoenkraal home" aria-current={current === 'home' ? 'page' : undefined}>
          <Logo />
        </a>
        <div className="nav-links" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 44 }}>
          {LINKS.map((l) => (
            <a
              key={l.to}
              href={href(l.to)}
              aria-current={current === l.to ? 'page' : undefined}
              className="label link nav-link"
              style={{ padding: '12px 0' }}
            >
              {l.t}
            </a>
          ))}
        </div>
        <a href={link('/enquire/')} className="btn btn-ghost label nav-cta" style={{ marginLeft: 'auto', minHeight: 44, padding: '0 20px' }}>
          Book a viewing
        </a>
        <button
          ref={menuBtn}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            {open ? <path d="M5 5l12 12M17 5 5 17" /> : <path d="M3 7h16M3 15h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="site-menu"
          style={{
            position: 'fixed',
            inset: '76px 0 0 0',
            background: 'var(--color-ink)',
            pointerEvents: 'auto',
            padding: '32px 20px 40px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {(['home', ...LINKS.map((l) => l.to)] as Page[]).map((p, i) => (
              <li key={p} style={{ borderBottom: '1px solid rgba(244,239,228,0.1)' }}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={href(p)}
                  aria-current={current === p ? 'page' : undefined}
                  className="display link"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '18px 0',
                    fontSize: 40,
                    color: current === p ? 'var(--color-leaf)' : 'var(--color-bone)',
                  }}
                >
                  {p === 'home' ? 'Home' : LINKS.find((l) => l.to === p)!.t}
                  <span className="label" style={{ fontSize: 11, color: 'rgba(244,239,228,0.45)' }}>0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 'auto', paddingTop: 32, display: 'grid', gap: 10, fontSize: 16 }}>
            <a href={CONTACT.phoneHref} className="link" style={{ color: 'rgba(244,239,228,0.8)' }}>{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`} className="link" style={{ color: 'rgba(244,239,228,0.8)' }}>{CONTACT.email}</a>
          </div>
        </div>
      )}
    </header>
  )
}
