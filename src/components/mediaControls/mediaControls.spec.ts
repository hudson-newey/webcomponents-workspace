import { expect, test } from "@sand4rt/experimental-ct-web";
import { Locator } from "@playwright/test";
import { MediaControls } from "../mediaControls/mediaControls";

const audioSrc = {
  duration: "00:04",
  src: "http://localhost:5500/media_example.flac",
};

async function isAudioPlaying(component: Locator): Promise<boolean> {
  const audioElement = await component.locator("audio");
  const pausedAttribute = await audioElement.getAttribute("paused");

  // if there is no paused attribute that means that we have never played audio
  return pausedAttribute === "false" || pausedAttribute === null;
}

async function playPauseButton(component: Locator): Promise<Locator> {
  return (await component.locator(".action-button")).first();
}

async function toggleAudio(component: Locator): Promise<void> {
  const button = await playPauseButton(component);
  await button.click();
}

test.beforeEach(async ({ page }) => {
  await page.route(audioSrc.src, async (route) => {
    const audioBlob = new Blob([], { type: "audio/flac" });
    const mockResponse = new File([audioBlob], "media_example.flac", { type: "audio/flac" });

    await route.fulfill({
      body: Buffer.from(await mockResponse.arrayBuffer()),
      contentType: "audio/flac",
    });
  });
});

test.describe("smoke tests", () => {
  test("should create", async ({ mount }) => {
    const component = await mount(MediaControls);
    await expect(component).toBeTruthy();
  });
});

test.describe("disabled/enabled functionality", () => {
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

test.describe("controlling media", () => {
  test("should play audio when play button is clicked", async ({ mount }) => {
    const component = await mount(MediaControls, {
      props: {
        src: audioSrc.src,
      },
    });

    await toggleAudio(component);

    const isPlaying = await isAudioPlaying(component);
    await expect(isPlaying).toBe(true);
  });

  test.skip("should stop audio when the elapsed time reaches the length of the audio recording", async ({ mount }) => {
    const component = await mount(MediaControls, {
      props: {
        src: audioSrc.src,
      },
    });

    await toggleAudio(component);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const isPlaying = await isAudioPlaying(component);
    await expect(isPlaying).toBe(false);
  });

  test("should show the position and total duration when not playing", async ({ mount }) => {
    const component = await mount(MediaControls, {
      props: {
        src: audioSrc.src,
      },
    });

    const elapsedDurationElement = await component.getByTestId("elapsed-duration");
    await expect(elapsedDurationElement).toHaveText("00:00 / 00:00");
  });

  test.skip("should show the position of playback when playing", async ({ mount }) => {
    const expectedStartingText = "00:00 / 00:04";
    const elapsedMs = 3_000;

    const component = await mount(MediaControls, {
      props: {
        src: audioSrc.src,
      },
    });

    const elapsedDurationElement = await component.getByTestId("elapsed-duration");
    await expect(elapsedDurationElement).toHaveText(expectedStartingText);

    await toggleAudio(component);

    await new Promise((resolve) => setTimeout(resolve, elapsedMs));

    // because 3 seconds have elapsed since the audio started playing
    // we should not see the starting text
    // TODO: we should actually assert that the elapsed time is displayed
    await expect(elapsedDurationElement).not.toHaveText(expectedStartingText);
  });
});
