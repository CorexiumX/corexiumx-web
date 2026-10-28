# CorexiumX web

Local React/TypeScript/Vite development preview consuming the CorexiumX design package. Browser capabilities are labelled planned and downloads remain unavailable until verified release artifacts exist. GitHub Actions publishes this development preview to GitHub Pages after QA passes on `main`.

## Run

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

The build verifies vendored design assets, checks TypeScript and creates static output in `dist/`. No sibling repository is required to build. Use Node 24 (CI target) or Node 22.12+ with the pinned pnpm 12.10.1 toolchain.

## Design integration

Six files are pinned by SHA-256 in `src/design/manifest.json` to corexiumx-design commit `2e77af3fbf92b9c14d82042cffef32d2dd50a6f1`, package 1.0.0. The page uses the original supplied logo, the generated CX/globe icon adaptation and semantic theme variables. The theme selector previews dark, light and high-contrast colors; selection lasts until reload. No storage or telemetry is used.

To update: build and QA the selected corexiumx-design revision, verify its `dist/manifest.json`, copy the corresponding source files listed in this repository's design manifest, and update revision/version/hashes together. Run `pnpm run verify-design` and `pnpm build`. Unknown schema majors are rejected. Revert the asset-and-manifest commit together to recover a previous package. Do not independently edit vendored CSS/JSON or replace logo files.

Content sources are the sibling design repository's `patterns/browser-interactions.md` and the ecosystem `corexiumx-docs/product/FEATURE_CATALOG.md`. This page makes no shipped browser or performance claims. Original and generated artwork provenance is maintained in corexiumx-design; distribution rights and native icon qualification remain maintainer gates.

See [validation](docs/VALIDATION.md) for checked behavior and limits.

## Automated QA

```sh
pnpm exec playwright install chromium
pnpm qa
```

`qa` builds the production website before running the browser suite. `pnpm test:e2e` runs tests against an existing build; `pnpm test:a11y` runs only the accessibility file. Both start an isolated Vite production preview on port 4173 and stop it afterward. Free that port before running. Use `pnpm test:report` to open the HTML report.

The suite covers desktop and mobile-sized Chromium, theme colors and reload behavior, artwork/favicon loading, fragment navigation, keyboard skip link/focus, development status, and widths of 320, 390 and 768 pixels. Axe scans all three themes for automatically detectable WCAG A/AA and best-practice violations; additional checks emulate reduced motion and forced colors. Reports include axe JSON results, and failures retain screenshots and traces in ignored output folders.

`.github/workflows/web-qa.yml` runs on pushes, pull requests and manual dispatch. It installs locked dependencies and Chromium with OS dependencies, verifies design assets, builds, then runs the suite. Reports and successful builds are retained for 14 days. On `main`, it then rebuilds with the GitHub Pages base path and deploys through the `github-pages` environment. Only the deployment job has Pages and OIDC write permissions; pull requests never deploy. The remote workflow must run after push before treating Linux CI as verified.

Automated checks are a regression gate, not complete accessibility certification. Manual screen-reader, zoom, native platform and additional browser-engine review remains necessary. Setup follows the official [Playwright CI](https://playwright.dev/docs/ci-intro) and [axe integration](https://playwright.dev/docs/accessibility-testing) guides.

## GitHub Pages deployment

In repository **Settings → Pages**, select **GitHub Actions** as the source. Push this workflow to `main`, or run **Web QA and Pages** manually on `main`. The expected project URL is https://corexiumx.github.io/corexiumx-web/; the deployment environment records the actual URL. The workflow gets the base path from `actions/configure-pages`, including support for a configured custom domain.

To check the project-path build locally, run `pnpm build --base /corexiumx-web/`, then `pnpm preview` and open `/corexiumx-web/`. Run `pnpm build` again before the regular root-path browser suite.
