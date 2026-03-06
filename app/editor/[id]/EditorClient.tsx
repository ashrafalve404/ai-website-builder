"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Eye,
  Download,
  Undo,
  Redo,
  Layout,
  Smartphone,
  Tablet,
  Monitor,
  Loader2,
  Code,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EditorClientProps {
  params: Promise<{ id: string }>;
}

export default function EditorClient({ params }: EditorClientProps) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const projectId = resolvedParams.id;

  const [viewMode, setViewMode] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isSaving, setIsSaving] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("preview");

  const project = {
    id: projectId,
    name: `Project ${projectId}`,
    description: "AI Generated Website",
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const getViewWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "max-w-full";
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="h-14 border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/projects")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-semibold">{project.name}</h1>
            <p className="text-xs text-muted-foreground">Last saved: Just now</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo className="h-4 w-4" />
          </Button>
          <div className="h-6 w-px bg-border mx-2" />
          <Button variant="ghost" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Code className="h-4 w-4" />
            Code
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </Button>
        </div>
      </div>

      <div className="flex">
        <div className="w-64 border-r border-border h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Pages
              </h3>
              <div className="space-y-1">
                {["Home", "About", "Contact", "Services"].map((page) => (
                  <Button key={page} variant="ghost" className="w-full justify-start text-sm">
                    {page}
                  </Button>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Theme
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  SEO
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="h-12 border-b border-border flex items-center justify-center gap-4">
            <Button
              variant={viewMode === "desktop" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "tablet" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "mobile" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto bg-muted/30 p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <div className={`mx-auto bg-background rounded-lg border shadow-lg ${getViewWidth()}`} style={{ minHeight: "600px" }}>
                  <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
                    <p className="text-muted-foreground mb-8">{project.description}</p>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        This is a preview of your generated website. The AI-generated content will appear here.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="edit">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Edit Content</h3>
                    <p className="text-sm text-muted-foreground">
                      Use the AI Builder to regenerate content, or edit manually below.
                    </p>
                    <Button className="mt-4" onClick={() => router.push(`/builder?project=${projectId}`)}>
                      Open AI Builder
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
