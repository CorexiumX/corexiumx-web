import { defineConfig, devices } from '@playwright/test'

const basePath = process.env.TEST_BASE_PATH || '/'
const previewURL = `http://127.0.0.1:4173${basePath}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  globalTimeout: 10 * 60 * 1000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: previewURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `pnpm exec vite preview --host 127.0.0.1 --port 4173 --strictPort --base ${basePath}`,
    url: previewURL,
    reuseExistingServer: false,
    timeout: 30_000,
  },
})
