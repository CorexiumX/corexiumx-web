import { useState } from 'react'
import tokens from './design/tokens.json'
import './App.css'

type Theme = keyof typeof tokens.themes
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  function changeTheme(value: Theme) {
    document.documentElement.dataset.theme = value
    setTheme(value)
  }
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="CorexiumX home">
          <img src={asset('brand/corexiumx-icon.png')} width="48" height="48" alt="" />
          <span>Corexium<span className="accent">X</span></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#direction">Our direction</a>
          <a href="#status">Project status</a>
        </nav>
        <label className="theme-picker">Theme
          <select value={theme} onChange={(event) => changeTheme(event.target.value as Theme)}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="high-contrast">High contrast</option>
          </select>
        </label>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">COREXIUMX BY OPENCOREX</p>
            <h1 id="hero-title">A workspace<br />for your <span className="accent">web.</span></h1>
            <p className="intro">A browser project exploring a more organized way to browse, with workspaces, split views and clear privacy controls.</p>
            <div className="hero-actions"><a className="button" href="#direction">Explore the direction <span aria-hidden="true">↗</span></a><a href="#status">See what’s ready</a></div>
            <p className="release-note">In development · No public browser download yet</p>
          </div>
          <figure className="brand-art">
            <img src={asset('brand/corexiumx.png')} width="1254" height="1254" alt="CorexiumX logo: glossy blue and cyan CX ribbons surrounding a globe" fetchPriority="high" />
            <figcaption>One identity. A world of possibilities.</figcaption>
          </figure>
        </section>
        <section className="direction" id="direction" aria-labelledby="direction-title">
          <div className="section-heading"><p className="eyebrow">THE DIRECTION</p><h2 id="direction-title">More room to think.</h2><p>These are planned browser capabilities, not features available in this preview.</p></div>
          <ol className="feature-list">
            <li><span className="feature-number">01</span><div><h3>Work in context</h3><p>Organize tabs into workspaces so each project has a place.</p></div><span className="status">Planned</span></li>
            <li><span className="feature-number">02</span><div><h3>See the bigger picture</h3><p>Explore six to sixteen browsing panes, with resizing and keyboard traversal.</p></div><span className="status">Planned</span></li>
            <li><span className="feature-number">03</span><div><h3>Understand your controls</h3><p>Clear protection states, site exceptions and explicit permission choices.</p></div><span className="status">Planned</span></li>
          </ol>
        </section>
        <section className="project-status" id="status" aria-labelledby="status-title">
          <div><p className="eyebrow">BUILT IN THE OPEN</p><h2 id="status-title">Design first.<br />Evidence before release.</h2></div>
          <div><p>The brand assets and theme tokens are implemented. This website previews that design foundation; browser functionality and platform qualification are still ahead.</p><dl><div><dt>Design foundation</dt><dd>Implemented</dd></div><div><dt>Browser capabilities</dt><dd>Planned</dd></div><div><dt>Public downloads</dt><dd>Unavailable</dd></div></dl><p className="release-note">Download links will appear only when verified release artifacts are available.</p></div>
        </section>
      </main>
      <footer><a className="brand" href="#home">Corexium<span className="accent">X</span></a><p>By OpenCorex · Development preview</p><a href="#main">Back to top ↑</a></footer>
    </>
  )
}
export default App
