// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  // One complete test can run for a maximum of 30 seconds.
  timeout: 60_000,
  // Playwright assertions can wait up to 5 seconds for the expected state.
  expect: {
    timeout: 5_000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://www.saucedemo.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // Save a screenshot only when a test fails.
    screenshot: 'only-on-failure',

    // Keep video only when a test fails.
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project.
    // Runs authentication once and saves the storage state.
    // Setup project to authenticate a standard user before running tests.
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
    },

    // Auth tests in Chromium.
    // These tests must NOT use saved authentication,
    // Setup project to run authentication tests without any preloaded storage state.
    {
      name: 'auth-chromium',
      testMatch: /auth\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: undefined,
      },
    },

    // Auth tests in Firefox.
    {
      name: 'auth-firefox',
      testMatch: /auth\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Firefox'],
        storageState: undefined,
      },
    },

    // Auth tests in WebKit.
    {
      name: 'auth-webkit',
      testMatch: /auth\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Safari'],
        storageState: undefined,
      },
    },

    // Business tests in Chromium.
    // Auth tests are ignored here.
    {
      name: 'chromium',
      testIgnore: /auth\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        // Reuse the authentication state created by the setup project.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // Business tests in Firefox.
    {
      name: 'firefox',
      testIgnore: /auth\/.*\.spec\.js/,

      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },

      dependencies: ['setup'],
    },

    // Business tests in WebKit.
    {
      name: 'webkit',
      testIgnore: /auth\/.*\.spec\.js/,

      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json',
      },

      dependencies: ['setup'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

