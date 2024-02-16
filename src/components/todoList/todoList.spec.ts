import { test, expect } from "@sand4rt/experimental-ct-web";
import { describe } from "node:test";
import { TodoList } from "./todoList";

describe("todoList", () => {
  test("should have the correct title", async ({ mount }) => {
    const component = await mount(TodoList, {
      props: {
        items: [],
      },
    });
  });
});
