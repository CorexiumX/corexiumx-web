# Website: implementation prompts

Copy one prompt at a time. These prompts do not authorize publishing, signing production releases or purchasing services.

## Repository orientation

> Work only on `corexiumx-web`. Read its plans and the ecosystem feature catalog. Inspect current source, Git status and applicable AGENTS.md. Report which planned components exist and choose the first unblocked work package. Preserve unrelated changes. Do not claim planned APIs or commands are already implemented.

## Task 1: Content contract

> In `corexiumx-web`, implement the smallest complete slice of: Define content types, planned/experimental/shipped labels and navigation. Follow docs/ARCHITECTURE.md and the proposed folder boundaries. First inspect actual dependencies and establish a concrete acceptance check. Required outcome: Every feature claim has a status and source. Cover the meaningful failure path, update documentation, and report changed files, verification results and remaining risks. Do not fabricate successful tests or benchmark results.

## Task 2: Page system

> In `corexiumx-web`, implement the smallest complete slice of: Build responsive pages, accessible navigation and download picker. Follow docs/ARCHITECTURE.md and the proposed folder boundaries. First inspect actual dependencies and establish a concrete acceptance check. Required outcome: Keyboard navigation and mobile layouts work; no fabricated release links. Cover the meaningful failure path, update documentation, and report changed files, verification results and remaining risks. Do not fabricate successful tests or benchmark results.

## Task 3: Release ingestion

> In `corexiumx-web`, implement the smallest complete slice of: Validate version, channel, architecture, checksums and artifact URLs. Follow docs/ARCHITECTURE.md and the proposed folder boundaries. First inspect actual dependencies and establish a concrete acceptance check. Required outcome: Malformed metadata fails build; missing artifacts display unavailable. Cover the meaningful failure path, update documentation, and report changed files, verification results and remaining risks. Do not fabricate successful tests or benchmark results.

## Task 4: Publish pipeline

> In `corexiumx-web`, implement the smallest complete slice of: Add preview, link checking, caching and production deployment procedure. Follow docs/ARCHITECTURE.md and the proposed folder boundaries. First inspect actual dependencies and establish a concrete acceptance check. Required outcome: Preview passes accessibility and broken-link checks before production approval. Cover the meaningful failure path, update documentation, and report changed files, verification results and remaining risks. Do not fabricate successful tests or benchmark results.

## Review

> Review the diff against the work package acceptance criteria. Check security boundaries, accessibility, failure recovery and cross-repository compatibility. Identify actionable defects with file and line references. Distinguish verified behavior from assumptions. Do not mark the stage complete without evidence.
