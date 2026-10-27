import { useRef, useState, type FormEvent } from 'react'
import { CONTACT, photo } from './content'

/*
  Enquiry form. Posts to Web3Forms, which forwards each enquiry to the venue's
  inbox — the access key is created against info@pampoenkraal.co.za and lives
  in .env as VITE_WEB3FORMS_KEY. Without a key the form still works: it opens
  the visitor's mail app with the enquiry already written out.

  Fields validate on blur, not per keystroke; a failed submit lists every
  problem in a summary that takes focus, and each field keeps its own message.
*/

const KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Field = 'name' | 'email' | 'phone' | 'type' | 'date' | 'guests' | 'message'
type Values = Record<Field, string>

const EMPTY: Values = { name: '', email: '', phone: '', type: 'Wedding', date: '', guests: '', message: '' }
const TYPES = ['Wedding', 'Function', 'Conference', 'Other celebration']

function check(v: Values): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {}
  if (!v.name.trim()) e.name = 'Please tell us your name.'
  if (!v.email.trim()) e.email = 'We need an email address to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'That email address looks incomplete — check for a missing @ or domain.'
  if (v.guests && (Number(v.guests) < 1 || Number(v.guests) > 200)) e.guests = 'The venue seats up to 200 guests — enter a number from 1 to 200.'
  return e
}

const LABELS: Record<Field, string> = {
  name: 'Your name',
  email: 'Email',
  phone: 'Phone',
  type: 'Type of event',
  date: 'Preferred date',
  guests: 'Number of guests',
  message: 'Tell us about your day',
}

