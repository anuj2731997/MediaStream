'use client';

import React from 'react';
import { Music, Radio, Sparkles, Shuffle, Sun, Moon } from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';
import { PRESET_PLAYLISTS } from '../lib/presets';

interface HeaderProps {
  onSelectUrl: (url: string) => void;
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectUrl, themeMode, onToggleTheme }) => {
  const handleRandomPlaylist = () => {
    const randomIndex = Math.floor(Math.random() * PRESET_PLAYLISTS.length);
    onSelectUrl(PRESET_PLAYLISTS[randomIndex].url);
  };

  const isDark = themeMode === 'dark';

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-2xl border-b transition-all duration-300 px-4 lg:px-8 py-3.5 ${
        isDark
          ? 'bg-zinc-950/80 border-white/10 text-white shadow-2xl shadow-black/50'
          : 'bg-white/85 border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand logo & status */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={handleRandomPlaylist}>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full blur-md opacity-80 group-hover:opacity-100 transition duration-300"></div>
            <div
              className={`relative w-11 h-11 rounded-full flex items-center justify-center border text-emerald-400 ${
                isDark ? 'bg-black border-emerald-500/50 shadow-inner' : 'bg-slate-900 border-emerald-500/50'
              }`}
            >
              <Music className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight flex items-center gap-1.5">
                Media<span className="text-emerald-400 font-black">Stream</span>
              </h1>
              <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1 shadow-xs">
                <Radio className="w-3 h-3 text-emerald-400 animate-ping" />
                Live Player
              </span>
            </div>
            <p className={`text-xs font-medium hidden sm:block ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              Stream Spotify & YouTube playlists, albums, videos, or tracks
            </p>
          </div>
        </div>

        {/* Center equalizer visualizer */}
        <div
          className={`hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full border shadow-inner ${
            isDark ? 'bg-zinc-900/90 border-white/10' : 'bg-slate-100/90 border-slate-200'
          }`}
        >
          <AudioVisualizer isPlaying={true} barCount={14} />
          <span
            className={`text-xs font-semibold border-l pl-3 flex items-center gap-1.5 ${
              isDark ? 'text-zinc-300 border-white/10' : 'text-slate-700 border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            High Fidelity Audio
          </span>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all active:scale-95 shadow-md ${
              isDark
                ? 'bg-zinc-900 hover:bg-zinc-800 text-amber-300 border-white/15 hover:border-amber-400/50'
                : 'bg-slate-100 hover:bg-slate-200 text-indigo-700 border-slate-300'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          {/* Random Playlist */}
          <button
            onClick={handleRandomPlaylist}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-full border transition-all active:scale-95 shadow-md ${
              isDark
                ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:border-emerald-400'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5 text-emerald-400" />
            Surprise Me
          </button>
        </div>
      </div>
    </header>
  );
};
