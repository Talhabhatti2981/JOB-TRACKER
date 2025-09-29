import React from "react";
import JobCard from "./JobCard";
import type { Job, JobFormData } from "./types";

type Props = {
  jobs: Job[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<JobFormData>) => void;
};

export default function JobList({ jobs, onDelete, onUpdate }: Props) {
  if (jobs.length === 0) {
    return <p className="text-gray-500">No jobs added yet.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