export default function Enquiry({ page = false }: { page?: boolean }) {
  const Heading = page ? 'h1' : 'h2'
  const [v, setV] = useState<Values>(EMPTY)
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [summary, setSummary] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)

  const errors = check(v)
  const shown = (f: Field) => (touched[f] ? errors[f] : undefined)

  const set = (f: Field) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [f]: e.target.value }))
  const blur = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }))

  const mailto = () => {
    const body = (Object.keys(LABELS) as Field[]).map((f) => `${LABELS[f]}: ${v[f] || '-'}`).join('\n')
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${v.type} enquiry — ${v.name}`)}&body=${encodeURIComponent(body)}`
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (Object.keys(errors).length) {
      setTouched({ name: true, email: true, guests: true })
      setSummary(true)
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setSummary(false)
    if (!KEY) {
      window.location.href = mailto()
      return
    }
    setState('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: KEY,
          subject: `${v.type} enquiry — ${v.name}`,
          from_name: 'Pampoenkraal website',
          replyto: v.email,
          ...v,
        }),
      })
      const data = await res.json()
      setState(data.success ? 'sent' : 'error')
      if (data.success) setV(EMPTY)
    } catch {
      setState('error')
    }
  }

  const fieldStyle = (bad?: string) =>
    ({
      width: '100%',
      minHeight: 50,
      padding: '12px 16px',
      borderRadius: 12,
      border: `1px solid ${bad ? '#e8836f' : 'rgba(244,239,228,0.18)'}`,
      background: 'rgba(244,239,228,0.05)',
      color: 'var(--color-bone)',
      fontFamily: 'inherit',
      fontSize: 16,
      boxSizing: 'border-box',
      colorScheme: 'dark',
    }) as const

  const Input = ({ f, type = 'text', req, auto, ...rest }: { f: Field; type?: string; req?: boolean; auto?: string; min?: number; max?: number; inputMode?: 'numeric' | 'tel' | 'email' }) => (
    <div>
      <label htmlFor={f} className="label" style={{ display: 'block', marginBottom: 8, fontSize: 11, color: 'rgba(244,239,228,0.8)' }}>
        {LABELS[f]}
        {req && <span aria-hidden="true" style={{ color: 'var(--color-leaf)' }}> *</span>}
      </label>
      <input
        id={f}
        name={f}
        type={type}
        value={v[f]}
        onChange={set(f)}
        onBlur={blur(f)}
        required={req}
        autoComplete={auto}
        aria-invalid={!!shown(f)}
        aria-describedby={shown(f) ? `${f}-err` : undefined}
        style={fieldStyle(shown(f))}
        {...rest}
      />
      {shown(f) && (
        <p id={`${f}-err`} style={{ margin: '8px 0 0', fontSize: 13.5, color: '#f0a493' }}>
          {shown(f)}
        </p>
      )}
    </div>
  )

  return (
    <section
      id="enquire"
      aria-labelledby="enquire-title"
      style={{
        position: 'relative',
        background: 'var(--color-ink-2)',
        padding: `${page ? 'clamp(130px, 14vw, 180px)' : 'clamp(80px, 10vw, 140px)'} clamp(16px, 4vw, 56px) clamp(80px, 10vw, 140px)`,
        minHeight: page ? '100svh' : undefined,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <img
        src={photo('sunset-fields')}
        alt=""
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: page ? 0.32 : 0.22 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--color-ink) 0%, rgba(18,26,20,0.75) 40%, var(--color-ink-2) 100%)' }} />

      <div style={{ position: 'relative', maxWidth: 1312, margin: '0 auto', display: 'flex', gap: 'clamp(40px, 6vw, 96px)', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 340px' }}>
          <div className="label" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(244,239,228,0.7)' }}>
            <span style={{ width: 28, height: 1, background: 'var(--color-leaf)' }} />
            Enquire
          </div>
          <Heading id="enquire-title" className="display" style={{ margin: '18px 0 0', fontSize: page ? 'clamp(56px, 8vw, 112px)' : 'clamp(44px, 6vw, 80px)' }}>
            Let&rsquo;s plan <span style={{ fontStyle: 'italic', fontWeight: 400 }}>your day</span>
          </Heading>
          <p style={{ margin: '20px 0 0', fontSize: 17, lineHeight: 1.65, color: 'var(--color-mist)', maxWidth: 440 }}>
            Tell us a little about your celebration and we&rsquo;ll get back to you as soon as possible — or come and see the venue for yourself.
          </p>

          <dl style={{ margin: '40px 0 0', display: 'grid', gap: 22 }}>
            {[
              { k: 'Call us', v: CONTACT.phone, href: CONTACT.phoneHref },
              { k: 'Email', v: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { k: 'Find us', v: CONTACT.address.join(', '), href: CONTACT.map },
            ].map((c) => (
              <div key={c.k}>
                <dt className="label" style={{ fontSize: 11, color: 'rgba(244,239,228,0.55)' }}>{c.k}</dt>
                <dd style={{ margin: '6px 0 0' }}>
                  <a
                    href={c.href}
                    className="link"
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ fontSize: 18, color: 'rgba(244,239,228,0.9)', textDecoration: 'underline', textDecorationColor: 'rgba(106,168,81,0.6)', textUnderlineOffset: 5 }}
                  >
                    {c.v}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="glass"
          style={{ flex: '1 1 520px', borderRadius: 32, padding: 'clamp(24px, 4vw, 44px)', display: 'grid', gap: 20, alignContent: 'start' }}
        >
          {state === 'sent' ? (
            <div role="status" style={{ padding: '40px 0', textAlign: 'center' }}>
              <span className="mark" aria-hidden="true" style={{ width: 96, height: 64 }} />
              <h3 className="display" style={{ margin: '16px 0 0', fontSize: 44 }}>Thank you</h3>
              <p style={{ margin: '12px auto 0', maxWidth: 360, color: 'var(--color-mist)', lineHeight: 1.6 }}>
                Your enquiry is on its way to us. We&rsquo;ll be in touch soon.
              </p>
              <button type="button" className="btn btn-ghost label" style={{ marginTop: 24 }} onClick={() => setState('idle')}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <>
              {summary && Object.keys(errors).length > 0 && (
                <div
                  ref={summaryRef}
                  tabIndex={-1}
                  role="alert"
                  style={{ padding: '14px 18px', borderRadius: 12, border: '1px solid #e8836f', background: 'rgba(232,131,111,0.08)' }}
                >
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>Please fix the following:</p>
                  <ul style={{ margin: '8px 0 0', paddingLeft: 18, fontSize: 14.5, lineHeight: 1.6 }}>
                    {(Object.keys(errors) as Field[]).map((f) => (
                      <li key={f}>
                        <a href={`#${f}`} style={{ color: '#f0a493' }}>{errors[f]}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                {Input({ f: 'name', req: true, auto: 'name' })}
                {Input({ f: 'email', type: 'email', req: true, auto: 'email', inputMode: 'email' })}
                {Input({ f: 'phone', type: 'tel', auto: 'tel', inputMode: 'tel' })}
                <div>
                  <label htmlFor="type" className="label" style={{ display: 'block', marginBottom: 8, fontSize: 11, color: 'rgba(244,239,228,0.8)' }}>
                    {LABELS.type}
                  </label>
                  <select id="type" name="type" value={v.type} onChange={set('type')} style={{ ...fieldStyle(), cursor: 'pointer' }}>
                    {TYPES.map((t) => (
                      <option key={t} style={{ background: '#121a14' }}>{t}</option>
                    ))}
                  </select>
                </div>
                {Input({ f: 'date', type: 'date' })}
                {Input({ f: 'guests', type: 'number', min: 1, max: 200, inputMode: 'numeric' })}
              </div>

              <div>
                <label htmlFor="message" className="label" style={{ display: 'block', marginBottom: 8, fontSize: 11, color: 'rgba(244,239,228,0.8)' }}>
                  {LABELS.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={v.message}
                  onChange={set('message')}
                  placeholder="Ceremony on site? Time of year? Anything we should know."
                  style={{ ...fieldStyle(), resize: 'vertical', lineHeight: 1.5 }}
                />
              </div>

              {state === 'error' && (
                <p role="alert" style={{ margin: 0, fontSize: 14.5, color: '#f0a493', lineHeight: 1.55 }}>
                  Your enquiry didn&rsquo;t go through — please try again, or{' '}
                  <a href={mailto()} style={{ color: 'inherit' }}>send it by email instead</a>.
                </p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <button type="submit" className="btn btn-leaf label" disabled={state === 'sending'} style={{ opacity: state === 'sending' ? 0.6 : 1 }}>
                  {state === 'sending' ? 'Sending…' : 'Send enquiry'}
                </button>
                <span style={{ fontSize: 13, color: 'rgba(244,239,228,0.55)' }}>
                  <span aria-hidden="true" style={{ color: 'var(--color-leaf)' }}>*</span> required
                </span>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
