import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service.js";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { FamiliesController } from "./families/families.controller.js";
import { FamiliesService } from "./families/families.service.js";
import { TemplatesController } from "./templates/templates.controller.js";
import { TemplatesService } from "./templates/templates.service.js";
import { RecordingController } from "./recording/recording.controller.js";
import { RecordingService } from "./recording/recording.service.js";
import { RenderController } from "./render/render.controller.js";
import { RenderService } from "./render/render.service.js";
import { EpisodesController } from "./episodes/episodes.controller.js";
import { EpisodesService } from "./episodes/episodes.service.js";
import { YoutubeController } from "./youtube/youtube.controller.js";
import { YoutubeService } from "./youtube/youtube.service.js";
import { AdminController } from "./admin/admin.controller.js";
import { AdminService } from "./admin/admin.service.js";

@Module({
  imports: [],
  controllers: [AppController, FamiliesController, TemplatesController, RecordingController, RenderController, EpisodesController, YoutubeController, AdminController],
  providers: [PrismaService, AppService, FamiliesService, TemplatesService, RecordingService, RenderService, EpisodesService, YoutubeService, AdminService]
})
export class AppModule {}
