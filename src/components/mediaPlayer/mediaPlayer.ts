import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("oe-media-player")
export class MediaPlayer extends LitElement {
  @property({ type: String })
  public src: string;
  // change

  public render() {
    return html`<audio src="${this.src}"></audio>`;
  }
}
