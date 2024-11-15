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
    <form onSubmit={handleSubmit}>
      <div className="card-text mb-3">
        <small className="text-muted">
          Goal: {routine.sets} sets of {routine.reps} reps
        </small>
      </div>

      <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Sets Completed</label>
        <input
          type="number"
          min="0"
          name="actual_sets"
          className="form-control"
          value={formData.actual_sets}
          onChange={handleInputChange}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Reps per Set</label>
        <input
          type="number"
          min="0"
          name="actual_reps"
          className="form-control"
          value={formData.actual_reps}
          onChange={handleInputChange}
        />
      </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Notes</label>
        <textarea
          name="notes"
          className="form-control"
          value={formData.notes}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {isExisting ? 'Update Workout' : 'Log Workout'}
      </button>

      {isExisting && workoutLog.updated_at && (
        <div className="mt-2">
          <small className="text-muted">
            Last updated: {new Date(workoutLog.updated_at).toLocaleString()}
          </small>
        </div>
      )}
    </form>
  );
}