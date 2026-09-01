/**
 * Common type definitions
 *
 * Extend this file with application-specific types as needed.
 */

/**
 * Generic component props
 */
export type BaseComponentProps = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * Blog post metadata
 * (Placeholder for future blog implementation)
 */
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: Date;
  updatedAt?: Date;
  author: string;
  tags: string[];
  featured: boolean;
};

export type {
  PortfolioProject,
  PortfolioProjectCategory,
  PortfolioProjectSource,
  PortfolioProjectStatus,
} from "./portfolio";

export type {
  Testimonial,
  TestimonialSource,
  TestimonialStatus,
} from "./testimonial";

/**
 * Form field configuration
 * (For future form implementation)
 */
export type FormField = {
  name: string;
  type: "text" | "email" | "tel" | "textarea" | "checkbox" | "select";
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
};

/**
 * Form submission response
 */
export type FormSubmitResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};
