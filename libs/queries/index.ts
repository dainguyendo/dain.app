export async function getRecentTracks(_key: string, limit: number = 20) {
  const response = await fetch(`/api/recent-tracks?limit=${limit}`);
  const data: SpotifyApi.UsersRecentlyPlayedTracksResponse = await response.json();
  return data;
}
