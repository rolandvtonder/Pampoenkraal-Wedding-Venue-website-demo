import { mount } from '../Layout'
import PhotoGrid from '../Gallery'
import { PageHero, Section } from '../ui'

/* Gallery — every photograph, each opening in the lightbox. */

function Gallery() {
  return (
    <>
      <PageHero
        img="lapa-tables"
        pos="50% 50%"
        eyebrow="Gallery"
        words={['Moments at', 'Pampoenkraal']}
        intro="Ceremonies under the oaks, long tables in the lapa and evenings around the fire. Tap any photo to see it larger."
      />
      <Section label="Photos">
        <PhotoGrid />
      </Section>
    </>
  )
}

mount('gallery', <Gallery />)
