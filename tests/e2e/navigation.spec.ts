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
    await page.waitForTimeout(500); // Wait for scroll to complete
    
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

  test('hash navigation works', async ({ page }) => {
    // Navigate to features section via hash
    await page.goto('/#features');
    
    // Verify we're at the features section
    await expect(page.locator('#features')).toBeInViewport();
  });

  test('back to top functionality', async ({ page }) => {
    // Scroll down to bottom
    await page.locator('#cta').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Scroll back to top
    await page.keyboard.press('Home');
    await page.waitForTimeout(500);
    
    // Verify we're back at hero
    await expect(page.locator('#hero')).toBeInViewport();
  });
});
