// src/components/WorkoutLogForm.jsx
import { useWorkoutLogForm } from "../hooks/useWorkoutLogForm";

export function WorkoutLogForm({ routine, selectedDate, onSuccess }) {
  const workoutLog = routine.workout_log;
  const isExisting = Boolean(workoutLog.id);

  const {
    formData,
    handleSubmit,
    handleInputChange
  } = useWorkoutLogForm(routine, selectedDate, onSuccess);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-sm text-gray-600">
        Goal: {routine.sets} sets of {routine.reps} reps
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sets Completed
          </label>
          <input
            type="number"
            min="0"
            name="actual_sets"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
            value={formData.actual_sets}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reps per Set
          </label>
          <input
            type="number"
            min="0"
            name="actual_reps"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
            value={formData.actual_reps}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[100px]"
          value={formData.notes}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <button 
          type="submit" 
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          {isExisting ? 'Update Workout' : 'Log Workout'}
        </button>

        {isExisting && workoutLog.updated_at && (
          <div className="mt-2 text-sm text-gray-500">
            Last updated: {new Date(workoutLog.updated_at).toLocaleString()}
          </div>
        )}
      </div>
    </form>
  );
}