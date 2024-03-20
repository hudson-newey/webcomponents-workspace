import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import lucidPlayIcon from "lucide-static/icons/play.svg";
import lucidPauseIcon from "lucide-static/icons/pause.svg";

export interface MediaControlsProps {
  playing: boolean;
  currentTime: number;
  src: string;
  audioDuration: number;
  disabled: boolean;
  for: string;
}

/**
 * A simple media player with play/pause and seek functionality that can be used with the open ecoacoustics spectrograms and components.
 *
 * @csspart --primary-color - The primary color of the component
 * @csspart --rounding - The rounding of the component
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
  playing: boolean = false;

  @property({ type: Number })
  currentTime = 0;

  @property({ type: String })
  src = "";

  @property({ type: Number })
  audioDuration = 0;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  for = "";

  static styles = [
    css`
      :host {
        --primary-color: hsl(206.93deg, 100%, 24.9%);
        --rounding: 0.5rem;
      }
    `,
    css`
      #media-output {
        display: none;
      }

      .container {
        display: flex;
        text-align: center;
      }

      .disabled {
        pointer-events: none;
        opacity: 0.6;
      }

      .action-button {
        display: flex;
        color: white !important;
        fill: white !important;
        stroke: white !important;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: solid thin var(--primary-color);
        padding: 0.1rem 0.5rem;
        border-radius: var(--rounding);
        cursor: pointer;
        font-size: 1rem;
        min-width: 2.8rem;
        min-height: 2.3rem;
      }

      time {
        display: flex;
        align-items: center;
        padding: 0.1rem 0.5rem;
        border: solid thin var(--primary-color);
        border-radius: var(--rounding);
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        font-size: 1.1rem;
      }
    `,
  ];

  private playAudio() {
    const audio = this.shadowRoot?.querySelector("audio") as HTMLAudioElement;
    audio.play();
  }

  private pauseAudio() {
    const audio = this.shadowRoot?.querySelector("audio") as HTMLAudioElement;
    audio.pause();
  }

  private stopAudio() {
    this.playing = false;
    this.currentTime = 0;
    this.pauseAudio();
  }

  private toggleAudio() {
    this.playing ? this.pauseAudio() : this.playAudio();

    this.playing = !this.playing;
  }

  private updateTime() {
    this.currentTime += 0.2;
  }

  private changeTime(value) {
    this.stopAudio();

    this.currentTime = value;
    this.shadowRoot.querySelector("audio").currentTime = value * 500;
  }

  private formatTime(time: number) {
    return new Date(time * 1000).toISOString().substr(14, 5);
  }

  private isDisabled() {
    const hasSource = this.src || this.for;
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

        <time data-testid="elapsed-duration"
          >${this.formatTime(this.currentTime)} / ${this.formatTime(this.audioDuration)}</time
        >
      </div>

      <audio
        id="media-output"
        @ended="${() => this.stopAudio()}"
        @timeupdate="${() => this.updateTime()}"
        @loadedmetadata=${(event) => (this.audioDuration = event.target.duration - 1)}
        preload="auto"
      >
        <source src="${this.src}" type="audio/flac" />
      </audio>
    `;
  }
}
