import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/types/portfolio";

interface PortfolioCardProps {
  project: PortfolioProject;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const caseStudyUrl = `/portfolio/${project.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-subtle bg-white shadow-editorial">
      <Link
        href={caseStudyUrl}
        aria-label={`View the ${project.title} project`}
        className="block no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <div className="relative min-h-40 w-full aspect-video overflow-hidden bg-surface">
          <Image
            src={project.thumbnail}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-slow ease-editorial group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-md">
        <div className="mb-sm flex items-center justify-between gap-sm font-label text-label-sm font-bold uppercase text-text/65">
          <span>{project.client ?? project.role ?? "Selected work"}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="mb-sm mt-0 font-display text-headline-md">
          <Link
            href={caseStudyUrl}
            className="text-text no-underline transition-colors group-hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mb-md font-body text-body-md text-text/80">
          {project.excerpt}
        </p>
        <ul
          className="m-0 flex list-none flex-wrap gap-xs p-0"
          aria-label="Technologies"
        >
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-text/20 px-sm py-xs font-label text-label-sm font-bold text-text/75"
            >
              {technology}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-md pt-md font-label text-label-md font-bold">
          <Link className="group/arrow" href={caseStudyUrl}>
            View project
            <span
              aria-hidden="true"
              className="ml-xs inline-block transition-transform duration-200 group-hover/arrow:translate-x-1"
            >
              →
            </span>
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/arrow"
            >
              Live site
              <span
                aria-hidden="true"
                className="ml-xs inline-block transition-transform duration-200 group-hover/arrow:translate-x-1 group-hover/arrow:-translate-y-1"
              >
                ↗
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
