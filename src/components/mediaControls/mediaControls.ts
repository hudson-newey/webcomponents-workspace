import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { mediaControlsStyles } from "./css/style";
import { ILogger, rootContext } from "../logger/logger";
import { provide } from "@lit/context";

export interface MediaControlsProps {
  for: string;
}

/**
 * A simple media player with play/pause and seek functionality that can be used with the open ecoacoustics spectrograms and components.
 *
 * @property for - The id of the audio element to control
 *
 * @csspart play-icon - Styling applied to the play icon (including default)
 * @csspart pause-icon - Styling applied to the pause icon (including default)
 *
 * @slot play-icon - The icon to display when the media is stopped
 * @slot pause-icon - The icon to display when the media is playing
 */
@customElement("oe-media-controls")
export class MediaControls extends LitElement {
  public static styles = mediaControlsStyles;

  @provide({ context: rootContext })
  @property({ attribute: false })
  public logger: ILogger = {
    log: console.log,
  };

  @property({ type: String })
  public for: string = "";

  @state()
  public playing = false;

  private toggleAudio(): void {
    const audioElement = document.getElementById(this.for) as HTMLAudioElement;

    if (this.playing) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    this.playing = !this.playing;

    this.logger.log(`Audio ${this.playing ? "playing" : "paused"}`);
  }

  private playIcon() {
    return html`
      <slot name="play-icon" part="play-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </slot>
    `;
  }

  private pauseIcon() {
    return html`
      <slot name="pause-icon" part="pause-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      </slot>
    `;
  }

  public render() {
    return html`
      <button id="action-button" @click="${() => this.toggleAudio()}">
        ${this.playing ? this.pauseIcon() : this.playIcon()}
      </button>
    `;
  }
}
