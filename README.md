# Automata Engineer

Static portfolio and service site for `automata.engineer`, built with Vite, React, TanStack Router, Tailwind CSS, and content-driven Markdown collections.

## Purpose

This repository contains the public website for `automata.engineer`, including:

- landing page and professional profile
- experience and education content sourced from Markdown collections
- projects, blog posts, tools, and documentation pages
- Hestia-compatible static deployment workflow

## Stack

- Vite
- React 19
- TanStack Router
- Tailwind CSS v4
- `content-collections` for Markdown-driven content

## Repository Layout

- `src/`: application routes, UI components, router, and styles
- `content/jobs/`: work experience entries
- `content/education/`: education entries
- `content/projects/`: featured project content
- `content/blog/`: blog posts
- `public/`: static assets copied into the final build
- `docs/`: deployment notes and operational documentation
- `deploy.sh`: SFTP deployment helper for the Hestia host

## Local Development

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

The build output is generated in `dist/`.

## Content Workflow

The main site content is managed directly in Markdown collections:

- experience: `content/jobs/*.md`
- education: `content/education/*.md`
- projects: `content/projects/*.md`
- blog: `content/blog/*.md`

Profile-facing routes such as the home page and about page render from these collections, so updating the Markdown entries updates the visible site content after rebuild.

The file `curriculum.pdf` is kept in the repository as a local reference source for aligning the public profile content with the CV.

## Deployment

This site is deployed as a static SPA to Hestia.

Primary deployment reference:

- [Hestia Static Deploy](./docs/hestia-static-deploy.md)

### Current Production Flow

The target hosting account is SFTP-only, so deployment does not use `rsync` or remote shell commands.

The repository includes [`deploy.sh`](./deploy.sh), which:

1. runs `npm run build`
2. walks the `dist/` directory
3. creates remote directories through SFTP
4. uploads the built files directly into `public_html/`

Run it with:

```bash
./deploy.sh
```

Important:

- clean the existing contents of `public_html/` before deploying
- confirm `.htaccess` is uploaded along with `index.html` and `assets/`
- direct route reloads depend on the SPA fallback rules being active on the host

## Hosting Notes

- The site is deployed to Hestia under `public_html/`
- Routing fallback is provided by `public/.htaccess`
- The contact page is static and currently uses `mailto:` rather than a backend form handler

## GitHub Use

This repository can be pushed to GitHub as the canonical source for:

- site content
- deployment reference
- infrastructure notes related to the public website

Recommended practice:

- keep content changes in small commits
- rebuild before deployment
- use `deploy.sh` only after reviewing the resulting `dist/` output
