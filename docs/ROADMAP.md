# Website: repository roadmap

The branded responsive preview, theme selector and pinned asset verification are implemented. The stages below describe the broader website program; release ingestion and publication remain planned. Consult VALIDATION.md for current evidence.

| Stage | Deliverable | Exit evidence |
| --- | --- | --- |
| 1 | Content contract: Define content types, planned/experimental/shipped labels and navigation. | Every feature claim has a status and source. |
| 2 | Page system: Build responsive pages, accessible navigation and download picker. | Keyboard navigation and mobile layouts work; no fabricated release links. |
| 3 | Release ingestion: Validate version, channel, architecture, checksums and artifact URLs. | Malformed metadata fails build; missing artifacts display unavailable. |
| 4 | Publish pipeline: Add preview, link checking, caching and production deployment procedure. | Preview passes accessibility and broken-link checks before production approval. |

Stop promotion on a failed acceptance gate. Split any package too large to review into smaller issues without weakening its exit criteria.
