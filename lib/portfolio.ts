import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { PORTFOLIO_PROJECT_CATEGORIES } from "@/types/portfolio";
import type {
  PortfolioCaseStudySection,
  PortfolioFeatureStrip,
  PortfolioProject,
  PortfolioProjectSource,
  PortfolioProjectStatus,
} from "@/types/portfolio";

const portfolioDirectory = path.join(process.cwd(), "content", "portfolio");

function requiredString(
  value: unknown,
  field: string,
  filename: string,
): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Portfolio file ${filename} requires a ${field}.`);
  }
  return value;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function optionalStringArray(
  value: unknown,
  field: string,
  filename: string,
): string[] | undefined {
  if (value === undefined) return undefined;
  if (
    !Array.isArray(value) ||
    !value.every((item) => typeof item === "string" && item.trim() !== "")
  ) {
    throw new Error(
      `Portfolio file ${filename} requires ${field} to be a list of strings.`,
    );
  }
  return value;
}

function optionalCaseStudySection(
  value: unknown,
  field: string,
  filename: string,
): PortfolioCaseStudySection | undefined {
  if (value === undefined) return undefined;
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(
      `Portfolio file ${filename} requires ${field} to contain copy and bullets.`,
    );
  }

  const section = value as Record<string, unknown>;
  return {
    copy: requiredString(section.copy, `${field}.copy`, filename),
    bullets:
      optionalStringArray(section.bullets, `${field}.bullets`, filename) ?? [],
  };
}

function optionalFeatureStrip(
  value: unknown,
  filename: string,
): PortfolioFeatureStrip | undefined {
  if (value === undefined) return undefined;
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(
      `Portfolio file ${filename} requires featureStrip to contain a title and items.`,
    );
  }

  const featureStrip = value as Record<string, unknown>;
  return {
    eyebrow: optionalString(featureStrip.eyebrow),
    title: requiredString(featureStrip.title, "featureStrip.title", filename),
    copy: optionalString(featureStrip.copy),
    items:
      optionalStringArray(featureStrip.items, "featureStrip.items", filename) ??
      [],
  };
}

function parseProject(
  filename: string,
  data: Record<string, unknown>,
): PortfolioProject {
  const filenameSlug = filename.replace(/\.mdx$/, "");
  const slug = requiredString(data.slug ?? filenameSlug, "slug", filename);
  const status = data.status;

  if (slug !== filenameSlug) {
    throw new Error(
      `Portfolio slug "${slug}" must match its filename "${filenameSlug}.mdx".`,
    );
  }
  if (status !== "draft" && status !== "published") {
    throw new Error(
      `Portfolio file ${filename} requires status "draft" or "published".`,
    );
  }
  if (!Array.isArray(data.technologies) || data.technologies.length === 0) {
    throw new Error(
      `Portfolio file ${filename} requires at least one technology.`,
    );
  }
  if (!data.technologies.every((item) => typeof item === "string")) {
    throw new Error(
      `Portfolio file ${filename} has an invalid technologies list.`,
    );
  }
  if (typeof data.featured !== "boolean") {
    throw new Error(`Portfolio file ${filename} requires featured.`);
  }
  if (typeof data.order !== "number" || !Number.isFinite(data.order)) {
    throw new Error(`Portfolio file ${filename} requires a numeric order.`);
  }
  if (
    typeof data.category !== "string" ||
    !PORTFOLIO_PROJECT_CATEGORIES.includes(
      data.category as (typeof PORTFOLIO_PROJECT_CATEGORIES)[number],
    )
  ) {
    throw new Error(
      `Portfolio file ${filename} requires category "web" or "design".`,
    );
  }

  return {
    slug,
    title: requiredString(data.title, "title", filename),
    client: optionalString(data.client),
    role: optionalString(data.role),
    year: requiredString(data.year, "year", filename),
    excerpt: requiredString(data.excerpt, "excerpt", filename),
    thumbnail: requiredString(data.thumbnail, "thumbnail", filename),
    heroImage: optionalString(data.heroImage),
    gallery: optionalStringArray(data.gallery, "gallery", filename),
    featureStrip: optionalFeatureStrip(data.featureStrip, filename),
    overview: optionalCaseStudySection(data.overview, "overview", filename),
    challenge: optionalCaseStudySection(data.challenge, "challenge", filename),
    approach: optionalCaseStudySection(data.approach, "approach", filename),
    outcome: optionalCaseStudySection(data.outcome, "outcome", filename),
    beforeImage: optionalString(data.beforeImage),
    afterImage: optionalString(data.afterImage),
    technologies: data.technologies,
    category: data.category as PortfolioProject["category"],
    featured: data.featured,
    order: data.order,
    status: status as PortfolioProjectStatus,
    liveUrl: optionalString(data.liveUrl),
    repositoryUrl: optionalString(data.repositoryUrl),
  };
}

async function getProjectFilenames(): Promise<string[]> {
  const entries = await fs.readdir(portfolioDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);
}

async function readProject(filename: string): Promise<PortfolioProjectSource> {
  const raw = await fs.readFile(
    path.join(portfolioDirectory, filename),
    "utf8",
  );
  const { content, data } = matter(raw);
  return { ...parseProject(filename, data), source: content };
}

export async function getAllPortfolioProjects(options?: {
  includeDrafts?: boolean;
}): Promise<PortfolioProject[]> {
  const projects = await Promise.all(
    (await getProjectFilenames()).map(readProject),
  );

  return projects
    .filter(
      (project) => options?.includeDrafts || project.status === "published",
    )
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
    .map(({ source: _source, ...project }) => project);
}

export async function getFeaturedPortfolioProjects(
  limit?: number,
): Promise<PortfolioProject[]> {
  const projects = (await getAllPortfolioProjects()).filter(
    (project) => project.featured,
  );
  return typeof limit === "number" ? projects.slice(0, limit) : projects;
}

export async function getPortfolioProjectBySlug(
  slug: string,
): Promise<PortfolioProjectSource | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;

  try {
    const project = await readProject(`${slug}.mdx`);
    return project.status === "published" ? project : null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}
