import { api } from "./api";
import type { Generation, ApiResponse } from "@/types";

export interface GenerateWebsiteDto {
  prompt: string;
  template?: string;
}

export interface GenerateAssetsDto {
  type: "component" | "image" | "icon" | "layout";
  prompt: string;
  description?: string;
}

const aiService = {
  async generateWebsite(data: GenerateWebsiteDto): Promise<ApiResponse<Generation>> {
    return api.post("/generate", data);
  },

  async generateAssets(data: GenerateAssetsDto): Promise<ApiResponse<Generation>> {
    return api.post("/generate/assets", data);
  },

  async getGenerationStatus(id: string): Promise<ApiResponse<Generation>> {
    return api.get(`/generate/${id}`);
  },

  async cancelGeneration(id: string): Promise<ApiResponse<void>> {
    return api.post(`/generate/${id}/cancel`);
  },
};

export default aiService;
