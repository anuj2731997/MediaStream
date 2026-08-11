# 🎵 MediaStream — Spotify & YouTube Web Player

[![Next.js](https://img.shields.io/badge/Next.js-16.3.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Spotify API](https://img.shields.io/badge/Spotify-Embed_iFrame_API-1DB954?style=for-the-badge&logo=spotify)](https://developer.spotify.com/)
[![YouTube API](https://img.shields.io/badge/YouTube-Embed_Engine-FF0000?style=for-the-badge&logo=youtube)](https://developers.google.com/youtube)

A modern, high-performance **Spotify & YouTube Media Web Player** built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. 

Paste any Spotify playlist, album, or track link—or any YouTube music video, live stream, or playlist link—to stream music immediately in a sleek **Dark & Light Mode glassmorphism interface**.

---

## ✨ Features

- **🎧 Dual-Engine Media Playback**: Seamlessly supports both **Spotify** (Playlists, Albums, Tracks, Artists) and **YouTube / YouTube Music** (Videos, Live Streams, Playlists).
- **🚀 Intelligent URL & URI Parser**: Automatically detects and validates Spotify Web links, Spotify URIs (`spotify:playlist:...`), YouTube URLs, YouTube Shorts, and YouTube playlist IDs.
- **🖼️ Responsive Embed Player Container**:
  - Compact (152px / 260px) vs Expanded (380px / 480px) player view toggles.
  - 1-Click HTML Embed Code Exporter `<iframe.../>`.
  - Share link copying & direct app launcher buttons.
  - Interactive Spotify login notification banner & YouTube 100% full song fallback option.
- **🔥 Curated Playlist Presets**: Hand-picked playlists and 24/7 radio streams across multiple genres (*Top Charts*, *Chill & Lofi*, *Focus & Study*, *Workout & Energy*, *Classical & Jazz*, *Retro & Rock*).
- **🎯 Category & Platform Filters**: Filter presets by platform (**Spotify** vs **YouTube**) and mood category.
- **❤️ Favorites & Recent History**: Save bookmarked playlists and keep track of your listening history, persisted automatically in browser `localStorage`.
- **🌗 Dark & Light Theme System**:
  - **Spotify Dark Mode**: Pitch-black obsidian theme (`#060608`) with ambient neon spotlight glows.
  - **Slate Light Mode**: Clean glassmorphism layout with high-contrast typography and subtle borders.
  - Persistent theme switching with Sun/Moon controls.
- **⚡ Live Audio Visualizer**: Animated equalizer visualizer header built with pure CSS keyframes.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) & CSS Keyframes |
| **Player Engines** | Spotify iFrame API & YouTube iFrame API |

---

## 🔗 Supported Link Formats

### 🟢 Spotify Formats
- **Playlist**: `https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M`
- **Album**: `https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy`
- **Track**: `https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT`
- **Spotify URI**: `spotify:playlist:37i9dQZF1DXcBWIGoYBM5M`
- **Embed URL**: `https://open.spotify.com/embed/playlist/...`

### 🔴 YouTube Formats
- **Video / Song**: `https://www.youtube.com/watch?v=47qE1dlDIAg`
- **Playlist**: `https://www.youtube.com/playlist?list=PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU`
- **Short URL**: `https://youtu.be/Xs0Lxif1u9E`
- **YouTube Shorts**: `https://www.youtube.com/shorts/...`

---

## 📁 Project Structure

```
spotify/
├── app/
│   ├── globals.css          # Dark & Light theme CSS variables & spotlight mesh
│   ├── layout.tsx           # SEO metadata, font configuration & root layout
│   └── page.tsx             # Main page orchestrating player, presets & state
├── components/
│   ├── AudioVisualizer.tsx  # Animated soundwave equalizer bars
│   ├── Header.tsx           # Glassmorphic header with Theme Toggle & brand
│   ├── HistoryAndFavorites.tsx # Bookmarks tab & listening history panel
│   ├── PlayerContainer.tsx  # Spotify & YouTube iFrame embed container
│   ├── PresetGrid.tsx       # Curated playlist cards grid with category filters
│   └── UrlInput.tsx         # Media URL input bar with paste & validation status
├── lib/
│   ├── presets.ts           # Curated playlist metadata & category definitions
│   └── urlParser.ts         # Dual Spotify & YouTube link parser utility
├── public/                  # Static assets
├── package.json             # Project dependencies & scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18.x** or higher installed on your system.

```bash
node -v
npm -v
```

### Installation

1. Clone the repository or navigate to the project folder:
   ```bash
   cd spotify
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the local Next.js development server:

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

---

## 💡 Usage Tips

- **Full Track Playback on Spotify**: Spotify restricts embeds to 30-second previews for guest users. Simply **log into Spotify** in another tab in the same browser, and embedded Spotify playlists will play full tracks automatically!
- **YouTube Full Songs**: YouTube embed mode streams **100% full songs and videos** with zero login requirements.
- **Theme Preference**: Toggle between Dark and Light mode using the **Sun ☀️ / Moon 🌙** button in the top right of the header bar.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
