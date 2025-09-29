import React, { useEffect, useState } from "react";
import type { JobFormData, Job } from "./types";

interface Props {
  onSubmit: (data: JobFormData) => void;
  jobData?: Job;
  buttonText?: string;
}

export default function JobForm({ onSubmit, jobData, buttonText = "Add Job" }: Props) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [job_type, setJobType] = useState("Full-time");
  const [tagsStr, setTagsStr] = useState("");
  const [posting_date, setPostingDate] = useState(new Date().toISOString().slice(0,10));
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (jobData) {
      setTitle(jobData.title);
      setCompany(jobData.company);
      setLocation(jobData.location);
      setJobType(jobData.job_type);
      setTagsStr(Array.isArray(jobData.tags) ? jobData.tags.join(", ") : "");
      setPostingDate(jobData.posting_date);
    }
  }, [jobData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: JobFormData = {
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      job_type,
      posting_date,
      tags: tagsStr ? tagsStr.split(",").map(t => t.trim()).filter(Boolean) : []
    };

    onSubmit(payload);
    setSubmitting(false);

    if (!jobData) {
      setTitle("");
      setCompany("");
      setLocation("");
      setJobType("Full-time");
      setTagsStr("");
      setPostingDate(new Date().toISOString().slice(0,10));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-3">
      <div>
        <label className="text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-lg p-2 mt-1" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Company</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full border rounded-lg p-2 mt-1" required />
        </div>

        <div>
          <label className="text-sm font-medium">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border rounded-lg p-2 mt-1" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Type</label>
          <select value={job_type} onChange={(e) => setJobType(e.target.value)} className="w-full border rounded-lg p-2 mt-1">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Posting Date</label>
          <input type="date" value={posting_date} onChange={(e)=> setPostingDate(e.target.value)} className="w-full border rounded-lg p-2 mt-1" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Tags (comma-separated)</label>
        <input value={tagsStr} onChange={(e)=> setTagsStr(e.target.value)} placeholder="e.g. Python, React" className="w-full border rounded-lg p-2 mt-1" />
      </div>

      <div>
        <button type="submit" disabled={submitting} className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow">
          {submitting ? "Submitting..." : buttonText}
        </button>
      </div>
    </form>
  );
}
