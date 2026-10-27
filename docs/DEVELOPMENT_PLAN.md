# Website: development plan

## Outcome and scope

Accessible product website, verified downloads, release notes and truthful feature status.

A branded static React/Vite preview and pinned design asset integration are implemented; see VALIDATION.md. Downloads and browser capabilities remain future work. Desktop platforms: macOS, Windows and Linux. Start with macOS arm64, then qualify the other release targets. Mobile is a separate future program.

## Proposed technology

Existing scaffold: React, TypeScript and Vite (observed during planning). Retain this stack and use static hosting/CDN with appropriate route fallback. Next.js was an earlier proposal; migrating frameworks requires a demonstrated server-rendering requirement and a separate decision. Styling should follow the actual implementation.

## Dependencies and ownership

Updater publishes public download metadata; build produces signed artifacts; docs supplies guides; design supplies assets; benchmarks supplies reviewable results.

The repository maintainer owns implementation and evidence. Product scope and cross-repository contracts live in corexiumx-docs. A release maintainer approves promotion only after relevant acceptance gates pass.

## Work packages

### 1. Content contract

Define content types, planned/experimental/shipped labels and navigation.

Acceptance: Every feature claim has a status and source.

### 2. Page system

Build responsive pages, accessible navigation and download picker.

Acceptance: Keyboard navigation and mobile layouts work; no fabricated release links.

### 3. Release ingestion

Validate version, channel, architecture, checksums and artifact URLs.

Acceptance: Malformed metadata fails build; missing artifacts display unavailable.

### 4. Publish pipeline

Add preview, link checking, caching and production deployment procedure.

Acceptance: Preview passes accessibility and broken-link checks before production approval.

## Execution workflow

1. Select the next unblocked package and open a narrowly scoped issue.
2. Inspect actual source and tool versions before choosing commands or dependencies.
3. Write acceptance criteria and identify affected contracts before implementation.
4. Implement a vertical slice; keep unfinished functionality behind a disabled feature flag.
5. Run the smallest meaningful checks; record outcomes, limitations and recovery steps.
6. Update status only when evidence is linked. Never replace a real native/browser integration with a mock and call it complete.

Estimate work after the Chromium bootstrap spike establishes machine costs and integration complexity. No delivery dates are committed by this plan.
