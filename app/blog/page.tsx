import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <div className="space-y-8">
            <article className="border-b border-border pb-8">
              <h2 className="text-2xl font-semibold mb-2">Welcome to SiteForge Blog</h2>
              <p className="text-muted-foreground mb-4">Coming soon...</p>
              <p className="text-sm text-muted-foreground">
                Stay tuned for updates on web development, AI, and more.
              </p>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
