
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  posting_date: string; 
  job_type: string;
  tags: string;
}

export interface Filters {
  job_type: string;
  location: string;
  tag: string;
  sort: string;
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  job_type: string;
  tags: string;
  posting_date: string;
}
