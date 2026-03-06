"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Wand2,
  FolderOpen,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileCode,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useProjectStore, useAuthStore } from "@/store";
import { formatRelativeTime } from "@/utils";

const quickActions = [
  {
    icon: Wand2,
    label: "New Project",
    href: "/builder",
    description: "Generate with AI",
  },
  {
    icon: FolderOpen,
    label: "Open Project",
    href: "/projects",
    description: "View all projects",
  },
  {
    icon: FileCode,
    label: "Templates",
    href: "/projects?filter=templates",
    description: "Start from template",
  },
];

const examplePrompts = [
  "Build a SaaS dashboard with analytics",
  "Create an e-commerce store with cart",
  "Make a portfolio with dark theme",
  "Design a blog with markdown support",
];

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { projects, fetchProjects, isLoading } = useProjectStore();
  const [prompt, setPrompt] = React.useState("");

  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const recentProjects = projects.slice(0, 4);

  const handleGenerate = () => {
    if (prompt.trim()) {
      router.push(`/builder?prompt=${encodeURIComponent(prompt)}`);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || "Developer"} 👋
          </h1>
          <p className="text-muted-foreground">
            What would you like to build today?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">AI Website Generator</h2>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Describe what you want to build..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="h-14 pr-24 text-base"
                      onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    />
                    <Button
                      className="absolute right-1 top-1 bottom-1"
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Generate
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Try these examples:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {examplePrompts.map((example) => (
                        <Badge
                          key={example}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors"
                          onClick={() => setPrompt(example)}
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Projects</h2>
                <Link href="/projects">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              {recentProjects.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {recentProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => router.push(`/editor/${project.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg mb-3 flex items-center justify-center">
                          <FolderOpen className="h-8 w-8 text-primary/50" />
                        </div>
                        <h3 className="font-semibold mb-1">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          {project.description || "No description"}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant={
                              project.status === "ready"
                                ? "success"
                                : project.status === "generating"
                                ? "warning"
                                : "secondary"
                            }
                          >
                            {project.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatRelativeTime(project.updatedAt)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">No projects yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first project to get started
                    </p>
                    <Link href="/builder">
                      <Button variant="gradient">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Project
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickActions.map((action) => (
                    <Link key={action.label} href={action.href}>
                      <Button
                        variant="outline"
                        className="w-full justify-start h-auto py-3"
                      >
                        <action.icon className="h-5 w-5 mr-3 text-primary" />
                        <div className="text-left">
                          <div className="font-medium">{action.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {action.description}
                          </div>
                        </div>
                      </Button>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FolderOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{projects.length}</p>
                        <p className="text-xs text-muted-foreground">Total Projects</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {projects.filter((p) => p.status === "ready").length}
                        </p>
                        <p className="text-xs text-muted-foreground">Published</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {projects.filter((p) => p.status === "draft").length}
                        </p>
                        <p className="text-xs text-muted-foreground">Drafts</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
