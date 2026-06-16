import { test, expect } from '@playwright/test';

test.describe('Animation Regression', () => {
  test.describe('Touch Devices', () => {
    test.use({ hasTouch: true });
    test('custom cursor is hidden on touch devices', async ({ page }) => {
      await page.goto('/');
      await page.locator('.custom-cursor').waitFor({ state: 'attached', timeout: 5000 });
      const display = await page.locator('.custom-cursor').evaluate(el => window.getComputedStyle(el).display);
      expect(display).toBe('none');
    });
  });

  test('hero content is visible after load', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero-content')).toBeVisible();
    await expect(page.locator('.hero-subtitle')).toBeVisible();
  });

  test('scroll reveal elements are present', async ({ page }) => {
    await page.goto('/');
    const reveals = page.locator('.reveal');
    const count = await reveals.count();
    expect(count).toBeGreaterThan(5);
  });

  test('trust bar metrics render', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.trust-bar')).toBeVisible();
    await expect(page.locator('.trust-item')).toHaveCount(4);
  });

  test('horizontal museum section exists', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#universeOuter')).toBeVisible();
    await expect(page.locator('#universeTrack')).toBeVisible();
    await expect(page.locator('.universe-panel')).toHaveCount(9);
  });

  test('countdown timer shows numbers', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.countdown-number')).toHaveCount(4);
    await expect(page.locator('.countdown-clock')).toBeVisible();
  });

  test('navbar renders with logo and navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav-logo')).toBeVisible();
    await expect(page.locator('.nav-links')).toBeVisible();
    await expect(page.locator('.nav-actions')).toBeVisible();
  });

  test('footer renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.footer')).toBeVisible();
  });

  test('brand universe panels click navigate', async ({ page }) => {
    await page.goto('/');
    await page.locator('.universe-panel').first().click();
    await expect(page).toHaveURL(/\/brand\//);
  });

  test('overlay opens and closes', async ({ page }) => {
    await page.goto('/');
    await page.locator('[title="Locker"]').click();
    await expect(page.locator('.overlay-backdrop.active')).toBeVisible();
    await page.locator('.overlay-backdrop.active .overlay-close').click();
    await expect(page.locator('.overlay-backdrop.active')).toBeHidden();
  });
});