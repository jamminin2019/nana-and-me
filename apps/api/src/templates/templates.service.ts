import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}
  list() { return this.prisma.template.findMany({ orderBy: { createdAt: "desc" } }); }
  bySlug(slug: string) { return this.prisma.template.findUnique({ where: { slug }, include: { assets: true } }); }
}
