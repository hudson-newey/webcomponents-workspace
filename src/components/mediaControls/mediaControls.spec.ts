import { expect, test } from "@sand4rt/experimental-ct-web";

const audioSource = "/example.flac";
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

test.describe("audio element communication", () => {
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
});

test.describe("slots", () => {
  const slottedPlayButton = `<div slot="play-icon">Play Me!</div>`;
  const slottedPauseButton = `<div slot="pause-icon">Pause</div>`;

  test("custom play icon via slots", async ({ page }) => {
    await page.setContent(`
      <oe-media-controls for="media">
        ${slottedPlayButton}
      </oe-media-controls>
      <audio id="media" src="${audioSource}"></audio>
    `);

    const actionButton = await page.locator("oe-media-controls button > slot").first();
    const slotElementText = await actionButton.evaluate((element: HTMLSlotElement) =>
      element.assignedElements().map((element) => element.textContent),
    );

    await expect(slotElementText).toStrictEqual(["Play Me!"]);

    // the pause icon should still be the default because we haven't changed it with a slot
    await actionButton.click({ force: true });
    const pauseSlotElementText = await actionButton.evaluate((element: HTMLSlotElement) =>
      element.assignedElements().map((element) => element.textContent),
    );

    await expect(pauseSlotElementText).toHaveLength(0);
  });

  test("custom play and pause icon via slots", async ({ page }) => {
    await page.setContent(`
      <oe-media-controls for="media">
        ${slottedPlayButton}
        ${slottedPauseButton}
      </oe-media-controls>
      <audio id="media" src="${audioSource}"></audio>
    `);

    const actionButton = await page.locator("oe-media-controls button > slot").first();

    let slotTextContent: (string | null)[] = await actionButton.evaluate((element: HTMLSlotElement) =>
      element.assignedElements().map((element) => element.textContent),
    );

    // the slot should only have one assigned node at a time
    // eg. It should use the play icon slot when the audio is paused and the pause icon slot when the audio is playing
    // but never both at the same time
    await expect(slotTextContent).toStrictEqual(["Play Me!"]);

    // start playing audio so we can see the default pause icon
    await actionButton.click({ force: true });
    slotTextContent = await actionButton.evaluate((element: HTMLSlotElement) =>
      element.assignedElements().map((element) => element.textContent),
    );

    await expect(slotTextContent).toStrictEqual(["Pause"]);
  });
});

test.describe("css parts", () => {
  const cssPartsStyling = `
    oe-media-controls::part(play-icon) {
      color: rgb(255, 0, 0);
      background-color: rgb(0, 0, 255);
    }

    oe-media-controls::part(pause-icon) {
      color: rgb(0, 255, 0);
      background-color: rgb(255, 255, 0);
    }
  `;

  test("custom styling for the default play/pause icons via css parts", async ({ page }) => {
    await page.setContent(defaultContent);
    await page.addStyleTag({ content: cssPartsStyling });

    // because locators are lazily evaluated, we don't need to redeclare the locator
    // every time we want to fetch the state of the button
    // eg. We don't have to redeclare another locator later for the pause button, we can use the same one
    const actionButton = await page.locator("oe-media-controls button > slot").first();

    const playButtonStyles = await actionButton.evaluate((element: HTMLButtonElement) => {
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
    await actionButton.click({ force: true });

    const pauseButtonStyles = await actionButton.evaluate((element: HTMLButtonElement) => {
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

    await page.addStyleTag({ content: cssPartsStyling });

    const actionButton = await page.locator("oe-media-controls button > slot").first();

    const playButtonStyles = await actionButton.evaluate((element: HTMLButtonElement) => {
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
    await actionButton.click({ force: true });

    const pauseButtonStyles = await actionButton.evaluate((element: HTMLButtonElement) => {
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
});
