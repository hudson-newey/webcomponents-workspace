import { Meta, StoryObj } from "@storybook/web-components";
import { ListProps } from "../../components/inline-list";
import { MyList } from "./Lists";

const meta: Meta<ListProps> = {
	title: "Lists",
	tags: ["lists", "testing"],
	render: MyList,
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
	args: {
		name: "Multiple items",
		items: ["Item 1", "Item 2", "Item 3"],
	},
};

export default meta;
