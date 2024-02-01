import { test, expect } from "@playwright/test";
const URL = "http://localhost:5173";
test("Should home page have headigns", async ({ page }) => {
    await page.goto(URL);

    // Expect a title "to contain" a substring.
    await expect(
        page.getByRole("link", { name: "MernBooking.com" })
    ).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Find your next stay" })
    ).toBeVisible();
    await expect(
        page.locator("p", {
            hasText: "Search low prices on hotels on your dream vacation",
        })
    ).toBeVisible();

    await expect(
        page.locator("p", { hasText: "Welcome to Home Page" })
    ).toBeVisible();
});

test("Should users be allowed to sign in", async ({ page }) => {
    await page.goto(URL);

    // Click the get started link.
    await page.getByRole("link", { name: "Sign In" }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[type=email]").fill("new7@email.com");
    await page.locator("[type=password]").fill("123456");

    await page.locator("button", { hasText: "Sign In" }).click();

    await expect(page.getByText("Sign in successful")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});
