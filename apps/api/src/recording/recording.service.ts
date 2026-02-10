import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class RecordingService {
  constructor(private prisma: PrismaService) {}

  create(body: { familyId: string; childId: string; caregiverId: string; templateId: string }) {
    return this.prisma.recordingSession.create({ data: body });
  }

  async presignClip(id: string, stepKey: string) {
    const storageKey = `sessions/${id}/${stepKey}.mp4`;
    await this.prisma.recordingClip.create({
      data: { sessionId: id, stepKey, storageKey, durationMs: 2500 }
    });
    return { uploadUrl: `https://minio.local/upload/${storageKey}`, storageKey };
  }

  submit(id: string) {
    return this.prisma.recordingSession.update({
      where: { id },
      data: { status: "SUBMITTED", submittedAt: new Date() }
    });
  }
}
