import { expect, test } from "@sand4rt/experimental-ct-web";
import { MediaControls } from "../mediaControls/mediaControls";

test("should create", async ({ mount }) => {
  const component = await mount(MediaControls);
  await expect(component).toBeTruthy();
});
