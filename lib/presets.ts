import { MediaPlatform } from './urlParser';

export interface PresetPlaylist {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  platform: MediaPlatform;
  category: 'Top Charts' | 'Chill & Lofi' | 'Focus & Study' | 'Workout & Energy' | 'Classical & Jazz' | 'Retro & Rock';
  url: string;
  imageUrl: string;
  accentColor: string;
  tracksCount: string;
  followers: string;
  tags: string[];
}

export const CATEGORIES = [
  'All',
  'Top Charts',
  'Chill & Lofi',
  'Focus & Study',
  'Workout & Energy',
  'Classical & Jazz',
  'Retro & Rock',
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];
export type PlatformFilter = 'All' | 'spotify' | 'youtube';

export const PRESET_PLAYLISTS: PresetPlaylist[] = [
  {
    id: 'kya-khoob-lagti-ho-yt',
    title: 'Kya Khoob Lagti Ho',
    subtitle: 'Mukesh & Kanchan - Dharmatma (1975)',
    description: 'Classic Bollywood romantic song featuring Hema Malini & Feroz Khan.',
    platform: 'youtube',
    category: 'Retro & Rock',
    url: 'https://www.youtube.com/watch?v=47qE1dlDIAg',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-rose-500/30 to-red-600/10',
    tracksCount: 'Classic Hit',
    followers: 'YouTube Track',
    tags: ['YouTube', 'Bollywood', 'Retro'],
  },
  {
    id: 'top-hits-spotify',
    title: "Today's Top Hits",
    subtitle: "Spotify's biggest playlist",
    description: "Hottest 50 tracks on the planet right now. Updated constantly.",
    platform: 'spotify',
    category: 'Top Charts',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-emerald-500/30 to-green-600/10',
    tracksCount: '50 Tracks',
    followers: '34M+',
    tags: ['Spotify', 'Pop', 'Trending'],
  },
  {
    id: 'synthwave-yt',
    title: 'Synthwave Radio Live',
    subtitle: 'Chill Synthwave / Retro / Cyberpunk',
    description: 'Retro 80s futuristic synthwave radio playlist on YouTube.',
    platform: 'youtube',
    category: 'Top Charts',
    url: 'https://www.youtube.com/watch?v=4xDzrJKXOOY',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-purple-500/30 to-pink-600/10',
    tracksCount: '24/7 Music',
    followers: '2.5M+ Views',
    tags: ['YouTube', 'Synthwave', 'Vaporwave'],
  },
  {
    id: 'custom-spotify-playlist',
    title: 'Custom Spotify Mix',
    subtitle: 'Curated Spotify Hits',
    description: 'Custom hand-picked Spotify playlist with top tracks.',
    platform: 'spotify',
    category: 'Chill & Lofi',
    url: 'https://open.spotify.com/playlist/5NqDXfrd00Dh16H490j8Oo',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-emerald-500/30 to-green-600/10',
    tracksCount: 'Playlist Tracks',
    followers: 'Spotify Playlist',
    tags: ['Spotify', 'Playlist', 'Hits'],
  },
  {
    id: 'deep-focus-spotify',
    title: 'Deep Focus',
    subtitle: 'Keep calm and focus',
    description: 'Ambient, post-rock, and atmospheric soundscapes for deep work sessions.',
    platform: 'spotify',
    category: 'Focus & Study',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-cyan-500/30 to-blue-600/10',
    tracksCount: '180 Tracks',
    followers: '4.2M+',
    tags: ['Spotify', 'Focus', 'Ambient'],
  },
  {
    id: 'suzume-radwimps-yt',
    title: 'Suzume',
    subtitle: 'RADWIMPS feat. Toaka',
    description: 'Official theme song for Suzume by RADWIMPS feat. Toaka.',
    platform: 'youtube',
    category: 'Top Charts',
    url: 'https://www.youtube.com/watch?v=Xs0Lxif1u9E',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-amber-500/30 to-orange-600/10',
    tracksCount: 'Official Lyric Video',
    followers: 'YouTube Track',
    tags: ['YouTube', 'RADWIMPS', 'Suzume'],
  },
  {
    id: 'beast-mode-spotify',
    title: 'Beast Mode',
    subtitle: 'Ultimate workout motivation',
    description: 'High energy hip-hop, electronic, and rock to push through your workout.',
    platform: 'spotify',
    category: 'Workout & Energy',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-rose-500/30 to-red-600/10',
    tracksCount: '75 Tracks',
    followers: '9.8M+',
    tags: ['Spotify', 'Workout', 'EDM'],
  },
  {
    id: 'peaceful-piano-spotify',
    title: 'Peaceful Piano',
    subtitle: 'Relaxing acoustic piano',
    description: 'Beautiful contemporary piano compositions to soothe the soul.',
    platform: 'spotify',
    category: 'Classical & Jazz',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-indigo-500/30 to-violet-600/10',
    tracksCount: '210 Tracks',
    followers: '7.1M+',
    tags: ['Spotify', 'Piano', 'Relaxing'],
  },
];
