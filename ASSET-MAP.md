# Elysea image asset placement

Extract this archive at the root of the `elysea` Next.js project (the same directory as `package.json`).

## Public website images

- `public/images/doctor/dr-vrujal-mistry.jpg` — doctor portrait; use in the doctor profile section.
- `public/images/clinic/elysea-reception-wide.jpg` — wide clinic reception photograph; use in the clinic gallery / Visit section.
- `public/images/clinic/elysea-logo-wall.jpg` — close-up clinic logo photograph; use as a supporting gallery image.
- `public/images/clinic/elysea-reception-portrait.jpg` — vertical reception photograph; optional alternate gallery image.

## Source references (not publicly served)

- `references/elysea-source/service-categories-brochure.webp` — authoritative visual reference for the six service categories and listed services.
- `references/elysea-source/treatments-promo-reference.jpg` — supporting promotional artwork reference; review text and claims before deciding whether to publish.
- `references/elysea-source/clinic-brochure-reference.jpg` — clinic brochure reference. Use to verify clinic identity, doctor designations, phone/email and printed copy.

## Address source note

The supplied brochure scan prints the postal code as `392001`. The user confirmed that the current canonical clinic record in `lib/clinic.ts` is correct at `392011` and includes `Ganesh Shrishti`. Keep rendered contact details centralized in `lib/clinic.ts`; do not change the postal code based on the conflicting brochure scan.

The three files under `references/` are deliberately kept outside `public/`; Next.js will not expose them as public website assets. Recreate service text as HTML/React content rather than relying on text embedded in an image.

All images are copied without cropping, compression or visual edits.
