import React, { useState } from "react";
import FilterBar from "./components/FilterBar";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import JobDetails from "./components/JobDetails";
import type { Job, JobFormData, Filters } from "./components/types";

export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const handleAdd = (data: JobFormData) => {
    const newJob: Job = {
      id: Date.now(),
      ...data,
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const handleDelete = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    if (selectedJob === id) setSelectedJob(null);
  };

  const handleUpdate = (id: number, data: Partial<JobFormData>) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...data } : j))
    );
  };

  const filteredJobs = jobs.filter((j) => {
    if (filters.job_type && j.job_type !== filters.job_type) return false;
    if (filters.location && !j.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.tag && !j.tags.some((t) => t.toLowerCase().includes(filters.tag.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold text-indigo-600">JobTracker</div>
        <div className="px-4">
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <button
            onClick={() => setSelectedJob(null)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow hover:opacity-90"
          >
            + Add Job
          </button>
        </header>

        <main className="flex-1 p-6 space-y-6">
          {selectedJob ? (
            <JobDetails jobId={selectedJob} onBack={() => setSelectedJob(null)} />
          ) : (
            <>
              <JobForm onSubmit={handleAdd} />
              <JobList jobs={filteredJobs} onDelete={handleDelete} onUpdate={handleUpdate} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
