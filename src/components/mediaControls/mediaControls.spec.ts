import { expect, test } from "@sand4rt/experimental-ct-web";
import { Locator } from "@playwright/test";
import { MediaControls } from "../mediaControls/mediaControls";
import { describe } from "node:test";

const audioSrc = {
  duration: "00:04",
  src: "https://api.search.acousticobservatory.org/api/v1/a2o/audio_recordings/download/flac/966100?start_offset=2210&end_offset=2215",
};

async function isAudioPlaying(component: Locator): Promise<boolean> {
  const audioElement = (await component.locator("audio"));
  const pausedAttribute = await audioElement.getAttribute("paused");

  // if there is no paused attribute
  return pausedAttribute === "false" || pausedAttribute === null;
}

async function playPauseButton(component: Locator): Promise<Locator> {
  return (await component.locator(".action-button")).first();
}

test("should create", async ({ mount }) => {
  const component = await mount(MediaControls);
  await expect(component).toBeTruthy();
});

describe("disabled/enabled functionality", () => {
  test("should be disabled if there is no src and for attribute", async ({ mount }) => {
    const component = await mount(MediaControls);

    const container = await component.locator(".container");

    await expect(container).toHaveClass("container disabled");
  });

  test("should be enabled if there is a src attribute", async ({ mount }) => {
    const component = await mount(MediaControls, {
      props: {
        src: audioSrc.src,
      },
    });

    const container = await component.locator(".container");

    await expect(container).not.toHaveClass("container disabled");
  });

  test("should be enabled if there is a for attribute", async ({ mount }) => {
    const component = await mount(MediaControls, {
      props: {
        for: "mock-spectrogram-component",
      },
    });

    const container = await component.locator(".container");

    await expect(container).not.toHaveClass("container disabled");
  });
});

describe("controlling media", () => {
  test("should play audio when play button is clicked", async ({ mount }) => {
    const component = await mount(MediaControls, {
      props: {
        src: audioSrc.src,
      },
    });

    const button = await playPauseButton(component);
    await button.click();

    const isPlaying = await isAudioPlaying(component);
    await expect(isPlaying).toBe(true);
  });

  test("should stop audio when the elapsed time reaches the length of the audio recording", async ({ mount }) => {
    const component = await mount(MediaControls, {
      props: {
        src: audioSrc.src,
      },
    });

    const button = await playPauseButton(component);
    await button.click();

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const isPlaying = await isAudioPlaying(component);
    await expect(isPlaying).toBe(false);
  });

  test("should show the total duration of the audio recording", async ({ mount }) => {
    const component = await mount(MediaControls, {
      props: {
        src: audioSrc.src,
      },
    });

    const totalDurationElement = await component.getByTestId("total-duration");
    await expect(totalDurationElement).toHaveText(audioSrc.duration);
  });

  test("should show the position of playback when playing", async ({ mount }) => {
    const component = await mount(MediaControls, {
      props: {
        src: audioSrc.src,
      },
    });

    const elapsedDurationElement = await component.getByTestId("elapsed-duration");
    await expect(elapsedDurationElement).toHaveText("00:00");

    const button = await playPauseButton(component);
    await button.click();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await expect(elapsedDurationElement).not.toHaveText("00:00");
  });
});
