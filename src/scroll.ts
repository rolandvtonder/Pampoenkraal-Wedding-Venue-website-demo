/*
  Scroll choreography for the Pampoenkraal scene.

  The page is one pinned stage; scrolling drives a 0..1 timeline instead of
  moving content. Three groups travel up as a parallax filmstrip at different
  rates, and three photographs crossfade underneath with a slow push-in:

      0.00 - 0.14   hold      the welcome (hero) sits, intro already played
      0.14 - 0.42   move 1    welcome rises out, the venue rises in
      0.42 - 0.55   hold      the venue settles over the couple in the field
      0.55 - 0.85   move 2    venue rises out, dining rises in at a slower rate
      0.85 - 1.00   hold      dining holds for a beat before the gallery

  Group offsets, in artboard pixels (1280 x 720):

      frame        Welcome     Venue       Dining
      start        128         1000        -
      after m1     -800        96          1300
      after m2     -           -1120       40

  The welcome's words do not wait for the scrollbar: they play once on load,
  on a clock, so the first screen is never empty.
*/

export const SCROLL_VH = 540

/** Phase windows as scroll progress. */
export const P = {
  move1: [0.14, 0.42],
  venueIn: [0.26, 0.42],
  move2: [0.55, 0.85],
  /* photo crossfades sit in the middle of each move */
  bgVenue: [0.22, 0.34],
  bgDining: [0.6, 0.72],
} as const

/** Intro windows in milliseconds — the welcome's staggered reveal. */
export const INTRO_MS = 2200
export const I = {
  eyebrow: [0, 600],
  word1: [100, 800],
  word2: [260, 960],
  word3: [420, 1120],
  body1: [600, 1250],
  body2: [700, 1350],
  body3: [800, 1450],
  cta: [950, 1600],
  card: [700, 2200],
} as const

/** Where each group sits, per frame. */
export const G = {
  welcome: { start: 128, end: -800 },
  venue: { enter: 1000, mid: 96, end: -1120 },
  dining: { enter: 1300, mid: 1300 - 600, end: 40 },
} as const

/** Scroll progress each section reads best at — the index rail and nav jump here. */
export const STOPS = { welcome: 0, venue: 0.49, dining: 0.93 } as const

/** 0 before `a`, 1 after `b`, cubic-eased between. */
export function span(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  const t = (p - a) / (b - a)
  return 1 - Math.pow(1 - t, 3)
}

/** Linear ramp, for positions that should track the scrollbar exactly. */
export function ramp(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  return (p - a) / (b - a)
}

/** Smooth in-out, for the photo crossfades. */
export function ease(p: number, w: readonly [number, number]) {
  const t = ramp(p, w)
  return t * t * (3 - 2 * t)
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
