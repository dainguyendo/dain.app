import { SimplifiedTrack } from "../spotify/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

interface Props {
  track: SimplifiedTrack;
  children?: React.ReactNode;
}

export const RecordTooltip: React.FC<Props> = ({ children, track }) => {
  return (
    <Tooltip>
      <TooltipContent side="left" sideOffset={5}>
        <span>{track.name}</span>
        <span>{track.artists}</span>
      </TooltipContent>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
    </Tooltip>
  );
};
