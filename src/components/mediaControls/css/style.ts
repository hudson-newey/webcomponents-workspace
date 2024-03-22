import { css } from "lit";

export const mediaControlsStyles = css`
  :host {
    --primary-color: hsl(206.93deg, 100%, 24.9%);
    --rounding: 0.5rem;
  }
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

  #action-button {
    display: flex;
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
`;
