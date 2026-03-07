import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          <div className="prose prose-invert max-w-none space-y-4">
            <p className="text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
            
            <h2 className="text-xl font-semibold mt-8">What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your computer or 
              mobile device when you visit a website. They are widely used to 
              make websites work more efficiently.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">How We Use Cookies</h2>
            <p>
              We use cookies to understand how you use our website, to remember 
              your login details, and to provide personalized content. 
              The cookies we use do not collect personally identifiable information.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Managing Cookies</h2>
            <p>
              You can manage or disable cookies through your browser settings. 
              Please note that disabling cookies may affect the functionality 
              of our website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
            <p>
              If you have any questions about this Cookie Policy, please contact us.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
