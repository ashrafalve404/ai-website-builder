export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  status: "draft" | "generating" | "ready" | "error";
  createdAt: string;
  updatedAt: string;
  userId: string;
  files?: ProjectFile[];
  previewUrl?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isDirectory: boolean;
  children?: ProjectFile[];
}

export interface Generation {
  id: string;
  prompt: string;
  status: "pending" | "generating" | "completed" | "failed";
  createdAt: string;
  projectId?: string;
  result?: {
    files: ProjectFile[];
    previewUrl: string;
  };
}

export interface Asset {
  id: string;
  type: "component" | "image" | "icon" | "layout";
  name: string;
  prompt: string;
  imageUrl?: string;
  code?: string;
  createdAt: string;
  userId: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  prompt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type ViewMode = "mobile" | "tablet" | "desktop";

export interface EditorTab {
  id: string;
  fileId: string;
  name: string;
  path: string;
  isDirty: boolean;
}

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "info";
  content: string;
  timestamp: Date;
}
