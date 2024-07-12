import { CreateTenantData, Credentials } from "./../types";
import { api } from "./client";

// Auth service
export const login = (Credentials: Credentials) =>
  api.post("/auth/login", Credentials);

export const self = () => api.get("/auth/self");

export const logout = () => api.post("/auth/logout");

export const getUsers = () => api.get("/users");

export const createTenant = (tenant: CreateTenantData) =>
  api.post(`tenants`, tenant);

export const getTenants = (queryString: string) =>
  api.get(`tenants?${queryString}`);
