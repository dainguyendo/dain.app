export async function getRecentTracks(_key: string, limit: number = 20) {
  const response = await fetch(`/api/recent-tracks?limit=${limit}`);

  if (response.status !== 200) {
    throw new Error("Unexpected response");
  }

  const data: SpotifyApi.UsersRecentlyPlayedTracksResponse = await response.json();
  return data;
}
