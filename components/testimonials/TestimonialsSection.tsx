import { MDXRemote } from "next-mdx-remote/rsc";
import { TestimonialsSlider } from "@/components/testimonials/TestimonialsSlider";
import { getFeaturedTestimonials } from "@/lib/testimonials";

export async function TestimonialsSection() {
  const testimonials = await getFeaturedTestimonials();

  if (testimonials.length === 0) return null;

  const slides = testimonials.map(({ source, ...testimonial }) => ({
    ...testimonial,
    content: <MDXRemote source={source} />,
  }));

  return <TestimonialsSlider testimonials={slides} />;
}
