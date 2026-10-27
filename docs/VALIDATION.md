# Website integration validation

2026-10-28, local macOS. `pnpm build` passed asset integrity checks, TypeScript project checks and the Vite production build. All six vendored assets match the pinned design revision. A deliberate CSS modification was rejected by the integrity guard, then the original was restored and verification passed.

The local Vite page was opened in the in-app browser. Verified original logo and CX/globe icon loaded, all eight fragment links target existing elements, and dark/light/high-contrast selection changes the rendered page. At a 1280px viewport document width matched viewport width (no horizontal overflow). The default narrow panel layout was visually checked in light and high-contrast themes. Keyboard Tab from the theme picker moved to the primary content action with visible focus.

Screenshot: `docs/preview.jpg` (generated review evidence, not shipped by the website).

Not yet qualified: complete screen-reader coverage, OS forced colors, reduced-motion emulation, native browser functionality, release metadata ingestion or hosted deployment. Theme CSS includes reduced-motion and forced-color focus rules inherited from the design package. No release URLs are fabricated.

Feature descriptions remain planned and derive from the local ecosystem feature catalog and design interaction specifications. Original plans in other docs remain future work; this integration only delivers the branded static preview and pinned asset contract.
