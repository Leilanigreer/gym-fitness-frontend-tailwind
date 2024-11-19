import { DAYS_ARRAY } from "./constants/days";
import { X } from 'lucide-react';

export function RoutineUpdate({ routine, onSubmit, onFieldChange, onClose }) {
  const handleChange = (field, value) => {
    if (typeof onFieldChange === 'function') {
      onFieldChange(field, routine.id, value);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e, routine.id)} className="relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Edit {routine.exercise.name}
        </h3>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label 
            htmlFor="day"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Day of the week
          </label>
          <select
            id="day"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
            value={routine.day || ""}
            onChange={(e) => handleChange("day", e.target.value)}
          >
            <option value="">Select a day</option>
            {DAYS_ARRAY.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label 
            htmlFor="reps"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Number of reps
          </label>
          <input
            id="reps"
            type="number"
            min="0"
            value={routine.reps || ""}
            onChange={(e) => handleChange("reps", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label 
            htmlFor="sets"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sets
          </label>
          <input
            id="sets"
            type="number"
            min="0"
            value={routine.sets || ""}
            onChange={(e) => handleChange("sets", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}