import { Meta, StoryObj } from "@storybook/web-components";
import { MediaControlsProps } from "../../components/mediaControls/mediaControls";
import "../../components/mediaControls/mediaControls";

const meta: Meta<MediaControlsProps> = {
  title: "Media Controls",
  component: "oe-media-controls",
  parameters: {
    docs: {
      description: {
        component:
          "A simple media player with play/pause and seek functionality that can be used with the open ecoacoustics spectrograms and components.",
      },
    },
  },
};

export default meta;

export const MediaControlsWithData: StoryObj<MediaControlsProps> = {
  args: {
    src: "https://api.search.acousticobservatory.org/api/v1/a2o/audio_recordings/download/flac/966100?start_offset=2210&end_offset=2215",
  },
};

export const EmptyMediaControlsWithoutData: StoryObj<MediaControlsProps> = {};

export const MediaControlsWithStartingPoint: StoryObj<MediaControlsProps> = {
  args: {
    src: "https://api.search.acousticobservatory.org/api/v1/a2o/audio_recordings/download/flac/966100?start_offset=2210&end_offset=2215",
    currentTime: 2,
  },
};
