import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify Playlist Web Player | Stream Any Spotify Music',
  description:
    'Paste any Spotify playlist, track, or album URL to play instantly with a modern glassmorphic web player interface. Curated presets, play history, and favorites included.',
  keywords: [
    'Spotify',
    'Spotify Playlist Player',
    'Spotify Embed',
    'Spotify Web Player',
    'Music Player',
    'Lofi Beats',
    'Top Hits',
  ],
  authors: [{ name: 'SpotifyStream' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased min-h-screen ambient-bg selection:bg-emerald-500 selection:text-black transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}
