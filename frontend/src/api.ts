import axios from "axios";
import type { Job, JobFormData, Filters } from "./components/types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchJobs(filters?: Filters): Promise<Job[]> {
  const res = await axios.get<Job[]>(`${API_BASE}/jobs`, {
    params: filters || {},
  });
  return res.data;
}

export async function fetchJob(id: number): Promise<Job> {
  const res = await axios.get<Job>(`${API_BASE}/jobs/${id}`);
  return res.data;
}

export async function createJob(jobData: JobFormData): Promise<Job> {
  const res = await axios.post<Job>(`${API_BASE}/jobs`, jobData);
  return res.data;
}

export async function updateJob(
  id: number,
  jobData: Partial<JobFormData>
): Promise<Job> {
  const res = await axios.put<Job>(`${API_BASE}/jobs/${id}`, jobData);
  return res.data;
}

export async function deleteJob(id: number): Promise<void> {
  await axios.delete(`${API_BASE}/jobs/${id}`);
}
