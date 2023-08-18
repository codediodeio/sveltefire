import { expect, test, type Page } from "@playwright/test";

test.describe.serial("Storage", () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/storage-test");
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Renders download links", async () => {
    await page.waitForSelector('[data-testid="download-link"]');
    const linksCount = await page.getByTestId("download-link").count();
    expect(linksCount).toBeGreaterThan(0);
  });

  test("Uploads a file", async () => {
    await page.getByRole("button", { name: "Make File" }).click();
    await expect(page.getByTestId("progress")).toContainText("100% uploaded");
    await expect(page.getByTestId("download-link2")).toContainText(
      "test-upload.txt"
    );
  });
});
