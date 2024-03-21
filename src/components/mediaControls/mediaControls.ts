import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import lucidPlayIcon from "lucide-static/icons/play.svg";
import lucidPauseIcon from "lucide-static/icons/pause.svg";
import { mediaControlsStyles } from "./styles";

export interface MediaControlsProps {
  playing: boolean;
  currentTime: number;
  src: string;
  audioDuration: number;
  disabled: boolean;
  for: string;
  source: unknown;
}

/**
 * A simple media player with play/pause and seek functionality that can be used with the open ecoacoustics spectrograms and components.
 *
 * @csspart --primary-color - The primary color of the component
 * @csspart --rounding - The rounding of the component
 *
 * @slot source - A templated source input
 */
@customElement("oe-media-controls")
export class MediaControls extends LitElement {
  public constructor() {
    super();

    if (this.audioDuration) {
      this.changeTime(this.audioDuration);
    }
  }

  @property({ type: Boolean })
  public playing = false;

  @property({ type: Number })
  public currentTime = 0;

  @property({ type: String })
  public src;

  @property({ type: Number })
  public audioDuration = 0;

  @property({ type: Boolean })
  public disabled = false;

  @property({ type: String })
  public for = "";

  public source;

  static styles = [mediaControlsStyles];

  private playAudio(): void {
    const audio = this.shadowRoot?.querySelector("audio") as HTMLAudioElement;
    audio.play();
  }

  private pauseAudio(): void {
    const audio = this.shadowRoot?.querySelector("audio") as HTMLAudioElement;
    audio.pause();
  }

  private stopAudio(): void {
    this.playing = false;
    this.currentTime = 0;
    this.pauseAudio();
  }

  private toggleAudio(): void {
    this.playing ? this.pauseAudio() : this.playAudio();

    this.playing = !this.playing;
  }

  private changeTime(value: number): void {
    this.currentTime = value;
    this.shadowRoot.querySelector("audio").currentTime = this.currentTime * 500;
  }

  private formatTime(time: number): string {
    return new Date(time * 1000).toISOString().substring(14, 19);
  }

  private isDisabled(): boolean {
    const hasSource = this.src || this.for || this.source;
    return hasSource && !this.disabled;
  }

  private playIcon = html`<embed src="${lucidPlayIcon}"></object>`;
  private pauseIcon = html`<embed src="${lucidPauseIcon}"></object>`;

  public render() {
    return html`
      <div class="container ${this.isDisabled() ? "" : "disabled"}">
        <button class="action-button" @click="${() => this.toggleAudio()}">
          ${this.playing ? this.pauseIcon : this.playIcon}
        </button>

        <time data-testid="elapsed-duration">${this.formatTime(this.audioDuration)}</time>
      </div>

      <audio
        id="media-output"
        @ended="${() => this.stopAudio()}"
        @loadedmetadata=${(event) => (this.audioDuration = event.target.duration)}
        preload="auto"
      >
        <slot id="source"></slot>
        <source src="${this.src}" type="audio/flac" />
      </audio>
    `;
  }
}
