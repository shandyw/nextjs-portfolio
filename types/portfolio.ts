export const PORTFOLIO_PROJECT_CATEGORIES = ["web", "design"] as const;

export type PortfolioProjectCategory =
  (typeof PORTFOLIO_PROJECT_CATEGORIES)[number];

export type PortfolioProjectStatus = "draft" | "published";

export interface PortfolioCaseStudySection {
  copy: string;
  bullets: string[];
}

export interface PortfolioFeatureStrip {
  eyebrow?: string;
  title: string;
  copy?: string;
  items: string[];
}

export interface PortfolioProject {
  slug: string;
  title: string;
  client?: string;
  role?: string;
  year: string;
  excerpt: string;
  thumbnail: string;
  heroImage?: string;
  gallery?: string[];
  featureStrip?: PortfolioFeatureStrip;
  overview?: PortfolioCaseStudySection;
  challenge?: PortfolioCaseStudySection;
  approach?: PortfolioCaseStudySection;
  outcome?: PortfolioCaseStudySection;
  beforeImage?: string;
  afterImage?: string;
  technologies: string[];
  category: PortfolioProjectCategory;
  featured: boolean;
  order: number;
  status: PortfolioProjectStatus;
  liveUrl?: string;
  repositoryUrl?: string;
}

export interface PortfolioProjectSource extends PortfolioProject {
  source: string;
}
