import { expect, test } from '@playwright/test';


test('Renders download links', async ({ page }) => {
	await page.goto('/storage-test');
	await page.waitForSelector('[data-testid="download-link"]');
	const linksCount = await page.getByTestId('download-link').count()
	expect( linksCount ).toBeGreaterThan(0);
});

test.only('Uploads a file', async ({ page }) => {
	await page.goto('/storage-test');
	await page.getByRole('button', { name: 'Make File' }).click();
	await expect(page.getByTestId('progress')).toContainText('100% uploaded');
	await expect(page.getByTestId('download-link2')).toContainText('test-upload.txt');
});