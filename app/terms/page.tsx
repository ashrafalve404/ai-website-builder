import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none space-y-4">
            <p className="text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
            
            <h2 className="text-xl font-semibold mt-8">Acceptance of Terms</h2>
            <p>
              By accessing and using SiteForge, you accept and agree to be bound 
              by the terms and provision of this agreement.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Use License</h2>
            <p>
              Permission is granted to temporarily use SiteForge for personal, 
              non-commercial transitory viewing only.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Disclaimer</h2>
            <p>
              The materials on SiteForge are provided on an 'as is' basis. 
              SiteForge makes no warranties, expressed or implied, and hereby 
              disclaims and negates all other warranties.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
