import type { Task } from "@/interfaces/Task";
import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = async (): Promise<AxiosResponse<Task[]>> =>
  await axiosInstance.get("/tasks");

export const createTask = async (task: Task): Promise<AxiosResponse> =>
  await axiosInstance.post("/tasks", task);
