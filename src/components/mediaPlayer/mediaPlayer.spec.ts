import { expect, test } from "@sand4rt/experimental-ct-web";
import { MediaPlayer } from "./mediaPlayer";

test("should create", async ({ mount }) => {
  const component = await mount(MediaPlayer);
  await expect(component).toBeTruthy();
});

test("should allow for slotting of play button", async ({ mount }) => {});

test("should allow for slotting of pause button", async ({ mount }) => {});

test("should allow for styling the play button through css parts", async ({ mount }) => {});

test("should allow for styling the pause button through css parts", async ({ mount }) => {});

test.describe("media controls and media player interaction", () => {
  test("should not play audio when first loaded", async ({ mount }) => {});

  test("should play audio when play button is clicked", async ({ mount }) => {});

  test("should pause audio when pause button is clicked", async ({ mount }) => {});

  test("should resume from the same position when play button is clicked after pause", async ({ mount }) => {});

  test("should go to the beginning when the audio finishes", async ({ mount }) => {});

  test("should start playing from the beginning again once the audio finishes", async ({ mount }) => {});
});
