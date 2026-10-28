import { test, expect } from '@playwright/test'
import tokens from '../../src/design/tokens.json' with { type: 'json' }

const rgb = (hex: string) => `rgb(${[1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16)).join(', ')})`

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

test('brand artwork and favicon load without runtime errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.reload()
  await expect(page).toHaveTitle('CorexiumX — A workspace for your web')
  const images = page.locator('img')
  await expect(images).toHaveCount(2)
  for (const image of await images.all()) {
    await expect(image).toBeVisible()
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true)
  }
  const favicon = await page.locator('link[rel="icon"]').getAttribute('href')
  expect(favicon).toBeTruthy()
  const response = await page.request.get(favicon!)
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('image/png')
  expect(errors).toEqual([])
})

for (const [theme, colors] of Object.entries(tokens.themes)) {
  test(`${theme} theme changes rendered colors and resets on reload`, async ({ page }) => {
    const picker = page.getByRole('combobox', { name: 'Theme', exact: true })
    await picker.selectOption(theme)
    await expect(picker).toHaveValue(theme)
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    await expect(page.locator('html')).toHaveCSS('background-color', rgb(colors.canvas))
    await expect(page.locator('h1')).toHaveCSS('color', rgb(colors.text))
    await expect(page.getByRole('link', { name: 'Explore the direction' })).toHaveCSS('background-color', rgb(colors.accent))
    await page.reload()
    await expect(picker).toHaveValue('dark')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })
}

test('navigation and calls to action reach their sections', async ({ page }) => {
  for (const [name, id] of [
    ['Our direction', 'direction'],
    ['Project status', 'status'],
    ['CorexiumX home', 'home'],
    ['Explore the direction', 'direction'],
    ['See what’s ready', 'status'],
    ['Back to top ↑', 'main'],
  ]) {
    await page.getByRole('link', { name, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`#${id}$`))
    await expect(page.locator(`#${id}`)).toBeInViewport()
  }
})

test('keyboard skip link and theme control remain usable with visible focus', async ({ page }) => {
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
  await expect(skip).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Explore the direction' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  const picker = page.getByRole('combobox', { name: 'Theme', exact: true })
  await expect(picker).toBeFocused()
  await expect(picker).toHaveCSS('outline-style', 'solid')
  await expect(picker).toHaveCSS('outline-width', '3px')
  // Native select type-ahead uses the keyboard, rather than a scripted state change.
  await picker.press('l')
  await picker.press('Enter')
  await expect(picker).toHaveValue('light')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('development status does not advertise browser downloads', async ({ page }) => {
  await expect(page.getByText('In development · No public browser download yet')).toBeVisible()
  await expect(page.locator('.feature-list .status')).toHaveText(['Planned', 'Planned', 'Planned'])
  await expect(page.locator('dl > div').filter({ hasText: 'Public downloads' })).toContainText('Unavailable')
  await expect(page.getByRole('link', { name: /download/i })).toHaveCount(0)
})

test('narrow and tablet layouts fit the viewport and retain usable controls', async ({ page }) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    const picker = page.getByRole('combobox', { name: 'Theme', exact: true })
    await expect(picker).toBeInViewport()
    const box = await picker.boundingBox()
    expect(box!.height).toBeGreaterThanOrEqual(44)
    const art = await page.locator('.brand-art').boundingBox()
    const copy = await page.locator('.hero-copy').boundingBox()
    if (width <= 640) expect(art!.y).toBeGreaterThanOrEqual(copy!.y + copy!.height)
  }
})

test('workspace concepts switch layouts and announce the selected context', async ({ page }) => {
  const controls = page.getByRole('group', { name: 'Workspace concepts' })
  for (const [name, panes] of [['Design', 3], ['Focus', 1], ['Research', 3]] as const) {
    const button = controls.getByRole('button', { name, exact: true })
    await button.click()
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await expect(controls.locator('[aria-pressed="true"]')).toHaveCount(1)
    const preview = page.getByRole('region', { name: `${name} workspace` })
    await expect(preview.locator('.concept-pane')).toHaveCount(panes)
    await expect(page.locator('[aria-live="polite"]')).toContainText(`${name}:`)
  }
  await controls.getByRole('button', { name: 'Focus', exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('region', { name: 'Focus workspace' })).toBeVisible()
})

test('FAQ answers open with the keyboard and explain release limitations', async ({ page }) => {
  const question = page.locator('summary').filter({ hasText: 'Can I use CorexiumX as my browser today?' })
  await question.focus()
  await page.keyboard.press('Enter')
  const answer = page.locator('details[open]')
  await expect(answer).toContainText('no public browser download available')
  await page.keyboard.press('Enter')
  await expect(page.locator('details[open]')).toHaveCount(0)
})

test('expanded content and concepts remain usable at narrow widths', async ({ page }) => {
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    for (const name of ['Research', 'Design', 'Focus']) {
      await page.getByRole('group', { name: 'Workspace concepts' }).getByRole('button', { name, exact: true }).click()
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    }
  }
  await page.getByRole('link', { name: 'Roadmap', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'A clear direction. One careful step at a time.' })).toBeInViewport()
})
