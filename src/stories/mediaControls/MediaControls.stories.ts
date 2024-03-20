import { Meta, StoryObj } from "@storybook/web-components";
import { MediaControlsProps } from "../../components/mediaControls/mediaControls";
import "../../components/mediaControls/mediaControls";

const meta: Meta<MediaControlsProps> = {
  title: "Media Controls",
  component: "oe-media-controls",
  // render: (args) => html`<oe-media-controls></oe-media-controls>`,
};

export default meta;

const src = "http://localhost:5500/media_example.flac";

export const MediaControlsWithData: StoryObj<MediaControlsProps> = {
  args: {
    src,
  },
};

export const MediaControlsWithStartingPoint: StoryObj<MediaControlsProps> = {
  args: {
    currentTime: 2,
    src,
  },
};

export const EmptyMediaControlsWithoutData: StoryObj<MediaControlsProps> = {};

export const DisabledMediaControls: StoryObj<MediaControlsProps> = {
  args: {
    disabled: true,
    src,
  },
};
