import { Body, Controller, Param, Post } from "@nestjs/common";
import { RecordingService } from "./recording.service.js";

@Controller("recording-sessions")
export class RecordingController {
  constructor(private readonly recordingService: RecordingService) {}

  @Post()
  create(@Body() body: { familyId: string; childId: string; caregiverId: string; templateId: string }) {
    return this.recordingService.create(body);
  }

  @Post(":id/clips/presign")
  presign(@Param("id") id: string, @Body() body: { stepKey: string }) {
    return this.recordingService.presignClip(id, body.stepKey);
  }

  @Post(":id/submit")
  submit(@Param("id") id: string) {
    return this.recordingService.submit(id);
  }
}
