import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("oe-audio-element")
export class AudioElement extends LitElement {
  public constructor() {
    super();
  }

  @property({ type: String })
  public src;

  public render() {
    return html`<audio id="media-output" src="${this.src}" controls></audio>`;
  }
}
