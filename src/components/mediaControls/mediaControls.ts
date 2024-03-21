import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import lucidPlayIcon from "lucide-static/icons/play.svg";
import lucidPauseIcon from "lucide-static/icons/pause.svg";
import { mediaControlsStyles } from "./css/style";

export interface MediaControlsProps {
  playing: boolean;
  src: string;
  for: string;
}

/**
 * A simple media player with play/pause and seek functionality that can be used with the open ecoacoustics spectrograms and components.
 *
 * @csspart --primary-color - The primary color of the component
 * @csspart --rounding - The rounding of the component
 *
 * @slot play-icon - The icon to display when the media is stopped
 * @slot pause-icon - The icon to display when the media is playing
 */
@customElement("oe-media-controls")
export class MediaControls extends LitElement {
  public constructor() {
    super();
  }

  @property({ type: Boolean })
  public playing = false;

  @property({ type: String })
  public src;

  @property({ type: String })
  public for;

  static styles = [mediaControlsStyles];

  private audioElement(): HTMLAudioElement {
    return this.shadowRoot.querySelector<HTMLAudioElement>("audio");
  }

  private playAudio(): void {
    // this.audioElement().toggleAttribute("playing");
    this.audioElement().play();
    this.playing = true;
  }

  private pauseAudio(): void {
    this.audioElement().pause();
    this.playing = false;
  }

  private toggleAudio(): void {
    this.playing ? this.pauseAudio() : this.playAudio();
  }

  private playIcon = html`<embed src="${lucidPlayIcon}"></object>`;
  private pauseIcon = html`<embed src="${lucidPauseIcon}"></object>`;

  public render() {
    return html`
      <button id="action-button" @click="${() => this.toggleAudio()}">
        ${this.playing ? this.pauseIcon : this.playIcon}
      </button>
    `;
  }
}
