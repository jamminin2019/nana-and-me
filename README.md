# Nana & Me MVP Monorepo

Production-minded MVP for a scalable personalized family learning video platform.

## Stack
- Turborepo + pnpm monorepo
- TypeScript everywhere
- Mobile: Expo React Native
- Admin: Next.js App Router + Tailwind + React Query
- API: NestJS + Prisma + Swagger
- DB: PostgreSQL
- Queue: BullMQ + Redis
- Storage: S3-compatible (MinIO local)
- Worker: Node + ffmpeg composition
- Billing integration point: Stripe-ready family plan fields

## Monorepo layout
- `apps/mobile` caregiver + parent mobile shell (guided recording UX)
- `apps/admin` admin console MVP
- `apps/api` NestJS REST API + Prisma schema + seed
- `apps/worker` BullMQ render worker + ffmpeg composition graph
- `packages/shared` shared schemas/types/template step definitions

## Local development
1. Start infra:
   ```bash
   docker compose up -d
   ```
2. Install dependencies:
   ```bash
   pnpm i
   ```
3. Configure env for API (`apps/api/.env`):
   ```bash
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nana?schema=public"
   REDIS_URL="redis://localhost:6379"
   ```
4. Generate prisma client + migrate + seed:
   ```bash
   pnpm --filter @nana/api prisma:generate
   pnpm --filter @nana/api prisma:migrate
   pnpm db:seed
   ```
5. Run full stack:
   ```bash
   pnpm dev
   ```
6. Run worker separately:
   ```bash
   pnpm worker
   ```

## API docs
- Swagger OpenAPI: `http://localhost:4000/openapi`

## Implemented endpoints
- `POST /families`
- `POST /families/:id/invite-caregiver`
- `POST /invitations/accept`
- `GET /templates`
- `GET /templates/:slug`
- `POST /recording-sessions`
- `POST /recording-sessions/:id/clips/presign`
- `POST /recording-sessions/:id/submit`
- `POST /render-jobs`
- `GET /render-jobs/:id`
- `GET /episodes`
- `GET /episodes/:id/stream`
- `POST /youtube/connect`
- `POST /youtube/upload`
- Admin:
  - `POST /admin/templates`
  - `POST /admin/assets/upload/presign`
  - `POST /admin/templates/:id/publish-version`
  - `GET /admin/health/renders`
  - `GET /admin/families`

## MVP template included
- `ABCs – A is for Apple` with intro, A-Z steps, word step(s), and outro
- Seeded via `apps/api/prisma/seed.ts`

## Render pipeline notes
Worker composes output as:
- looped background base
- PiP caregiver clip in lower-right
- mixed caregiver + music audio bed
- 1080p H.264/AAC output

Current ffmpeg filter graph in worker is intentionally simple/reliable and designed for later expansion (greenscreen segmentation, avatar modes, dynamic overlays).

## Security baseline in this MVP
- Role field modeled on users (`PARENT`, `CAREGIVER`, `ADMIN`)
- Family-scoped entities modeled in schema
- Signed URL integration points implemented as presign endpoints
- Audit log table included for admin operation logging extension
- Deletion policies ready to be added through API mutations

## CI
GitHub Actions workflow runs:
- lint
- typecheck
- unit tests
