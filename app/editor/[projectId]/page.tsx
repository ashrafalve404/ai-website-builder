"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  PanelLeft,
  ChevronDown,
  X,
  File,
  Folder,
  FolderOpen,
  Save,
  Play,
  Loader2,
  RefreshCw,
  Maximize2,
  Smartphone,
  Tablet,
  Monitor,
  Terminal,
  Search,
  Plus,
  Trash2,
  FilePlus,
  FolderPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEditorStore, useProjectStore } from "@/store";
import type { ProjectFile, ViewMode } from "@/types";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  ),
});

const viewModes: { id: ViewMode; icon: typeof Monitor; label: string; width: string }[] = [
  { id: "mobile", icon: Smartphone, label: "Mobile", width: "375px" },
  { id: "tablet", icon: Tablet, label: "Tablet", width: "768px" },
  { id: "desktop", icon: Monitor, label: "Desktop", width: "100%" },
];

function FileExplorerItem({
  file,
  depth = 0,
}: {
  file: ProjectFile;
  depth?: number;
}) {
  const { openFile, activeFile, deleteFile } = useEditorStore();
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [showDelete, setShowDelete] = React.useState(false);

  const isActive = activeFile?.id === file.id;
  const hasChildren = file.isDirectory && file.children && file.children.length > 0;

  const getFileIcon = () => {
    if (file.isDirectory) {
      return isExpanded ? (
        <FolderOpen className="h-4 w-4 text-yellow-500" />
      ) : (
        <Folder className="h-4 w-4 text-yellow-500" />
      );
    }
    const ext = file.name.split(".").pop();
    const colors: Record<string, string> = {
      tsx: "text-blue-400",
      ts: "text-blue-400",
      jsx: "text-blue-400",
      js: "text-yellow-400",
      json: "text-green-400",
      css: "text-pink-400",
      html: "text-orange-400",
    };
    return <File className={`h-4 w-4 ${colors[ext || ""] || "text-gray-400"}`} />;
  };

  if (file.isDirectory) {
    return (
      <div>
        <div
          className="flex items-center group"
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-secondary rounded-md transition-colors text-left flex-1"
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
          >
            <ChevronDown
              className={`h-3 w-3 text-muted-foreground transition-transform ${
                !isExpanded ? "-rotate-90" : ""
              }`}
            />
            {getFileIcon()}
            <span className="truncate">{file.name}</span>
          </button>
        </div>
        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {file.children!.map((child) => (
                <FileExplorerItem key={child.id} file={child} depth={depth + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      className="flex items-center group"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <button
        onClick={() => openFile(file)}
        className={`flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-secondary rounded-md transition-colors text-left flex-1 ${
          isActive ? "bg-secondary text-primary" : ""
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {getFileIcon()}
        <span className="truncate">{file.name}</span>
      </button>
      {showDelete && (
        <button
          onClick={() => {
            if (confirm(`Delete ${file.name}?`)) {
              deleteFile(file.id);
            }
          }}
          className="px-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

function NewFileDialog({
  open,
  onOpenChange,
  parentPath = "/src",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentPath?: string;
}) {
  const [fileName, setFileName] = React.useState("");
  const [isDirectory, setIsDirectory] = React.useState(false);
  const { createFile } = useEditorStore();

  const handleCreate = () => {
    if (fileName.trim()) {
      createFile(parentPath, fileName.trim(), isDirectory);
      setFileName("");
      setIsDirectory(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
          <DialogDescription>
            Create a new file or folder in the project.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <div className="flex gap-2">
              <Button
                variant={!isDirectory ? "default" : "outline"}
                size="sm"
                onClick={() => setIsDirectory(false)}
                className="flex-1"
              >
                <FilePlus className="h-4 w-4 mr-2" />
                File
              </Button>
              <Button
                variant={isDirectory ? "default" : "outline"}
                size="sm"
                onClick={() => setIsDirectory(true)}
                className="flex-1"
              >
                <FolderPlus className="h-4 w-4 mr-2" />
                Folder
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder={isDirectory ? "folder-name" : "file-name.tsx"}
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!fileName.trim()}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TerminalPanel() {
  const { terminalLines, runTerminalCommand, clearTerminal, toggleTerminal, isTerminalOpen } = useEditorStore();
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      runTerminalCommand(input);
      setInput("");
    }
  };

  if (!isTerminalOpen) return null;

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: 200 }}
      exit={{ height: 0 }}
      className="border-t border-border"
    >
      <div className="h-full flex flex-col">
        <div className="h-8 border-b border-border flex items-center justify-between px-3 shrink-0">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span className="text-sm font-medium">Terminal</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={clearTerminal}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={toggleTerminal}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div ref={scrollRef} className="flex-1 p-3 overflow-auto font-mono text-sm space-y-1">
          {terminalLines.map((line) => (
            <div
              key={line.id}
              className={`${
                line.type === "error"
                  ? "text-red-400"
                  : line.type === "info"
                  ? "text-blue-400"
                  : line.type === "input"
                  ? "text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {line.type === "input" ? "> " : ""}
              {line.content}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-green-400">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command..."
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default function EditorPage() {
  const params = useParams();
  const {
    files,
    openTabs,
    activeTabId,
    activeFile,
    viewMode,
    terminalLines,
    isSidebarOpen,
    isTerminalOpen,
    sidebarWidth,
    openFile,
    closeTab,
    setActiveTab,
    updateFileContent,
    setViewMode,
    toggleSidebar,
    toggleTerminal,
    addTerminalLine,
    clearTerminal,
    markFileSaved,
  } = useEditorStore();
  
  const { projects } = useProjectStore();
  const [isSaving, setIsSaving] = React.useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = React.useState(false);
  const [isNewFileOpen, setIsNewFileOpen] = React.useState(false);
  const [previewKey, setPreviewKey] = React.useState(0);
  const [previewWidth, setPreviewWidth] = React.useState(400);
  const [isResizing, setIsResizing] = React.useState(false);

  const project = projects.find((p) => p.id === params.projectId);

  const handleSave = async () => {
    if (!activeFile) return;
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    markFileSaved(activeFile.id);
    addTerminalLine({ type: "info", content: `Saved: ${activeFile.path}` });
    setIsSaving(false);
  };

  const handlePreview = async () => {
    setIsPreviewLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setPreviewKey((k) => k + 1);
    addTerminalLine({ type: "info", content: "Preview refreshed" });
    setIsPreviewLoading(false);
  };

  const handleRun = async () => {
    addTerminalLine({ type: "info", content: "Building and starting development server..." });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    addTerminalLine({ type: "output", content: "✓ Server started at http://localhost:5173" });
    handlePreview();
  };

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      setPreviewWidth(Math.max(250, Math.min(800, newWidth)));
    };
    const handleMouseUp = () => {
      setIsResizing(false);
    };
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const currentViewMode = viewModes.find((v) => v.id === viewMode) || viewModes[2];

  const generatePreviewHTML = () => {
    const findFile = (fileList: ProjectFile[], name: string): ProjectFile | null => {
      for (const f of fileList) {
        if (f.name === name) return f;
        if (f.children) {
          const found = findFile(f.children, name);
          if (found) return found;
        }
      }
      return null;
    };

    const appFile = findFile(files, "App.tsx") || findFile(files, "App.jsx");
    const cssFile = findFile(files, "App.css") || findFile(files, "index.css");

    const appContent = appFile?.content || '<div style="padding: 40px; text-align: center;"><h1 style="color: #6366f1; font-size: 2rem;">Welcome to SiteForge</h1><p style="color: #94a3b8; margin-top: 16px;">Edit App.tsx to see changes</p></div>';
    const cssContent = cssFile?.content || "";

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: system-ui, -apple-system, sans-serif; 
      background: #0f172a;
      color: #f8fafc;
      min-height: 100vh;
    }
    ${cssContent}
  </style>
</head>
<body>
  <div id="root">${appContent}</div>
</body>
</html>`;
  };

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        {/* Top Bar */}
        <header className="h-12 border-b border-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <PanelLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="font-medium">{project?.name || "Project"}</span>
              <Badge variant="secondary" className="text-xs">
                {project?.status || "ready"}
              </Badge>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex-1 flex items-center gap-1 mx-4 overflow-x-auto">
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer transition-colors ${
                  activeTabId === tab.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <File className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">{tab.name}</span>
                {tab.isDirty && <div className="w-2 h-2 rounded-full bg-primary" />}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="hover:bg-muted rounded"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {openTabs.length === 0 && (
              <span className="text-sm text-muted-foreground">No files open</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleSave} disabled={isSaving || !activeFile}>
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleRun}>
                  <Play className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Run</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handlePreview} disabled={isPreviewLoading}>
                  {isPreviewLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh Preview</TooltipContent>
            </Tooltip>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* File Explorer Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: sidebarWidth, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="border-r border-border flex flex-col shrink-0"
                style={{ width: sidebarWidth }}
              >
                <div className="p-3 border-b border-border flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input placeholder="Search files..." className="h-8 pl-8 text-sm" />
                  </div>
                  <Dialog open={isNewFileOpen} onOpenChange={setIsNewFileOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <NewFileDialog open={isNewFileOpen} onOpenChange={setIsNewFileOpen} />
                  </Dialog>
                </div>
                <ScrollArea className="flex-1 py-2">
                  {files.map((file) => (
                    <FileExplorerItem key={file.id} file={file} />
                  ))}
                </ScrollArea>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 flex">
              {/* Code Editor */}
              <div className="flex-1 min-w-0">
                {activeFile ? (
                  <MonacoEditor
                    height="100%"
                    language={activeFile.language}
                    value={activeFile.content}
                    onChange={(value) => updateFileContent(activeFile.id, value || "")}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      fontFamily: "JetBrains Mono, monospace",
                      lineNumbers: "on",
                      renderLineHighlight: "line",
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: "on",
                      padding: { top: 16 },
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a file to edit</p>
                      <p className="text-sm mt-2">or create a new file</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Resize Handle */}
              <div
                className={`w-1 cursor-col-resize hover:bg-primary transition-colors ${
                  isResizing ? "bg-primary" : ""
                }`}
                onMouseDown={handleMouseDown}
              />

              {/* Preview Panel */}
              <div
                className="border-l border-border flex flex-col shrink-0"
                style={{ width: previewWidth }}
              >
                <div className="h-10 border-b border-border flex items-center justify-between px-3">
                  <span className="text-sm font-medium">Preview</span>
                  <div className="flex items-center gap-1">
                    {viewModes.map((mode) => (
                      <Tooltip key={mode.id}>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewMode(mode.id)}>
                            <mode.icon className={`h-4 w-4 ${viewMode === mode.id ? "text-primary" : ""}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{mode.label}</TooltipContent>
                      </Tooltip>
                    ))}
                    <Separator orientation="vertical" className="h-5 mx-1" />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handlePreview}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Refresh</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex-1 bg-white p-2 overflow-auto">
                  <iframe
                    key={previewKey}
                    srcDoc={generatePreviewHTML()}
                    className="w-full h-full rounded"
                    style={{ width: currentViewMode.width }}
                    title="Preview"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            </div>

            {/* Terminal */}
            <TerminalPanel />

            {!isTerminalOpen && (
              <Button variant="ghost" size="sm" className="absolute bottom-4 right-4" onClick={toggleTerminal}>
                <Terminal className="h-4 w-4 mr-2" />
                Terminal
              </Button>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
