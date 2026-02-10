import { Controller, Get, Param } from "@nestjs/common";
import { TemplatesService } from "./templates.service.js";

@Controller("templates")
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  list() { return this.templatesService.list(); }

  @Get(":slug")
  getOne(@Param("slug") slug: string) { return this.templatesService.bySlug(slug); }
}
