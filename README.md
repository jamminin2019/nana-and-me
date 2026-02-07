# Nana & Me  
  
## Product Overview  
Nana & Me is a personalized family learning video platform that connects parents, children, and caregivers. Parents create a child profile and invite caregivers (e.g., grandparents, relatives), who record short guided selfie clips using an easy teleprompter interface. The backend composes these clips into a cohesive three‑minute ABC learning video using pre‑defined templates that are 60 % standardized and 40 % personalized. Parents can view these videos in the app and optionally publish them to the caregiver's YouTube channel as unlisted or private.  
  
## Architecture Summary  
The project is structured as a TypeScript monorepo using Turborepo and pnpm. It includes:  
- **Mobile app**: an Expo React Native application that serves both parents and caregivers with tailored flows.  
- **Admin console**: a Next.js (App Router) web application for managing templates, assets, users, and system health.  
- **API**: a NestJS backend exposing REST endpoints with OpenAPI docs, integrating with PostgreSQL via Prisma, providing authentication via Clerk or Auth0, handling media uploads to S3‑compatible storage, queuing render jobs via BullMQ/Redis, and enforcing role‑based access.  
- **Worker**: a Node.js service that processes rendering jobs using ffmpeg to compose videos from recorded clips and assets.  
- **Shared package**: common TypeScript types, schema definitions, and utilities.  
  
Async job queues, object storage, and a render worker ensure the video rendering pipeline is scalable. CI scripts perform linting, type‑checking, and unit tests.  
  
## MVP Definition  
The initial MVP delivers an “ABCs – A is for Apple” template:  
- Guided recording flow for caregivers with teleprompter prompts for each letter A‑Z.  
- Automatic composition of intro clip, letter clips, optional “A is for Apple” word clips, and outro into a three‑minute video.  
- Parent dashboard to create child profiles, invite caregivers, and view videos.  
- Basic admin system to manage template steps, assets, and versions.  
- Optional publishing to YouTube as unlisted/private.  
  
This repository includes only the scaffolded structure ready for expansion by Codex. The actual feature implementation will be generated in future stages.  
  
---  
Code generated via Codex / Agent Mode
