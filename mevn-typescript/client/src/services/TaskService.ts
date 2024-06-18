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

export const getTask = async (id: string): Promise<AxiosResponse<Task>> =>
  await axiosInstance.get(`/tasks/${id}`);

export const updateTask = async (
  id: string,
  newTask: Task
): Promise<AxiosResponse<Task>> =>
  await axiosInstance.put(`/tasks/${id}`, newTask);

export const deleteTask = async (id: string): Promise<AxiosResponse> =>
  await axiosInstance.delete(`/tasks/${id}`);
