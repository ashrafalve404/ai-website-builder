"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Wand2,
  Code2,
  Layout,
  Zap,
  Globe,
  Palette,
  Layers,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Wand2,
    title: "AI-Powered Generation",
    description:
      "Describe your vision in plain English and watch AI build your website instantly.",
  },
  {
    icon: Code2,
    title: "Clean React Code",
    description:
      "Get production-ready React + Vite code that you can customize and deploy.",
  },
  {
    icon: Layout,
    title: "Modern UI Components",
    description:
      "Access a library of beautiful, responsive components built with TailwindCSS.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Generated websites are optimized for performance with Vite's blazing fast build.",
  },
  {
    icon: Globe,
    title: "One-Click Deploy",
    description:
      "Deploy your generated site to Vercel, Netlify, or any hosting platform.",
  },
  {
    icon: Palette,
    title: "Customizable Themes",
    description:
      "Easily customize colors, typography, and layout to match your brand.",
  },
];

const steps = [
  {
    number: "01",
    title: "Describe Your Vision",
    description:
      "Tell our AI what you want to build. Describe your website's purpose, style, and features.",
  },
  {
    number: "02",
    title: "AI Generates Code",
    description:
      "Our AI analyzes your requirements and generates a complete React + Vite project.",
  },
  {
    number: "03",
    title: "Customize & Deploy",
    description:
      "Edit the code in our built-in editor, preview changes live, and deploy with one click.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out the platform",
    features: [
      "3 projects",
      "Basic AI generation",
      "Community support",
      "Export code",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For professional developers",
    features: [
      "Unlimited projects",
      "Advanced AI features",
      "Priority support",
      "One-click deploy",
      "Custom templates",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams and organizations",
    features: [
      "Everything in Pro",
      "Custom AI models",
      "Dedicated support",
      "SSO & SAML",
      "Advanced analytics",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const examples = [
  {
    title: "SaaS Dashboard",
    description: "Modern admin dashboard with charts and data tables",
    tags: ["React", "Charts", "Dark Mode"],
  },
  {
    title: "E-commerce Store",
    description: "Full-featured online store with cart and checkout",
    tags: ["Storefront", "Payments", "Responsive"],
  },
  {
    title: "Portfolio",
    description: "Beautiful personal portfolio with animations",
    tags: ["Animation", "Gallery", "Contact"],
  },
  {
    title: "Blog Platform",
    description: "Content-focused blog with markdown support",
    tags: ["CMS", "SEO", "Fast"],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Build websites with{" "}
              <span className="gradient-text">AI Power</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Describe your vision in plain English and watch AI generate a complete
              React + Vite website. Clean code, modern design, ready to deploy.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="xl" variant="gradient" className="gap-2">
                  Start Building Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="xl" variant="outline" className="gap-2">
                  View Demo
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. Start for free.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="relative rounded-xl border border-border bg-card/50 backdrop-blur-xl p-2 glow">
              <div className="rounded-lg overflow-hidden bg-card">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 text-center text-xs text-muted-foreground">
                    AI Website Builder
                  </div>
                </div>
                <div className="aspect-[16/9] bg-gradient-to-br from-card to-card/80 flex items-center justify-center">
                  <div className="text-center">
                    <Layers className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                    <p className="text-muted-foreground">Live Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to build
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features to create stunning websites in minutes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors group">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 relative bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How it works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to your dream website
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-8xl font-bold text-primary/10 absolute -top-4 -left-2">
                  {step.number}
                </div>
                <div className="relative pt-12">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What you can build</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From dashboards to e-commerce, create any type of website
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examples.map((example, i) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Layout className="h-12 w-12 text-primary/50" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{example.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {example.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {example.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 relative bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Simple pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free, upgrade when you&apos;re ready
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full ${plan.popular ? "border-primary glow" : ""}`}>
                  <CardContent className="p-6">
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      {plan.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "gradient" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to build your dream website?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers building beautiful websites with AI
            </p>
            <Link href="/signup">
              <Button size="xl" variant="gradient" className="gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo.png"
                  alt="SiteForge"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold">SiteForge</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 SiteForge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
