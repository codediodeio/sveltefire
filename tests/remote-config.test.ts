import { expect, test, type Page } from "@playwright/test";

test.describe.serial("Remote Config", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/remote-config-test");
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Displays default values", async () => {
    await expect(page.getByTestId('string-config')).toContainText('Hello World');
    await expect(page.getByTestId('number-config')).toContainText('123.456');
    await expect(page.getByTestId('value-config')).toContainText('default');
    await expect(page.getByTestId('boolean-config')).toContainText('true');
  });
});
