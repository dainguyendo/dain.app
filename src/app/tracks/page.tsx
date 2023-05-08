import {
  formatToSimplifiedTrack,
  getRecentTracks,
  uniqueTrack,
} from "@/spotify";
import TracksPage from "./tracks-page";

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
