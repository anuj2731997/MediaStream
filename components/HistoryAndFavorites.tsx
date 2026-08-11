'use client';

import React, { useState } from 'react';
import { History, Heart, Play, Trash2, ExternalLink, Music2 } from 'lucide-react';
import { parseMediaUrl } from '../lib/urlParser';

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface HistoryItem {
  url: string;
  timestamp: number;
}

interface HistoryAndFavoritesProps {
  history: HistoryItem[];
  favorites: string[];
  currentUrl: string;
  onSelectUrl: (url: string) => void;
  onToggleFavorite: (url: string) => void;
  onClearHistory: () => void;
  themeMode: 'dark' | 'light';
}

export const HistoryAndFavorites: React.FC<HistoryAndFavoritesProps> = ({
  history,
  favorites,
  currentUrl,
  onSelectUrl,
  onToggleFavorite,
  onClearHistory,
  themeMode,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'favorites'>('favorites');

  const isDark = themeMode === 'dark';

  return (
    <div
      className={`w-full max-w-7xl mx-auto space-y-4 border-2 rounded-2xl p-4 md:p-6 backdrop-blur-2xl transition-all ${
        isDark
          ? 'bg-zinc-950/80 border-white/10 shadow-2xl shadow-black/80'
          : 'bg-white/95 border-slate-200 shadow-md'
      }`}
    >
      {/* Tab Switcher Header */}
      <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-extrabold rounded-xl transition ${
              activeTab === 'favorites'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xs'
                : isDark
                ? 'text-zinc-400 hover:text-white bg-zinc-900/80'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/30" />
            Saved Bookmarks ({favorites.length})
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-extrabold rounded-xl transition ${
              activeTab === 'history'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xs'
                : isDark
                ? 'text-zinc-400 hover:text-white bg-zinc-900/80'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            <History className="w-4 h-4 text-emerald-400" />
            Recent History ({history.length})
          </button>
        </div>

        {activeTab === 'history' && history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear History
          </button>
        )}
      </div>

      {/* Favorites List View */}
      {activeTab === 'favorites' && (
        <div>
          {favorites.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${isDark ? 'bg-zinc-900 text-zinc-400' : 'bg-slate-100 text-slate-400'}`}>
                <Heart className="w-6 h-6" />
              </div>
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>No bookmarked playlists yet</p>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                Click the heart icon on any player or preset card to bookmark your favorite playlists!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {favorites.map((url) => {
                const parsed = parseMediaUrl(url, themeMode);
                const isPlaying = currentUrl === url;
                const isYT = parsed.platform === 'youtube';

                return (
                  <div
                    key={url}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition ${
                      isPlaying
                        ? isYT
                          ? 'bg-rose-500/15 border-rose-500 text-rose-400 font-bold shadow-lg shadow-rose-500/10'
                          : 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold shadow-lg shadow-emerald-500/10'
                        : isDark
                        ? 'bg-zinc-900/90 border-white/10 hover:border-white/20 text-white'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                          isDark ? 'bg-black border-white/10' : 'bg-white border-slate-200'
                        } ${isYT ? 'text-rose-500' : 'text-emerald-400'}`}
                      >
                        {isYT ? <YoutubeIcon className="w-5 h-5" /> : <Music2 className="w-5 h-5" />}
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-black truncate">
                          {isYT ? 'YouTube' : 'Spotify'} {parsed.contentType || 'Media'}
                        </p>
                        <p className={`text-[11px] font-medium truncate ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{url}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onSelectUrl(url)}
                        className={`p-2 rounded-lg transition ${
                          isYT
                            ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-md'
                            : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-md'
                        }`}
                        title="Play"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <button
                        onClick={() => onToggleFavorite(url)}
                        className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/20 transition"
                        title="Remove Favorite"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* History List View */}
      {activeTab === 'history' && (
        <div>
          {history.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${isDark ? 'bg-zinc-900 text-zinc-400' : 'bg-slate-100 text-slate-400'}`}>
                <History className="w-6 h-6" />
              </div>
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Your play history is empty</p>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Play a playlist or paste a link to get started.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {history.map((item) => {
                const parsed = parseMediaUrl(item.url, themeMode);
                const isPlaying = currentUrl === item.url;
                const isYT = parsed.platform === 'youtube';
                const timeString = new Date(item.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={item.timestamp + item.url}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition ${
                      isPlaying
                        ? isYT
                          ? 'bg-rose-500/15 border-rose-500 text-rose-400 font-bold'
                          : 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold'
                        : isDark
                        ? 'bg-zinc-900/90 border-white/10 hover:border-white/20 text-white'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div
                        className={`p-2 rounded-lg ${
                          isDark ? 'bg-black' : 'bg-slate-200'
                        } ${isYT ? 'text-rose-500' : 'text-emerald-400'}`}
                      >
                        {isYT ? <YoutubeIcon className="w-4 h-4" /> : <Music2 className="w-4 h-4" />}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold capitalize">
                          {isYT ? 'YouTube' : 'Spotify'} {parsed.contentType || 'Media'}
                        </span>
                        <span className={`text-[11px] font-medium ml-2 ${isDark ? 'text-zinc-400' : 'text-slate-400'}`}>
                          Played at {timeString}
                        </span>
                        <p className={`text-[11px] font-medium truncate ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{item.url}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectUrl(item.url)}
                        className={`px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition flex items-center gap-1 ${
                          isYT
                            ? 'bg-rose-600 text-white hover:bg-rose-500'
                            : 'bg-emerald-500 text-black hover:bg-emerald-400'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Play
                      </button>

                      <a
                        href={parsed.webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1.5 transition ${isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}
                        title="Open on Media Platform"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
