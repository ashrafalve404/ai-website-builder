import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Careers</h1>
          <div className="space-y-8">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Join Our Team</h2>
              <p className="text-muted-foreground mb-4">
                We're always looking for talented people to join our team.
              </p>
              <p className="text-sm text-muted-foreground">
                Check back later for open positions.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
