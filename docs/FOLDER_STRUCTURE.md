# Proposed folder structure

This task creates documentation only. A React/Vite scaffold was detected concurrently; preserve its existing files and adapt the proposed paths below rather than restructuring it. The paths below describe future implementation boundaries; create them when code or assets actually exist.

```text
corexiumx-web/
├── public/images/
├── public/icons/
├── src/pages/features/
├── src/pages/split-screen/
├── src/pages/performance/
├── src/pages/privacy/
├── src/pages/download/
├── src/pages/releases/
├── src/pages/roadmap/
├── src/pages/about/
├── src/pages/open-source/
├── src/components/layout/
├── src/components/downloads/
├── src/components/ui/
├── src/lib/releases/
├── src/content/
├── tests/e2e/
├── docs/                  # local plans and implementation decisions
└── README.md
```

## Placement rules

Keep public contracts separate from implementation. Tests follow the component they exercise and use deterministic fixtures. Generated artifacts and machine-specific configuration stay untracked unless explicitly selected as release evidence. Never commit credentials or an upstream Chromium checkout. Platform adapters contain OS-specific behavior; shared policy remains testable without a GUI.
