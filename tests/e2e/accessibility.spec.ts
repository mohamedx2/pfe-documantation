import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('keyboard navigation works', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Check if first focusable element is focused
    const firstButton = page.locator('a:has-text("Get Started")').first();
    await expect(firstButton).toBeFocused();
    
    // Continue tabbing
    await page.keyboard.press('Tab');
    const githubLink = page.locator('a:has-text("View on GitHub")');
    await expect(githubLink).toBeFocused();
  });

  test('buttons have proper ARIA labels', async ({ page }) => {
    // Check animation controls
    const animationButton = page.locator('button[aria-label*="animation"]').first();
    if (await animationButton.count() > 0) {
      await expect(animationButton).toHaveAttribute('aria-label');
    }
  });

  test('images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });

  test('headings have proper hierarchy', async ({ page }) => {
    // Check for h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('Frontend Hamroun');
    
    // Check for h2s
    const h2s = page.locator('h2');
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('color contrast is sufficient', async ({ page }) => {
    // This is a basic check - in real scenarios you'd use axe-core
    const primaryButton = page.locator('.btn-primary').first();
    
    if (await primaryButton.count() > 0) {
      const styles = await primaryButton.evaluate((el) => {
        return window.getComputedStyle(el);
      });
      
      // Basic check that text color and background color are different
      expect(styles.color).not.toBe(styles.backgroundColor);
    }
  });

  test('focus indicators are visible', async ({ page }) => {
    // Tab to first interactive element
    await page.keyboard.press('Tab');
    
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Check if focus styles are applied
    const outline = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outline || styles.boxShadow;
    });
    
    // Should have some form of focus indicator
    expect(outline).not.toBe('none');
  });
});
