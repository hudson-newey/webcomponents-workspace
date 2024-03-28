import { expect, test } from "@sand4rt/experimental-ct-web";
import { mediaControlsFixture } from "./mediaControls.fixture.spec";
import { MediaControls } from "./mediaControls";
import { insertHtml } from "../../tests/helpers";

test.describe("unit tests", () => {
  test("test", async ({ mount, page }) => {
    await insertHtml(page, `<audio id="test"></audio>`);

    let outside;

    const component = await mount(MediaControls, {
      props: {
        for: "test",
      },
      on: {
        "test-a": (event) => {
          outside = event;
        },
      },
    });

    await expect(outside).toStrictEqual(undefined);

    const result = await component.evaluate((element) => {
      const x = element?.["playing"];
      console.log(x);
      return x;
    });

    await expect(result).toBe(false);

    await component.evaluate((element: MediaControls) => {
      element.toggleAudio();
    });

    console.log(outside);
    await expect(outside).toStrictEqual({ value: "playing" });

    const result2 = await component.evaluate((element: MediaControls) => {
      return element.playing;
    });

    await expect(result2).toBe(true);
  });
});

mediaControlsFixture.describe("audio element communication", () => {
  mediaControlsFixture.beforeEach(async ({ fixture }) => {
    await fixture.create();
  });

  // this test exists because if you don't correctly import or mount the media controls component
  // it will still create the element tag, but with no shadow content or error indicating that mounting
  // the component failed and will make all other tests fail because no content = a "hidden" state
  // therefore, by having a mounting smoke test, we can ensure that this test will fail only if
  // we have mounted the component incorrectly
  mediaControlsFixture("creating a visible web component", async ({ page }) => {
    const mediaControls = await page.locator("oe-media-controls");
    await expect(mediaControls).toBeVisible();
  });

  mediaControlsFixture("state before interaction", async ({ fixture }) => {
    const isPlaying = await fixture.isPlayingAudio();
    await expect(isPlaying).toBe(false);
  });

  mediaControlsFixture("play functionality", async ({ fixture }) => {
    await fixture.toggleAudio();
    const isPlaying = await fixture.isPlayingAudio();
    await expect(isPlaying).toBe(true);
  });

  mediaControlsFixture("play pause functionality", async ({ fixture }) => {
    // start playing audio
    // by clicking the action button again, we should stop playing audio
    await fixture.toggleAudio();
    await fixture.toggleAudio();

    const isPlaying = await fixture.isPlayingAudio();

    await expect(isPlaying).toBe(false);
  });
});

mediaControlsFixture.describe("slots", () => {
  mediaControlsFixture("custom play and pause icon via slots", async ({ fixture }) => {
    fixture.updateSlot(`
      <div slot="play-icon">Play Me!</div>
      <div slot="pause-icon">Pause<div>
    `);

    const expectedSlotText = ["Play Me!"];
    const realSlotText = await fixture.actionButtonSlotText();
    await expect(realSlotText).toEqual(expectedSlotText);

    // start playing audio so we can see the default pause icon
    await fixture.toggleAudio();

    const expectedPauseSlotText = ["Pause"];
    const realPauseSlotText = await fixture.actionButtonSlotText();
    await expect(realPauseSlotText.map((x) => x?.trim())).toEqual(expectedPauseSlotText);
  });
});

mediaControlsFixture.describe("css parts", () => {
  mediaControlsFixture.beforeEach(async ({ fixture }) => {
    await fixture.create();
  });

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

  mediaControlsFixture.beforeEach(async ({ page }) => {
    await page.addStyleTag({ content: cssPartsStyling });
  });

  mediaControlsFixture("custom styling for the default play/pause icons via css parts", async ({ fixture }) => {
    const playButtonStyles = await fixture.actionButtonStyles();
    await expect(playButtonStyles).toEqual({
      color: "rgb(255, 0, 0)",
      backgroundColor: "rgb(0, 0, 255)",
    });

    await fixture.toggleAudio();

    const pauseButtonStyles = await fixture.actionButtonStyles();
    await expect(pauseButtonStyles).toEqual({
      color: "rgb(0, 255, 0)",
      backgroundColor: "rgb(255, 255, 0)",
    });
  });

  mediaControlsFixture("custom styling for a custom play/pause slot via css parts", async ({ fixture }) => {
    const playButtonStyles = await fixture.actionButtonStyles();
    await expect(playButtonStyles).toEqual({
      color: "rgb(255, 0, 0)",
      backgroundColor: "rgb(0, 0, 255)",
    });

    await fixture.toggleAudio();

    const pauseButtonStyles = await fixture.actionButtonStyles();
    await expect(pauseButtonStyles).toEqual({
      color: "rgb(0, 255, 0)",
      backgroundColor: "rgb(255, 255, 0)",
    });
  });
});
