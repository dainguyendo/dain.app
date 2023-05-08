import TracksModal from "@/app/@modal/(.)tracks/[id]/TracksModal";
import { formatToSimplifiedTrack, getTrack } from "@/spotify";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id: trackId } }: Props) {
  const data = await getTrack(trackId);
  const track = formatToSimplifiedTrack(data);

  return <TracksModal track={track} />;
}
