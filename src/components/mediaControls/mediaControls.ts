import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import lucidPlayIcon from "lucide-static/icons/play.svg";
import lucidPauseIcon from "lucide-static/icons/pause.svg";
import { mediaControlsStyles } from "./css/style";

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

  @property({ type: String })
  public for: string;

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
  }

  private playIcon() {
    return html`
      <slot name="play-icon" part="play-icon">
        <embed src="${lucidPlayIcon}"></object>
      </slot>
    `;
  }

  private pauseIcon() {
    return html`
      <slot name="pause-icon" part="pause-icon" part="pause-icon">
        <embed src="${lucidPauseIcon}"></object>
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
