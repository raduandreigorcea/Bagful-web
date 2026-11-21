# Bagful marketing site: design system

World: **The Line Diagram**. The page is one transit route. Each person you shop with is a coloured line, and every line ends at the phone.

## Colour
- Ground `#e8ede7` with a faint dot grid; deep ground `--ground-deep`; ink `#0e2a1d` (also the closing and footer ground).
- Route colours, each tied to a meaning: Home `#4d8c65`, Flat `#ee7550`, Parents `#edbe6e`, Trip `#3f7fbf`.
- App tokens (green, leaf, paper) appear only inside phone mockups, matching the real app.

## Typography
- Display: Archivo, 800, tight but not below -0.04em, max 6rem, line-height about 1.
- Inside phones: Plus Jakarta Sans, because it is the real app's font. It is intentionally not used on the site itself.
- No eyebrows or kickers above headings.

## Geometry
- Lines run only at 0, 45 and 90 degrees. Stations are rings and ticks. Rails are 0.5rem wide with a 1.5rem ring where a heading sits.
- Buttons are enamel "plaques": ink fill or ink outline, with a ring marker.

## Motion
- Hero: routes draw in, products ride their line to the phone via MotionPath, a toast names who added it, other stations pulse. After that, presence pulses are the only motion that runs unprompted.
- Rails: scrubbed with ScrollTrigger as each section passes.
- Reduced motion or no JS: the HTML ships the finished state (drawn lines, full list, laid rails).

## Components
Header (two plaques: Download the app / Open the web app), Hero diagram, How (left rail of steps and a sticky phone, which becomes a phone per step under 60rem), Why (tangled chat vs one straight route), Details (map-key facts), Closing (terminus on ink), Footer (route key).

## Constraints
- Generic demo names only (Sam, Alex, Jo, Mom). No testimonials, counts or store links are invented. `site.downloadUrl` points to GitHub releases until a store listing exists.
