import { test, expect } from "@playwright/test";
import { describe } from "node:test";

// End-to-end test example
// This is not a good example of an end-to-end test as it does not involve the interaction of multiple components
// however, I want to show the format that these tests might take
describe("my-todo-list", () => {
  describe("empty", () => {
    test("should have correct title", async ({ page }) => {
      await page.goto("http://localhost:6006/iframe.html?id=todo-list--empty-todo-list", { waitUntil: "load" });

      await page.waitForLoadState("networkidle");

      const title = await page.textContent("my-todo-list>h1");

      expect(title).toBe("My Todo List");
    });

    test("should display the correct placeholder for a todo with no items", async ({ page }) => {
      await page.goto("http://localhost:6006/iframe.html?id=todo-list--empty-todo-list", { waitUntil: "load" });

      await page.waitForLoadState("networkidle");

      const placeholder = await page.textContent("my-todo-list>p");

      expect(placeholder).toBe("No items");
    });
  });

  describe("with preset items from attribute input", () => {
    test("should display the correct number of items", async ({ page }) => {
      await page.goto("http://localhost:6006/iframe.html?id=todo-list--todo-list-with-items", { waitUntil: "load" });

      await page.waitForLoadState("networkidle");

      const items = await page.$$("my-todo-list>ul>li");

      expect(items.length).toBe(2);
    });

    test("should have the correct text for items", async ({ page }) => {
      await page.goto("http://localhost:6006/iframe.html?id=todo-list--todo-list-with-items", { waitUntil: "load" });

      await page.waitForLoadState("networkidle");

      const items = await page.$$eval("my-todo-list>ul>li>span", (elements) => elements.map((el) => el.textContent));

      expect(items).toEqual(["First item", "Second item"]);
    });
  });
});
