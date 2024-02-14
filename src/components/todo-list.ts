import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

type Item = string;

export interface TodoListProps {
  items: Item[];
}

@customElement("my-todo-list")
export class TodoList extends LitElement {
  public constructor() {
    super();

    this.items ??= [];
  }

  @property({ type: Array })
  accessor items: Item[] = [];

  private emptyTemplate = html`<p>No items</p>`;
  private itemsTemplate = (items: Item[]) => html`
    <ul>
      ${items.map(
        (item) => html`
          <li>
            ${item}
            <button @click="${() => this.removeItem(item)}">x</button>
          </li>
        `
      )}
    </ul>
  `;

  private removeItem = (item: Item) => {
    this.items = [...this.items.filter((x) => x !== item)];
  }

  private addItem = () => {
    const inputElement = this.shadowRoot?.querySelector("input");
    const value = inputElement?.value;

    if (value) {
      this.items = [...this.items, value];
      inputElement.value = "";
    }
  };

  private handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      this.addItem();
    }
  }

  public render() {
    return html`
      <h1>My Todo List</h1>

      ${this.items.length > 0
        ? this.itemsTemplate(this.items)
        : this.emptyTemplate}

      <input type="text" @keydown=${this.handleKeyPress} />
      <button class="add-button" @click="${() => this.addItem()}">Add</button>
    `;
  }
}
