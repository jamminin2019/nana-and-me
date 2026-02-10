import { Body, Controller, Post } from "@nestjs/common";
import { YoutubeService } from "./youtube.service.js";

@Controller("youtube")
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post("connect")
  connect() { return this.youtubeService.connect(); }

  @Post("upload")
  upload(@Body() body: { episodeId: string; visibility: "private" | "unlisted" | "public" }) {
    return this.youtubeService.upload(body);
  }
}
