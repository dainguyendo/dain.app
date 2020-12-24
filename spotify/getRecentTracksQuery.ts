export async function getRecentTracksQuery(limit: number = 20) {
  const response = await fetch(`/api/recent-tracks?limit=${limit}`);

  if (response.status !== 200) {
    throw new Error("Unexpected response");
  }

  const data: SpotifyApi.UsersRecentlyPlayedTracksResponse = await response.json();
  return data;
}

export async function getRecentTrackQuery() {
  const recentTracks = await getRecentTracksQuery(1);
  const mostRecentTrack = recentTracks.items[0];
  return mostRecentTrack;
}
