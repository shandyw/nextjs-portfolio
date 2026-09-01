import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  type TestimonialSlide,
  TestimonialsSlider,
} from "./TestimonialsSlider";

vi.mock("@/lib/animation/utils", () => ({
  getGsap: vi.fn().mockResolvedValue(null),
  getScrollTrigger: vi.fn().mockResolvedValue(null),
}));

const testimonials: TestimonialSlide[] = [
  {
    slug: "first",
    name: "First Person",
    role: "Director",
    company: "First Company",
    featured: true,
    order: 1,
    status: "published",
    content: <p>First testimonial copy.</p>,
  },
  {
    slug: "second",
    name: "Second Person",
    featured: true,
    order: 2,
    status: "published",
    content: <p>Second testimonial copy.</p>,
  },
];

describe("TestimonialsSlider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    cleanup();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("omits navigation controls for one testimonial", () => {
    render(<TestimonialsSlider testimonials={[testimonials[0]]} />);

    expect(screen.getByText("First testimonial copy.")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /next testimonial/i }),
    ).not.toBeInTheDocument();
  });

  it("shows the next testimonial and announces its position", () => {
    render(<TestimonialsSlider testimonials={testimonials} />);
    fireEvent.click(screen.getByRole("button", { name: /next testimonial/i }));

    act(() => vi.advanceTimersByTime(180));

    expect(screen.getByText("Second testimonial copy.")).toBeInTheDocument();
    expect(screen.getByText("Testimonial 2 of 2")).toBeInTheDocument();
  });

  it("supports scoped arrow-key navigation", () => {
    render(<TestimonialsSlider testimonials={testimonials} />);
    const carousel = screen.getByRole("region", {
      name: /client testimonials/i,
    });

    fireEvent.keyDown(carousel, { key: "ArrowRight" });
    act(() => vi.advanceTimersByTime(180));

    expect(screen.getByText("Second testimonial copy.")).toBeInTheDocument();
  });

  it("offers an accessible disclosure when a quote exceeds its line limit", () => {
    vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(
      1_000,
    );
    const getComputedStyle = window.getComputedStyle;
    vi.spyOn(window, "getComputedStyle").mockImplementation((element) => {
      const styles = getComputedStyle(element);
      Object.defineProperty(styles, "lineHeight", {
        configurable: true,
        value: "40px",
      });
      return styles;
    });

    render(<TestimonialsSlider testimonials={[testimonials[0]]} />);

    const disclosure = screen.getByRole("button", {
      name: /read full testimonial/i,
    });
    expect(disclosure).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(disclosure);

    expect(
      screen.getByRole("button", { name: /show less/i }),
    ).toHaveAttribute("aria-expanded", "true");
  });
});
