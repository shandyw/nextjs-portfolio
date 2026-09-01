import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import type { PortfolioProject } from "@/types/portfolio";

interface PortfolioGridProps {
  projects: PortfolioProject[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-body-lg text-text/75">New work is coming soon.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-lg md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <PortfolioCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
