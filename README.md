# GitHub Repo Explorer

A modern, responsive React.js + TypeScript application to search and explore GitHub repositories. Features real-time data fetching, search, pagination, dark/light mode, and a polished UI built with Tailwind CSS.

## Features

- **Real-time Data Fetching** — Pulls live data from the GitHub Search API
- **Search** — Search repositories by keyword or topic
- **Pagination** — Navigate large result sets with a smart page control
- **Responsive Table** — Columns gracefully collapse on smaller screens
- **Loading States** — Animated loading spinner with clear feedback
- **Error Handling** — Retry button and clear error messages
- **Dark / Light Mode** — Toggleable theme with system preference detection
- **Reusable Components** — Modular, well-typed component architecture
- **TypeScript** — Fully typed throughout
- **Docker** — Production-ready container with nginx

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & Run

```bash
npm install
npm run dev
```

The app will be served at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

### Docker

Build and run with Docker:

```bash
docker build -t repo-explorer .
docker run -p 8080:80 repo-explorer
```

Visit `http://localhost:8080`.

## Project Structure

```
src/
├── api/
│   └── github.ts           # GitHub API client
├── components/
│   ├── Header.tsx            # App header with theme toggle
│   ├── SearchBar.tsx         # Search input component
│   ├── RepoTable.tsx         # Responsive repository table
│   ├── Pagination.tsx        # Smart pagination controls
│   ├── Loading.tsx           # Loading spinner
│   └── Error.tsx             # Error display with retry
├── context/
│   └── ThemeContext.tsx      # Dark/light mode state
├── pages/
│   └── RepoExplorer.tsx      # Main page / data orchestration
├── types/
│   └── github.ts             # TypeScript interfaces
├── App.tsx                   # Root app
├── main.tsx                  # Entry point
└── index.css                 # Tailwind directives
```

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Lucide React (icons)
- GitHub REST API
