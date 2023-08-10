import { expect, test } from "@playwright/test";

test("Renders a single node", async ({ page }) => {
  await page.goto("/rtdb-test");
  await expect(page.getByTestId("node-data")).toContainText("Hi Mom");
});

test("Renders a list of nodes for an authenticated user in realtime", async ({
  page,
}) => {
  await page.goto("/rtdb-test");

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByTestId("count")).toContainText("0 posts");
  await page.getByRole("button", { name: "Add Post" }).click();
  await expect(page.getByTestId("count")).toContainText("1 posts");
  await page.getByRole("button", { name: "Add Post" }).click();
  await expect(page.getByTestId("count")).toContainText("2 posts");
  await expect(page.locator("li")).toHaveCount(2);
  await expect(page.locator("li")).toContainText(["RTDB item", "RTDB item"]);
});
