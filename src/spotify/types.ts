export interface SimplifiedTrack {
  id: SpotifyApi.PlayHistoryObject["track"]["id"];
  name: SpotifyApi.PlayHistoryObject["track"]["name"];
  uri: SpotifyApi.PlayHistoryObject["track"]["uri"];
  albumImageUrl: string;
  artists: string;
  previewUrl: SpotifyApi.PlayHistoryObject["track"]["preview_url"];
}
