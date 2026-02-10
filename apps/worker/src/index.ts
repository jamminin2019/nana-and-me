import { Worker } from "bullmq";
import IORedis from "ioredis";
import { PrismaClient } from "@prisma/client";
import { spawn } from "node:child_process";

const redis = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", { maxRetriesPerRequest: null });
const prisma = new PrismaClient();

export function buildFfmpegCommand(inputClip: string, background: string, music: string, outPath: string) {
  return [
    "-stream_loop", "-1", "-i", background,
    "-i", inputClip,
    "-i", music,
    "-filter_complex",
    [
      "[1:v]crop=in_h*3/4:in_h,scale=360:480[pip]",
      "[0:v][pip]overlay=W-w-40:H-h-40:shortest=1[v]",
      "[1:a]volume=1.0[voice]",
      "[2:a]volume=0.22[music]",
      "[voice][music]amix=inputs=2:duration=longest[a]"
    ].join(";"),
    "-map", "[v]", "-map", "[a]",
    "-c:v", "libx264", "-c:a", "aac", "-pix_fmt", "yuv420p", "-s", "1920x1080",
    "-shortest", outPath
  ];
}

export function startWorker() {
return new Worker("render-jobs", async (job) => {
  const renderJob = await prisma.renderJob.update({ where: { id: job.data.renderJobId }, data: { status: "PROCESSING", progress: 30 } });
  const outPath = `/tmp/${renderJob.id}.mp4`;
  const ffArgs = buildFfmpegCommand("/tmp/input.mp4", "/tmp/background.mp4", "/tmp/music.mp3", outPath);
  await new Promise<void>((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", ffArgs);
    ffmpeg.on("exit", (code) => code === 0 ? resolve() : reject(new Error("ffmpeg failed")));
  });

  await prisma.renderJob.update({ where: { id: renderJob.id }, data: { status: "DONE", progress: 100, outputKey: `episodes/${renderJob.id}.mp4`, finishedAt: new Date() } });
}, { connection: redis });
}

if (process.env.NODE_ENV !== "test") {
  startWorker();
}
