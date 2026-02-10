import { describe, expect, it } from "vitest";
import { AbcTemplateSteps } from "./index";

describe("ABCs template", () => {
  it("includes all letters", () => {
    expect(AbcTemplateSteps.filter((x) => x.key.startsWith("letter_")).length).toBe(26);
  });
});
