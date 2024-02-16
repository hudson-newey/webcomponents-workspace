import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface ListProps {
  items: string[];
  name: string;
}

@customElement("my-inline-list")
export class List extends LitElement {
  public constructor() {
    super();
  }

  @property()
  accessor name = "";

  @property({ type: Array })
  accessor items: string[] = [];

  static styles = css`
    h1 {
      color: #33aa33;
    }
  `;

  private emptyTemplate = html`<p>No items</p>`;
  private itemsTemplate = (items: string[]) => html`
    <ul>
      ${items.map((item) => html`<li>${item}</li>`)}
    </ul>
  `;

  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>

      ${this.items.length > 0 ? this.itemsTemplate(this.items) : this.emptyTemplate}
    `;
  }
}
