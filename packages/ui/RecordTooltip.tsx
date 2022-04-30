import { Text } from "./Text";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

interface Props {
  trackName: string;
  trackArtists: string;
  children?: React.ReactNode;
}

export const RecordTooltip: React.FC<Props> = ({
  children,
  trackArtists,
  trackName,
}) => {
  return (
    <Tooltip>
      <TooltipContent side="left" sideOffset={5} css={{ vs: "$1" }}>
        <Text bold variant="white" size="3">
          {trackName}
        </Text>
        <Text variant="white">{trackArtists}</Text>
      </TooltipContent>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
    </Tooltip>
  );
};
