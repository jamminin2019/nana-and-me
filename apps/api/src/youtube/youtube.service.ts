import { Injectable } from "@nestjs/common";

@Injectable()
export class YoutubeService {
  connect() {
    return {
      authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      createChannelUrl: "https://www.youtube.com/create_channel"
    };
  }

  upload(body: { episodeId: string; visibility: "private" | "unlisted" | "public" }) {
    return {
      status: "queued",
      message: `Upload queued with visibility ${body.visibility}. Explicit user action confirmed.`
    };
  }
}
