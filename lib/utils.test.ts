import { describe, expect, it, vi } from "vitest";
import { clsx, debounce, formatDate, isBrowser } from "./utils";

describe("general utilities", () => {
  it("joins only truthy class names", () => {
    expect(clsx("one", false, undefined, "two", null)).toBe("one two");
  });

  it("formats dates for the configured locale", () => {
    expect(formatDate("2026-08-13T12:00:00Z")).toBe("August 13, 2026");
  });

  it("debounces repeated calls", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced("first");
    debounced("second");
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith("second");
    vi.useRealTimers();
  });

  it("detects the browser environment", () => {
    expect(isBrowser()).toBe(true);
  });
});
