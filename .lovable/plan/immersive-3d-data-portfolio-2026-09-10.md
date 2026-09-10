# Immersive 3D Data Portfolio

## Direction
Rebuild the existing portfolio as a dune-toned, full-screen interactive experience rather than a conventional text-first page. Preserve Talal’s real project, experience, skill, and contact content while making the opening view and project exploration visually memorable.

## Experience
- Create a cinematic first screen with Talal’s name as the dominant signal, a concise data-science statement, clear project/contact actions, and an interactive 3D “data terrain” made from layered sand-colored contours, nodes, connections, and floating analytical forms.
- Make the 3D scene respond gently to pointer movement and scrolling, with depth, lighting, shadows, atmospheric particles, and restrained amber highlights.
- Add an accessible reduced-motion mode and a simplified composition for smaller screens.
- Build a floating navigation system with section progress and working links to work, experience, toolkit, and contact.

## Project Showcase
- Turn the existing projects into a kinetic horizontal/stacked gallery that shifts with pointer position and scrolling.
- Add cursor-following light flashes, real perspective tilt, depth-separated labels, animated metrics, category filtering, and working demo/repository links.
- Keep all project details readable without requiring precise pointer movement or animation.

## Remaining Content
- Recompose experience and education as an interactive depth-based timeline.
- Present tools and skills as an animated constellation/orbit system with readable labels.
- Finish with a high-contrast contact section using the existing social links and contact details.

## Visual System
- Keep the dune family: warm near-black, sand, parchment, amber/spice, and a small green availability accent.
- Use Space Grotesk and Plus Jakarta Sans, strong typographic hierarchy, fine grain, luminous edge highlights, and compact angular controls.
- Avoid generic glass cards, purple/blue sci-fi styling, and excessive text blocks.

## Technical Details
- Use React Three Fiber and Three.js for the full-bleed 3D layer, with procedural geometry and local shaders/textures so no external 3D asset can fail at runtime.
- Keep the page client-rendered to ensure the 3D canvas never runs during server rendering.
- Use semantic design tokens in the global stylesheet and existing interface patterns for accessible controls.
- Include route-specific page metadata based on the original portfolio.
- Validate the result in a real browser at desktop and mobile sizes, including interactions, motion, links, and runtime console health.
