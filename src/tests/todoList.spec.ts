import { test, expect } from "@playwright/test";

test("should create", async ({ page }) => {
  await page.goto("http://localhost:6006/iframe.html?id=todo-list--empty-todo-list", { waitUntil: "load" });
});

test("should have correct title", async ({ page }) => {
  await page.goto("http://localhost:6006/iframe.html?id=todo-list--empty-todo-list", { waitUntil: "load" });

  await page.waitForLoadState("networkidle");

  const title = await page.textContent("#title");

  expect(title).toBe("My Todo List");
});

test("should display the correct placeholder for a todo with no items", async ({ page }) => {
  await page.goto("http://localhost:6006/iframe.html?id=todo-list--empty-todo-list", { waitUntil: "load" });

  await page.waitForLoadState("networkidle");

  const placeholder = await page.textContent(".empty-list");

  expect(placeholder).toBe("No items");
});
