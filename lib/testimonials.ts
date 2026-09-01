import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Testimonial,
  TestimonialSource,
  TestimonialStatus,
} from "@/types/testimonial";

const testimonialsDirectory = path.join(
  process.cwd(),
  "content",
  "testimonials",
);

function requiredString(
  value: unknown,
  field: string,
  filename: string,
): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Testimonial file ${filename} requires a ${field}.`);
  }
  return value;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function parseTestimonial(
  filename: string,
  data: Record<string, unknown>,
  source: string,
): Testimonial {
  const filenameSlug = filename.replace(/\.mdx$/, "");
  const slug = requiredString(data.slug ?? filenameSlug, "slug", filename);
  const status = data.status;

  if (slug !== filenameSlug) {
    throw new Error(
      `Testimonial slug "${slug}" must match its filename "${filenameSlug}.mdx".`,
    );
  }
  if (status !== "draft" && status !== "published") {
    throw new Error(
      `Testimonial file ${filename} requires status "draft" or "published".`,
    );
  }
  if (typeof data.featured !== "boolean") {
    throw new Error(`Testimonial file ${filename} requires featured.`);
  }
  if (typeof data.order !== "number" || !Number.isFinite(data.order)) {
    throw new Error(`Testimonial file ${filename} requires a numeric order.`);
  }
  if (source.trim() === "") {
    throw new Error(
      `Testimonial file ${filename} requires testimonial copy in its MDX body.`,
    );
  }

  return {
    slug,
    name: requiredString(data.name, "name", filename),
    role: optionalString(data.role),
    company: optionalString(data.company),
    companyUrl: optionalString(data.companyUrl),
    project: optionalString(data.project),
    featured: data.featured,
    order: data.order,
    status: status as TestimonialStatus,
  };
}

async function getTestimonialFilenames(): Promise<string[]> {
  const entries = await fs.readdir(testimonialsDirectory, {
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);
}

async function readTestimonial(filename: string): Promise<TestimonialSource> {
  const raw = await fs.readFile(
    path.join(testimonialsDirectory, filename),
    "utf8",
  );
  const { content, data } = matter(raw);
  return { ...parseTestimonial(filename, data, content), source: content };
}

function assertUniqueSlugs(testimonials: TestimonialSource[]): void {
  const slugs = new Set<string>();

  testimonials.forEach(({ slug }) => {
    if (slugs.has(slug)) {
      throw new Error(`Duplicate testimonial slug "${slug}".`);
    }
    slugs.add(slug);
  });
}

async function readAllTestimonials(): Promise<TestimonialSource[]> {
  const testimonials = await Promise.all(
    (await getTestimonialFilenames()).map(readTestimonial),
  );
  assertUniqueSlugs(testimonials);
  return testimonials.sort(
    (a, b) => a.order - b.order || a.name.localeCompare(b.name),
  );
}

export async function getAllTestimonials(options?: {
  includeDrafts?: boolean;
}): Promise<TestimonialSource[]> {
  const testimonials = await readAllTestimonials();
  return options?.includeDrafts
    ? testimonials
    : testimonials.filter(({ status }) => status === "published");
}

export async function getPublishedTestimonials(): Promise<TestimonialSource[]> {
  return getAllTestimonials();
}

export async function getFeaturedTestimonials(): Promise<TestimonialSource[]> {
  return (await getPublishedTestimonials()).filter(({ featured }) => featured);
}

export async function getTestimonialBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
): Promise<TestimonialSource | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;

  try {
    const testimonial = await readTestimonial(`${slug}.mdx`);
    if (testimonial.status === "draft" && !options?.includeDrafts) return null;
    return testimonial;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}
