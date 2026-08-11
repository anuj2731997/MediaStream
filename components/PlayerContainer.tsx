'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  Heart,
  Share2,
  Maximize2,
  Minimize2,
  Code,
  Music2,
  Disc3,
  Sparkles,
  LogIn,
  AlertTriangle,
} from 'lucide-react';
import { ParsedMediaUrl } from '../lib/urlParser';

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface PlayerContainerProps {
  parsedData: ParsedMediaUrl;
  isFavorite: boolean;
  onToggleFavorite: (url: string) => void;
  onSelectYouTubeFallback?: () => void;
  themeMode: 'dark' | 'light';
}

export const PlayerContainer: React.FC<PlayerContainerProps> = ({
  parsedData,
  isFavorite,
  onToggleFavorite,
  onSelectYouTubeFallback,
  themeMode,
}) => {
  const [isCompact, setIsCompact] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [dismissNotification, setDismissNotification] = useState(false);

  const isDark = themeMode === 'dark';

  if (!parsedData.isValid || !parsedData.embedUrl) {
    return null;
  }

  const isYouTube = parsedData.platform === 'youtube';

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(parsedData.webUrl || parsedData.rawInput);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleCopyEmbed = async () => {
    try {
      const code = isYouTube
        ? `<iframe width="100%" height="450" src="${parsedData.embedUrl}" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        : `<iframe style="border-radius:12px" src="${parsedData.embedUrl}" width="100%" height="352" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
      await navigator.clipboard.writeText(code);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2000);
    } catch {
      // Ignore
    }
  };

  const playerHeight = isYouTube
    ? isCompact
      ? '260px'
      : '480px'
    : isCompact
    ? '152px'
    : '380px';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {/* Player Header controls bar */}
      <div
        className={`flex items-center justify-between px-4 py-2 border rounded-2xl text-xs backdrop-blur-xl transition-all ${
          isDark
            ? 'bg-zinc-900/80 border-white/10 text-white'
            : 'bg-white/80 border-slate-300 text-slate-900 shadow-2xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg border ${
              isYouTube
                ? 'bg-rose-500/20 text-rose-500 border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
            }`}
          >
            {isYouTube ? (
              <YoutubeIcon className="w-4 h-4" />
            ) : (
              <Disc3 className="w-4 h-4 animate-spin-slow" />
            )}
          </div>
          <div>
            <span className="font-bold capitalize">
              {isYouTube ? 'YouTube' : 'Spotify'} {parsedData.contentType} Player
            </span>
            <span
              className={`text-[11px] ml-2 hidden sm:inline ${
                isDark ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              ID: {parsedData.id}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Heart / Favorite */}
          <button
            onClick={() => onToggleFavorite(parsedData.webUrl || parsedData.rawInput)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-500 border-rose-500/40 font-bold'
                : isDark
                ? 'bg-zinc-800 text-zinc-400 hover:text-white border-white/10'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-300'
            }`}
            title={isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Favorite'}</span>
          </button>

          {/* Share Link */}
          <button
            onClick={handleShare}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition ${
              isDark
                ? 'bg-zinc-800 text-zinc-300 hover:text-white border-white/10'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300'
            }`}
            title="Copy Media Link"
          >
            <Share2
              className={`w-3.5 h-3.5 ${isYouTube ? 'text-rose-500' : 'text-emerald-500'}`}
            />
            <span className="hidden sm:inline">{copiedShare ? 'Copied Link!' : 'Share'}</span>
          </button>

          {/* Copy Embed */}
          <button
            onClick={handleCopyEmbed}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition ${
              isDark
                ? 'bg-zinc-800 text-zinc-300 hover:text-white border-white/10'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300'
            }`}
            title="Copy HTML Embed Code"
          >
            <Code className="w-3.5 h-3.5 text-cyan-500" />
            <span>{copiedEmbed ? 'Embed Copied!' : 'Embed Code'}</span>
          </button>

          {/* Height Toggle */}
          <button
            onClick={() => setIsCompact(!isCompact)}
            className={`p-1.5 rounded-xl border transition ${
              isDark
                ? 'bg-zinc-800 text-zinc-300 hover:text-white border-white/10'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300'
            }`}
            title={isCompact ? 'Expand Player' : 'Compact Player'}
          >
            {isCompact ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>

          {/* Open App Direct */}
          <a
            href={parsedData.webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition font-medium ${
              isYouTube
                ? 'bg-rose-500/20 text-rose-600 hover:bg-rose-500/30 border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-600 hover:bg-emerald-500/30 border-emerald-500/40'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isYouTube ? 'YouTube App' : 'Spotify App'}</span>
          </a>
        </div>
      </div>

      {/* Prominent Spotify Login Notification Alert */}
      {!isYouTube && !dismissNotification && (
        <div
          className={`relative p-3.5 rounded-2xl border text-xs shadow-xl space-y-2 ${
            isDark
              ? 'bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-zinc-900 border-amber-500/30'
              : 'bg-amber-50/95 border-amber-400 text-slate-900 shadow-md'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/40 shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-amber-950 dark:text-amber-300 text-xs flex items-center gap-2">
                  Not logged into Spotify in this browser?
                </h4>
                <p className={isDark ? 'text-zinc-300' : 'text-slate-800 font-medium'}>
                  Spotify restricts playback to <strong>30-second previews</strong> unless you are logged into your Spotify account in another tab.
                </p>
              </div>
            </div>

            <button
              onClick={() => setDismissNotification(true)}
              className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white p-1"
              title="Dismiss notification"
            >
              ✕
            </button>
          </div>

          {/* Quick Action buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-2 border-t border-amber-500/20">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] shadow-md transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              Log into Spotify (1-Click)
            </a>

            {onSelectYouTubeFallback && (
              <button
                type="button"
                onClick={onSelectYouTubeFallback}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-600 dark:text-rose-300 border border-rose-500/40 font-semibold text-[11px] transition"
              >
                <YoutubeIcon className="w-3.5 h-3.5 text-rose-500" />
                Switch to YouTube Mode (Plays 100% Full Songs)
              </button>
            )}
          </div>
        </div>
      )}

      {/* YouTube Status Info Banner */}
      {isYouTube && (
        <div className="flex items-center justify-between gap-2 px-3.5 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[11px] text-rose-600 dark:text-rose-300">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
            <span><strong>YouTube Mode Active:</strong> Enjoy <strong>100% full audio & video streams</strong> with zero login requirements!</span>
          </span>
          <span className="text-zinc-500 text-[10px] shrink-0">No Login Needed</span>
        </div>
      )}

      {/* Main Iframe Player Frame */}
      <div className="relative group">
        {/* Dynamic Ambient Neon Glow */}
        <div
          className={`absolute -inset-2 bg-gradient-to-b rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition duration-500 ${
            isYouTube
              ? 'from-rose-500/20 via-red-500/10 to-transparent'
              : 'from-emerald-500/20 via-teal-500/10 to-transparent'
          }`}
        ></div>

        <div
          className={`relative border rounded-2xl p-2 shadow-2xl overflow-hidden transition-all duration-300 ${
            isDark ? 'bg-zinc-950 border-white/10' : 'bg-slate-900 border-slate-300'
          } ${isYouTube ? 'border-rose-500/30' : 'border-emerald-500/30'}`}
        >
          {/* Iframe Spinner state */}
          {!iframeLoaded && (
            <div
              className={`w-full flex flex-col items-center justify-center rounded-xl space-y-3 ${
                isDark ? 'bg-zinc-900/90' : 'bg-slate-800'
              }`}
              style={{ height: playerHeight }}
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-12 h-12 rounded-full border-2 border-t-transparent animate-spin ${
                    isYouTube
                      ? 'border-rose-500 border-t-rose-500/20'
                      : 'border-emerald-500 border-t-emerald-500/20'
                  }`}
                ></div>
                {isYouTube ? (
                  <YoutubeIcon className="w-5 h-5 text-rose-500 absolute" />
                ) : (
                  <Music2 className="w-5 h-5 text-emerald-500 absolute" />
                )}
              </div>
              <p className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                <Sparkles
                  className={`w-3.5 h-3.5 animate-pulse ${
                    isYouTube ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                />
                Loading {isYouTube ? 'YouTube' : 'Spotify'} Player...
              </p>
            </div>
          )}

          <iframe
            key={parsedData.embedUrl}
            src={parsedData.embedUrl}
            width="100%"
            height={playerHeight}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
            className={`w-full rounded-xl transition-all duration-300 ${
              iframeLoaded ? 'opacity-100' : 'opacity-0 absolute'
            }`}
            style={{ borderRadius: '12px' }}
          />
        </div>
      </div>
    </div>
  );
};
