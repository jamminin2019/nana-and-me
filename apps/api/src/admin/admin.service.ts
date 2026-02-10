import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  createTemplate(body: { slug: string; name: string; version: number; stepsJson: object }) {
    return this.prisma.template.create({ data: body });
  }

  presignAssetUpload(key: string) {
    return { uploadUrl: `https://minio.local/upload/${key}` };
  }

  publishVersion(id: string, version: number) {
    return this.prisma.template.update({ where: { id }, data: { version } });
  }

  renderHealth() {
    return this.prisma.renderJob.groupBy({ by: ["status"], _count: { status: true } });
  }

  families() {
    return this.prisma.family.findMany({ include: { children: true, invitations: true } });
  }
}
