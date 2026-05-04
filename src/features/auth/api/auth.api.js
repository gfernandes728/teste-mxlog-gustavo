import { httpClient } from "../../../shared/services/httpClient";

export const login = async (data) => {
  const { data: response } = await httpClient.post("/auth/login", data);
  return response;
};