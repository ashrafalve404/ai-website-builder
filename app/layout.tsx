import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUIStore } from "@/store";
import { cn } from "@/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SiteForge - AI-Powered Website Builder",
  description:
    "Generate beautiful React + Vite websites with AI. Describe your vision and let our AI build it for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                if (window.location.hash) {
                  setTimeout(function() {
                    var target = document.querySelector(window.location.hash);
                    if (target) {
                      var offset = 64;
                      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                      window.scrollTo({ top: top, behavior: 'smooth' });
                    }
                  }, 100);
                }
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <TooltipProvider>
          <Navbar />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
