
# detapro — Jobs (Next.js + Tailwind + Contentful)

Zwart‑wit, candidate‑first jobsite. **Vacatures** + **job detail pages** komen uit **Contentful**. Rest is statisch in code.

## 1) Setup
```bash
npm i
cp .env.example .env
# vul CONTENTFUL_*
npm run dev
```

## 2) Contentful (alleen type `vacature`)
Velden:
- title (Short, required)
- slug (Short, unique, required) — jij vult handmatig in
- intro (Long, optional)
- location (Short)
- workMode (Short)
- contract (Short)
- discipline (Short / enum: frontend|backend|cloud|data)
- technologies (Array of short text)
- body (Rich Text)
- requirements (Array of short text)
- niceToHave (Array of short text, optional)
- postedAt (Date)
- startDate (Short, optional)
- hoursPerWeek (Number, optional)

## 3) Routes
- `/` — homepage met Latest jobs + rollen
- `/jobs` — index
- `/jobs/[slug]` — job detail (met Solliciteer-CTA boven/onder + sollicitatie sectie)

## 4) Vercel
- Zet env vars in Project Settings → Environment Variables
- Deploy

## 5) Revalidate
- Pas `REVALIDATE_SECONDS` aan in `.env` (default 300).

Succes! 🚀
