import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

/**
 * Blog page metadata
 */
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts and insights on web development, design systems, and frontend engineering.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: "/blog",
    title: "Blog | Shandy Ward",
    description:
      "Thoughts and insights on web development, design systems, and frontend engineering.",
    images: ["/opengraph-image"],
  },
};

/**
 * Blog Page
 *
 * Stub page for blog posts.
 * To be developed with individual post cards, filters, and pagination.
 */

export default function BlogPage() {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <Section id="blog-hero" py="xl">
          <Container>
            <div className="max-w-editorial mx-auto">
              <h1 className="text-headline-lg text-text mb-md">Blog</h1>
              <p className="text-body-lg text-text/80">
                Articles and insights on frontend development, web performance,
                accessibility, and design systems.
              </p>
            </div>
          </Container>
        </Section>

        {/* Blog Posts Grid */}
        <Section id="blog-posts" bg="background" py="xl">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg max-w-editorial mx-auto">
              {/* Blog Post Placeholder Cards - to be replaced with actual posts */}
              {[1, 2, 3, 4].map((i) => (
                <article
                  key={i}
                  className="bg-surface rounded p-lg hover:shadow-editorial transition-shadow"
                >
                  <h3 className="text-headline-md text-text mb-sm">
                    Blog Post Title {i}
                  </h3>
                  <p className="text-label-sm text-text/60 mb-md">
                    Published on [Date] · [Reading Time] min read
                  </p>
                  <p className="text-body-md text-text/80 mb-md">
                    Brief excerpt of the blog post. This is where the summary of
                    the article will appear.
                  </p>
                  <p className="text-label-md font-bold text-text/70">
                    Article coming soon
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
