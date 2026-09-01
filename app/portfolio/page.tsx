import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortfolioArchive } from "@/components/portfolio/PortfolioArchive";
import { PortfolioWordCloud } from "@/components/portfolio/PortfolioWordCloud";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getAllPortfolioProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected projects and case studies showcasing my work.",
};

export default async function PortfolioPage() {
  const projects = await getAllPortfolioProjects();

  return (
    <>
      <Header />
      <main id="main-content">
        <Section id="portfolio-hero" py="lg">
          <Container>
            <div className="grid items-center gap-lg md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-xl">
              <div className="order-1">
                <p className="mb-sm gap-4 flex items-center font-label text-label-sm font-bold uppercase tracking-[0.08em] text-text">
                  Selected work
                  <span
                    className="h-px w-24 bg-text sm:w-40"
                    aria-hidden="true"
                  ></span>
                </p>
                <h1 className="mb-md text-headline-lg text-text">Portfolio</h1>
                <p className="max-w-copy text-body-lg text-text/80">
                  A selection of projects demonstrating frontend development,
                  performance optimization, accessible design, and maintainable
                  systems.
                </p>
              </div>
              <PortfolioWordCloud />
            </div>
          </Container>
        </Section>

        <Section id="portfolio-grid" py="lg">
          <Container>
            <PortfolioArchive projects={projects} />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
