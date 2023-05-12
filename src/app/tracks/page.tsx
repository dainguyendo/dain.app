import {
  formatToSimplifiedTrack,
  getRecentTracks,
  uniqueTrack,
} from "@/spotify";
import TracksPage from "./tracks-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tracks",
  description: "What I’m listening to",
};

export default async function Page() {
  const recentTracks = await getRecentTracks(50);
  const data = recentTracks.items
    .filter(uniqueTrack)
    .map((item) =>
      formatToSimplifiedTrack(item.track as SpotifyApi.TrackObjectFull)
    );

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <TracksPage recentTracks={data} />
    </div>
  );
}
