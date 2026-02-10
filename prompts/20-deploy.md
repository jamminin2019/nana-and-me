# Deployment Guide  

This document outlines how to deploy the Nana & Me prototype to the cloud using Railway and Vercel.  

## Services Overview  
- **Admin web app** (`apps/admin`): A Next.js React admin UI. Deploy to Vercel.  
- **API service** (`apps/api`): A NestJS server exposing REST endpoints and managing data via Prisma. Deploy to Railway.  
- **Worker service** (`apps/worker`): A BullMQ worker that consumes render jobs and uses ffmpeg. Deploy to Railway.  
- **Database**: Postgres. Provisioned on Railway.  
- **Redis**: Queue backend for BullMQ. Provisioned on Railway.  

## Railway Setup  
1. Sign in to [Railway](https://railway.app) and create a new project.  
2. Link the GitHub repository to the Railway project.  
3. Add a Postgres plugin and a Redis plugin in the project.  
4. Create two services:  
   - **api**: root path `apps/api`. Set the start command to `pnpm --filter api start`. Configure environment variables:  
     - `DATABASE_URL` using the Postgres plugin URL.  
     - `REDIS_URL` using the Redis plugin URL.  
     - Any other variables defined in `apps/api/.env.example`.  
   - **worker**: root path `apps/worker`. Set the start command to `pnpm --filter worker start`. Configure the same environment variables as the API.  
5. Set up continuous deployment from the `main` branch.  
6. Deploy the project; Railway will build and deploy each service. After deployment, note the public API endpoint URL (e.g., `https://nana-api.up.railway.app`).  

## Vercel Setup  
1. Sign in to [Vercel](https://vercel.com) and import the GitHub repository.  
2. For the **admin** project, set the root directory to `apps/admin`.  
3. Set environment variables needed by the admin app (API base URL pointing to Railway API).  
4. Choose the `main` branch for deployment. Use the default build command (`pnpm --filter admin build`) and output directory (`.next`).  
5. Deploy the admin app and obtain the public URL.  

## Environment Variables  
- `DATABASE_URL`: Provided by Railway Postgres service.  
- `REDIS_URL`: Provided by Railway Redis service.  
- `API_BASE_URL` (admin app): Set to the Railway API public URL.  
- Other variables: See `.env.example` files in the repo.  

## Deployment Notes  
- Ensure that migrations run automatically or run manually before first deployment.  
- The worker service is currently mocked: it logs “render complete” upon job completion. Replace with actual video rendering in future iterations.  
- After deployment, verify that the admin UI can submit a job to the API, and that the worker processes the job. 
