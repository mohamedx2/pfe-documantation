import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Frontend Hamroun/);
    await expect(page.locator('h1')).toContainText('Frontend Hamroun');
  });

  test('displays main navigation elements', async ({ page }) => {
    // Check for main sections
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#demos')).toBeVisible();
    await expect(page.locator('#getting-started')).toBeVisible();
    await expect(page.locator('#features')).toBeVisible();
  });

  test('navigation buttons work', async ({ page }) => {
    // Test Get Started button
    const getStartedBtn = page.locator('a:has-text("Get Started")').first();
    await expect(getStartedBtn).toBeVisible();
    await expect(getStartedBtn).toHaveAttribute('href', '/docs/getting-started');
    
    // Test GitHub button
    const githubBtn = page.locator('a:has-text("View on GitHub")');
    await expect(githubBtn).toBeVisible();
    await expect(githubBtn).toHaveAttribute('href', 'https://github.com/mohamedx2/front-package');
  });

  test('responsive design on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if content is still accessible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Get Started')).toBeVisible();
    
    // Check if navigation adapts to mobile
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();
  });
});
