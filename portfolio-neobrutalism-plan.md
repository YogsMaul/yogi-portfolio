# Portfolio Neo-Brutalism — Project Plan

Stack: Next.js (App Router) + TypeScript + Tailwind CSS

---

## 1. Struktur Folder

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Home
│   │   ├── globals.css              # Tailwind base + design tokens (CSS vars)
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx             # List semua project
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Detail project
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/                      # Komponen dasar (reusable, style brutalism di sini)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tag.tsx
│   │   │   └── marquee.tsx          # opsional, khas neo-brutalism (running text)
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── section-wrapper.tsx
│   │   └── sections/                # Blok besar per halaman
│   │       ├── hero.tsx
│   │       ├── about-preview.tsx
│   │       ├── project-grid.tsx
│   │       ├── skills.tsx
│   │       └── cta.tsx
│   │
│   ├── data/                        # Konten statis (biar gampang update tanpa sentuh komponen)
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── socials.ts
│   │
│   ├── lib/
│   │   ├── utils.ts                 # cn() helper (clsx + tailwind-merge)
│   │   └── constants.ts
│   │
│   ├── types/
│   │   └── index.ts                 # Type Project, Skill, dll
│   │
│   └── styles/
│       └── (opsional, kalau butuh CSS tambahan di luar Tailwind)
│
├── public/
│   ├── images/
│   │   └── projects/
│   ├── icons/
│   └── fonts/                       # kalau pakai local font, bukan Google Fonts
│
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

**Kenapa gini:**
- `components/ui` dipisah dari `components/sections` — biar variant brutalism (button, card, shadow offset) cuma didefinisikan sekali, dipakai berkali-kali.
- `data/` dipisah dari komponen — nanti kalau nambah project baru, tinggal edit array, gak perlu sentuh JSX.
- `[slug]` di projects — biar tiap project punya halaman detail sendiri (auto-generate dari data, pakai `generateStaticParams`).

---

## 2. Dependencies yang Diperlukan

### Wajib
| Package | Fungsi |
|---|---|
| `next`, `react`, `react-dom` | Core |
| `typescript`, `@types/react`, `@types/node` | Type safety |
| `tailwindcss`, `postcss`, `autoprefixer` | Styling |
| `eslint`, `eslint-config-next` | Linting (auto ke-install saat `create-next-app`) |

### Sangat disarankan
| Package | Fungsi |
|---|---|
| `prettier` | Formatter |
| `prettier-plugin-tailwindcss` | Auto-sort class Tailwind (penting, class brutalism biasanya panjang) |
| `clsx` | Gabung conditional class |
| `tailwind-merge` | Hindari konflik class Tailwind saat override |
| `class-variance-authority` (cva) | Bikin variant komponen (button/card) tanpa copy-paste |
| `lucide-react` | Icon set tegas/geometris, cocok vibe brutalism |

### Opsional (nice-to-have)
| Package | Fungsi |
|---|---|
| `framer-motion` / `motion` | Micro-interaction: shadow offset hilang & translate pas hover/klik |
| `next/font` (built-in) | Load font bold seperti Space Grotesk / Archivo Black |
| `@vercel/analytics` | Kalau deploy ke Vercel, tracking simple |

---

## 3. Design Tokens (Warna)

Konsep: 2 primary color (biar gak monoton), + 1-2 accent, warna dasar hitam-putih tegas (ciri khas brutalism).

```css
:root {
  /* Primary 1 — Biru */
  --color-primary: #0ea5e9;        /* sky-500 */
  --color-primary-dark: #0369a1;   /* sky-700, buat hover/border */

  /* Primary 2 — Pop color (kontras) */
  --color-secondary: #facc15;      /* yellow-400 */
  /* alternatif: pink-500 (#ec4899) atau orange-500 (#f97316) */

  /* Base */
  --color-bg: #fdf6ee;             /* off-white, bukan putih polos */
  --color-fg: #0a0a0a;             /* hitam pekat buat teks/border */
  --color-surface: #ffffff;        /* card background */

  /* Shadow khas brutalism (offset, bukan blur) */
  --shadow-brutal: 4px 4px 0px 0px var(--color-fg);
  --shadow-brutal-hover: 2px 2px 0px 0px var(--color-fg);
}
```

**Aturan pakai warna:** primary (sky) buat elemen utama (button, link aktif, highlight), secondary (kuning) buat aksen/badge/hover state — jangan 50:50, biar sky tetap dominan.

---

## 4. Design Tokens (Border, Shadow, Radius)

- **Border:** `border-2` atau `border-[3px] border-black` — tegas, jangan tipis.
- **Shadow:** offset shadow (bukan blur), contoh `shadow-[4px_4px_0px_0px_#000]`, hilang/geser jadi `2px 2px` saat hover → efek "ditekan".
- **Radius:** minim atau 0 (`rounded-none` atau `rounded-md` kecil aja) — brutalism identik sudut tajam.
- **Font:** pakai font bold/chunky (Space Grotesk, Archivo Black, Public Sans) via `next/font/google`.

---

## 5. Urutan Kerja Selanjutnya (Saran)

1. Setup project (`create-next-app` + install dependencies di atas)
2. Definisikan design tokens di `globals.css` + `tailwind.config.ts`
3. Bikin komponen `ui/` dasar (button, card) dulu sebagai "bahasa visual"
4. Baru susun `sections/` pakai komponen ui tsb
5. Isi `data/projects.ts` terakhir

---

*Catatan: dokumen ini panduan struktur, belum ada kode. Lanjut ke setup project kapan pun siap.*
