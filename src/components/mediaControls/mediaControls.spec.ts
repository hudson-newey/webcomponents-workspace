import { expect, test } from "@sand4rt/experimental-ct-web";
import { MediaControls } from "../mediaControls/mediaControls";

const audioSource = "https://www.w3schools.com/tags/horse.ogg";

test("should create", async ({ mount }) => {
  const component = await mount(MediaControls);
  await expect(component).toBeTruthy();
});

test("state before interaction", async ({ context }) => {
  const page = await context.newPage();
  await page.setContent(`
    <audio id="audio" src="${audioSource}"></audio>
    <oe-media-controls for="audio"></oe-media-controls>
  `);

  const audioElement = await page.locator("audio").first();
  const isPaused = await audioElement.evaluate((element: HTMLAudioElement) => element.paused);

  await expect(isPaused).toBe(true);
});

// test is not working because oe-media-controls is "hidden"
test("play functionality", async ({ context }) => {
  const page = await context.newPage();
  await page.setContent(`
    <audio id="audio" src="${audioSource}"></audio>
    <oe-media-controls for="audio"></oe-media-controls>
  `);

  await page.waitForLoadState("networkidle");

  const playButton = await page.locator("oe-media-controls button").first();

  await playButton.click({ force: true });

  const audioElement = await page.locator("audio");
  const isPaused = await audioElement.evaluate((element: HTMLAudioElement) => element.paused);

  await expect(isPaused).toBe(false);
});

test("play pause functionality", async () => {});

test("custom play icon via slots", async () => {});

test("custom pause icon via slots", async () => {});

test("custom styling for the default play icon via css parts", async () => {});

test("custom styling for the default pause icon via css parts", async () => {});

test("custom styling for a custom play icon via css parts", async () => {});

test("custom styling for a custom pause icon via css parts", async () => {});
