import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface MediaControlsProps {}

@customElement("oe-media-controls")
export class MediaControls extends LitElement {
  @property({ type: Boolean })
  playing: boolean = false;

  @property({ type: Number })
  currentTime: number = 0;

  @property({ type: String })
  src = "";

  @property({ type: Number })
  audioDuration = 0;

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
        color: white;
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        padding: 0.1rem 0.5rem;
        border-radius: var(--rounding);
        cursor: pointer;
        font-size: 1rem;
        max-width: 2rem;
      }

      .seek-input {
        -webkit-appearance: none;
        appearance: none;
        background: #d3d3d3;
        cursor: pointer;
        width: 15rem;
        height: 0.25rem;

        &::-webkit-slider-thumb,
        &::-moz-range-thumb {
          appearance: none;
          margin-top: -12px; /* Centers thumb on the track */
          background-color: var(--primary-color);
          height: 1.2rem;
          width: 0.3rem;
        }
      }

      time {
        padding: 0.1rem 0.5rem;
        border: solid thin var(--primary-color);
        border-radius: var(--rounding);
        margin-left: 0.25rem;
        margin-right: 0.25rem;
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

  private formatTime(time: number) {
    return new Date(time * 1000).toISOString().substr(14, 5);
  }

  public render() {
    return html`
      <div class="container ${this.src ? "" : "disabled"}">
        <button class="action-button" @click="${() => this.toggleAudio()}">
          ${this.playing ? html`&#9616;&nbsp;&#9612;` : html``}
        </button>

        <time>${this.formatTime(this.currentTime)}</time>

        <span>
          <input
            type="range"
            class="seek-input"
            value="${this.currentTime}"
            min="0"
            step="0.1"
            max="${this.audioDuration}"
            @change="${(event) => (this.currentTime = Number(event.target.value))}"
          />
        </span>

        <time>${this.formatTime(this.audioDuration)}</time>
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
