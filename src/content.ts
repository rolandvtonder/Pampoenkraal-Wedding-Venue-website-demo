/*
  Copy and contact details, shared by the desktop stage, the phone layout and
  the footer so the two layouts can never drift apart. Facts come from the
  venue's existing site: capacities, menu style, estate history and GPS.
*/

export const CONTACT = {
  phone: '+27 64 817 5890',
  phoneHref: 'tel:+27648175890',
  email: 'info@pampoenkraal.co.za',
  facebook: 'https://www.facebook.com/PampoenkraalWeddingsFunctions/',
  instagram: 'https://www.instagram.com/pampoenkraal.venue/',
  address: ['Altydgedacht Wine Estate', 'Durbanville Wine Valley', 'Western Cape, South Africa'],
  /* 33°50'55.13"S 18°37'33.33"E */
  map: 'https://www.google.com/maps?q=-33.848647,18.625925',
}

export const WELCOME = {
  eyebrow: 'Altydgedacht Wine Estate · Durbanville',
  words: ['Your day,', 'beneath', 'the oaks'],
  body: [
    'A hidden wedding and function venue on the',
    'Altydgedacht Wine Estate, only minutes from',
    'the heart of Durbanville.',
  ],
}

export const CAPACITY = {
  label: ['Main lapa', 'seated, with dance floor'],
  seated: 140,
  max: 200,
  note: '200 guests when the dance floor moves to the smaller lapa',
  readouts: [
    { v: 200, k: 'Max guests' },
    { v: 2, k: 'Lapas' },
    { v: 1698, k: 'Founded' },
  ],
}

export const VENUE = {
  title: 'Hidden in Durbanville',
  teaser: 'Majestic oaks, open fields and birdsong — only minutes from the bustle of everyday life.',
  body:
    'Majestic oaks, wide open fields and horses grazing in the distance, while birdsong fills the air — only minutes from the hustle and bustle of everyday life.',
  cards: [
    { art: 'lapa-lounge', label: ['The', 'Lapa'] },
    { art: 'ceremony-oaks', label: ['Oak', 'Ceremonies'] },
    { art: 'reception-chandeliers', label: ['Long-table', 'Receptions'] },
    { art: 'lapa-tables', label: ['Evenings', 'Under Lights'] },
  ],
}

export const DINING = {
  title: ['Cooked over', 'an open fire'],
  body:
    'Food is the heart of Pampoenkraal. Starters and desserts are plated and served at the table, while the main course is a buffet — our chef carves and serves the meats straight from the fire.',
  courses: ['Plated starters', 'Carvery buffet', 'Plated desserts'],
}

export const GALLERY = [
  { src: 'couple-field', alt: 'Bride and groom kissing in a green field' },
  { src: 'reception-chandeliers', alt: 'Reception tables with candelabras under the lapa' },
  { src: 'lapa-lights', alt: 'The lapa set for a reception under string lights' },
  { src: 'confetti', alt: 'Newlyweds walking through a shower of confetti' },
  { src: 'fire-pit', alt: 'Chef tending the open fire pit' },
  { src: 'ceremony-oaks', alt: 'White ceremony chairs beneath the oak trees' },
  { src: 'table-decor', alt: 'Table decor with lanterns and white flowers' },
  { src: 'sunset-fields', alt: 'Sunset over the fields of the estate' },
  { src: 'lapa-tables', alt: 'Long tables dressed with greenery in the lapa' },
  { src: 'hands-heart', alt: 'A couple making a heart with their hands' },
  { src: 'lapa-lounge', alt: 'Lounge area inside the thatched lapa' },
  { src: 'table-lantern', alt: 'A copper lantern and wine on a dinner table among the trees' },
  { src: 'reception-white', alt: 'White-dressed reception tables' },
  { src: 'unplugged-sign', alt: 'Chalkboard sign welcoming guests to an unplugged wedding' },
  { src: 'farm-fields', alt: 'Fence posts and open farmland beyond the trees' },
  { src: 'wine-barrel', alt: 'Wine glasses on a barrel table' },
  { src: 'open-fire', alt: 'Guests gathered near the open fire' },
  { src: 'fire-oven', alt: 'Fire burning in the stone oven' },
]

