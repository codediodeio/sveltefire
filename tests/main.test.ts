import { expect, test } from "@playwright/test";

test("SvelteFire app initializes properly", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Welcome to SvelteFire");
});

test("Firebase SDK context is defined via FirebaseApp component", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("auth")).toContainText("true");
  await expect(page.getByTestId("firestore")).toContainText("true");
  await expect(page.getByTestId("storage")).toContainText("true");
});
