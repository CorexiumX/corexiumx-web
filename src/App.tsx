import { useState } from 'react'
import type { ReactNode } from 'react'
import tokens from './design/tokens.json'
import './App.css'

type Theme = keyof typeof tokens.themes
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const github = 'https://github.com/CorexiumX'
const concepts = {
  Research: { subtitle: 'Connect the dots, without losing your place.', tabs: ['Research', 'Design', 'Reading list'], cards: ['The bigger picture', 'Notes & discoveries', 'Keep exploring'], label: 'Research workspace', detail: 'Keep source material, notes and a new idea in the same context.', layout: 'research' },
  Design: { subtitle: 'Give every part of your process a place.', tabs: ['Design', 'References', 'Inspiration'], cards: ['A little inspiration', 'Your next direction', 'Design notes'], label: 'Design workspace', detail: 'Bring visual references and your project side by side.', layout: 'design' },
  Focus: { subtitle: 'Less switching. More space for one thing.', tabs: ['Reading', 'Saved for later', 'Notes'], cards: ['Room to focus'], label: 'Focus workspace', detail: 'A quieter, single-pane concept for reading and deep work.', layout: 'focus' },
}
type Concept = keyof typeof concepts
function Icon({ name, className = '' }: { name: 'grid' | 'split' | 'shield' | 'arrow' | 'code' | 'check' | 'plus'; className?: string }) {
  const paths: Record<typeof name, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    split: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M11 4v16m0-8h10" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8.5 11.5 2.5 2.5 4.5-5" /></>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
  }
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [concept, setConcept] = useState<Concept>('Research')
  const selected = concepts[concept]
  function changeTheme(value: Theme) {
    document.documentElement.dataset.theme = value
    setTheme(value)
  }
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5">
        <a className="brand inline-flex items-center gap-2.5" href="#home" aria-label="CorexiumX home">
          <img src={asset('brand/corexiumx-icon.png')} width="38" height="38" alt="" />
          <span>Corexium<span className="accent">X</span><span className="brand-dot">.</span></span>
        </a>
        <nav aria-label="Main navigation" className="flex items-center gap-5 lg:gap-8">
          <a href="#direction">Our direction</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#status">Project status</a>
        </nav>
        <label className="theme-picker flex items-center gap-2">Theme
          <select value={theme} onChange={(event) => changeTheme(event.target.value as Theme)}>
            <option value="dark">Dark</option><option value="light">Light</option><option value="high-contrast">High contrast</option>
          </select>
        </label>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="hero shell grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="preview-label inline-flex items-center gap-2"><span className="status-dot" /> AN OPEN BROWSER PROJECT <span className="label-divider">/</span> DEVELOPMENT PREVIEW</p>
            <h1 id="hero-title">Your web.<br />A little more<br /><span className="accent">in focus.</span></h1>
            <p className="intro">A workspace for your web. CorexiumX is exploring a calmer way to browse—where your projects, pages and ideas have room to come together.</p>
            <div className="hero-actions flex flex-wrap items-center gap-5">
              <a className="button inline-flex items-center gap-4" href="#direction">Explore the direction <Icon name="arrow" /></a>
              <a className="text-link inline-flex items-center gap-2" href="#status">See what’s ready <span aria-hidden="true">↗</span></a>
            </div>
            <p className="release-note flex items-center gap-2"><span className="small-dot" /> In development · No public browser download yet</p>
          </div>
          <figure className="brand-art relative">
            <div className="art-frame"><img src={asset('brand/corexiumx.png')} width="1254" height="1254" alt="CorexiumX logo: glossy blue and cyan CX ribbons surrounding a globe" fetchPriority="high" /></div>
            <div className="art-tag art-tag-top"><Icon name="grid" /><span>A place for every project</span></div>
            <div className="art-tag art-tag-bottom"><span className="status-dot" /><span>More room. Fewer loose ends.</span></div>
            <figcaption>COREXIUMX <span>INDEPENDENT THINKING. CONNECTED WEB.</span></figcaption>
          </figure>
        </section>

        <div className="principles-strip"><div className="shell grid grid-cols-1 gap-4 sm:grid-cols-3">
          <p><Icon name="grid" /> Organized around your work</p><p><Icon name="split" /> Designed for a wider view</p><p><Icon name="shield" /> Clear choices, by design</p>
        </div></div>

        <section className="section-space shell direction" id="direction" aria-labelledby="direction-title">
          <div className="section-heading flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="eyebrow">01 / THE DIRECTION</p><h2 id="direction-title">Less tab chaos.<br />More room to think.</h2></div>
            <p className="section-intro">Your browser should make it easier to stay with an idea. These are planned browser capabilities, not features available in this preview.</p>
          </div>
          <ol className="feature-list grid gap-5 md:grid-cols-3">
            {[
              { icon: 'grid' as const, title: 'Work in context', copy: 'A workspace for the project. Another for everything else.', detail: 'Named workspaces, reusable templates and session recovery are planned to help you return to what matters.', note: 'Workspaces & sessions' },
              { icon: 'split' as const, title: 'See the bigger picture', copy: 'Keep a reference open. Make room for a second perspective.', detail: 'Explore six to sixteen browsing panes, with resizing and keyboard traversal. Smaller-display behavior is part of the plan.', note: 'Flexible split views' },
              { icon: 'shield' as const, title: 'Understand your controls', copy: 'Know what a site can do. Decide what works for you.', detail: 'Clear protection states, site exceptions and explicit permission choices, with compatibility and privacy checks before release.', note: 'Privacy & permissions' },
            ].map((feature, i) => <li className="feature-card flex flex-col" key={feature.title}>
              <div className="flex items-center justify-between"><span className="feature-icon"><Icon name={feature.icon} /></span><span className="feature-number">0{i + 1}</span></div>
              <p className="feature-kicker">{feature.note}</p><h3>{feature.title}</h3><p className="feature-lead">{feature.copy}</p><p className="feature-detail">{feature.detail}</p><span className="status">Planned</span>
            </li>)}
          </ol>
        </section>

        <section className="workspace-section section-space" aria-labelledby="workspace-title">
          <div className="shell">
            <div className="section-heading flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">02 / A DIFFERENT PERSPECTIVE</p><h2 id="workspace-title">Find your kind of flow.</h2></div><p className="section-intro">Try a few workspace concepts below. This is an interactive illustration of the direction, not a working browser.</p></div>
            <div className="concept-controls flex flex-wrap items-center justify-between gap-4"><div className="preset-switch flex flex-wrap gap-1" role="group" aria-label="Workspace concepts">{(Object.keys(concepts) as Concept[]).map((name) => <button type="button" key={name} aria-pressed={concept === name} onClick={() => setConcept(name)}>{name}</button>)}</div><p className="concept-badge"><span className="small-dot" /> INTERACTIVE CONCEPT</p></div>
            <div className="browser-concept" role="region" aria-label={selected.label}>
              <div className="browser-toolbar flex items-center gap-4"><div className="window-dots flex gap-1.5" aria-hidden="true"><i /><i /><i /></div><span className="concept-address">Your space, connected.</span><Icon name="plus" /></div>
              <div className="browser-body grid"><aside className="concept-sidebar"><p className="sidebar-wordmark">C<span className="accent">X</span><span className="sidebar-title"> / YOUR SPACE</span></p><p className="sidebar-label">WORKSPACES</p>{selected.tabs.map((tab, i) => <div className={`sidebar-item ${i === 0 ? 'is-current' : ''}`} key={tab}><Icon name="grid" /><span>{tab}</span>{i === 0 && <span className="sidebar-count">{selected.cards.length}</span>}</div>)}<p className="sidebar-foot"><Icon name="shield" /> A concept. Your control.</p></aside>
              <div className="concept-canvas"><div className="canvas-heading"><p className="eyebrow">A LITTLE SPACE TO MAKE PROGRESS</p><h3>{selected.subtitle}</h3></div><div className={`concept-panes ${selected.layout}`}>{selected.cards.map((card, i) => <div className={`concept-pane pane-${i}`} key={card}><div className="pane-bar"><span className="small-dot" />{card}<span aria-hidden="true">↗</span></div><div className="pane-content">{i === 0 ? <><span className="mini-eyebrow">THE SPACE BETWEEN IDEAS</span><div className="concept-orbit" aria-hidden="true"><div /><span>cx</span></div><h4>{concept === 'Focus' ? 'One thing at a time.' : 'Start with a little curiosity.'}</h4><p>A thought. A reference. A new connection.</p></> : <><span className="mini-eyebrow">{i === 1 ? 'CONNECT YOUR THINKING' : 'SAVE A LITTLE INSPIRATION'}</span><div className="mock-line w-3/4" /><div className="mock-line w-full" /><div className="mock-line w-1/2" /><div className="note-block"><span className="accent">{i === 1 ? '↗' : '✳'}</span><p>{i === 1 ? 'Good ideas need room to grow.' : 'Pick up where curiosity takes you.'}</p></div></>}</div></div>)}</div></div></div>
            </div>
            <div className="concept-caption flex flex-col justify-between gap-3 sm:flex-row"><p aria-live="polite"><strong>{concept}:</strong> {selected.detail}</p><span>Illustrative layout · Browser features planned</span></div>
          </div>
        </section>

        <section className="section-space shell" id="roadmap" aria-labelledby="roadmap-title">
          <div className="section-heading flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">03 / THE ROAD AHEAD</p><h2 id="roadmap-title">A clear direction.<br />One careful step at a time.</h2></div><p className="section-intro">Progress is measured by what can be verified. These grouped milestones describe the plan, without promising release dates.</p></div>
          <ol className="roadmap-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['01', 'Foundation', 'M0–M2', 'Engine decisions, a branded native window and the essentials of daily browsing.', 'Navigation, profiles & recovery'],
              ['02', 'Room to work', 'M3–M4', 'Real multi-origin panes, flexible layouts and named workspaces.', 'Keyboard access & persistence'],
              ['03', 'Trust & distribution', 'M5–M6', 'Privacy controls, extension evaluation and authenticated distribution.', 'Compatibility & signed packages'],
              ['04', 'Desktop qualification', 'M7–M8', 'Platform testing, accessibility, resource tuning and a stable baseline.', 'Evidence & release readiness'],
            ].map(([number, title, phase, copy, gate]) => <li key={number}><div className="roadmap-marker flex items-center gap-3"><span>{number}</span><div /></div><p className="roadmap-phase">{phase} / PLANNED</p><h3>{title}</h3><p className="roadmap-copy">{copy}</p><p className="roadmap-gate"><Icon name="check" />{gate}</p></li>)}
          </ol><a className="text-link inline-flex items-center gap-2 mt-8" href={`${github}/corexiumx-docs/blob/main/product/ROADMAP.md`}>Read the full roadmap <Icon name="arrow" /></a>
        </section>

        <section className="shell project-status grid gap-10 lg:grid-cols-2" id="status" aria-labelledby="status-title">
          <div><p className="eyebrow">04 / BUILT IN THE OPEN</p><h2 id="status-title">Design first.<br />Evidence before release.</h2><p className="status-intro">A useful browser takes more than a good first impression. Here’s what this preview delivers, and what still needs to earn its place.</p><a className="text-link inline-flex items-center gap-2" href={`${github}/corexiumx-web`}><Icon name="code" /> Explore the website source <span aria-hidden="true">↗</span></a></div>
          <div className="status-panel"><div className="flex items-center justify-between gap-4"><h3>Where things stand</h3><span className="preview-chip">Development preview</span></div><dl><div><dt>Design foundation</dt><dd><span className="status-dot" />Implemented</dd></div><div><dt>Browser capabilities</dt><dd>Planned</dd></div><div><dt>Public downloads</dt><dd>Unavailable</dd></div></dl><p className="release-note">Download links will appear only when verified release artifacts are available. Desktop targets are macOS, Windows and Linux; platform qualification is still planned.</p></div>
        </section>

        <section className="section-space shell faq-section grid gap-8 lg:grid-cols-[.75fr_1.25fr]" aria-labelledby="faq-title">
          <div><p className="eyebrow">A FEW THINGS TO KNOW</p><h2 id="faq-title">Good questions.<br />Clear answers.</h2><p className="faq-intro">A little context before you explore further.</p></div><div className="faq-list">
            {[
              ['Can I use CorexiumX as my browser today?', 'Not yet. This website is a development preview of the design and product direction. It does not run the native browser, and there is no public browser download available.'],
              ['What does the workspace preview actually do?', 'Switch between Research, Design and Focus to explore illustrative arrangements. It changes this website’s concept layout only. It does not load websites, save sessions or implement browser isolation.'],
              ['Which platforms are planned?', 'The desktop targets are macOS on Apple silicon and Intel, Windows x64 and Linux x64. Each OS and architecture needs separate qualification before support can be claimed. Mobile is outside the initial desktop plan.'],
              ['What about privacy and performance?', 'Privacy controls and resource-aware browsing are planned requirements. Protection behavior, compatibility and performance need reproducible testing before release. This preview makes no speed, memory or tracking-protection claims.'],
              ['Where can I follow the project?', 'Explore the CorexiumX organization on GitHub, read the documented roadmap or review this website’s source. Release information will be linked here when verified packages are available.'],
            ].map(([question, answer]) => <details key={question}><summary>{question}<Icon name="plus" /></summary><p>{answer}</p></details>)}
          </div>
        </section>
        <section className="closing shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><p className="eyebrow">FOLLOW THE POSSIBILITIES</p><h2>The next chapter is open.</h2><p>Explore the work. Read the plans. Follow what comes next.</p></div><a className="button inline-flex items-center gap-5" href={github}>Explore on GitHub <Icon name="arrow" /></a></section>
      </main>
      <footer className="shell"><div className="footer-top flex flex-wrap items-center justify-between gap-6"><a className="brand" href="#home">Corexium<span className="accent">X</span>.</a><div className="flex flex-wrap gap-6"><a href={`${github}/corexiumx-docs`}>Documentation <span aria-hidden="true">↗</span></a><a href={github}>GitHub <span aria-hidden="true">↗</span></a><a href="#main">Back to top ↑</a></div></div><div className="footer-bottom flex flex-wrap justify-between gap-3"><p>By OpenCorex · Development preview</p><p>Thoughtfully connected. Still taking shape.</p></div></footer>
    </>
  )
}
export default App
