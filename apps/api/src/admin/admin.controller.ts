import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AdminService } from "./admin.service.js";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("templates")
  createTemplate(@Body() body: { slug: string; name: string; version: number; stepsJson: object }) {
    return this.adminService.createTemplate(body);
  }

  @Post("assets/upload/presign")
  presignAsset(@Body() body: { key: string }) { return this.adminService.presignAssetUpload(body.key); }

  @Post("templates/:id/publish-version")
  publishVersion(@Param("id") id: string, @Body() body: { version: number }) {
    return this.adminService.publishVersion(id, body.version);
  }

  @Get("health/renders")
  healthRenders() { return this.adminService.renderHealth(); }

  @Get("families")
  families() { return this.adminService.families(); }
}
