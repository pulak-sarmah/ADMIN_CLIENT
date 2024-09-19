import { CreateTenantData, Credentials, User } from "./../types";
import { api } from "./client";

export const AUTH_SERVICE = "/api/auth";
export const CATELOG_SERVICE = "/api/catalog";

// Auth service
export const login = (Credentials: Credentials) =>
  api.post(`${AUTH_SERVICE}/auth/login`, Credentials);

export const self = () => api.get(`${AUTH_SERVICE}/auth/self`);

export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`);

export const getUsers = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/users?${queryString}`);

export const createTenant = (tenant: CreateTenantData) =>
  api.post(`${AUTH_SERVICE}/tenants`, tenant);

export const getTenants = (queryString?: string) =>
  api.get(`${AUTH_SERVICE}/tenants?${queryString}`);

export const createUser = (user: User) =>
  api.post(`${AUTH_SERVICE}/users`, user);

export const updateUser = (user: User, id: number) =>
  api.patch(`${AUTH_SERVICE}/users/${id}`, user);

// category service

export const getcategories = () => api.get(`${CATELOG_SERVICE}/categories`);
