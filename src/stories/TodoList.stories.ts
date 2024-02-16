import { Meta, StoryObj } from "@storybook/web-components";
import { TodoListProps } from "../components/todoList/todoList";
import { userEvent } from "@storybook/testing-library";
import "../components/todoList/todoList";

const meta: Meta<TodoListProps> = {
  title: "Todo List",
  tags: ["lists", "testing", "todo"],
  component: "my-todo-list",
  argTypes: {
    items: {
      control: "array",
      description: "The list of items to display",
    },
  },
};

export const EmptyTodoList: StoryObj<TodoListProps> = {
  args: {
    items: [],
  },
};

export const TodoListWithItems: StoryObj<TodoListProps> = {
  args: {
    items: ["First item", "Second item"],
  },
};

// interaction tests
export const TodoListAddItems: StoryObj<TodoListProps> = {
  args: {
    items: [],
  },
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

export default meta;
