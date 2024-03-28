import { test } from "@sand4rt/experimental-ct-web";
import type { Page } from "@playwright/test";

class TestPage {
  public constructor(public readonly page: Page) {}

  public component = () => this.page.locator("oe-media-controls").first();
  public actionButton = this.page.locator("oe-media-controls button").first();
  public actionButtonSlot = () => this.page.locator("oe-media-controls button > slot").first();
  public audioOutlet = () => this.page.locator("audio").first();

  public async create(slotTemplate: string = "") {
    // await this.page.goto("http://localhost:3000/src/components/mediaControls/fixtures/mediaControls.spec.html");
    await this.page.setContent(`
        <oe-media-controls for="media">
            ${slotTemplate ?? ""}
        </oe-media-controls>
        <audio id="media" src="/example.flac"></audio>
    `);
    await this.page.waitForLoadState("networkidle");
  }

  public async updateSlot(content: string) {
    const componentElement = await this.component();
    await componentElement.evaluate((element: HTMLElement, content: string) => {
      element.innerHTML = content;
    }, content);
  }

  public async toggleAudio() {
    const actionButtonElement = await this.actionButton;
    await actionButtonElement.click({ force: true });
  }

  public async isPlayingAudio() {
    const audioElement = await this.audioOutlet();
    return await audioElement.evaluate((element: HTMLAudioElement) => !element.paused);
  }

  public async actionButtonSlotText(): Promise<(string | null)[]> {
    const actionButtonSlotElement = await this.page.locator("oe-media-controls button > slot").first();
    return await actionButtonSlotElement.evaluate((element: HTMLSlotElement) =>
      element.assignedElements().map((element) => element.textContent),
    );
  }

  public async actionButtonStyles() {
    const actionButtonElement = await this.actionButtonSlot();
    return await actionButtonElement.evaluate((element: HTMLButtonElement) => {
      const styles = window.getComputedStyle(element);

      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
      };
    });
  }
}

export const mediaControlsFixture = test.extend<{ fixture: TestPage }>({
  fixture: async ({ page }, run) => {
    const fixture = new TestPage(page);
    await fixture.create();
    await run(fixture);
  },
});

// export const mediaControlsFixtureWithSlot = test.extend<{ fixture: TestPage }>({
//   fixture: async ({ page }, run) => {
//     const fixture = new TestPage(
//       page,
//       `<div slot="play-icon">Play Me!</div>
//        <div slot="pause-icon">Pause<div>`,
//     );
//     await fixture.create();
//     await run(fixture);
//   },
// });
