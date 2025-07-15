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

  test('interactive demo section works', async ({ page }) => {
    // Scroll to demos section
    await page.locator('#demos').scrollIntoViewIfNeeded();
    
    // Check if demo buttons are present
    const demoButtons = page.locator('button:has-text("Virtual DOM"), button:has-text("Hooks API"), button:has-text("Server Components")');
    await expect(demoButtons.first()).toBeVisible();
    
    // Click on Hooks API demo
    await page.locator('button:has-text("Hooks API")').click();
    
    // Verify content changes
    await expect(page.locator('text=Hooks in Action')).toBeVisible();
  });

  test('code playground toggle works', async ({ page }) => {
    // Find the RTL toggle button
    const rtlButton = page.locator('button:has-text("Toggle RTL")');
    await expect(rtlButton).toBeVisible();
    
    // Click the toggle
    await rtlButton.click();
    
    // Verify the code changes (should contain Arabic text)
    const codeBlock = page.locator('code[dir="rtl"]');
    await expect(codeBlock).toBeVisible();
  });

  test('navigation buttons work', async ({ page }) => {
    // Test Get Started button
    const getStartedBtn = page.locator('a:has-text("Get Started")').first();
    await expect(getStartedBtn).toBeVisible();
    await expect(getStartedBtn).toHaveAttribute('href', '/docs/getting-started');
    
    // Test GitHub button
    const githubBtn = page.locator('a:has-text("View on GitHub")');
    await expect(githubBtn).toBeVisible();
    await expect(githubBtn).toHaveAttribute('href', 'https://github.com/hamroun/frontend-hamroun');
  });

  test('feature cards are interactive', async ({ page }) => {
    // Scroll to features section
    await page.locator('#features').scrollIntoViewIfNeeded();
    
    // Check feature cards
    const featureCards = page.locator('.feature-card-3d');
    await expect(featureCards).toHaveCount(6);
    
    // Hover over first card to test interactivity
    await featureCards.first().hover();
    
    // Verify card content
    await expect(page.locator('text=Lightweight Core')).toBeVisible();
    await expect(page.locator('text=Virtual DOM')).toBeVisible();
  });

  test('counter demo is functional', async ({ page }) => {
    // Scroll to demos section
    await page.locator('#demos').scrollIntoViewIfNeeded();
    
    // Click on Hooks API demo
    await page.locator('button:has-text("Hooks API")').click();
    
    // Find the counter
    const incrementBtn = page.locator('button:has-text("+")');
    const decrementBtn = page.locator('button:has-text("-")');
    const resetBtn = page.locator('button:has-text("Reset")');
    
    await expect(incrementBtn).toBeVisible();
    await expect(decrementBtn).toBeVisible();
    await expect(resetBtn).toBeVisible();
    
    // Test counter functionality
    await incrementBtn.click();
    await expect(page.locator('text=Count: 1')).toBeVisible();
    
    await incrementBtn.click();
    await expect(page.locator('text=Count: 2')).toBeVisible();
    
    await decrementBtn.click();
    await expect(page.locator('text=Count: 1')).toBeVisible();
    
    await resetBtn.click();
    await expect(page.locator('text=Count: 0')).toBeVisible();
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
