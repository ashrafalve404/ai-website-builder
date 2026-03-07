import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">About SiteForge</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-muted-foreground mb-6">
              SiteForge is an AI-powered website builder that helps you create stunning 
              React + Vite websites in minutes, without writing code.
            </p>
            <p className="mb-4">
              Our mission is to make web development accessible to everyone. Whether you're 
              a seasoned developer or just starting out, SiteForge empowers you to bring 
              your ideas to life quickly and efficiently.
            </p>
            <p className="mb-4">
              Founded in 2024, we're a team of passionate developers and designers 
              dedicated to revolutionizing how websites are built.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
