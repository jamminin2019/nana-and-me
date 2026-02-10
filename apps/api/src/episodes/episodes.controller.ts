import { Controller, Get, Param, Query } from "@nestjs/common";
import { EpisodesService } from "./episodes.service.js";

@Controller("episodes")
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  list(@Query("familyId") familyId: string) { return this.episodesService.list(familyId); }

  @Get(":id/stream")
  stream(@Param("id") id: string) { return this.episodesService.stream(id); }
}
