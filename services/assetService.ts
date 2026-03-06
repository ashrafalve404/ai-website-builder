import { api } from "./api";
import type { Asset, ApiResponse, PaginatedResponse } from "@/types";

export interface CreateAssetDto {
  type: Asset["type"];
  name: string;
  prompt: string;
}

export interface GenerateAssetDto {
  type: Asset["type"];
  prompt: string;
}

const assetService = {
  async getAll(page = 1, pageSize = 10, type?: Asset["type"]): Promise<PaginatedResponse<Asset>> {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (type) params.append("type", type);
    return api.get(`/assets?${params}`);
  },

  async getById(id: string): Promise<ApiResponse<Asset>> {
    return api.get(`/assets/${id}`);
  },

  async create(data: CreateAssetDto): Promise<ApiResponse<Asset>> {
    return api.post("/assets", data);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return api.delete(`/assets/${id}`);
  },

  async generate(data: GenerateAssetDto): Promise<ApiResponse<Asset>> {
    return api.post("/assets/generate", data);
  },
};

export default assetService;
