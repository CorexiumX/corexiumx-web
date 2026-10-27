# CorexiumX web

Local React/TypeScript/Vite development preview consuming the CorexiumX design package. Browser capabilities are labelled planned and downloads remain unavailable until verified release artifacts exist. This work does not publish a website.

## Run

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

The build verifies vendored design assets, checks TypeScript and creates static output in `dist/`. No sibling repository is required to build. Node 22.12+ and pnpm are recommended for the current toolchain.

## Design integration

Six files are pinned by SHA-256 in `src/design/manifest.json` to corexiumx-design commit `2e77af3fbf92b9c14d82042cffef32d2dd50a6f1`, package 1.0.0. The page uses the original supplied logo, the generated CX/globe icon adaptation and semantic theme variables. The theme selector previews dark, light and high-contrast colors; selection lasts until reload. No storage or telemetry is used.

To update: build and QA the selected corexiumx-design revision, verify its `dist/manifest.json`, copy the corresponding source files listed in this repository's design manifest, and update revision/version/hashes together. Run `pnpm run verify-design` and `pnpm build`. Unknown schema majors are rejected. Revert the asset-and-manifest commit together to recover a previous package. Do not independently edit vendored CSS/JSON or replace logo files.

Content sources are the sibling design repository's `patterns/browser-interactions.md` and the ecosystem `corexiumx-docs/product/FEATURE_CATALOG.md`. This page makes no shipped browser or performance claims. Original and generated artwork provenance is maintained in corexiumx-design; distribution rights and native icon qualification remain maintainer gates.

See [validation](docs/VALIDATION.md) for checked behavior and limits.
