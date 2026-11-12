import dotenv from "dotenv";
import { defineConfig, devices } from "@playwright/test";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  timeout: 60_000,

  expect: {
    timeout: 15_000,
  },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL || "https://demoqa.com/",

    headless: !!process.env.CI,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "on-first-retry",

    navigationTimeout: 45_000,

    actionTimeout: 15_000,

    ...devices["Desktop Chrome"],
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    },
  ],
});
