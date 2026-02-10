# Nana & Me

Nana & Me is a family-learning platform that enables caregivers to record personalized educational content for children and deliver it in a structured, delightful format. The platform provides tools for caregivers to capture recordings, select from templates, and generate episodes that blend video, audio and templates into a cohesive learning experience. Parents can build a library of episodes for their children, ensuring that family members can share knowledge and stories even when they are apart.

This repository contains an MVP scaffold intended to bootstrap development quickly. It focuses on laying out the core infrastructure—data model, rendering pipeline, API surface and administrative interface—so iterative improvements can be made without rethinking the foundation.

## System Architecture

- **Monorepo:** Turborepo + pnpm workspace containing multiple apps and a shared package.
- **API (apps/api):** NestJS server using Prisma for database access; exposes REST endpoints for health checks, templates, recording sessions, render jobs and episodes.
- **Worker (apps/worker):** A BullMQ-based worker that consumes render jobs from Redis; currently includes a stubbed ffmpeg pipeline for video rendering.
- **Admin app (apps/admin):** Web admin UI shell for submitting jobs and monitoring their status.
- **Mobile app (apps/mobile):** Initial scaffold for a caregiver-focused mobile application.
- **Shared package (packages/shared):** Contains Zod schemas and template definitions shared across services.
- **Database:** PostgreSQL for persistent data storage.
- **Queue:** Redis used by BullMQ for job queueing.
- **Local development infra:** Provided via `docker-compose.yml` to spin up Postgres and Redis services quickly.
- **CI workflow:** GitHub Actions CI pipeline defined in `.github/workflows/ci.yml`.

## What Is Working Now

- The monorepo structure is set up with pnpm workspace and Turborepo.
- A Prisma schema defining core entities (User, Family, Child, CaregiverProfile, Invitation, Template, Asset, RecordingSession, RecordingClip, RenderJob, Episode, AuditLog) is present.
- The API boots successfully and exposes a `/health` endpoint as well as a stubbed `POST /jobs` endpoint for creating render jobs.
- The worker can consume a BullMQ job from Redis and will log “render complete” using a mocked ffmpeg command.
- An admin UI shell exists which can submit a job and poll its status.
- Docker Compose configuration starts Postgres and Redis for local development.

## Stubbed or Incomplete Components

- The ffmpeg-based rendering pipeline in the worker is currently a placeholder and does not produce actual video output.
- Integration with YouTube (or other distribution platforms) is stubbed out and not functional.
- Authentication and authorization are not implemented; a simple header-based dev user context is used.
- The mobile application is only a shell without concrete caregiver recording functionality.
- Payments, invite flows, and distribution beyond local rendering are not yet implemented.

## How to Run Locally

1. Ensure you have `pnpm` installed.
2. Clone this repository and install dependencies:

   ```sh
   pnpm install
   ```

3. Start the supporting services using Docker Compose (Postgres and Redis):

   ```sh
   docker-compose up -d
   ```

4. Run database migrations and seed data:

   ```sh
   pnpm --filter api prisma migrate deploy
   pnpm --filter api prisma db seed
   ```

5. Start the API service:

   ```sh
   pnpm --filter api dev
   ```

   The API should be available at `http://localhost:3000` and expose a `/health` endpoint.

6. Start the worker service in a separate terminal:

   ```sh
   pnpm --filter worker dev
   ```

   The worker listens to jobs in Redis and will log a completion message when a job is processed.

7. Start the admin web app:

   ```sh
   pnpm --filter admin dev
   ```

   The admin UI will run on the default Next.js port (e.g., `http://localhost:3001`). From this interface you can submit render jobs and monitor their status.

8. The mobile app can be bootstrapped via the appropriate React Native tooling (not yet fully functional).

## Deployment Targets

- **Vercel:** Hosts the admin web application (`apps/admin`).
- **Railway:** Hosts the API service (`apps/api`), the worker service (`apps/worker`), and provides managed PostgreSQL and Redis instances.
- **Docker Compose:** For local development only.

## Definition of “Prototype Complete”

A prototype is considered complete when:

- The admin UI is publicly accessible and can be used to create a render job.
- The API service is publicly accessible and responds to `/health`.
- Creating a job through the admin UI stores a record in the database, enqueues a job in Redis, and returns a job ID.
- The worker service picks up the enqueued job, processes it (even if the rendering is mocked), and updates the job status.
- Status updates flow end ‑ end from the worker back to the admin UI, so users can see when a job is complete.
- Documentation within this repository (including this `PROJECT.md` and the files in `/prompts`) accurately reflects the current state of the system and how to run and deploy it.
