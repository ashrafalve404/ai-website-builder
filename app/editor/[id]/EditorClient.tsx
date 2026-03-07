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
  Folder,
  File,
  Plus,
  X,
  ChevronRight,
  ChevronDown,
  Settings,
  Play,
  Terminal,
  Smartphone,
  Tablet,
  Monitor,
  Code,
  Layout,
  Loader2,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditorClientProps {
  id: string;
}

interface FileTreeItemType {
  name: string;
  type: "folder" | "file";
  language?: string;
  children?: FileTreeItemType[];
}

const fileTree: FileTreeItemType[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "Header.tsx", type: "file", language: "typescript" },
          { name: "Footer.tsx", type: "file", language: "typescript" },
          { name: "Button.tsx", type: "file", language: "typescript" },
        ],
      },
      {
        name: "pages",
        type: "folder",
        children: [
          { name: "index.tsx", type: "file", language: "typescript" },
          { name: "about.tsx", type: "file", language: "typescript" },
          { name: "contact.tsx", type: "file", language: "typescript" },
        ],
      },
      { name: "App.tsx", type: "file", language: "typescript" },
      { name: "main.tsx", type: "file", language: "typescript" },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [
      { name: "index.html", type: "file", language: "html" },
      { name: "favicon.ico", type: "file" },
    ],
  },
  { name: "package.json", type: "file", language: "json" },
  { name: "tsconfig.json", type: "file", language: "json" },
  { name: "vite.config.ts", type: "file", language: "typescript" },
];

