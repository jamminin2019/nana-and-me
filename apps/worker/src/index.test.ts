import { describe, expect, it } from "vitest";
import { buildFfmpegCommand } from "./index";

describe("buildFfmpegCommand", () => {
  it("builds filter graph with pip and audio mix", () => {
    const cmd = buildFfmpegCommand("a", "b", "c", "d").join(" ");
    expect(cmd).toContain("overlay");
    expect(cmd).toContain("amix");
  });
});
