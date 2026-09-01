import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortfolioCaseStudy } from "@/components/portfolio/PortfolioCaseStudy";
import {
  getAllPortfolioProjects,
  getPortfolioProjectBySlug,
} from "@/lib/portfolio";

interface PortfolioProjectPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPortfolioProjects()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PortfolioProjectPageProps): Promise<Metadata> {
  const project = await getPortfolioProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: [project.heroImage ?? project.thumbnail],
    },
  };
}

export default async function PortfolioProjectPage({
  params,
}: PortfolioProjectPageProps) {
  const project = await getPortfolioProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <Header />
      <main id="main-content">
        <PortfolioCaseStudy project={project}>
          <MDXRemote source={project.source} />
        </PortfolioCaseStudy>
      </main>
      <Footer />
    </>
  );
}
