import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

for (const theme of ['dark', 'light', 'high-contrast']) {
  test(`${theme} has no automated WCAG A/AA or best-practice violations`, async ({ page }, testInfo) => {
    await page.goto('/')
    await page.getByRole('combobox', { name: 'Theme', exact: true }).selectOption(theme)
    await page.evaluate(() => document.fonts.ready)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze()
    await testInfo.attach(`axe-${theme}`, { body: JSON.stringify(results, null, 2), contentType: 'application/json' })
    expect(results.violations).toEqual([])
  })
}

test('reduced motion removes the button transition', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Explore the direction' })).toHaveCSS('transition-duration', '0s')
})

test('forced colors retains keyboard focus and control boundaries', async ({ page }, testInfo) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await expect(page.getByRole('link', { name: 'Skip to content' })).toHaveCSS('outline-style', 'solid')
  const picker = page.getByRole('combobox', { name: 'Theme', exact: true })
  await expect(picker).toHaveCSS('border-top-style', 'solid')
  for (const theme of ['dark', 'light', 'high-contrast']) {
    await picker.selectOption(theme)
    const results = await new AxeBuilder({ page }).analyze()
    await testInfo.attach(`axe-forced-colors-${theme}`, { body: JSON.stringify(results, null, 2), contentType: 'application/json' })
    expect(results.violations).toEqual([])
  }
})
