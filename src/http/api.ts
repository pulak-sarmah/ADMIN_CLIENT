import { Credentials } from "./../types";
import { api } from "./client";

// Auth service
export const login = (Credentials: Credentials) =>
  api.post("/auth/login", Credentials);

export const self = () => api.get("/auth/self");