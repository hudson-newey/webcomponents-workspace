import { html } from "lit";
import "../../components/todo-list";
import { TodoListProps } from "../../components/todo-list";

export const MyTodoList = (props: TodoListProps) => {
  return html`<my-todo-list data-testid="component" .items=${props.items}></my-todo-list>`;
};

