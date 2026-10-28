# Website integration validation

2026-10-28, local macOS. `pnpm build` passed asset integrity checks, TypeScript project checks and the Vite production build. All six vendored assets match the pinned design revision. A deliberate CSS modification was rejected by the integrity guard, then the original was restored and verification passed.

The local Vite page was opened in the in-app browser. Verified original logo and CX/globe icon loaded, all eight fragment links target existing elements, and dark/light/high-contrast selection changes the rendered page. At a 1280px viewport document width matched viewport width (no horizontal overflow). The default narrow panel layout was visually checked in light and high-contrast themes. Keyboard Tab from the theme picker moved to the primary content action with visible focus.

Screenshot: `docs/preview.jpg` (generated review evidence, not shipped by the website).

Not yet qualified: complete manual screen-reader coverage, OS-native forced-color behavior, native browser functionality, release metadata ingestion or hosted deployment. Reduced motion and forced colors are now covered by Chromium emulation below. No release URLs are fabricated.

Feature descriptions remain planned and derive from the local ecosystem feature catalog and design interaction specifications. Original plans in other docs remain future work; this integration only delivers the branded static preview and pinned asset contract.

## Automated QA gate — 2026-10-28

Toolchain: macOS arm64, Node 26.9.0, pnpm 12.10.1, Playwright 1.64.1, axe-core 4.14.0 and bundled Chromium 156.0.8078.4. A final local run also passed all 26 tests using bundled Node 24.22.1 with `CI=true`, matching the configured Node major and CI settings; no retries were needed. GitHub Actions targets Node 24 on Ubuntu; its remote execution remains pending a push.

Results:

- `pnpm install --frozen-lockfile --offline`: passed using the installed dependency cache, with no lockfile update.
- `pnpm qa`: asset verification, TypeScript (including test code/config), production build and **26 browser checks passed** using two workers with no retries locally.
- Desktop 1280×900 and Pixel 7 Chromium emulation cover brand/favicon loading, absence of runtime errors, rendered theme colors/reload defaults, section navigation, keyboard skip/focus and keyboard theme selection, and honest unavailable-download status.
- Layout checks at 320, 390 and 768 CSS pixels verify no horizontal overflow, minimum select target height and mobile stacking.
- Full-page axe scans found zero violations for WCAG 2 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA and best-practice rules in all three themes on both projects. Forced-color scans also pass for all three themes. Rules were not disabled and elements were not excluded.
- Reduced-motion emulation confirms the CTA transition duration becomes zero. Forced-color emulation verifies skip-link focus and control boundaries.
- The first run exposed forced-color contrast failures. Explicit Canvas/CanvasText/LinkText/Highlight mappings now override app colors during forced colors, including the brand caption and CTA. Regular theme assets remain pinned and unchanged.
- Workflow YAML parsed successfully; checked read-only permissions and presence of the browser test gate. `git diff --check` passed.

Reports are generated in `playwright-report/` and `test-results/` (ignored). Axe JSON attachments, screenshots and failure traces are uploaded by CI for 14 days. These automated results do not certify full WCAG conformance or native mobile behavior. Manual screen-reader and zoom review, Firefox/WebKit coverage and Linux CI execution remain outside this local evidence.

## Tailwind redesign — 2026-10-28

The website now uses Tailwind CSS 4 through its Vite plugin, with semantic color utilities referencing the unchanged, verified design tokens. The redesign adds responsive feature cards, three interactive workspace illustrations, grouped roadmap milestones, an explicit release-status panel and keyboard-operated FAQ disclosures. Feature and roadmap content derives from the ecosystem catalog and roadmap; all native browser capabilities remain labelled planned.

The production build and all 32 browser checks passed locally at the root path. The new checks verify exclusive workspace selection, pane changes and live-region text, keyboard-operated FAQs, and no page overflow across all three concepts at widths of 320, 390, 768 and 1280 pixels. Existing checks still cover all three themes, automated axe scans, reduced motion, forced colors, image/favicon loading, navigation and honest release status. Desktop dark/light and mobile full-page screenshots were visually inspected; they are local review artifacts, not website assets.

The GitHub Pages build (`pnpm build --base /corexiumx-web/`) and all 32 checks also passed with `TEST_BASE_PATH=/corexiumx-web/`. Playwright now supports `TEST_BASE_PATH` so the same suite can exercise the GitHub Pages project path. CI also tests the final Pages build before uploading it for deployment. Manual assistive-technology review and additional browser engines remain outside this evidence.
