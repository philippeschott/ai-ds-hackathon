# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project rules

- **Respond in German.**
- **Git:** always work on a branch and open a pull request. Never push directly to `main`.
- **Goal:** a white-label, AI-ready design system. Designers always stay in control: ask before making larger changes.
- **Components** are always headless and built on `react-aria-components`. Each one gets its own folder, `components/<Name>/`, containing the component and `<Name>.stories.tsx`.
- **Styling:** use Tailwind, but colours, spacing, radii and typography come only from tokens defined as CSS variables. No hard-coded values. Tokens have two layers: neutral base tokens plus a swappable brand layer.
- **States** are styled with React Aria's data attributes (`data-hovered`, `data-pressed`, `data-focus-visible`, `data-disabled`).
- **Stories** show every state and every variant. The Storybook accessibility check must pass with no violations (it is set to `test: 'error'`, so violations fail the vitest run).
- **Figma is the source of truth for design.** Take values from the Figma MCP (variables, e.g. `get_variable_defs`), never estimate them.

## Commands

```bash
npm run dev              # Next dev server (Turbopack) at http://localhost:3000
npm run build            # production build
npm run lint             # ESLint (next core-web-vitals + typescript + storybook rules)
npx tsc --noEmit         # type check (there is no typecheck script)

npm run storybook        # Storybook at http://localhost:6006
npx vitest --project storybook run                          # run all stories as tests
npx vitest --project storybook run app/page.stories.tsx     # run one story file
```

The only tests are Storybook stories. Vitest runs them in headless Chromium through Playwright (see `vitest.config.ts`). There is no separate unit-test project.

## Architecture

- **Next.js 16 App Router** in `app/`, with React 19. `next.config.ts` turns on `cacheComponents`, `partialPrefetching` and `experimental.agentFeedback`. `cacheComponents` in particular changes how rendering and caching work compared with older Next versions, so read the bundled docs in `node_modules/next/dist/docs/` before writing data-fetching or caching code.
- **Path alias:** `@/*` points to the repo root.
- **Styling:** Tailwind v4 is configured CSS-first in `app/globals.css` (`@import "tailwindcss"` plus an `@theme inline` block mapping `--background`, `--foreground` and the Geist font variables). There is no `tailwind.config` or PostCSS config. Tailwind is compiled differently in each toolchain:
  - In the Next app, through the `@tailwindcss/turbopack` loader rule in `next.config.ts`.
  - In Storybook and Vitest, through `@tailwindcss/vite`, added in `viteFinal` in `.storybook/main.ts`.

  If you change how CSS is processed, keep both paths in sync.
- **Fonts:** `app/layout.tsx` loads Geist and Geist Mono with `next/font/google` and puts their CSS variables on `<html>`. `.storybook/preview.tsx` repeats this in a global decorator and imports `app/globals.css`, so stories render like the app. When you add a global provider or wrapper to the layout, add it to the preview decorator too.
- `react-aria-components` is installed but not used yet.

## Storybook conventions

- Stories sit next to the component they cover as `*.stories.tsx`. `.storybook/main.ts` picks up stories from `components/**` and `app/**`.
- Use the `@storybook/nextjs-vite` types (`Meta`, `StoryObj`) and import `expect` from `storybook/test`. Use the `canvas` and `userEvent` that the `play` arguments provide.
- AI-written story files are tagged `['ai-generated']`. Add `'needs-work'` until a file passes in vitest.
- `CssCheck` in `app/page.stories.tsx` asserts computed Tailwind values. If it fails, Tailwind or `globals.css` isn't loading in Storybook.
- a11y addon checks are set to `test: 'error'` in `.storybook/preview.tsx`: any violation fails the story's test.
