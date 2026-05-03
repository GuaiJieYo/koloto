# AGENTS.md

## Project

Astro 6.x blog with MDX. Content in `post/` directory using Astro content collections.

## Commands

| Command               | Action                                    |
|----------------------|-------------------------------------------|
| `pnpm dev`           | Dev server at localhost:4321              |
| `pnpm build`         | Build to `./dist/`                        |
| `pnpm preview`       | Preview production build                 |
| `pnpm check`         | Astro type checking                       |
| `pnpm lint`          | Biome lint (`biome check .`)              |
| `pnpm lint:fix`      | Biome auto-fix                            |
| `pnpm koloto new`    | Create post: `pnpm koloto new <title> [article/draft]` |

## Architecture

- **Content**: MDX in `post/` (`article/`, `draft/` subdirs)
- **Pages**: File-based routing in `src/pages/`
- **Schema**: `src/content.config.ts` (zod) - title, tags, description, createDate, updatedDate (optional), heroImage (optional)
- **Theme config**: `_config.theme.yml` - site URL, etc. Referenced by `astro.config.mjs`
- **Content loading**: Astro 6.x content layer API with `glob` loader

## Key Files

- `astro.config.mjs` - **⚠️ FRAGILE**: Uses `@rollup/plugin-yaml`, parses `_config.theme.yml` at build time. Do not modify unless you understand the exact config.
- `src/content.config.ts` - Collection schema

## Requirements

- Node.js >= 22.12.0
- pnpm

## Build Output

- Assets: `./dist/_koloto/` (custom output dir from `build.assets` config)
