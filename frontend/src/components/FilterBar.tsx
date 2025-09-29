import type { Filters } from "./types";

type Props = {
  filters: Filters;
  onFilterChange: (next: Filters) => void;
};

export default function FilterBar({ filters, onFilterChange }: Props) {
  const update = (patch: Partial<Filters>) => {
    onFilterChange({ ...filters, ...patch });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Job Type</label>
          <select
            value={filters.job_type || ""}
            onChange={(e) => update({ job_type: e.target.value })}
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 text-sm"
          >
            <option value="">All</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Location</label>
          <input
            value={filters.location || ""}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="e.g. New York"
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Tag</label>
          <input
            value={filters.tag || ""}
            onChange={(e) => update({ tag: e.target.value })}
            placeholder="e.g. Python"
            className="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
