import { test, expect } from "@playwright/test";

test("should create", async ({ page }) => {
  await page.goto("http://localhost:6006/iframe.html?id=todo-list--empty-todo-list");
});

test("should have correct title", async ({ page }) => {
  await page.goto("http://localhost:6006/iframe.html?id=todo-list--empty-todo-list");

  const title = await page.textContent("h1");

  expect(title).toBe("My Todo List");
});