const sampleCode: Record<string, string> = {
  "App.tsx": `import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <h1>Welcome to My Website</h1>
        <p>Built with AI</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;`,
  "Header.tsx": `import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">SiteForge</div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;`,
  "index.tsx": `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  "package.json": `{
  "name": "my-website",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`,
};

const previewHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; }
    header { background: #1e293b; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-weight: bold; font-size: 1.5rem; color: #6366f1; }
    nav a { color: #94a3b8; text-decoration: none; margin-left: 1.5rem; }
    nav a:hover { color: #f8fafc; }
    main { padding: 4rem 2rem; text-align: center; }
    h1 { font-size: 3rem; margin-bottom: 1rem; background: linear-gradient(135deg, #6366f1, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { color: #94a3b8; font-size: 1.25rem; }
    .cta { margin-top: 2rem; }
    .cta button { background: #6366f1; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer; font-size: 1rem; }
    .cta button:hover { background: #4f46e5; }
  </style>
</head>
<body>
  <header>
    <div class="logo">SiteForge</div>
    <nav>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </header>
  <main>
    <h1>Welcome to My Website</h1>
    <p>Built with AI - Powered by SiteForge</p>
    <div class="cta"><button>Get Started</button></div>
  </main>
</body>
</html>`;

function FileTreeItem({ item, depth, onSelect, selectedFile }: { item: FileTreeItemType; depth: number; onSelect: (name: string) => void; selectedFile: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isFolder = item.type === "folder";
  const isSelected = !isFolder && item.name === selectedFile;

  return (
    <div>
      <div
        className={"flex items-center gap-1 py-1 px-2 rounded cursor-pointer text-sm " + (isSelected ? "bg-primary/20 text-primary" : "hover:bg-muted")}
        style={{ paddingLeft: depth * 12 + 8 }}
        onClick={() => {
          if (isFolder) setIsOpen(!isOpen);
          onSelect(item.name);
        }}
      >
        {isFolder ? (
          <>
            {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            <Folder className="h-3 w-3 text-yellow-500" />
          </>
        ) : (
          <File className="h-3 w-3 text-muted-foreground" />
        )}
        <span className="truncate">{item.name}</span>
      </div>
        {isFolder && isOpen && item.children?.map((child, i) => (
        <FileTreeItem key={i} item={child} depth={depth + 1} onSelect={onSelect} selectedFile={selectedFile} />
      ))}
    </div>
  );
}

export default function EditorClient({ id }: EditorClientProps) {
  const router = useRouter();
  const projectId = id;

  const [viewMode, setViewMode] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isSaving, setIsSaving] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"code" | "preview" | "console">("code");
  const [selectedFile, setSelectedFile] = React.useState("App.tsx");
  const [code, setCode] = React.useState(sampleCode["App.tsx"]);
  const [copied, setCopied] = React.useState(false);
  const [consoleOpen, setConsoleOpen] = React.useState(false);

  const project = {
    id: projectId,
    name: `Project ${projectId}`,
    description: "AI Generated Website",
  };

  React.useEffect(() => {
    if (sampleCode[selectedFile]) {
      setCode(sampleCode[selectedFile]);
    }
  }, [selectedFile]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getViewWidth = () => {
    switch (viewMode) {
      case "mobile": return "max-w-[375px]";
      case "tablet": return "max-w-[768px]";
      default: return "max-w-full";
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-background flex flex-col">
      <div className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/projects")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-semibold">{project.name}</h1>
            <p className="text-xs text-muted-foreground">Auto-saved</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Undo">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Redo">
            <Redo className="h-4 w-4" />
          </Button>
          <div className="h-6 w-px bg-border mx-1" />
          <Button variant="ghost" size="sm" className="gap-2" onClick={() => setActiveTab("preview")}>
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" onClick={() => setActiveTab("code")}>
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

      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 border-r border-border flex flex-col shrink-0">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <span className="text-sm font-medium">Explorer</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Folder className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1 p-2">
            {fileTree.map((item, i) => (
              <FileTreeItem key={i} item={item} depth={0} onSelect={setSelectedFile} selectedFile={selectedFile} />
            ))}
          </ScrollArea>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-10 border-b border-border flex items-center px-2 gap-1 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-t text-sm">
              <File className="h-3 w-3" />
              {selectedFile}
              <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden border-b border-border">
            <div className="h-9 border-b border-border flex items-center justify-between px-4 shrink-0">
              <div className="flex gap-1">
                <Button variant={activeTab === "code" ? "secondary" : "ghost"} size="sm" className="text-xs gap-1 h-7 px-3" onClick={() => setActiveTab("code")}>
                  <Code className="h-3 w-3" /> Code
                </Button>
                <Button variant={activeTab === "preview" ? "secondary" : "ghost"} size="sm" className="text-xs gap-1 h-7 px-3" onClick={() => setActiveTab("preview")}>
                  <Layout className="h-3 w-3" /> Preview
                </Button>
                <Button variant={activeTab === "console" ? "secondary" : "ghost"} size="sm" className="text-xs gap-1 h-7 px-3" onClick={() => { setActiveTab("console"); setConsoleOpen(true); }}>
                  <Terminal className="h-3 w-3" /> Console
                </Button>
              </div>
              {activeTab === "code" && (
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-7 gap-1" onClick={handleCopy}>
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 gap-1">
                    <Play className="h-3 w-3" />
                    Run
                  </Button>
                </div>
              )}
              {activeTab === "preview" && (
                <div className="flex items-center gap-1">
                  <Button variant={viewMode === "desktop" ? "secondary" : "ghost"} size="icon" className="h-7 w-7" onClick={() => setViewMode("desktop")}>
                    <Monitor className="h-3 w-3" />
                  </Button>
                  <Button variant={viewMode === "tablet" ? "secondary" : "ghost"} size="icon" className="h-7 w-7" onClick={() => setViewMode("tablet")}>
                    <Tablet className="h-3 w-3" />
                  </Button>
                  <Button variant={viewMode === "mobile" ? "secondary" : "ghost"} size="icon" className="h-7 w-7" onClick={() => setViewMode("mobile")}>
                    <Smartphone className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              {activeTab === "code" && (
                <div className="h-full bg-[#1e1e1e] p-4 overflow-auto">
                  <pre className="text-sm font-mono text-gray-300">
                    <code>{code}</code>
                  </pre>
                </div>
              )}

              {activeTab === "preview" && (
                <div className="h-full overflow-auto bg-muted/30 p-4">
                  <div className="flex justify-center">
                    <div className={"bg-background rounded-lg border shadow-lg " + getViewWidth()} style={{ minHeight: "500px" }}>
                      <iframe srcDoc={previewHTML} className="w-full rounded-lg" style={{ height: "500px" }} title="Preview" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "console" && (
                <div className="h-full bg-[#1e1e1e] p-4 font-mono text-sm">
                  <div className="text-green-400">VITE v5.0.0 ready in 234 ms</div>
                  <div className="text-gray-400">➜ Local: <span className="text-blue-400">http://localhost:5173/</span></div>
                  <div className="text-gray-400">➜ Network: <span className="text-blue-400">http://192.168.1.100:5173/</span></div>
                  <div className="text-yellow-400 mt-2">➜ Mode: production build</div>
                  <div className="text-gray-500 mt-4">$ npm run build</div>
                  <div className="text-gray-400">Building for production...</div>
                  <div className="text-green-400">✓ 12 modules transformed.</div>
                  <div className="text-green-400">✓ 2 modules optimized.</div>
                  <div className="text-green-400">Build completed in 1.2s</div>
                  <div className="text-green-400 mt-2">dist/assets/index.abc123.js  45.2 kB</div>
                  <div className="text-green-400">dist/assets/index.abc123.css  12.1 kB</div>
                  <div className="text-green-400">dist/index.html            0.5 kB</div>
                  <div className="text-blue-400 mt-2 cursor-pointer hover:underline">$ <span className="text-gray-300">_</span></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-72 border-l border-border shrink-0 flex flex-col">
          <div className="p-3 border-b border-border">
            <h3 className="font-medium text-sm">Properties</h3>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">File Name</label>
                <div className="text-sm font-mono mt-1">{selectedFile}</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Language</label>
                <div className="text-sm mt-1">TypeScript</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Size</label>
                <div className="text-sm mt-1">{(code.length / 1024).toFixed(2)} KB</div>
              </div>
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Open in New Tab
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Download className="h-3 w-3" />
                    Download File
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Settings className="h-3 w-3" />
                    File Settings
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
