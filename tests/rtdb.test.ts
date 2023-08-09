import { expect, test } from "@playwright/test";

test("Renders a single node", async ({ page }) => {
  await page.goto("/rtdb-test");
  await expect(page.getByTestId("node-data")).toContainText("Hi Mom");
});

test("Renders a list of nodes for an authenticated user in realtime", async ({
  page,
}) => {
  await page.goto("/rtdb-test");

  await page.click("text=Sign In");
  await expect(page.getByTestId("count")).toContainText("0 posts");
  (await page.waitForSelector("text=Add Post")).click();
  await expect(page.getByTestId("count")).toContainText("1 posts");
  (await page.waitForSelector("text=Add Post")).click();
  await expect(page.getByTestId("count")).toContainText("2 posts");
  expect((await page.$$("li")).length).toBe(2);
  expect(await page.textContent("li")).toContain("RTDB item");
});
