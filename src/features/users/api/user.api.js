import { httpClient } from "../../../shared/services/httpClient";

export const getUsers = (params) =>
  httpClient.get("/users/dashboard", { params });

export const getUserById = (id) =>
  httpClient.get(`/users/${id}`);

export const createUser = (data) =>
  httpClient.post("/users", data);

export const updateUser = (id, data) =>
  httpClient.put(`/users/${id}`, data);

export const deleteUser = (id) =>
  httpClient.delete(`/users/${id}`);