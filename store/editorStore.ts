import { create } from "zustand";
import type { EditorTab, ProjectFile, ViewMode, TerminalLine } from "@/types";
import { generateId } from "@/utils";

const mockFiles: ProjectFile[] = [
  {
    id: "1",
    name: "src",
    path: "/src",
    content: "",
    language: "folder",
    isDirectory: true,
    children: [
      {
        id: "2",
        name: "App.tsx",
        path: "/src/App.tsx",
        language: "typescript",
        isDirectory: false,
        content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to My App</h1>
    </div>
  );
}

export default App;`,
      },
      {
        id: "3",
        name: "main.tsx",
        path: "/src/main.tsx",
        language: "typescript",
        isDirectory: false,
        content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
      },
      {
        id: "4",
        name: "components",
        path: "/src/components",
        content: "",
        language: "folder",
        isDirectory: true,
        children: [
          {
            id: "5",
            name: "Button.tsx",
            path: "/src/components/Button.tsx",
            language: "typescript",
            isDirectory: false,
            content: `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`,
          },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "package.json",
    path: "/package.json",
    language: "json",
    isDirectory: false,
    content: `{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`,
  },
  {
    id: "7",
    name: "vite.config.ts",
    path: "/vite.config.ts",
    language: "typescript",
    isDirectory: false,
    content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,
  },
];

interface EditorState {
  files: ProjectFile[];
  openTabs: EditorTab[];
  activeTabId: string | null;
  activeFile: ProjectFile | null;
  viewMode: ViewMode;
  terminalLines: TerminalLine[];
  isSidebarOpen: boolean;
  isTerminalOpen: boolean;
  sidebarWidth: number;
  setFiles: (files: ProjectFile[]) => void;
  openFile: (file: ProjectFile) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateFileContent: (fileId: string, content: string) => void;
  setViewMode: (mode: ViewMode) => void;
  addTerminalLine: (line: Omit<TerminalLine, "id" | "timestamp">) => void;
  clearTerminal: () => void;
  toggleSidebar: () => void;
  toggleTerminal: () => void;
  setSidebarWidth: (width: number) => void;
  createFile: (parentPath: string, fileName: string, isDirectory: boolean) => void;
  deleteFile: (fileId: string) => void;
  runTerminalCommand: (command: string) => void;
  markFileSaved: (fileId: string) => void;
}

export const useEditorStore = create<EditorState>()((set, get) => ({
  files: mockFiles,
  openTabs: [],
  activeTabId: null,
  activeFile: null,
  viewMode: "desktop",
  terminalLines: [],
  isSidebarOpen: true,
  isTerminalOpen: false,
  sidebarWidth: 260,
  setFiles: (files) => set({ files }),
  openFile: (file) => {
    const { openTabs, activeTabId } = get();
    const existingTab = openTabs.find((t) => t.fileId === file.id);
    
    if (existingTab) {
      set({ activeTabId: existingTab.id, activeFile: file });
    } else {
      const newTab: EditorTab = {
        id: generateId(),
        fileId: file.id,
        name: file.name,
        path: file.path,
        isDirty: false,
      };
      set({
        openTabs: [...openTabs, newTab],
        activeTabId: newTab.id,
        activeFile: file,
      });
    }
  },
  closeTab: (tabId) => {
    const { openTabs, activeTabId } = get();
    const newTabs = openTabs.filter((t) => t.id !== tabId);
    const closedTab = openTabs.find((t) => t.id === tabId);
    
    let newActiveTabId = activeTabId;
    if (activeTabId === tabId) {
      const closedIndex = openTabs.findIndex((t) => t.id === tabId);
      newActiveTabId = newTabs[closedIndex - 1]?.id || newTabs[0]?.id || null;
    }
    
    const newActiveFile = newTabs.find((t) => t.id === newActiveTabId)
      ? get().files.reduce((acc: ProjectFile | null, f) => {
          if (acc) return acc;
          if (!f.isDirectory && f.children) {
            return f.children.find((c) => c.id === newTabs.find((t) => t.id === newActiveTabId)?.fileId) || null;
          }
          return f.id === newTabs.find((t) => t.id === newActiveTabId)?.fileId ? f : null;
        }, null)
      : null;
    
    set({ openTabs: newTabs, activeTabId: newActiveTabId, activeFile: newActiveFile || null });
  },
  setActiveTab: (tabId) => {
    const { openTabs, files } = get();
    const tab = openTabs.find((t) => t.id === tabId);
    if (tab) {
      const findFile = (fileList: ProjectFile[]): ProjectFile | null => {
        for (const f of fileList) {
          if (f.id === tab.fileId) return f;
          if (f.children) {
            const found = findFile(f.children);
            if (found) return found;
          }
        }
        return null;
      };
      set({ activeTabId: tabId, activeFile: findFile(files) });
    }
  },
  updateFileContent: (fileId, content) => {
    const { files, openTabs } = get();
    
    const updateInFiles = (fileList: ProjectFile[]): ProjectFile[] => {
      return fileList.map((f) => {
        if (f.id === fileId) {
          return { ...f, content };
        }
        if (f.children) {
          return { ...f, children: updateInFiles(f.children) };
        }
        return f;
      });
    };
    
    const newFiles = updateInFiles(files);
    const newTabs = openTabs.map((t) =>
      t.fileId === fileId ? { ...t, isDirty: true } : t
    );
    
    set({ files: newFiles, openTabs: newTabs });
  },
  setViewMode: (viewMode) => set({ viewMode }),
  addTerminalLine: (line) =>
    set((state) => ({
      terminalLines: [
        ...state.terminalLines,
        { ...line, id: generateId(), timestamp: new Date() },
      ],
    })),
  clearTerminal: () => set({ terminalLines: [] }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  setSidebarWidth: (sidebarWidth) => set({ sidebarWidth }),
  createFile: (parentPath: string, fileName: string, isDirectory: boolean) => {
    const { files } = get();
    const newFile: ProjectFile = {
      id: generateId(),
      name: fileName,
      path: `${parentPath}/${fileName}`,
      content: isDirectory ? "" : getDefaultContent(fileName),
      language: isDirectory ? "folder" : getLanguageFromFileName(fileName),
      isDirectory,
      children: isDirectory ? [] : undefined,
    };
    
    const addToParent = (fileList: ProjectFile[]): ProjectFile[] => {
      return fileList.map((f) => {
        if (f.path === parentPath && f.isDirectory) {
          return { ...f, children: [...(f.children || []), newFile] };
        }
        if (f.children) {
          return { ...f, children: addToParent(f.children) };
        }
        return f;
      });
    };
    
    set({ files: addToParent(files) });
  },
  deleteFile: (fileId: string) => {
    const { files, openTabs } = get();
    
    const removeFromList = (fileList: ProjectFile[]): ProjectFile[] => {
      return fileList
        .filter((f) => f.id !== fileId)
        .map((f) => {
          if (f.children) {
            return { ...f, children: removeFromList(f.children) };
          }
          return f;
        });
    };
    
    const newFiles = removeFromList(files);
    const newTabs = openTabs.filter((t) => t.fileId !== fileId);
    
    set({ files: newFiles, openTabs: newTabs });
  },
  runTerminalCommand: (command: string) => {
    const { addTerminalLine, files } = get();
    
    addTerminalLine({ type: "input", content: command });
    
    const cmd = command.trim().toLowerCase();
    
    if (cmd === "help") {
      addTerminalLine({ type: "output", content: "Available commands: help, clear, ls, cat, run, build, preview" });
    } else if (cmd === "clear") {
      get().clearTerminal();
    } else if (cmd === "ls") {
      const fileList = files.flatMap((f) => {
        if (f.isDirectory && f.children) {
          return f.children.map((c) => (c.isDirectory ? `${c.name}/` : c.name));
        }
        return f.isDirectory ? `${f.name}/` : f.name;
      });
      addTerminalLine({ type: "output", content: fileList.join("  ") || "No files" });
    } else if (cmd.startsWith("cat ")) {
      const fileName = cmd.slice(4).trim();
      const findContent = (fileList: ProjectFile[]): string | null => {
        for (const f of fileList) {
          if (!f.isDirectory && f.name === fileName) return f.content;
          if (f.children) {
            const found = findContent(f.children);
            if (found) return found;
          }
        }
        return null;
      };
      const content = findContent(files);
      addTerminalLine({ type: "output", content: content || `File not found: ${fileName}` });
    } else if (cmd === "run" || cmd === "build") {
      addTerminalLine({ type: "info", content: "Building project..." });
      setTimeout(() => {
        addTerminalLine({ type: "output", content: "✓ Build completed successfully" });
      }, 1000);
    } else if (cmd === "preview") {
      addTerminalLine({ type: "info", content: "Starting preview server..." });
      setTimeout(() => {
        addTerminalLine({ type: "output", content: "✓ Preview server running at http://localhost:5173" });
      }, 500);
    } else {
      addTerminalLine({ type: "error", content: `Command not found: ${command}. Type 'help' for available commands.` });
    }
  },
  markFileSaved: (fileId: string) => {
    const { openTabs } = get();
    const newTabs = openTabs.map((t) =>
      t.fileId === fileId ? { ...t, isDirty: false } : t
    );
    set({ openTabs: newTabs });
  },
}));

function getDefaultContent(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "tsx":
    case "jsx":
      return `import React from 'react';

export default function ${fileName.replace(/\.(tsx|jsx)$/, "")}() {
  return (
    <div>
      <h1>${fileName}</h1>
    </div>
  );
}
`;
    case "ts":
    case "js":
      return `// ${fileName}

export function init() {
  console.log("${fileName} initialized");
}
`;
    case "css":
      return `/* ${fileName} */

.${fileName.replace(".css", "")} {
  
}
`;
    case "json":
      return `{
  "name": "project",
  "version": "1.0.0"
}
`;
    case "html":
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${fileName}</title>
</head>
<body>
  
</body>
</html>
`;
    default:
      return `// ${fileName}
`;
  }
}

function getLanguageFromFileName(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "tsx":
    case "jsx":
      return "typescript";
    case "ts":
      return "typescript";
    case "js":
      return "javascript";
    case "json":
      return "json";
    case "css":
      return "css";
    case "html":
      return "html";
    case "md":
      return "markdown";
    default:
      return "plaintext";
  }
}
