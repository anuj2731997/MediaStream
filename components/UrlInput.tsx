'use client';

import React, { useState, useEffect } from 'react';
import { Search, Clipboard, X, Play, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { parseMediaUrl, ParsedMediaUrl } from '../lib/urlParser';

interface UrlInputProps {
  currentUrl: string;
  onUrlSubmit: (url: string) => void;
  themeMode: 'dark' | 'light';
}

export const UrlInput: React.FC<UrlInputProps> = ({ currentUrl, onUrlSubmit, themeMode }) => {
  const [inputValue, setInputValue] = useState(currentUrl);
  const [parsedState, setParsedState] = useState<ParsedMediaUrl>(parseMediaUrl(currentUrl, themeMode));
  const [copiedNotification, setCopiedNotification] = useState(false);

  const isDark = themeMode === 'dark';

  useEffect(() => {
    setInputValue(currentUrl);
    setParsedState(parseMediaUrl(currentUrl, themeMode));
  }, [currentUrl, themeMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setParsedState(parseMediaUrl(val, themeMode));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedState.isValid) {
      onUrlSubmit(inputValue);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputValue(text);
        const parsed = parseMediaUrl(text, themeMode);
        setParsedState(parsed);
        if (parsed.isValid) {
          onUrlSubmit(text);
        }
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2000);
      }
    } catch {
      // Ignore
    }
  };

  const handleClear = () => {
    setInputValue('');
    setParsedState(parseMediaUrl('', themeMode));
  };

  const quickSamples = [
    { label: "🔴 Kya Khoob Lagti Ho (YT)", url: 'https://www.youtube.com/watch?v=47qE1dlDIAg' },
    { label: "💚 Today's Top Hits (Spotify)", url: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M' },
    { label: "🔴 Synthwave Radio (YT)", url: 'https://www.youtube.com/watch?v=4xDzrJKXOOY' },
    { label: '💚 Deep Focus (Spotify)', url: 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ' },
  ];

  const isYouTube = parsedState.platform === 'youtube';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glow effect on hover/focus */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r rounded-2xl blur-lg opacity-40 group-hover:opacity-85 transition duration-500 group-focus-within:opacity-100 group-focus-within:duration-200 ${
            isYouTube
              ? 'from-rose-500 via-red-500 to-amber-500'
              : 'from-emerald-500 via-green-400 to-teal-400'
          }`}
        ></div>

        <div
          className={`relative flex items-center border-2 rounded-2xl p-2.5 shadow-2xl transition-all ${
            isDark
              ? 'bg-zinc-950/95 backdrop-blur-2xl border-white/15 focus-within:border-emerald-500/80 shadow-black/80'
              : 'bg-white/95 backdrop-blur-xl border-slate-300 focus-within:border-emerald-500/80 shadow-lg'
          }`}
        >
          <div
            className={`pl-3 pr-2 flex items-center justify-center ${
              isYouTube ? 'text-rose-500' : 'text-emerald-400'
            }`}
          >
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Paste Spotify or YouTube link (e.g. spotify.com/playlist/... or youtube.com/watch?v=...)"
            className={`w-full bg-transparent text-sm md:text-base px-2 py-2 outline-none font-medium ${
              isDark ? 'text-white placeholder-zinc-400' : 'text-slate-900 placeholder-slate-400'
            }`}
          />

          <div className="flex items-center gap-1.5 pr-1">
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className={`p-2 rounded-xl transition ${
                  isDark
                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                    : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                }`}
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handlePaste}
              className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold border rounded-xl transition ${
                isDark
                  ? 'text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border-white/15'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-300'
              }`}
              title="Paste from clipboard"
            >
              <Clipboard className="w-3.5 h-3.5 text-emerald-400" />
              {copiedNotification ? 'Pasted!' : 'Paste'}
            </button>

            <button
              type="submit"
              disabled={!parsedState.isValid}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-extrabold text-sm transition-all duration-300 ${
                parsedState.isValid
                  ? isYouTube
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 active:scale-95 cursor-pointer'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30 active:scale-95 cursor-pointer'
                  : isDark
                  ? 'bg-zinc-900 text-zinc-500 cursor-not-allowed border border-white/5'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">Play Now</span>
            </button>
          </div>
        </div>
      </form>

      {/* Validation status feedback bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-xs">
        <div className="flex items-center gap-2">
          {inputValue ? (
            parsedState.isValid ? (
              <span
                className={`flex items-center gap-1.5 font-bold ${
                  isYouTube ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Valid {parsedState.platform === 'youtube' ? 'YouTube' : 'Spotify'}{' '}
                {parsedState.contentType} link detected!
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4" />
                {parsedState.errorMessage}
              </span>
            )
          ) : (
            <span
              className={`flex items-center gap-1.5 font-medium ${
                isDark ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Paste Spotify or YouTube link to stream immediately
            </span>
          )}
        </div>

        {/* Quick sample chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          <span className={isDark ? 'text-zinc-400 font-semibold' : 'text-slate-500 font-semibold'}>Try:</span>
          {quickSamples.map((sample) => (
            <button
              key={sample.label}
              type="button"
              onClick={() => {
                setInputValue(sample.url);
                onUrlSubmit(sample.url);
              }}
              className={`px-3 py-1 text-[11px] font-bold border rounded-full transition whitespace-nowrap ${
                isDark
                  ? 'text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border-white/10 hover:border-emerald-500/40'
                  : 'text-slate-700 bg-white hover:bg-slate-100 border-slate-300 shadow-2xs'
              }`}
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
