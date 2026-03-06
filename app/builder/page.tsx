"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Wand2,
  Layout,
  ShoppingCart,
  FileText,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectStore } from "@/store";

const templates = [
  {
    id: "blank",
    name: "Blank Project",
    description: "Start from scratch",
    icon: FileText,
    color: "from-gray-500 to-gray-600",
  },
  {
    id: "saas",
    name: "SaaS Dashboard",
    description: "Admin dashboard with analytics",
    icon: Layout,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Online store with cart",
    icon: ShoppingCart,
    color: "from-green-500 to-green-600",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Personal portfolio",
    icon: Users,
    color: "from-purple-500 to-purple-600",
  },
];

const examplePrompts = [
  "Build a modern SaaS dashboard with sidebar navigation, user management, and analytics charts",
  "Create an e-commerce store with product grid, shopping cart, and checkout flow",
  "Make a personal portfolio with hero section, projects gallery, and contact form",
  "Design a landing page for a startup with features section, pricing, and FAQ",
  "Build a blog with markdown support, categories, and search functionality",
];

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createProject, isLoading } = useProjectStore();
  
  const [prompt, setPrompt] = React.useState(searchParams.get("prompt") || "");
  const [template, setTemplate] = React.useState("blank");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const project = await createProject(
        `Project ${Date.now()}`,
        prompt
      );
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      router.push(`/editor/${project.id}`);
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-purple-500 mb-4 glow-accent">
            <Wand2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">AI Website Builder</h1>
          <p className="text-muted-foreground text-lg">
            Describe your dream website and let AI build it for you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Describe Your Website
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Textarea
                  placeholder="E.g., Build a modern SaaS dashboard with dark theme, sidebar navigation, user management table, and analytics charts..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[150px] text-base"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">
                    Start from template (optional)
                  </label>
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          <div className="flex items-center gap-2">
                            <t.icon className="h-4 w-4" />
                            {t.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:pt-7">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generate Website
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Quick Examples</h2>
          <div className="grid gap-3">
            {examplePrompts.map((example, i) => (
              <Card
                key={i}
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setPrompt(example)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <Badge variant="outline" className="shrink-0">
                    {i + 1}
                  </Badge>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {example}
                  </p>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold mb-4">Templates</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {templates.map((t) => (
              <Card
                key={t.id}
                className={`cursor-pointer transition-all ${
                  template === t.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "hover:border-primary/50"
                }`}
                onClick={() => setTemplate(t.id)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div
                    className={`h-12 w-12 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center`}
                  >
                    <t.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function BuilderLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderLoading />}>
      <BuilderContent />
    </Suspense>
  );
}
