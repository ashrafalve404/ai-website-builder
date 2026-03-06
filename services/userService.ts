import { api } from "./api";
import type { User, ApiResponse, PaginatedResponse } from "@/types";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserDto {
  name?: string;
  avatar?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

const userService = {
  async login(data: LoginDto): Promise<ApiResponse<{ user: User; token: string }>> {
    return api.post("/auth/login", data);
  },

  async register(data: RegisterDto): Promise<ApiResponse<{ user: User; token: string }>> {
    return api.post("/auth/register", data);
  },

  async logout(): Promise<ApiResponse<void>> {
    return api.post("/auth/logout");
  },

  async getProfile(): Promise<ApiResponse<User>> {
    return api.get("/users/profile");
  },

  async updateProfile(data: UpdateUserDto): Promise<ApiResponse<User>> {
    return api.put("/users/profile", data);
  },

  async changePassword(data: ChangePasswordDto): Promise<ApiResponse<void>> {
    return api.post("/users/change-password", data);
  },

  async getAll(page = 1, pageSize = 10): Promise<PaginatedResponse<User>> {
    return api.get(`/users?page=${page}&pageSize=${pageSize}`);
  },

  async getById(id: string): Promise<ApiResponse<User>> {
    return api.get(`/users/${id}`);
  },

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return api.delete(`/users/${id}`);
  },
};

export default userService;
