import { z } from "zod";

export const RoleSchema = z.enum(["PARENT", "CAREGIVER", "ADMIN"]);
export type Role = z.infer<typeof RoleSchema>;

export const VisibilitySchema = z.enum(["private", "unlisted", "public"]);
export type Visibility = z.infer<typeof VisibilitySchema>;

export const RecordingSessionStatusSchema = z.enum([
  "DRAFT",
  "UPLOADING",
  "SUBMITTED",
  "RENDERING",
  "COMPLETED",
  "FAILED"
]);

export const RenderJobStatusSchema = z.enum(["QUEUED", "PROCESSING", "DONE", "ERROR"]);

export const CreateFamilySchema = z.object({
  name: z.string().min(2),
  planTier: z.enum(["starter", "growth", "family_plus"]).default("starter")
});

export const InviteCaregiverSchema = z.object({
  emailOrPhone: z.string().min(3),
  role: z.literal("CAREGIVER"),
  relationshipLabel: z.string().min(2)
});

export const TemplateStepSchema = z.object({
  key: z.string(),
  label: z.string(),
  prompt: z.string(),
  tip: z.string(),
  overlayText: z.string(),
  durationHintMs: z.number()
});

export type TemplateStep = z.infer<typeof TemplateStepSchema>;

export const AbcTemplateSteps: TemplateStep[] = [
  {
    key: "intro",
    label: "Intro",
    prompt: "Hi {childName}! It's {caregiverName}. Are you ready to learn today?",
    tip: "Smile and speak slowly.",
    overlayText: "Welcome!",
    durationHintMs: 6000
  },
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => ({
    key: `letter_${letter}`,
    label: `Letter ${letter}`,
    prompt: `Say: ${letter}... and pause one second.`,
    tip: "Be upbeat and pause after each letter.",
    overlayText: letter,
    durationHintMs: 2500
  })),
  {
    key: "word_A",
    label: "A is for Apple",
    prompt: "A is for Apple",
    tip: "Point to the letter if visible.",
    overlayText: "A is for Apple",
    durationHintMs: 3000
  },
  {
    key: "outro",
    label: "Outro",
    prompt: "I love you {childName}. See you next time!",
    tip: "Wave goodbye.",
    overlayText: "See you next time!",
    durationHintMs: 5000
  }
];
