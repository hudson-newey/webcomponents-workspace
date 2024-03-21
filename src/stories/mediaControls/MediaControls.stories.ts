import { Meta, StoryObj } from "@storybook/web-components";
import { MediaControlsProps } from "../../components/mediaControls/mediaControls";
import "../../components/mediaControls/mediaControls";
import { html } from "lit";

type Story = StoryObj<MediaControlsProps>;

const src = "http://localhost:5500/media_example.flac";
const meta: Meta<MediaControlsProps> = {
  title: "Media Controls",
  // component: "oe-media-controls",
  render: (args) => html`<oe-media-controls src=${args.src}> </oe-media-controls>`,
};

export default meta;

export const MediaControlsWithData: Story = {
  args: {
    src,
  },
};

export const MediaControlsWithStartingPoint: Story = {
  args: {
    currentTime: 2,
    src,
  },
};

export const MediaControlsWithSlotSource: Story = {
  args: {
    source: "http://localhost:5500/media_example.flac",
  },
};

export const EmptyMediaControlsWithoutData: Story = {};

export const DisabledMediaControls: Story = {
  args: {
    disabled: true,
    src,
  },
};
