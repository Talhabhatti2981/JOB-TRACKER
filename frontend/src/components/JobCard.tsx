import React, { useState } from "react";
import JobForm from "./JobForm";
import type { Job, JobFormData } from "./types";

type Props = {
  job: Job;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<JobFormData>) => void;
};

export default function JobCard({ job, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);

  const handleEdit = (data: JobFormData) => {
    onUpdate(job.id, data);
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-transform hover:scale-[1.02]">
      {editing ? (
        <JobForm jobData={job} onSubmit={handleEdit} buttonText="Update Job" />
      ) : (
        <>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
            <p className="text-sm text-gray-600">
              {job.company} • {job.location}
            </p>
            <p className="text-xs text-gray-400 mt-1">
               {job.posting_date} • {job.job_type}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.tags?.length ? (
                job.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 font-medium"
                  >
                    {t}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400">No tags</span>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold shadow hover:opacity-90 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(job.id)}
              className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold shadow hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
