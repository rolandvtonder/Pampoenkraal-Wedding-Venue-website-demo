import { CONTACT, link } from './content'
import { Logo } from './Nav'

/*
  Footer, structured after the reference: a CTA band across the top, a rule,
  the brand column beside three link columns, a legal bar, and the oversized
  wordmark fading into the panel. Ordinary responsive flow — it sits outside
  the pinned stage.
*/

const COLUMNS: { head: string; links: { t: string; href: string; ext?: boolean }[] }[] = [
  {
    head: 'Explore',
    links: [
      { t: 'The venue', href: link('/venue/') },
      { t: 'Dining', href: link('/dining/') },
      { t: 'Gallery', href: link('/gallery/') },
      { t: 'Enquire', href: link('/enquire/') },
    ],
  },
  {
    head: 'Visit',
    links: [...CONTACT.address.map((t) => ({ t, href: CONTACT.map, ext: true })), { t: 'Open in Google Maps →', href: CONTACT.map, ext: true }],
  },
  {
    head: 'Contact',
    links: [
      { t: CONTACT.phone, href: CONTACT.phoneHref },
      { t: CONTACT.email, href: `mailto:${CONTACT.email}` },
      { t: 'Facebook', href: CONTACT.facebook, ext: true },
      { t: 'Instagram', href: CONTACT.instagram, ext: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#080c09', padding: '24px clamp(16px, 2vw, 24px) 0', position: 'relative', zIndex: 1 }}>
      <div
        style={{
          maxWidth: 1312,
          margin: '0 auto',
          border: '1px solid rgba(244,239,228,0.10)',
          borderRadius: 28,
          background: 'linear-gradient(180deg, rgba(22,32,24,0.92) 0%, rgba(11,16,12,0.92) 100%)',
          padding: 'clamp(32px, 5vw, 56px) clamp(20px, 5vw, 56px) 8px',
          overflow: 'hidden',
        }}
      >
        {/* ---- CTA band ---- */}
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 420px' }}>
            <span
              className="label"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 999,
                border: '1px solid rgba(244,239,228,0.16)',
                color: 'rgba(244,239,228,0.8)',
                fontSize: 11,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-leaf)' }} />
              Now taking bookings
            </span>
            <h2 className="display" style={{ margin: '20px 0 0', fontSize: 'clamp(36px, 4.4vw, 56px)', lineHeight: 1.02 }}>
              Your celebration,{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(244,239,228,0.75)' }}>beneath the oaks</span>
            </h2>
            <p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.6, color: 'rgba(244,239,228,0.62)', maxWidth: 440 }}>
              Weddings, functions and conferences on the Altydgedacht Wine Estate.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={link('/enquire/')} className="btn btn-leaf label">Book a viewing</a>
            <a href={CONTACT.phoneHref} className="btn btn-ghost label">Call {CONTACT.phone}</a>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(244,239,228,0.10)', margin: '44px 0 40px' }} />

        {/* ---- brand + link columns ---- */}
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <Logo size={38} />
            <p style={{ margin: '16px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(244,239,228,0.58)', maxWidth: 300 }}>
              Named for the spring that became Durbanville, on a wine estate dating back to 1698 on the slopes of the Tygerberg Hills.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.head} style={{ flex: '0 1 200px' }}>
              <div className="label" style={{ fontSize: 11, color: 'rgba(244,239,228,0.45)', marginBottom: 14 }}>
                {col.head}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {col.links.map((l) => (
                  <li key={l.t}>
                    <a
                      href={l.href}
                      className="link"
                      target={l.ext ? '_blank' : undefined}
                      rel={l.ext ? 'noopener noreferrer' : undefined}
                      style={{ display: 'inline-block', fontSize: 15, lineHeight: '34px', color: 'rgba(244,239,228,0.78)', overflowWrap: 'anywhere' }}
                    >
                      {l.t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ---- legal bar ---- */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            fontSize: 13.5,
            color: 'rgba(244,239,228,0.5)',
            borderTop: '1px solid rgba(244,239,228,0.10)',
            marginTop: 40,
            padding: '20px 0 28px',
          }}
        >
          <span>&copy; {new Date().getFullYear()} Pampoenkraal Wedding &amp; Function Venue. All rights reserved.</span>
          <span>Durbanville, Western Cape</span>
        </div>

        {/* ---- the wordmark, fading into the panel ---- */}
        <div
          aria-hidden="true"
          className="display"
          style={{
            fontSize: 'clamp(36px, 13vw, 210px)',
            lineHeight: 1,
            textAlign: 'center',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(180deg, rgba(244,239,228,0.28) 0%, rgba(244,239,228,0.02) 85%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            userSelect: 'none',
            marginBottom: 4,
            whiteSpace: 'nowrap',
          }}
        >
          Pampoenkraal
        </div>
      </div>
      <div style={{ height: 24 }} />
    </footer>
  )
}
