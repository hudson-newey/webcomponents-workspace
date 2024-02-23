import { setCustomElementsManifest, type Preview } from "@storybook/web-components";
import manifest from "virtual:vite-plugin-cem/custom-elements-manifest";

setCustomElementsManifest(manifest);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
