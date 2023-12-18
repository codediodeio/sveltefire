import { expect, test, type Page } from '@playwright/test';

test.describe.serial("Firestore", () => {
	let page: Page;
	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		await page.goto("/firestore-test");
	});


	test('Renders a single document', async () => {
		await expect(page.getByTestId('doc-data')).toContainText('Hi Mom');
	});

	test('Renders a collection of items for an authenticated user in realtime', async () => {
		await page.getByRole('button', { 'name': 'Sign In'}).click();
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

	test('An error occurs when ', async () => {
		await expect(page.getByTestId('error')).toContainText('Invalid document reference');
	});
});