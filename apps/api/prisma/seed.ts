import { PrismaClient } from "@prisma/client";
import { AbcTemplateSteps } from "@nana/shared";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@nanaandme.app" },
    update: {},
    create: { email: "admin@nanaandme.app", name: "Nick", role: "ADMIN" }
  });

  const template = await prisma.template.upsert({
    where: { slug: "abcs-a-is-for-apple" },
    update: { version: 1, stepsJson: AbcTemplateSteps as unknown as object },
    create: {
      slug: "abcs-a-is-for-apple",
      name: "ABCs - A is for Apple",
      version: 1,
      stepsJson: AbcTemplateSteps as unknown as object
    }
  });

  await prisma.asset.createMany({
    data: [
      {
        templateId: template.id,
        type: "background",
        key: "templates/abcs/v1/background.mp4",
        url: "s3://templates/abcs/v1/background.mp4",
        metadataJson: { loop: true }
      },
      {
        templateId: template.id,
        type: "music",
        key: "templates/abcs/v1/music.mp3",
        url: "s3://templates/abcs/v1/music.mp3",
        metadataJson: { lufs: -18 }
      }
    ],
    skipDuplicates: true
  });

  console.log("Seeded", { adminId: admin.id, templateId: template.id });
}

main().finally(() => prisma.$disconnect());
