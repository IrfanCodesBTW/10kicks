import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads and renders hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.nav')).toBeVisible();
    await expect(page.locator('.hero-line')).toHaveCount(2);
  });

  test('nav links navigate correctly', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-links a').filter({ hasText: 'Brands' }).click();
    await expect(page).toHaveURL(/\/brands/);
  });

  test('brand directory page renders brand cards', async ({ page }) => {
    await page.goto('/brands');
    await expect(page.locator('.brand-dir-card')).toHaveCount(9);
  });

  test('brand detail page loads', async ({ page }) => {
    await page.goto('/brand/nike');
    await expect(page.locator('.brand-detail-page')).toBeVisible();
  });

  test('mobile nav bottom bar is visible on small viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('.mob-nav')).toBeVisible();
  });

  test('desktop nav is hidden on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('.nav-links')).toBeHidden();
  });
});