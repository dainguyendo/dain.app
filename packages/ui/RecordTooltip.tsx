import { SimplifiedTrack } from "../spotify/types";
import { Text } from "./Text";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

interface Props {
  track: SimplifiedTrack;
  children?: React.ReactNode;
}

export const RecordTooltip: React.FC<Props> = ({ children, track }) => {
  return (
    <Tooltip>
      <TooltipContent side="left" sideOffset={5} css={{ vs: "$1" }}>
        <Text bold variant="white" size="3">
          {track.name}
        </Text>
        <Text variant="white">{track.artists}</Text>
      </TooltipContent>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
    </Tooltip>
  );
};
