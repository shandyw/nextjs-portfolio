import Image from "next/image";
import type { ReactNode } from "react";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { Container } from "@/components/ui/Container";
import type {
  PortfolioCaseStudySection,
  PortfolioProject,
} from "@/types/portfolio";

interface PortfolioCaseStudyProps {
  children: ReactNode;
  project: PortfolioProject;
}

const sectionDetails = [
  {
    key: "overview",
    title: "Overview",
    icon: "/graphics/portfolio/overview.png",
  },
  {
    key: "challenge",
    title: "The challenge",
    icon: "/graphics/portfolio/challenge.png",
  },
  {
    key: "approach",
    title: "The approach",
    icon: "/graphics/portfolio/approach.png",
  },
  {
    key: "outcome",
    title: "The outcome",
    icon: "/graphics/portfolio/outcome.png",
  },
] as const;

export function PortfolioCaseStudy({
  children,
  project,
}: PortfolioCaseStudyProps) {
  const heroImage = project.heroImage ?? project.thumbnail;
  const galleryImages = Array.from(
    new Set(project.gallery?.length ? project.gallery : [heroImage]),
  );
  const caseStudySections = sectionDetails.flatMap((details) => {
    const content = project[details.key] as
      | PortfolioCaseStudySection
      | undefined;
    return content ? [{ ...details, content }] : [];
  });

  return (
    <article className="overflow-hidden bg-background pb-2xl text-text">
      <header className="py-lg lg:py-2xl">
        <Container>
          <div className="grid items-center gap-xl lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:gap-2xl">
            <div>
              <p className="mb-sm font-label text-label-sm font-bold uppercase tracking-[0.08em] text-primary">
                {project.category} · {project.year}
              </p>
              <h1 className="max-w-[12ch]">{project.title}</h1>
              <p className="max-w-copy text-body-lg text-text/75">
                {project.excerpt}
              </p>

              <dl className="mt-lg max-w-copy border-y border-text/15 font-label">
                {project.client && (
                  <div className="grid grid-cols-[6rem_1fr] gap-md border-b border-text/15 py-sm">
                    <dt className="text-label-sm font-bold uppercase text-text/55">
                      Client
                    </dt>
                    <dd className="m-0 text-label-md">{project.client}</dd>
                  </div>
                )}
                {project.role && (
                  <div className="grid grid-cols-[6rem_1fr] gap-md border-b border-text/15 py-sm">
                    <dt className="text-label-sm font-bold uppercase text-text/55">
                      Role
                    </dt>
                    <dd className="m-0 text-label-md">{project.role}</dd>
                  </div>
                )}
                <div className="grid grid-cols-[6rem_1fr] gap-md border-b border-text/15 py-sm">
                  <dt className="text-label-sm font-bold uppercase text-text/55">
                    Year
                  </dt>
                  <dd className="m-0 text-label-md">{project.year}</dd>
                </div>
                <div className="grid py-sm grid-cols-[6rem_1fr] gap-md">
                  <dt className="text-label-sm font-bold uppercase text-text/55">
                    Tech stack
                  </dt>
                  <dd className="m-0">
                    <ul
                      className="m-0 flex list-none flex-wrap gap-xs p-0"
                      aria-label="Project technology stack"
                    >
                      {project.technologies.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-full border border-text/20 px-sm py-xs text-label-sm font-bold text-text/75"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              {(project.liveUrl || project.repositoryUrl) && (
                <div className="mt-lg flex flex-wrap gap-md font-label text-label-md font-bold text-primary">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/arrow"
                    >
                      Visit live site
                      <span
                        aria-hidden="true"
                        className="ml-xs inline-block transition-transform duration-200 group-hover/arrow:translate-x-1 group-hover/arrow:-translate-y-1"
                      >
                        ↗
                      </span>
                    </a>
                  )}
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/arrow"
                    >
                      View repository
                      <span
                        aria-hidden="true"
                        className="ml-xs inline-block transition-transform duration-200 group-hover/arrow:translate-x-1 group-hover/arrow:-translate-y-1"
                      >
                        ↗
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>

            <PortfolioGallery images={galleryImages} title={project.title} />
          </div>
        </Container>
      </header>

      {project.featureStrip && (
        <section
          aria-labelledby="feature-strip-heading"
          className="border-y border-text/15 py-lg"
        >
          <Container>
            <div className="grid gap-lg lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-center lg:gap-xl">
              <div>
                {project.featureStrip.eyebrow && (
                  <p className="mb-xs font-label text-label-sm font-bold uppercase tracking-[0.08em] text-primary">
                    {project.featureStrip.eyebrow}
                  </p>
                )}
                <p
                  id="feature-strip-heading"
                  className="mb-xs font-display text-title-lg font-extrabold"
                >
                  {project.featureStrip.title}
                </p>
                {project.featureStrip.copy && (
                  <p className="m-0 max-w-[18rem] font-body text-body-md text-text/70">
                    {project.featureStrip.copy}
                  </p>
                )}
              </div>

              {project.featureStrip.items.length > 0 && (
                <ul className="m-0 grid list-none gap-sm p-0 font-label text-label-md font-bold sm:grid-cols-2 lg:flex lg:items-center lg:justify-between lg:gap-md">
                  {project.featureStrip.items.map((item, index) => (
                    <li key={item} className="flex min-w-0 items-center gap-sm">
                      {index > 0 && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Container>
        </section>
      )}

      <Container>
        {caseStudySections.length > 0 ? (
          <section aria-labelledby="case-study-details-heading">
            <h2 id="case-study-details-heading" className="sr-only">
              Project details
            </h2>
            <div className="divide-y divide-text/15 border-y border-text/15">
              {caseStudySections.map(({ key, title, icon, content }) => (
                <section
                  key={key}
                  aria-labelledby={`${key}-heading`}
                  className="grid gap-md py-lg md:grid-cols-[4rem_10rem_minmax(0,1fr)] lg:grid-cols-[4rem_10rem_minmax(0,1fr)_minmax(0,1fr)] lg:gap-lg lg:py-xl"
                >
                  <Image
                    src={icon}
                    alt=""
                    width={48}
                    height={47}
                    aria-hidden="true"
                    className="h-12 w-12"
                  />
                  <h3
                    id={`${key}-heading`}
                    className="m-0 self-start font-display text-title-lg font-bold"
                  >
                    {title}
                  </h3>
                  <p className="m-0 max-w-copy font-body text-body-md text-text/75">
                    {content.copy}
                  </p>
                  {content.bullets.length > 0 && (
                    <ul className="m-0 space-y-xs pl-md font-body text-body-md text-text/75 marker:text-primary md:col-start-3 lg:col-start-4">
                      {content.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </section>
        ) : (
          <div className="mx-auto max-w-copy font-body text-body-lg text-text/85 [&_a]:font-bold [&_h2]:mb-md [&_h2]:mt-xl [&_h3]:mb-sm [&_h3]:mt-lg [&_h3]:font-label [&_h3]:text-title-lg [&_li]:mb-xs [&_p]:mb-md [&_ul]:mb-lg">
            {children}
          </div>
        )}

        {(project.beforeImage || project.afterImage) && (
          <section
            aria-labelledby="before-after-heading"
            className="mt-xl lg:mt-2xl"
          >
            <h2 id="before-after-heading" className="sr-only">
              Before and after
            </h2>
            <div className="grid gap-lg md:grid-cols-2">
              {project.beforeImage && (
                <figure className="m-0">
                  <figcaption className="mb-md font-serif text-headline-md">
                    Before
                  </figcaption>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-subtle bg-white shadow-editorial">
                    <Image
                      src={project.beforeImage}
                      alt={`${project.title} before redesign`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              )}
              {project.afterImage && (
                <figure className="m-0">
                  <figcaption className="mb-md font-serif text-headline-md">
                    After
                  </figcaption>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-subtle bg-white shadow-editorial">
                    <Image
                      src={project.afterImage}
                      alt={`${project.title} after redesign`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              )}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
