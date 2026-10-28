import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach a JWT here if your backend uses Bearer-token auth.
// For example, add Authorization in a request interceptor.

const INTERVIEW_URL = "/interview";

export const interviewApi = {
  // POST /api/v1/interview
  create: async (payload) => {
    const { data } = await api.post(INTERVIEW_URL, payload);
    return data;
  },

  // GET /api/v1/interview
  getAll: async () => {
    const { data } = await api.get(INTERVIEW_URL);
    return data;
  },

  // GET /api/v1/interview/:id
  getById: async (id) => {
    const { data } = await api.get(`${INTERVIEW_URL}/${id}`);
    return data;
  },

  // PATCH /api/v1/interview/:id
  update: async (id, payload) => {
    const { data } = await api.patch(
      `${INTERVIEW_URL}/${id}`,
      payload
    );
    return data;
  },

  // DELETE /api/v1/interview/:id
  remove: async (id) => {
    const { data } = await api.delete(
      `${INTERVIEW_URL}/${id}`
    );
    return data;
  },
};

export function getApiError(error) {
  return (
    error.response?.data?.message ||
    error.message ||
    "Something went wrong. Please try again."
  );
}