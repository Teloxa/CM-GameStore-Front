import api from "./apiClient";

export async function registerUser(payload) {
  const { data } = await api.post("/auth/register", payload);
  // data = { user, token }
  localStorage.setItem("token", data.token);
  return data.user;
}

export async function loginUser(payload) {
  const { data } = await api.post("/auth/login", payload);
  localStorage.setItem("token", data.token);
  return data.user;
}
