'use client';

import React, { useState } from 'react';
import { Play, Music, Sparkles, Heart, Disc3 } from 'lucide-react';
import { PRESET_PLAYLISTS, CATEGORIES, CategoryFilter, PlatformFilter } from '../lib/presets';

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface PresetGridProps {
  currentUrl: string;
  onSelectPreset: (url: string) => void;
  favorites: string[];
  onToggleFavorite: (url: string) => void;
  themeMode: 'dark' | 'light';
}

export const PresetGrid: React.FC<PresetGridProps> = ({
  currentUrl,
  onSelectPreset,
  favorites,
  onToggleFavorite,
  themeMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformFilter>('All');

  const isDark = themeMode === 'dark';

  const filteredPlaylists = PRESET_PLAYLISTS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'All' || item.platform === selectedPlatform;
    return matchesCategory && matchesPlatform;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Section Header & Category / Platform Filters */}
      <div
        className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b pb-4 ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}
      >
        <div>
          <h2 className="text-2xl font-black flex items-center gap-2 tracking-tight">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Curated Spotify & YouTube Playlists
          </h2>
          <p className={`text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
            Hand-picked live streams & playlists across Spotify and YouTube
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Platform Filter Toggle */}
          <div
            className={`flex items-center gap-1 p-1.5 rounded-full border shadow-inner ${
              isDark ? 'bg-zinc-950 border-white/15' : 'bg-slate-100 border-slate-300'
            }`}
          >
            <button
              onClick={() => setSelectedPlatform('All')}
              className={`px-3.5 py-1 text-xs font-bold rounded-full transition ${
                selectedPlatform === 'All'
                  ? isDark
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'bg-white text-slate-900 shadow-2xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Platforms
            </button>
            <button
              onClick={() => setSelectedPlatform('spotify')}
              className={`flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold rounded-full transition ${
                selectedPlatform === 'spotify'
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <Disc3 className="w-3.5 h-3.5" /> Spotify
            </button>
            <button
              onClick={() => setSelectedPlatform('youtube')}
              className={`flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold rounded-full transition ${
                selectedPlatform === 'youtube'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-rose-400 hover:text-rose-300'
              }`}
            >
              <YoutubeIcon className="w-3.5 h-3.5" /> YouTube
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 text-xs font-bold rounded-full whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? isDark
                      ? 'bg-white text-black font-extrabold shadow-md'
                      : 'bg-slate-900 text-white font-extrabold shadow-md'
                    : isDark
                    ? 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Playlist Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredPlaylists.map((playlist) => {
          const isPlaying = currentUrl.includes(playlist.id) || currentUrl === playlist.url;
          const isFav = favorites.includes(playlist.url);
          const isYT = playlist.platform === 'youtube';

          return (
            <div
              key={playlist.id}
              onClick={() => onSelectPreset(playlist.url)}
              className={`group relative border-2 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden ${
                isDark
                  ? 'bg-zinc-950/80 backdrop-blur-2xl border-white/10 hover:border-emerald-500/50 shadow-black/80'
                  : 'bg-white/95 backdrop-blur-xl border-slate-200 hover:border-emerald-500/50 shadow-md'
              } ${
                isPlaying
                  ? isYT
                    ? 'border-rose-500 ring-4 ring-rose-500/20 bg-zinc-900'
                    : 'border-emerald-500 ring-4 ring-emerald-500/20 bg-zinc-900'
                  : ''
              }`}
            >
              {/* Top ambient color accent */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${playlist.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Cover Image & Play Overlay */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3.5 bg-black shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={playlist.imageUrl}
                  alt={playlist.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Platform Badge Tag */}
                <div
                  className={`absolute top-2.5 left-2.5 px-2.5 py-1 text-[10px] font-black tracking-wider uppercase rounded-full shadow-lg flex items-center gap-1 ${
                    isYT ? 'bg-rose-600 text-white' : 'bg-emerald-500 text-black'
                  }`}
                >
                  {isYT ? <YoutubeIcon className="w-3 h-3" /> : <Music className="w-3 h-3" />}
                  {isPlaying ? 'Now Playing' : playlist.platform}
                </div>

                {/* Favorite Heart Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(playlist.url);
                  }}
                  className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
                    isFav
                      ? 'bg-rose-500 text-white shadow-lg scale-110'
                      : 'bg-black/60 text-white/80 hover:bg-black/90 hover:text-white'
                  }`}
                  title={isFav ? 'Remove Favorite' : 'Save Favorite'}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                </button>

                {/* Floating Play Button on Hover */}
                <div
                  className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${
                    isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition duration-300 ${
                      isYT ? 'bg-rose-600' : 'bg-emerald-500 text-black'
                    }`}
                  >
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Playlist Details */}
              <div className="relative space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`font-black text-base transition-colors line-clamp-1 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    } ${isYT ? 'group-hover:text-rose-400' : 'group-hover:text-emerald-400'}`}
                  >
                    {playlist.title}
                  </h3>
                </div>

                <p
                  className={`text-xs line-clamp-2 font-medium ${
                    isDark ? 'text-zinc-400' : 'text-slate-500'
                  }`}
                >
                  {playlist.description}
                </p>

                {/* Tags and Stats */}
                <div
                  className={`pt-2.5 flex items-center justify-between text-[11px] border-t ${
                    isDark ? 'border-white/10 text-zinc-400' : 'border-slate-200 text-slate-600 font-semibold'
                  }`}
                >
                  <span
                    className={`font-bold ${
                      isYT ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {playlist.tracksCount}
                  </span>
                  <span className="font-bold">{playlist.followers}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
