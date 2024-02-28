import { Meta, StoryObj } from "@storybook/web-components";
import { MediaControlsProps } from "../../components/mediaControls/mediaControls";
import "../../components/mediaControls/mediaControls";
import { html } from "lit";

const meta: Meta<MediaControlsProps> = {
  title: "Media Controls",
  component: "oe-media-controls",
  //render: (args) => html`<oe-media-controls ${args}></oe-media-controls>`,
};

export default meta;

export const MediaControlsWithData: StoryObj<MediaControlsProps> = {
  args: {
    src: "https://api.search.acousticobservatory.org/api/v1/a2o/audio_recordings/download/flac/966100?start_offset=2210&end_offset=2215",
  },
};

export const MediaControlsWithStartingPoint: StoryObj<MediaControlsProps> = {
  args: {
    src: "https://api.search.acousticobservatory.org/api/v1/a2o/audio_recordings/download/flac/966100?start_offset=2210&end_offset=2215",
    currentTime: 2,
  },
};

export const EmptyMediaControlsWithoutData: StoryObj<MediaControlsProps> = {};

export const EmptyMediaControlsThatAllowsUserInput: StoryObj<MediaControlsProps> = {
  args: {
    allowsUserInput: true,
  },
};
