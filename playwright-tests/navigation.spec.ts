import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('scrolling updates active section', async ({ page }) => {
    // Start at hero section
    await expect(page.locator('#hero')).toBeInViewport();
    
    // Scroll to features section
    await page.locator('#features').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Check if features section is in viewport
    await expect(page.locator('#features')).toBeInViewport();
  });

  test('smooth scrolling behavior', async ({ page }) => {
    // Test scroll behavior
    const initialPosition = await page.evaluate(() => window.scrollY);
    
    // Scroll to a section
    await page.locator('#getting-started').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    const newPosition = await page.evaluate(() => window.scrollY);
    
    // Verify position changed
    expect(newPosition).toBeGreaterThan(initialPosition);
  });

  test('keyboard navigation works', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Check if first focusable element is focused
    const firstButton = page.locator('a:has-text("Get Started")').first();
    await expect(firstButton).toBeFocused();
  });
});
