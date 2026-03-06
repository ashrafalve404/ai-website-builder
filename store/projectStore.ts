import { create } from "zustand";
import type { Project, ProjectFile } from "@/types";
import { generateId } from "@/utils";

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (project: Project | null) => void;
  fetchProjects: () => Promise<void>;
  createProject: (name: string, description?: string) => Promise<Project>;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Dashboard",
    description: "Modern e-commerce admin dashboard with analytics",
    status: "ready",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T15:30:00Z",
    userId: "1",
    previewUrl: "https://example.com/preview1",
  },
  {
    id: "2",
    name: "SaaS Landing Page",
    description: "Beautiful SaaS product landing page",
    status: "ready",
    createdAt: "2024-01-18T09:00:00Z",
    updatedAt: "2024-01-22T11:00:00Z",
    userId: "1",
    previewUrl: "https://example.com/preview2",
  },
  {
    id: "3",
    name: "Portfolio Website",
    description: "Personal portfolio with dark theme",
    status: "draft",
    createdAt: "2024-01-20T14:00:00Z",
    updatedAt: "2024-01-20T14:00:00Z",
    userId: "1",
  },
];

export const useProjectStore = create<ProjectState>()((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  setProjects: (projects) => set({ projects }),
  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
      currentProject:
        state.currentProject?.id === id
          ? { ...state.currentProject, ...updates }
          : state.currentProject,
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      currentProject:
        state.currentProject?.id === id ? null : state.currentProject,
    })),
  setCurrentProject: (project) => set({ currentProject: project }),
  fetchProjects: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({ projects: mockProjects, isLoading: false });
  },
  createProject: async (name, description) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newProject: Project = {
      id: generateId(),
      name,
      description,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "1",
    };
    set((state) => ({
      projects: [newProject, ...state.projects],
      isLoading: false,
    }));
    return newProject;
  },
}));
