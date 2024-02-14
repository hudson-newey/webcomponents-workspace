import { Meta, StoryObj } from "@storybook/web-components";
import { ListProps } from "../components/inlineList";
import "../components/inlineList";

const meta: Meta<ListProps> = {
  title: "Inline List",
  tags: ["lists", "testing"],
  component: "my-inline-list",
  argTypes: {
    name: {
      control: "text",
      description: "The name to display",
    },
    items: {
      control: "array",
      description: "The list of items to display",
    },
  },
};

export const Empty: StoryObj<ListProps> = {
  args: {
    name: "World",
    items: [],
  },
};

export const WithOneItem: StoryObj<ListProps> = {
  args: {
    name: "One item",
    items: ["Item 1"],
  },
};

export const WithMultipleItems: StoryObj<ListProps> = {
  // because I have specified in the .storybook/test-runner.ts file that I want to exclude stories with the "no-test" tag, this story will not be tested
  tags: ["no-test"],
  args: {
    name: "Multiple items",
    items: ["Item 1", "Item 2", "Item 3"],
  },
};

export default meta;
