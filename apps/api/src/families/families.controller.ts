import { Body, Controller, Param, Post } from "@nestjs/common";
import { FamiliesService } from "./families.service.js";
import { CurrentUser, RequestUser } from "../common/request-user.js";

@Controller()
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Post("families")
  createFamily(@CurrentUser() user: RequestUser, @Body() body: { name: string; planTier: string }) {
    return this.familiesService.create(user.id, body);
  }

  @Post("families/:id/invite-caregiver")
  inviteCaregiver(@Param("id") familyId: string, @Body() body: { emailOrPhone: string }) {
    return this.familiesService.inviteCaregiver(familyId, body.emailOrPhone);
  }

  @Post("invitations/accept")
  acceptInvite(@CurrentUser() user: RequestUser, @Body() body: { token: string }) {
    return this.familiesService.acceptInvitation(body.token, user.id);
  }
}
