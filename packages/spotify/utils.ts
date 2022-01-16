export function getArtists(
  artists: SpotifyApi.ArtistObjectSimplified[]
): string {
  const str = artists.map((artist) => artist.name).join(", ");
  return str;
}
