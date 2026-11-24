# ELYSEA AESTHETIC CLINIC

A one-page clinic information site for Elysea Aesthetic Clinic in Bharuch, Gujarat. Service enquiries open WhatsApp with a prefilled message. The website does not create, confirm, or store appointments.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **React 19**
- **Tailwind CSS 3** + custom porcelain / rosewood / gild palette
- **shadcn/ui** (vendored: Button, Dialog, Accordion, Input, Textarea, Badge — `components.json` included so `npx shadcn@latest add …` keeps working)
- **Framer Motion** — section reveals and navigation transitions
- **Lenis** — optional smooth scrolling, disabled for reduced-motion users
- **Google Maps** — embedded map loads only after the visitor asks to load it

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run typecheck
```
