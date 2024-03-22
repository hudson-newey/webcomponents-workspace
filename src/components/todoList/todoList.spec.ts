//! I've disabled these tests so that I don't have to worry about them when developing the oe component examples
// import { expect, test } from "@sand4rt/experimental-ct-web";
// import { TodoList } from "../todoList/todoList";

// test("should create", async ({ mount }) => {
//   const component = await mount(TodoList);

//   await expect(component).toBeTruthy();
// });

// test("should have the correct title", async ({ mount }) => {
//   const component = await mount(TodoList);

//   const title = await component.getByRole("heading");

//   await expect(title).toHaveText("My Todo List");
// });

// test("should allow for pre-filled items as attributes", async ({ mount }) => {
//   const component = await mount(TodoList, {
//     props: {
//       items: ["first", "second"],
//     },
//   });

//   const items = await component.getByRole("listitem").all();

//   await expect(items).toHaveLength(2);

//   // there is an "X" at the end because of the remove button
//   await expect(items[0]).toHaveText("first x");
//   await expect(items[1]).toHaveText("second x");
// });

// test("should allow for adding new items", async ({ mount }) => {
//   const component = await mount(TodoList);

//   const input = await component.getByRole("textbox");
//   const addButton = await component.getByText("Add");

//   await input.type("get milk");
//   await addButton.click();

//   const items = await component.getByRole("listitem").all();

//   await expect(items).toHaveLength(1);
//   await expect(items[0]).toHaveText("get milk x");
// });

// test("should allow for removing items", async ({ mount }) => {
//   const component = await mount(TodoList, {
//     props: {
//       items: ["first", "second"],
//     },
//   });

//   const removeButton = await component.getByText("x").first();

//   await removeButton.click();

//   const items = await component.getByRole("listitem").all();

//   await expect(items).toHaveLength(1);
//   await expect(items[0]).toHaveText("second x");
// });
