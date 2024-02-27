import { Meta, StoryObj } from "@storybook/web-components";
import { TodoListProps } from "../../components/todoList/todoList";
import { userEvent } from "@storybook/testing-library";
import { html } from "lit";
import "../../components/todoList/todoList";

const meta: Meta<TodoListProps> = {
  title: "Todo List",
  component: "my-todo-list",
  render: ({ items, title }) => {
    if (title) {
      if (items) {
        return html`<my-todo-list .items=${items} title=${title}></my-todo-list>`;
      } else {
        return html`<my-todo-list title=${title}></my-todo-list>`;
      }
    }

    if (items) {
      return html`<my-todo-list .items=${items}></my-todo-list>`;
    }

    return html`<my-todo-list></my-todo-list>`;
  },
};

export default meta;

export const TodoListWithItems: StoryObj<TodoListProps> = {
  args: {
    title: "My Shopping List",
    items: ["Eggs", "Flour"],
  },
};

// interaction tests
export const TodoListAddItems: StoryObj<TodoListProps> = {
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector("my-todo-list") as HTMLElement;

    const inputElement = component.shadowRoot?.querySelector<HTMLInputElement>("input") as HTMLInputElement;
    const addButton = component.shadowRoot?.querySelector<HTMLButtonElement>(".add-button") as HTMLButtonElement;

    // add an item using the input and "Add" button
    await userEvent.type(inputElement, "New item");
    await userEvent.click(addButton);

    // add an item using the input and the enter key
    await userEvent.type(inputElement, "Another new item{enter}");
  },
};

export const TodoListRemoveItem: StoryObj<TodoListProps> = {
  args: {
    items: ["First item", "Second item"],
  },
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector("my-todo-list") as HTMLElement;

    const removeButton = component.shadowRoot?.querySelectorAll<HTMLButtonElement>("button")[0] as HTMLButtonElement;

    await userEvent.click(removeButton);
  },
};

export const TodoListAddAndRemoveItem: StoryObj<TodoListProps> = {
  args: {
    items: ["First item", "Second item"],
  },
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector("my-todo-list") as HTMLElement;

    const inputElement = component.shadowRoot?.querySelector<HTMLInputElement>("input") as HTMLInputElement;
    const addButton = component.shadowRoot?.querySelector<HTMLButtonElement>(".add-button") as HTMLButtonElement;

    await userEvent.type(inputElement, "New item");

    await userEvent.click(addButton);

    const removeButton = component.shadowRoot?.querySelectorAll<HTMLButtonElement>("button")[0] as HTMLButtonElement;

    await userEvent.click(removeButton);
  },
};
