# Elysea Aesthetics — Homepage

A luxury editorial-style aesthetic clinic homepage built with Next.js App Router, Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger, and Lenis.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production checks

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

## Motion architecture

- **Framer Motion**: hero entrance, mobile navigation, treatment image crossfades.
- **GSAP + ScrollTrigger**: scroll reveals, image parallax and hero image scale.
- **Lenis**: smooth wheel scrolling. Its animation loop is driven by GSAP's ticker and sends updates to ScrollTrigger. Lenis is skipped when reduced motion is requested.
- **Tailwind CSS**: utility framework is configured. The visual system is primarily expressed through reusable CSS tokens and editorial layout classes in `src/app/globals.css` to preserve precise art direction.

## Before launch — clinic details to supply

1. Confirmed clinic address, phone number, email and opening hours.
2. Practitioner names, professional qualifications and approved biographies.
3. Real clinic photography and treatment imagery with usage rights.
4. Booking provider or clinic inbox/CRM integration.
5. Privacy policy and any required patient consent / image-use notices.
6. Final treatment names, indications, contraindications and clinician-approved descriptions.
7. Real reviews and before/after imagery only where consent and applicable rules permit.

The consultation form currently demonstrates the front-end interaction only. It does **not** send or store submissions; connect an approved booking service or server-side form endpoint before publishing.

## Assets

- `public/images/elysea-hero.png` is the custom-generated homepage hero image.
- Treatment and editorial images currently use Unsplash image URLs as visual placeholders. Replace them with licensed clinic imagery before production.

## Notes

- Metadata currently uses a reserved `.example` domain placeholder. Set the real production URL in `src/app/layout.tsx`.
- The design intentionally avoids repeated square cards and uses editorial typography, organic image masks, asymmetric sections and open treatment rows.
# ELYSEA-AESTHETICS
