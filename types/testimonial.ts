export type TestimonialStatus = "draft" | "published";

export interface Testimonial {
  slug: string;
  name: string;
  role?: string;
  company?: string;
  companyUrl?: string;
  project?: string;
  featured: boolean;
  order: number;
  status: TestimonialStatus;
}

export interface TestimonialSource extends Testimonial {
  source: string;
}
