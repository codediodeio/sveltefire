import { expect, test } from '@playwright/test';

test('Renders a single document', async ({ page }) => {
	await page.goto('/firestore-test');
	await expect(page.getByTestId('doc-data')).toContainText('Hi Mom');
});

test('Renders a collection of items for an authenticated user in realtime', async ({ page }) => {
	await page.goto('/firestore-test');
	await page.getByRole('button', { 'name': 'Sign In'}).click({delay: 1000});
	await expect(page.getByTestId('count')).toContainText('0 posts');
	await page.getByRole('button', { name: 'Add Post' }).click();
	await expect(page.getByTestId('count')).toContainText('1 posts');
	await page.getByRole('button', { name: 'Add Post' }).click();
	await expect(page.getByTestId('count')).toContainText('2 posts');
	await expect(page.locator('li')).toHaveCount(2);
	await expect(page.locator('li')).toContainText([
		'firestore item',
		'firestore item'
	]);
});
