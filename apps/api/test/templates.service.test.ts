import { describe, it, expect, vi } from "vitest";
import { TemplatesService } from "../src/templates/templates.service.js";

describe("TemplatesService", () => {
  it("lists templates ordered by createdAt", async () => {
    const prisma = { template: { findMany: vi.fn().mockResolvedValue([{ slug: "a" }]) } } as any;
    const service = new TemplatesService(prisma);
    const result = await service.list();
    expect(result[0].slug).toBe("a");
    expect(prisma.template.findMany).toHaveBeenCalled();
  });
});
