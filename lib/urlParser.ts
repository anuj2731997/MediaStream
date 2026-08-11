export type MediaPlatform = 'spotify' | 'youtube';
export type SpotifyContentType = 'playlist' | 'album' | 'track' | 'artist' | 'episode' | 'show';
export type YouTubeContentType = 'playlist' | 'video';

export interface ParsedMediaUrl {
  isValid: boolean;
  platform: MediaPlatform;
  contentType?: SpotifyContentType | YouTubeContentType;
  id?: string;
  embedUrl?: string;
  webUrl?: string;
  uri?: string;
  rawInput: string;
  errorMessage?: string;
}

/**
 * Parses Spotify and YouTube URLs or URIs and returns structured embed details.
 * Supports theme parameter (themeMode = 'dark' -> theme=0, 'light' -> theme=1)
 */
export function parseMediaUrl(input: string, themeMode: 'dark' | 'light' = 'dark'): ParsedMediaUrl {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      isValid: false,
      platform: 'spotify',
      rawInput: input,
      errorMessage: 'Please enter a Spotify or YouTube link.',
    };
  }

  const spotifyThemeParam = themeMode === 'light' ? '1' : '0';

  // -------------------------------------------------------------
  // 1. YOUTUBE PARSING
  // -------------------------------------------------------------
  const ytPlaylistMatch = trimmed.match(/(?:youtube\.com\/(?:playlist|watch)\?.*list=)([a-zA-Z0-9_-]+)/i);
  if (ytPlaylistMatch) {
    const playlistId = ytPlaylistMatch[1];
    return {
      isValid: true,
      platform: 'youtube',
      contentType: 'playlist',
      id: playlistId,
      embedUrl: `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&autoplay=1`,
      webUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
      rawInput: input,
    };
  }

  const ytVideoMatch = trimmed.match(
    (/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i)
  );
  if (ytVideoMatch) {
    const videoId = ytVideoMatch[1];
    return {
      isValid: true,
      platform: 'youtube',
      contentType: 'video',
      id: videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1`,
      webUrl: `https://www.youtube.com/watch?v=${videoId}`,
      rawInput: input,
    };
  }

  // -------------------------------------------------------------
  // 2. SPOTIFY PARSING
  // -------------------------------------------------------------
  const spotifyUriMatch = trimmed.match(/^spotify:(playlist|album|track|artist|episode|show):([a-zA-Z0-9]{22})/i);
  if (spotifyUriMatch) {
    const type = spotifyUriMatch[1].toLowerCase() as SpotifyContentType;
    const id = spotifyUriMatch[2];
    return buildSpotifyParsedResult(type, id, trimmed, spotifyThemeParam);
  }

  const spotifyUrlMatch = trimmed.match(/open\.spotify\.com\/(?:embed\/)?(playlist|album|track|artist|episode|show)\/([a-zA-Z0-9]{22})/i);
  if (spotifyUrlMatch) {
    const type = spotifyUrlMatch[1].toLowerCase() as SpotifyContentType;
    const id = spotifyUrlMatch[2];
    return buildSpotifyParsedResult(type, id, trimmed, spotifyThemeParam);
  }

  if (/^[a-zA-Z0-9]{22}$/.test(trimmed)) {
    return buildSpotifyParsedResult('playlist', trimmed, trimmed, spotifyThemeParam);
  }

  return {
    isValid: false,
    platform: 'spotify',
    rawInput: input,
    errorMessage: 'Invalid media link. Please paste a valid Spotify or YouTube link.',
  };
}

function buildSpotifyParsedResult(
  type: SpotifyContentType,
  id: string,
  rawInput: string,
  themeParam: string = '0'
): ParsedMediaUrl {
  return {
    isValid: true,
    platform: 'spotify',
    contentType: type,
    id,
    embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=${themeParam}&autoplay=1`,
    webUrl: `https://open.spotify.com/${type}/${id}`,
    uri: `spotify:${type}:${id}`,
    rawInput,
  };
}

export const parseSpotifyUrl = parseMediaUrl;
export const DEFAULT_SPOTIFY_PLAYLIST = 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M';
export const DEFAULT_YOUTUBE_PLAYLIST = 'https://www.youtube.com/playlist?list=PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU';
