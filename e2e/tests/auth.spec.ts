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

test("Should users be allowed to register", async ({ page }) => {
    const symbols = "@#%&!$";
    const letters = "abcsefghijklmnopqrstuvwxyz";
    let testEmail = `test-user-${Math.floor(
        Math.random() * 90000 + 10000
    )}@test.com`;
    let testPassword = `${
        Math.floor(Math.random() * 9000000 + 1000000) +
        letters[Math.floor(Math.random() * 26 + 1)] +
        symbols[Math.floor(Math.random() * 6 + 1)]
    }`;

    await page.goto(URL);
    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
    await page.getByRole("link", { name: "create an account" }).click();
    await expect(
        page.getByRole("heading", { name: "Create an account" })
    ).toBeVisible();

    await page.locator("[type=email]").fill(testEmail);
    await page.locator("[name=password]").fill(testPassword);
    await page.locator("[name=firstName]").fill("test-firstName");
    await page.locator("[name=lastName]").fill("test-lastName");
    await page.locator("[name=confirmPassword]").fill(`${testPassword}123`);
    await page.locator("button", { hasText: "Create account" }).click();

    await expect(page.getByText("Your passwords didn't match")).toBeVisible();
    await page.locator("[name=confirmPassword]").fill(testPassword);

    await page.locator("button", { hasText: "Create account" }).click();

    await expect(page.getByText("registration successful")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
    await page.getByRole("button", { name: "Sign out" }).click();

    await expect(page.getByRole("link", { name: "Sign In" })).toBeVisible();
});

test("Should users be allowed to sign in", async ({ page }) => {
    await page.goto(URL);

    // Click the get started link.
    await page.getByRole("link", { name: "Sign In" }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[type=email]").fill("new1@email.com");
    await page.locator("[type=password]").fill("123456");

    await page.locator("button", { hasText: "Sign In" }).click();

    await expect(page.getByText("Sign in successful")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});
