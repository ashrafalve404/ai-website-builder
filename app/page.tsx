"use client";

import { useState, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";

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

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    company: "TechCorp",
    content: "SiteForge saved me hours of work. The AI-generated code is clean and production-ready!",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Startup Founder",
    company: "LaunchPad",
    content: "We built our entire MVP in a day. The quality of the generated websites is incredible.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "UX Designer",
    company: "DesignStudio",
    content: "Finally, a tool that bridges the gap between design and development. Game changer!",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Full Stack Developer",
    company: "DevAgency",
    content: "The code quality is impressive. I've used it for client projects with great results.",
    rating: 5,
  },
  {
    name: "Jessica Lee",
    role: "Product Manager",
    company: "InnovateTech",
    content: "Our team velocity increased 10x. SiteForge handles the heavy lifting so we focus on features.",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    role: "Freelancer",
    company: "Self-employed",
    content: "I deliver projects 3x faster now. My clients are amazed at how quickly we go from concept to launch.",
    rating: 5,
  },
];

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
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

      <section id="testimonials" className="py-24 relative overflow-hidden bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Loved by developers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our community has to say about SiteForge
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex justify-center items-center gap-4 h-80">
              {testimonials.map((testimonial, i) => {
                const distance = Math.abs(i - activeIndex);
                const isActive = i === activeIndex;
                const isPrev = i === (activeIndex - 1 + testimonials.length) % testimonials.length;
                const isNext = i === (activeIndex + 1) % testimonials.length;
                const isVisible = isActive || isPrev || isNext;
                
                if (!isVisible) return null;
                
                return (
                  <motion.div
                    key={testimonial.name}
                    className="absolute"
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0.75,
                      x: isActive ? 0 : (isPrev ? -280 : 280),
                      zIndex: isActive ? 10 : 1,
                      opacity: isActive ? 1 : 0.4,
                      rotateY: isActive ? 0 : (isPrev ? 15 : -15),
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1500px",
                    }}
                  >
                    <Card className={`w-80 ${isActive ? "border-primary glow-accent" : ""}`}>
                      <CardContent className="p-6">
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, idx) => (
                            <Star key={idx} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-6 italic">
                          {testimonial.content}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-primary font-bold">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
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

      <Footer />
    </div>
  );
}
