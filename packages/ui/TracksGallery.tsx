import * as React from "react";
import { getArtists } from "../spotify/utils";
import { Button } from "./Button";
import { motionRecordVariants, Record } from "./Record";
import { Text } from "./Text";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

interface Props {
  tracks: SpotifyApi.PlayHistoryObject[];
  onTrackClick?: (track: SpotifyApi.PlayHistoryObject) => void;
}

export const TracksGallery = ({ tracks, onTrackClick }: Props) => {
  return (
    <>
      {tracks.map((item, idx) => {
        const track = item.track as SpotifyApi.TrackObjectFull;
        const albumImage = track.album.images[0];
        return (
          <Tooltip key={item.track.id}>
            <TooltipContent side="left" sideOffset={5} css={{ vs: "$1" }}>
              <Text bold variant="white" size="3">
                {item.track.name}
              </Text>
              <Text variant="white">{getArtists(item.track.artists)}</Text>
            </TooltipContent>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="naked"
                onClick={() => {
                  onTrackClick && onTrackClick(item);
                }}
                css={{ p: 0 }}
              >
                <Record
                  layoutId={item.track.id}
                  src={albumImage.url}
                  height={125}
                  width={125}
                  custom={idx}
                  variants={motionRecordVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        );
      })}
    </>
  );
};
