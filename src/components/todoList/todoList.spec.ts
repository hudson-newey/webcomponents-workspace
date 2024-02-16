import { expect, test } from "@sand4rt/experimental-ct-web";
import { TodoList } from "../todoList/todoList";

test("should create", async ({ mount }) => {
  const component = await mount(TodoList, {
    props: {
      items: [],
    },
  });

  expect(component).toBeTruthy();
});
