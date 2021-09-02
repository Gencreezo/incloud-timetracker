import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3001/api`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTasks() {
    return apiClient.get("/tasks");
  },
  postTask(task) {
    return apiClient.post("/tasks", task);
  },
  patchTask(taskId, task) {
    return apiClient.patch(`/tasks/${taskId}`, task);
  },
};
