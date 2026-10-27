# Website: architecture

## Data and control flow

Reviewed content and public release metadata → build-time validation → static pages → CDN. Download links resolve to platform-specific immutable release artifacts.

## Integration boundary

Updater publishes public download metadata; build produces signed artifacts; docs supplies guides; design supplies assets; benchmarks supplies reviewable results.

## Contracts

Changes crossing repository boundaries require a versioned schema or documented API, compatibility policy, owner, example and failure behavior. Consumers pin producer revisions or artifact versions. Reject unknown major versions instead of guessing their meaning.

## Security boundary

Treat web content, downloaded artifacts, extension input and remote metadata as untrusted. Native privileges require explicit validation. Keep secrets outside source and unsigned artifacts. Logs must omit browsing content, access tokens and private profile paths. Optional network services require a visible activation decision and a data inventory.

## Reliability

Persist user state atomically with a schema version and recoverable previous snapshot. Treat timeouts, unavailable services, malformed input and partial writes as normal failure cases. Keep feature flags and local recovery paths available without a remote control service.

## Decision needed before implementation

Confirm component interfaces against the selected Chromium revision. Record alternatives and maintenance cost in a decision record before adding a new framework or external service.
