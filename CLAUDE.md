# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript check + Vite build (outputs to dist/)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

Deployment is configured for Firebase Hosting (`firebase deploy`).

## Architecture

This is a wedding website built with React 18 + TypeScript + Vite + Tailwind CSS.

### Project Structure

- `src/App.tsx` - Main layout composing all page sections
- `src/components/` - React components for each section (Hero, RSVP, Timeline, FAQ, etc.)
- `src/hooks/` - Custom hooks (e.g., `useCountdown.ts`)
- `src/i18n/` - Internationalization with i18next
  - `locales/{en,de,es,pt}.json` - Translation files

### Key Technical Details

- **i18n**: Uses react-i18next with browser language detection. Translations are loaded statically from JSON files. Fallback language is English.
- **Styling**: Tailwind CSS with custom color palette (`sage` and `cream` colors) and custom fonts (`Great Vibes` for script, `Montserrat` for sans).
- **Single-page app**: All sections render on one page with anchor navigation.