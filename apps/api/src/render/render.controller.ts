import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RenderService } from "./render.service.js";

@Controller("render-jobs")
export class RenderController {
  constructor(private readonly renderService: RenderService) {}

  @Post()
  create(@Body() body: { sessionId: string }) { return this.renderService.create(body.sessionId); }

  @Get(":id")
  get(@Param("id") id: string) { return this.renderService.status(id); }
}
