import { api } from "./api";
import type { Project, ProjectFile, ApiResponse, PaginatedResponse } from "@/types";

export interface CreateProjectDto {
  name: string;
  description?: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  status?: Project["status"];
}

export interface ProjectFilesDto {
  projectId: string;
}

const projectService = {
  async getAll(page = 1, pageSize = 10): Promise<PaginatedResponse<Project>> {
    return api.get(`/projects?page=${page}&pageSize=${pageSize}`);
  },

  async getById(id: string): Promise<ApiResponse<Project>> {
    return api.get(`/projects/${id}`);
  },

  async create(data: CreateProjectDto): Promise<ApiResponse<Project>> {
    return api.post("/projects", data);
  },

  async update(id: string, data: UpdateProjectDto): Promise<ApiResponse<Project>> {
    return api.put(`/projects/${id}`, data);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return api.delete(`/projects/${id}`);
  },

  async duplicate(id: string): Promise<ApiResponse<Project>> {
    return api.post(`/projects/${id}/duplicate`);
  },

  async getFiles(projectId: string): Promise<ApiResponse<ProjectFile[]>> {
    return api.get(`/projects/${projectId}/files`);
  },

  async saveFiles(projectId: string, files: ProjectFile[]): Promise<ApiResponse<void>> {
    return api.post(`/projects/${projectId}/files`, { files });
  },
};

export default projectService;
