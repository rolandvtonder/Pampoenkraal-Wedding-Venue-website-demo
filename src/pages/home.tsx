import { useSyncExternalStore } from 'react'
import { mount } from '../Layout'
import Stage from '../Stage'
import PhoneScene from '../PhoneScene'
import PhotoGrid from '../Gallery'
import { Eyebrow, MoreLink, Rise, Section } from '../ui'
import { GALLERY } from '../content'

/*
  Home — the scroll-choreographed scene, then a glimpse of the gallery.
  Landscape screens from 1024px get the pinned, scaled stage; phones and
  portrait tablets get the same chapters in flow. Each chapter hands off to
  its own page.
*/

const WIDE = '(min-width: 1024px) and (min-aspect-ratio: 6/5)'

function useWide() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(WIDE)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => window.matchMedia(WIDE).matches,
  )
}

function Home() {
  const wide = useWide()
  return (
    <>
      {wide ? <Stage /> : <PhoneScene />}
      <Section label="Gallery preview">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap', marginBottom: 48 }}>
          <Rise>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="display" style={{ margin: '18px 0 0', fontSize: 'clamp(44px, 6vw, 84px)' }}>
              Moments at <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Pampoenkraal</span>
            </h2>
          </Rise>
          <Rise delay={0.1}>
            <MoreLink href="/gallery/">View the full gallery</MoreLink>
          </Rise>
        </div>
        <PhotoGrid items={GALLERY.slice(0, 6)} />
      </Section>
    </>
  )
}

mount('home', <Home />)
