import { test, expect } from "@playwright/test";

test.describe("home", () => {
  test("mostra il titolo del portale", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Soli Dome", { exact: true })).toBeVisible();
  });

  test("barra di ricerca è utilizzabile", async ({ page }) => {
    await page.goto("/");
    const search = page.getByPlaceholder("Cerca un'app...").first();
    await expect(search).toBeVisible();
    await search.fill("GitHub");
    await expect(search).toHaveValue("GitHub");
  });
});
