import { expect, test } from '@playwright/test';


test('Renders download links', async ({ page }) => {
	await page.goto('/storage-test');
	await page.waitForSelector('[data-testid="download-link"]');
	const linksCount = await page.getByTestId('download-link').count()
	expect( linksCount ).toBeGreaterThan(0);
});

