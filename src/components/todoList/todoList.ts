import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface TodoListProps {
  items: string[];
}

@customElement("my-todo-list")
export class TodoList extends LitElement {
  @property({ type: Array })
  accessor items: string[] = [];

  static styles = css`
    h1 {
      font-family: "Fira Sans", sans-serif;
    }

    input {
      padding: 0.25rem;
      border-radius: 0.25rem;
      outline: none;
    }

    button {
      padding: 0.25rem;
      border-radius: 0.25rem;
      outline: none;
      cursor: pointer;
    }
  `;

  private emptyTemplate = html`<p>No items</p>`;
  private itemsTemplate = (items: string[]) => html`
    <ul>
      ${items.map(
        (item) => html`
          <li>
            <span>${item}</span>
            <button @click="${() => this.removeItem(item)}">x</button>
          </li>
        `,
      )}
    </ul>
  `;

  private removeItem = (item: string) => {
    this.items = [...this.items.filter((x) => x !== item)];
  };

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
  };

  public render() {
    return html`
      <h1 id="title">My Todo List</h1>

      ${this.items.length > 0 ? this.itemsTemplate(this.items) : this.emptyTemplate}

      <input type="text" @keydown=${this.handleKeyPress} />
      <button class="add-button" @click="${() => this.addItem()}">Add</button>

      <slot></slot>
    `;
  }
}
