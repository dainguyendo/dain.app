import { formatToSimplifiedTrack, getTrack } from "@/spotify";
import { TrackPage } from "./track-page";
import Link from "next/link";
import { Link1Icon } from "@radix-ui/react-icons";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id: trackId } }: Props) {
  const data = await getTrack(trackId);
  const track = formatToSimplifiedTrack(data);

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <TrackPage track={track} />
    </main>
  );
}
