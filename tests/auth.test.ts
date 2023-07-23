import { expect, test } from '@playwright/test';

test('Renders UI conditionally based on auth state', async ({ page }) => {
	await page.goto('/auth-test');
	expect( page.getByText('Signed In')).not.toBeVisible();
    expect( page.getByText('Signed Out')).toBeVisible();
});

test('User can sign in and out', async ({ page }) => {
	await page.goto('/auth-test');
    
	await page.click('text=Sign In');
    await page.waitForSelector('text=Sign Out');
    await expect( page.getByText('Signed In')).toBeVisible();

    await page.click('text=Sign Out');
    await page.waitForSelector('text=Sign In');
    await expect( page.getByText('Signed In')).not.toBeVisible();
});

