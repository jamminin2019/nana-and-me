# Running Nana & Me Locally  

This guide describes how to set up and run the Nana & Me prototype on your machine using the monorepo and docker-compose.  

## Prerequisites  
- Node.js \u2265 18 and pnpm installed.  
- Docker and docker-compose installed.  
- A Git clone of the `nana-and-me` repository.  

## Steps to start services  
1. Install dependencies: run `pnpm install` in the repo root.  
2. Copy environment variables: create `.env` files as needed (see `apps/api/.env.example`, etc.).  
3. Start the database and Redis using Docker:  
   ```bash  
   docker-compose up -d postgres redis  
   ```  
4. Run database migrations and seed data in the API container:  
   ```bash  
   pnpm --filter api exec prisma migrate deploy  
   pnpm --filter api exec prisma db seed  
   ```  
5. Start the API service locally:  
   ```bash  
   pnpm --filter api dev  
   ```  
   The API should expose a GET `/health` endpoint and a POST `/jobs` endpoint.  
6. Start the worker service:  
   ```bash  
   pnpm --filter worker dev  
   ```  
   The worker will process BullMQ jobs and log \u201crender complete\u201d for each job.  
7. Start the admin web app:  
   ```bash  
   pnpm --filter admin dev  
   ```  
   The admin UI will be available at `http://localhost:3000`. From there you can submit a render job and poll its status.  

## Troubleshooting  
- Ensure that Postgres and Redis containers are running. Use `docker ps` to verify.  
- If ports are already in use, adjust them in `docker-compose.yml`.  
- Check environment variables in the `.env` files.
