import { expect, test, type Page } from "@playwright/test";

test.describe.serial("Auth", () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/auth-test");
  });

  test("Renders UI conditionally based on auth state", async () => {
    await expect(page.getByText("Signed Out")).toBeVisible();
    await expect(page.getByText("Signed In")).toBeHidden();
  });

  test("User can sign in and out", async () => {
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
    await page.getByRole("button", { name: "Sign In" }).click({delay: 1000});
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();

    await page.getByRole("button", { name: "Sign Out" }).click();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
    await expect(page.getByText("Signed In")).toBeHidden();
  });
});
