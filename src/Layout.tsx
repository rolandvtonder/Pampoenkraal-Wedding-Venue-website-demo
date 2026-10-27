import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import Nav, { type Page } from './Nav'
import Footer from './Footer'
import './index.css'

/*
  Every page is its own HTML entry (see vite.config.ts), so each one is a
  real URL — /venue/, /dining/, /gallery/, /enquire/ — that any static host
  serves as-is, with its own title and description for search. This is the
  shell they share: skip link, navbar, main, footer.
*/

export function mount(page: Page, children: ReactNode) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <a href="#main" className="skip">Skip to content</a>
      <Nav current={page} />
      <main id="main">{children}</main>
      <Footer />
    </StrictMode>,
  )
}