/* intrinsic sizes, so the masonry reserves space before each photo loads */
export const SIZE: Record<string, [number, number]> = {
  'couple-field': [1028, 684],
  'reception-chandeliers': [697, 720],
  'lapa-lights': [960, 640],
  confetti: [800, 600],
  'fire-pit': [2200, 1467],
  'ceremony-oaks': [720, 316],
  'table-decor': [800, 600],
  'sunset-fields': [959, 430],
  'lapa-tables': [960, 720],
  'hands-heart': [959, 430],
  'lapa-lounge': [800, 600],
  'table-lantern': [600, 400],
  'reception-white': [720, 449],
  'unplugged-sign': [800, 600],
  'farm-fields': [600, 400],
  'wine-barrel': [800, 600],
  'open-fire': [600, 400],
  'fire-oven': [959, 430],
}

/* Every internal URL goes through the build's base path, so the site works
   both at a domain root and under a sub-path such as GitHub Pages'
   /Pampoenkraal-Wedding-Venue-website-demo/. */
export const link = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')

export const photo = (name: string) => link(`photos/${name}.jpg`)

/* ---- page copy: the venue ---- */
export const VENUE_PAGE = {
  intro:
    'Surrounded by majestic oak trees and wide open fields, Pampoenkraal lies hidden away on the scenic Altydgedacht Wine Estate — in the heart of Durbanville, yet a world away from it.',
  lapa: {
    title: ['A charming lapa,', 'made for celebrating'],
    body: [
      'Our wonderfully charming lapa is the heart of every celebration — the main venue for ceremonies, long-table dinners and dancing late into the evening.',
      'It seats up to 140 guests with the dance floor inside. When the dance floor moves to our smaller lapa next door, the main lapa welcomes up to 200.',
    ],
  },
  spaces: [
    { art: 'lapa-lounge', title: 'The Lapa', text: 'Our main venue, seating 140 guests with a dance floor.' },
    { art: 'ceremony-oaks', title: 'Beneath the Oaks', text: 'Say your vows in the dappled shade of the old oak trees.' },
    { art: 'reception-chandeliers', title: 'Receptions', text: 'Long tables, candlelight and room for everyone you love.' },
    { art: 'lapa-tables', title: 'Evenings', text: 'String lights, greenery and a dance floor under the lapa.' },
  ],
  history: {
    title: ['Named for', 'a spring'],
    body: [
      'Pampoenkraal — from the Dutch pampoen, pumpkin, and kraal, an enclosure for livestock — was the settlement founded early in 1800 around a spring. Now better known as Durbanville, it served mainly as a watering station for travellers between Cape Town and the interior.',
      'Today our venue sits on the Altydgedacht Wine Estate, which dates back to 1698 and lies on the slopes of the Tygerberg Hills.',
    ],
  },
}

/* ---- page copy: dining ---- */
export const DINING_PAGE = {
  intro:
    'Pampoenkraal specialises in creating a truly unique experience for its guests, from the cooking done on open fires to the friendly service at every table.',
  service: [
    { n: '01', title: 'Plated starters', text: 'The meal begins at the table, with starters plated and served to every guest.' },
    { n: '02', title: 'Carvery buffet', text: 'The main course is a buffet, with our chef carving and serving the meats straight from the fire.' },
    { n: '03', title: 'Plated desserts', text: 'To finish, desserts are plated and brought to the table.' },
  ],
  quote:
    'Already having the perfect venue, location and atmosphere, Pampoenkraal further excels in the quality of its food and friendly service, ensuring that guests enjoy a memorable experience.',
  photos: [
    { src: 'open-fire', alt: 'Flames in the open fire with guests gathering behind' },
    { src: 'table-lantern', alt: 'A dinner table set among the trees with a copper lantern' },
    { src: 'fire-oven', alt: 'Fire burning in the stone oven' },
    { src: 'table-decor', alt: 'Table decor with lanterns and white flowers' },
    { src: 'wine-barrel', alt: 'Wine glasses on a barrel table' },
  ],
}
