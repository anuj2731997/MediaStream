'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { UrlInput } from '../components/UrlInput';
import { PlayerContainer } from '../components/PlayerContainer';
import { PresetGrid } from '../components/PresetGrid';
import { HistoryAndFavorites } from '../components/HistoryAndFavorites';
import { parseMediaUrl, DEFAULT_SPOTIFY_PLAYLIST } from '../lib/urlParser';
import { Music, ShieldCheck, Sparkles } from 'lucide-react';

interface HistoryItem {
  url: string;
  timestamp: number;
}

export default function Home() {
  const [currentUrl, setCurrentUrl] = useState<string>(DEFAULT_SPOTIFY_PLAYLIST);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  // Sync theme with HTML root class and local storage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme_mode') as 'dark' | 'light' | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeMode(savedTheme);
        if (savedTheme === 'light') {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleToggleTheme = () => {
    setThemeMode((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme_mode', newTheme);
      } catch {
        // Ignore
      }
      if (newTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
      return newTheme;
    });
  };

  // Load favorites & history from localStorage on initial render
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('spotify_player_favs');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }

      const savedHistory = localStorage.getItem('spotify_player_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save favorites to localStorage
  const handleToggleFavorite = (url: string) => {
    setFavorites((prev) => {
      let updated: string[];
      if (prev.includes(url)) {
        updated = prev.filter((item) => item !== url);
      } else {
        updated = [url, ...prev];
      }
      try {
        localStorage.setItem('spotify_player_favs', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  // Add URL to active player & update history
  const handleSelectUrl = (url: string) => {
    setCurrentUrl(url);

    // Smooth scroll to player so user can immediately click Play inside player
    setTimeout(() => {
      const playerEl = document.getElementById('player');
      if (playerEl) {
        playerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.url !== url);
      const updated = [{ url, timestamp: Date.now() }, ...filtered].slice(0, 30);
      try {
        localStorage.setItem('spotify_player_history', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('spotify_player_history');
    } catch {
      // Ignore
    }
  };

  const parsedData = parseMediaUrl(currentUrl, themeMode);
  const isCurrentFav =
    favorites.includes(currentUrl) ||
    (parsedData.webUrl ? favorites.includes(parsedData.webUrl) : false);

  const isDark = themeMode === 'dark';

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      <Header
        onSelectUrl={handleSelectUrl}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-12">
        {/* Hero Section Banner */}
        <section className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Spotify & YouTube Media Engine
          </div>

          <h1
            className={`text-3xl md:text-5xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'
              }`}
          >
            Play Any Spotify or YouTube Link
          </h1>

          <p className={`text-sm md:text-base max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Paste your favorite Spotify or YouTube playlist, album, or video URL below to stream instantly with full playback support.
          </p>
        </section>

        {/* Input Bar */}
        <section>
          <UrlInput
            currentUrl={currentUrl}
            onUrlSubmit={handleSelectUrl}
            themeMode={themeMode}
          />
        </section>

        {/* Active Embed Player */}
        <section className="scroll-mt-24" id="player">
          <PlayerContainer
            parsedData={parsedData}
            isFavorite={isCurrentFav}
            onToggleFavorite={handleToggleFavorite}
            onSelectYouTubeFallback={() =>
              handleSelectUrl('https://www.youtube.com/watch?v=47qE1dlDIAg')
            }
            themeMode={themeMode}
          />
        </section>

        {/* Curated Playlist Presets */}
        <section id="presets">
          <PresetGrid
            currentUrl={currentUrl}
            onSelectPreset={handleSelectUrl}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            themeMode={themeMode}
          />
        </section>

        {/* Favorites and History */}
        <section id="library">
          <HistoryAndFavorites
            history={history}
            favorites={favorites}
            currentUrl={currentUrl}
            onSelectUrl={handleSelectUrl}
            onToggleFavorite={handleToggleFavorite}
            onClearHistory={handleClearHistory}
            themeMode={themeMode}
          />
        </section>
      </main>

      {/* Modern Footer */}
      <footer
        className={`border-t backdrop-blur-xl mt-16 py-8 px-4 lg:px-8 text-xs transition-colors duration-300 ${isDark
          ? 'border-white/10 bg-zinc-950/80 text-zinc-500'
          : 'border-slate-200 bg-slate-100/90 text-slate-500'
          }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <Music className="w-3.5 h-3.5" />
            </div>
            <span className={`font-bold ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
              MediaStream Web App
            </span>
          </div>

          <p className="text-center md:text-left flex items-center gap-1">
            Built with Next.js, Tailwind CSS, Spotify & YouTube Embed Engine.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500">
              <ShieldCheck className="w-4 h-4" /> Dual-Engine Playback
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
