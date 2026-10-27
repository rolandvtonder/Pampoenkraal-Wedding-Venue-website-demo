# Pampoenkraal Wedding Venue — website demo

A new website for Pampoenkraal, the wedding and function venue on the Altydgedacht Wine Estate in Durbanville.

## Pages

| Page | URL | Contents |
|---|---|---|
| Home | `/` | Scroll-driven opening scene (welcome, venue, dining) and a gallery preview |
| Venue | `/venue/` | The lapa and capacities, the spaces, history and location |
| Dining | `/dining/` | Open-fire cooking and how each course is served |
| Gallery | `/gallery/` | All photos, with a full-screen viewer |
| Enquire | `/enquire/` | Enquiry form and contact details |

On landscape screens 1024px and wider the home page is one pinned scene that scrolling plays through; phones and portrait tablets get the same chapters stacked.

## Run it locally

Requires [Node.js](https://nodejs.org/) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build for hosting

```bash
npm run build
```

Upload the contents of `dist/` to any static host. Each page is its own `index.html`, so no server rewrites are needed.

## Enquiry form

The form sends enquiries through [Web3Forms](https://web3forms.com). Create a free access key for info@pampoenkraal.co.za, copy `.env.example` to `.env`, and paste the key in. Without a key, the form opens the visitor's email app with the enquiry written out.

## Built with

Vite, React, TypeScript, Tailwind CSS and Motion. Photos and venue information are from the existing Pampoenkraal website.
