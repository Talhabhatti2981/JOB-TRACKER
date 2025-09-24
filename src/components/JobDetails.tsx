import React, { useEffect, useState } from "react";
import { fetchJob } from "../api";
import type { Job } from "./types";

type Props = {
  jobId: number | null;
  onBack: () => void;
};

export default function JobDetails({ jobId, onBack }: Props) {
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!jobId) {
      setJob(null);
      return;
    }

    fetchJob(jobId).then(setJob).catch(err => {
      console.error("Failed to fetch job details:", err);
    });
  }, [jobId]);

  if (!job) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <button onClick={onBack} className="text-sm text-blue-600 mb-4">← Back</button>

      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
      <p className="mt-2 text-gray-700">{job.job_type} — Posted {job.posting_date}</p>

      <div className="mt-4">
        <h4 className="font-medium">Tags</h4>
        <div className="mt-2 flex gap-2 flex-wrap">
          {job.tags.map((t,i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-sm">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
