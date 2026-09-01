import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Expertise } from "@/components/expertise/Expertise";
import { Logos } from "@/components/logos/Logos";
import { Contact } from "@/components/contact/Contact";
import { FeaturedWork } from "@/components/portfolio/FeaturedWork";
import { getFeaturedPortfolioProjects } from "@/lib/portfolio";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { HashScrollRestorer } from "@/components/ui/HashScrollRestorer";

/**
 * Homepage metadata
 */
export const metadata: Metadata = {
  title: "Home",
  description:
    "Creative, experienced, technically sharp. Senior web developer specializing in Wordpress, Next.js, React, and high-performance web experiences.",
};

/**
 * Homepage
 *
 * Structure:
 * 1. Hero - Large display section
 * 2. About - Brief introduction
 * 3. Expertise - Skills/technologies
 * 4. Portfolio - Featured projects
 * 5. Testimonials - Social proof
 * 6. Contact - Call to action
 *
 * Each section has:
 * - Semantic <section> landmark
 * - Unique ID for anchoring
 * - Meaningful heading hierarchy
 * - Placeholder content for testing
 */

export default async function HomePage() {
  const featuredProjects = await getFeaturedPortfolioProjects();

  return (
    <>
      <HashScrollRestorer />
      <Header />

      <main id="main-content">
        <Hero />
        <About />
        <Expertise />

        <FeaturedWork projects={featuredProjects} />

        <TestimonialsSection />
        <Logos />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
