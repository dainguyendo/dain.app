import { formatToSimplifiedTrack, getTrack } from "@/spotify";
import { Metadata } from "next";
import TrackPage from "./track-page";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getTrack(params.id);
  const track = formatToSimplifiedTrack(data);
  return { title: `${track.name} - ${track.artists}` };
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
