import { beforeEach, describe, expect, it, vi } from "vitest";
import { prefersReducedMotion } from "./utils";

describe("animation preferences", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
  });

  it("returns the operating-system reduced-motion preference", () => {
    expect(prefersReducedMotion()).toBe(false);

    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
    } as MediaQueryList);

    expect(prefersReducedMotion()).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith(
      "(prefers-reduced-motion: reduce)",
    );
  });
});
