import type { MetadataRoute } from "next";
import { getAllPortfolioProjects } from "@/lib/portfolio";

const siteUrl = "https://shandyward.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllPortfolioProjects();

  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/portfolio`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/portfolio/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
