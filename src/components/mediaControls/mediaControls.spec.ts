import { expect, test } from "@sand4rt/experimental-ct-web";

const audioSource = "http://localhost:5173/example.flac";
const defaultContent = `
  <oe-media-controls for="media">
    <div slot="play-icon">Play Me!</div>
    <div slot="pause-icon">Pause</div>
  </oe-media-controls>

  <audio id="media" src="${audioSource}"></audio>
`;

// this test exists because if you don't correctly import or mount the media controls component
// it will still create the element tag, but with no shadow content or error indicating that mounting
// the component failed and will make all other tests fail because no content = a "hidden" state
// therefore, by having a mounting smoke test, we can ensure that this test will fail only if
// we have mounted the component incorrectly
test("creating a visible web component", async ({ page }) => {
  await page.setContent(defaultContent);

  const mediaControls = await page.locator("oe-media-controls");

  await expect(mediaControls).toBeVisible();
});

test("state before interaction", async ({ page }) => {
  await page.setContent(defaultContent);

  const audioElement = await page.locator("audio").first();
  const isPaused = await audioElement.evaluate((element: HTMLAudioElement) => element.paused);

  await expect(isPaused).toBe(true);
});

test("play functionality", async ({ page }) => {
  await page.setContent(defaultContent);

  const playButton = await page.locator("oe-media-controls button").first();
  await playButton.click({ force: true });

  const audioElement = await page.locator("audio");
  const isPaused = await audioElement.evaluate((element: HTMLAudioElement) => element.paused);

  await expect(isPaused).toBe(false);
});

test("play pause functionality", async ({ page }) => {
  await page.setContent(defaultContent);

  // start playing audio
  // by clicking the action button again, we should stop playing audio
  const playButton = await page.locator("oe-media-controls button").first();
  await playButton.click({ force: true });
  await playButton.click({ force: true });

  const audioElement = await page.locator("audio");
  const isPaused = await audioElement.evaluate((element: HTMLAudioElement) => element.paused);

  await expect(isPaused).toBe(true);
});

test("custom play icon via slots", async ({ page }) => {
  const slottedPlayButton = `<div slot="play-icon">Play Me!</div>`;
  await page.setContent(`
    <oe-media-controls for="media">
      ${slottedPlayButton}
    </oe-media-controls>

    <audio id="media" src="${audioSource}"></audio>
  `);

  const playButton = await page.locator("oe-media-controls button").first();
  const playButtonHtml = await playButton.innerHTML();

  await expect(playButtonHtml).toBe(slottedPlayButton);
});

test("custom pause icon via slots", async ({ page }) => {
  const slottedPauseButton = `<div slot="pause-icon">Pause</div>`;
  await page.setContent(`
    <oe-media-controls for="media">
      ${slottedPauseButton}
    </oe-media-controls>

    <audio id="media" src="${audioSource}"></audio>
  `);

  const pauseButton = await page.locator("oe-media-controls button").first();
  const pauseButtonHtml = await pauseButton.innerHTML();

  await expect(pauseButtonHtml).toBe(slottedPauseButton);
});

test("custom styling for the default play/pause icons via css parts", async ({ page }) => {
  await page.setContent(defaultContent);
  await page.addStyleTag({
    content: `
      oe-media-controls::part(play-icon) {
        color: rgb(255, 0, 0);
        background-color: rgb(0, 0, 255);
      }

      oe-media-controls::part(pause-icon) {
        color: rgb(0, 255, 0);
        background-color: rgb(255, 255, 0);
      }
    `,
  });

  // play button
  const playButton = await page.locator("oe-media-controls button").first();
  const playButtonStyles = await playButton.evaluate((element: HTMLButtonElement) => {
    const styles = window.getComputedStyle(element);
    return {
      color: styles.color,
      backgroundColor: styles.backgroundColor,
    };
  });

  await expect(playButtonStyles).toEqual({
    color: "rgb(0, 255, 0)",
    backgroundColor: "rgb(0, 0, 255)",
  });

  // start playing audio so we can see the default pause icon
  const playButtonElement = await page.locator("oe-media-controls button").first();
  await playButtonElement.click({ force: true });

  const pauseButton = await page.locator("oe-media-controls button").first();
  const pauseButtonStyles = await pauseButton.evaluate((element: HTMLButtonElement) => {
    const styles = window.getComputedStyle(element);
    return {
      color: styles.color,
      backgroundColor: styles.backgroundColor,
    };
  });

  await expect(pauseButtonStyles).toEqual({
    color: "rgb(0, 255, 0)",
    backgroundColor: "rgb(255, 255, 0)",
  });
});

test("custom styling for a custom play/pause slot via css parts", async ({ page }) => {
  await page.setContent(`
    <oe-media-controls for="media">
      <div slot="play-icon">Play Me!</div>
      <div slot="pause-icon">Pause</div>
    </oe-media-controls>

    <audio id="media" src="${audioSource}"></audio>
  `);

  await page.addStyleTag({
    content: `
      oe-media-controls::part(play-icon) {
        color: rgb(255, 0, 0);
        background-color: rgb(0, 0, 255);
      }

      oe-media-controls::part(pause-icon) {
        color: rgb(0, 255, 0);
        background-color: rgb(255, 255, 0);
      }
    `,
  });

  // play button
  const playButton = await page.locator("oe-media-controls button").first();
  const playButtonStyles = await playButton.evaluate((element: HTMLButtonElement) => {
    const styles = window.getComputedStyle(element);
    return {
      color: styles.color,
      backgroundColor: styles.backgroundColor,
    };
  });

  await expect(playButtonStyles).toEqual({
    color: "rgb(255, 0, 0)",
    backgroundColor: "rgb(0, 0, 255)",
  });

  // start playing audio so we can see the default pause icon
  const playButtonElement = await page.locator("oe-media-controls button").first();
  await playButtonElement.click({ force: true });

  const pauseButton = await page.locator("oe-media-controls button").first();
  const pauseButtonStyles = await pauseButton.evaluate((element: HTMLButtonElement) => {
    const styles = window.getComputedStyle(element);
    return {
      color: styles.color,
      backgroundColor: styles.backgroundColor,
    };
  });

  await expect(pauseButtonStyles).toEqual({
    color: "rgb(0, 255, 0)",
    backgroundColor: "rgb(255, 255, 0)",
  });
});
