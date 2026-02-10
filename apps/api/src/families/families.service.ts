import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { randomUUID } from "node:crypto";

@Injectable()
export class FamiliesService {
  constructor(private prisma: PrismaService) {}

  create(ownerUserId: string, body: { name: string; planTier: string }) {
    return this.prisma.family.create({
      data: { ownerUserId, planTier: body.planTier }
    });
  }

  inviteCaregiver(familyId: string, emailOrPhone: string) {
    return this.prisma.invitation.create({
      data: {
        familyId,
        emailOrPhone,
        role: "CAREGIVER",
        status: "PENDING",
        token: randomUUID(),
        expiresAt: new Date(Date.now() + 7 * 24 * 3600_000)
      }
    });
  }

  acceptInvitation(token: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const invite = await tx.invitation.update({ where: { token }, data: { status: "ACCEPTED" } });
      await tx.caregiverProfile.upsert({
        where: { userId },
        update: {},
        create: { userId, displayName: "Caregiver", relationshipLabel: "Nana" }
      });
      return invite;
    });
  }
}
