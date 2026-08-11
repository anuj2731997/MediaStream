'use client';

import React from 'react';

interface AudioVisualizerProps {
  isPlaying?: boolean;
  barCount?: number;
  className?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying = true,
  barCount = 12,
  className = '',
}) => {
  return (
    <div className={`flex items-end gap-1 h-6 px-1 ${className}`}>
      {Array.from({ length: barCount }).map((_, index) => {
        // Calculate variable delays and animation speeds
        const delay = (index * 0.15) % 0.8;
        const duration = 0.6 + (index % 4) * 0.25;

        return (
          <span
            key={index}
            className={`w-1 rounded-full bg-emerald-400 transition-all duration-300 ${
              isPlaying ? 'animate-pulse' : 'h-1 opacity-40'
            }`}
            style={{
              height: isPlaying ? `${Math.floor(Math.sin(index + 1) * 35 + 55)}%` : '20%',
              animationDuration: isPlaying ? `${duration}s` : '0s',
              animationDelay: isPlaying ? `${delay}s` : '0s',
              boxShadow: isPlaying ? '0 0 8px rgba(29, 185, 84, 0.6)' : 'none',
            }}
          />
        );
      })}
    </div>
  );
};
