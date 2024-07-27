import { CreateTenantData, Credentials, User } from "./../types";
import { api } from "./client";

// Auth service
export const login = (Credentials: Credentials) =>
  api.post("/auth/login", Credentials);

export const self = () => api.get("/auth/self");

export const logout = () => api.post("/auth/logout");

export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);

export const createTenant = (tenant: CreateTenantData) =>
  api.post(`/tenants`, tenant);

export const getTenants = (queryString?: string) =>
  api.get(`tenants?${queryString}`);

export const createUser = (user: User) => api.post(`/users`, user);

export const updateUser = (user: User, id: number) =>
  api.patch(`/users/${id}`, user);
