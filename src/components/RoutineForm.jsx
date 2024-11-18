// src/components/RoutineForm.jsx
import { DAYS_ARRAY } from "../constants/days";

export function RoutineForm({ onSubmit, exerciseId, formData = {}, onFieldChange }) {
  const { day = {}, reps = {}, sets = {} } = formData;

  const handleChange = (field, value) => {
    if (typeof onFieldChange === 'function') {
      onFieldChange(field, exerciseId, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('RoutineForm handleSubmit - current formData:', {
      exerciseId,
      day: day[exerciseId],
      sets: sets[exerciseId],
      reps: reps[exerciseId]
    });
    
    // Validate form data before submission
    if (!day[exerciseId] || !sets[exerciseId] || !reps[exerciseId]) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit(e, {
      exerciseId,
      day: day[exerciseId],
      sets: sets[exerciseId],
      reps: reps[exerciseId]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Day Select */}
      <div className="space-y-1">
        <label 
          htmlFor={`day-${exerciseId}`}
          className="block text-sm text-gray-700"
        >
          Day of the week
        </label>
        <select
          id={`day-${exerciseId}`}
          value={day[exerciseId] || ""}
          onChange={(e) => handleChange("day", e.target.value)}
          className="w-full px-3 py-1.5 rounded border border-gray-200 text-sm bg-white focus:ring-1 focus:ring-primary/20 focus:border-primary"
          required
        >
          <option value="">Select a day</option>
          {DAYS_ARRAY.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      {/* Reps Input */}
      <div className="space-y-1">
        <label 
          htmlFor={`reps-${exerciseId}`}
          className="block text-sm text-gray-700"
        >
          Number of reps:
        </label>
        <input
          id={`reps-${exerciseId}`}
          type="number"
          min="0"
          value={reps[exerciseId] || ""}
          onChange={(e) => handleChange("reps", e.target.value)}
          className="w-full px-3 py-1.5 rounded border border-gray-200 text-sm bg-white focus:ring-1 focus:ring-primary/20 focus:border-primary"
          required
        />
      </div>

      {/* Sets Input */}
      <div className="space-y-1">
        <label 
          htmlFor={`sets-${exerciseId}`}
          className="block text-sm text-gray-700"
        >
          Sets:
        </label>
        <input
          id={`sets-${exerciseId}`}
          type="number"
          min="0"
          value={sets[exerciseId] || ""}
          onChange={(e) => handleChange("sets", e.target.value)}
          className="w-full px-3 py-1.5 rounded border border-gray-200 text-sm bg-white focus:ring-1 focus:ring-primary/20 focus:border-primary"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-1.5 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm font-medium"
      >
        Create Routine
      </button>
    </form>
  );
}