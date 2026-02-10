import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class EpisodesService {
  constructor(private prisma: PrismaService) {}

  list(familyId: string) {
    return this.prisma.episode.findMany({ where: { familyId }, orderBy: { createdAt: "desc" } });
  }

  async stream(id: string) {
    const episode = await this.prisma.episode.findUnique({ where: { id } });
    return { url: `https://minio.local/stream/${episode?.outputKey}` };
  }
}
