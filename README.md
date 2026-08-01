# Portofolio — Achmad Yogi Maulana

Neo-brutalism portfolio: **Frontend & Mobile Developer** (React, Next.js, Flutter, Kotlin).

**Live:** [yogi-maulana.vercel.app](https://yogi-maulana.vercel.app)

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Space Grotesk + Geist Mono

## Scripts

```bash
npm.cmd run dev    # http://localhost:3000
npm.cmd run build
npm.cmd run start
npm.cmd run lint
```

> Windows PowerShell: pakai `npm.cmd` jika execution policy memblokir `npm.ps1`.

## Struktur

```
src/
  app/           # routes: /, /about, /projects, /projects/[slug], /contact
  components/
    ui/          # button, card, badge, marquee, …
    layout/      # navbar, footer, section-wrapper
    sections/    # hero, about-preview, project-grid, skills, cta
  data/          # projects, skills, socials
  types/
public/          # CV, logo, foto, screenshots Narva
```

Konten project di `src/data/projects.ts` — tambah item array, detail page auto dari slug.

## Design

Border tebal, shadow offset (bukan blur), aksen sky + yellow. Token di `src/app/globals.css`.

## Catatan aset

- CV: `public/CV_ATS_Achmad_Yogi_Maulana.pdf`
- Backup pre-compress (lokal, di-gitignore): `public/_bak_images/`
