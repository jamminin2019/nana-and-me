import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class RenderService {
  constructor(private prisma: PrismaService) {}

  create(sessionId: string) {
    return this.prisma.renderJob.create({ data: { sessionId, status: "QUEUED", progress: 5 } });
  }

  status(id: string) {
    return this.prisma.renderJob.findUnique({ where: { id } });
  }
}
