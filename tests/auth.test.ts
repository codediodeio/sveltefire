import { expect, test, type Page } from "@playwright/test";

test.describe("Auth", () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/auth-test");
  });

  test("Renders UI conditionally based on auth state", async () => {
    expect(page.getByText("Signed In")).not.toBeVisible();
    expect(page.getByText("Signed Out")).toBeVisible();
  });

  test("User can sign in and out", async () => {
    await page.click("text=Sign In");
    await page.waitForSelector("text=Sign Out");
    await expect(page.getByText("Signed In")).toBeVisible();

    await page.click("text=Sign Out");
    await page.waitForSelector("text=Sign In");
    await expect(page.getByText("Signed In")).not.toBeVisible();
  });
});
