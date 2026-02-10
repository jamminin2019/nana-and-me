# Nana & Me Master Specification

This document serves as the single source of truth for the Nana & Me prototype. It describes the intended functionality, data model, and high-level requirements for the system.

## Overview

Nana & Me is a platform that allows caregivers to record personalized educational content (such as alphabet lessons, stories and songs) for children. The recordings are combined with template-driven visuals to produce engaging episodes. Parents can curate a library of episodes for their children, enabling family members to contribute to a shared learning experience even when they are apart.

## High-Level Requirements

- **Caregiver recording:** A mobile app where caregivers can capture video clips following a step-by-step template (e.g., "A is for Apple").
- **Template-driven rendering:** A rendering pipeline that composes recorded clips and template assets (images, animations, audio) into a cohesive episode using ffmpeg or a similar tool.
- **Parent library:** A web-based interface where parents can view completed episodes and manage invitations for caregivers.
- **Admin console:** An internal admin UI to manage templates, monitor render jobs, and trigger re-renders.
- **Render worker:** A background worker that consumes render jobs from a queue and produces final video assets.
- **API:** A REST API that handles user management, template retrieval, recording session management, job creation, and episode delivery.

## Data Model

Entities include:

- **User**: Represents any authenticated user.
- **Family**: A grouping of parents and children.
- **Child**: A child within a family.
- **CaregiverProfile**: Profile information for invited caregivers (e.g., grandparents).
- **Invitation**: A token allowing a caregiver to join a family.
- **Template**: Defines the sequence of steps and assets for a recording session.
- **Asset**: Media assets referenced by templates.
- **RecordingSession**: A session where a caregiver records clips for each template step.
- **RecordingClip**: Individual video clips recorded by a caregiver.
- **RenderJob**: A job requesting the composition of an episode from clips and assets.
- **Episode**: The final rendered video.
- **AuditLog**: Records of significant actions for auditing.

## Services

- **API Service (NestJS):** Provides endpoints for health checks, template retrieval, session management, job creation, and streaming episodes. Uses Prisma ORM with Postgres.
- **Worker Service (BullMQ):** Subscribes to Redis for render jobs; performs composition using ffmpeg commands defined in the shared package.
- **Admin Web App (Next.js/React):** Allows administrators to create templates, view render jobs, and manage assets.
- **Mobile App (React Native):** Guides caregivers through recording sessions.
- **Shared Package:** Contains type definitions and schemas (using Zod) to ensure consistent data contracts across services.

## Development Workflow

1. Clone the repository and install dependencies using `pnpm install`.
2. Start Postgres and Redis with `docker-compose up -d`.
3. Run database migrations and seeds via the API package.
4. Start the API, worker, admin, and mobile apps through pnpm workspace scripts.
5. Use the admin UI to create jobs and monitor their status.

## Notes

- Authentication is currently stubbed; a header-based mock user is used.
- Rendering is stubbed; the ffmpeg pipeline logs output but does not generate real video.
- The system is intended to be deployed with Vercel (admin) and Railway (API, worker, Postgres, Redis).
- Extend this document when features evolve.
