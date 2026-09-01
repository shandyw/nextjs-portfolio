"use client";

import { useState } from "react";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import {
  PORTFOLIO_PROJECT_CATEGORIES,
  type PortfolioProject,
  type PortfolioProjectCategory,
} from "@/types/portfolio";

type PortfolioFilter = "all" | PortfolioProjectCategory;

const FILTER_LABELS: Record<PortfolioFilter, string> = {
  all: "All",
  web: "Web",
  design: "Design",
};

interface PortfolioArchiveProps {
  projects: PortfolioProject[];
}

export function PortfolioArchive({ projects }: PortfolioArchiveProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("all");
  const filters: PortfolioFilter[] = ["all", ...PORTFOLIO_PROJECT_CATEGORIES];
  const visibleProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div>
      <div
        className="mb-lg flex flex-wrap gap-sm"
        role="group"
        aria-label="Filter portfolio projects by category"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-md py-sm font-label text-label-md font-bold transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                isActive
                  ? "border-text bg-text text-white"
                  : "border-text/30 text-text hover:border-primary hover:text-primary"
              }`}
            >
              {FILTER_LABELS[filter]}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {visibleProjects.length}{" "}
        {FILTER_LABELS[activeFilter].toLowerCase()} project
        {visibleProjects.length === 1 ? "" : "s"}.
      </p>
      <PortfolioGrid projects={visibleProjects} />
    </div>
  );
}
