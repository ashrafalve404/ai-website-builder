import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none space-y-4">
            <p className="text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
            
            <h2 className="text-xl font-semibold mt-8">Introduction</h2>
            <p>
              At SiteForge, we take your privacy seriously. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you 
              use our website and services.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Information We Collect</h2>
            <p>
              We collect information you provide directly to us, including account 
              information when you sign up, and any content you create using our services.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our 
              services, and to communicate with you about your account.
            </p>
            
            <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
