// src/RoutinesUpdate.jsx

import { DAYS_ARRAY } from "./constants/days";

export function RoutineUpdate({ routine, onSubmit, onFieldChange, onClose }) {
  const handleChange = (field, value) => {
    if (typeof onFieldChange === 'function') {
      onFieldChange(field, routine.id, value);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e, routine.id)}>
      <div className="modal-header">
        <h5 className="modal-title">Edit {routine.exercise.name}</h5>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <div className="form-group mb-3">
          <label htmlFor="day">Day of the week</label>
          <select
            id="day"
            className="form-control"
            name="day"
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

        <div className="form-group mb-3">
          <label htmlFor="reps">Number of reps:</label>
          <input
            id="reps"
            type="number"
            min="0"
            value={routine.reps || ""}
            onChange={(e) => handleChange("reps", e.target.value)}
            name="reps"
            className="form-control"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="sets">Sets:</label>
          <input
            id="sets"
            type="number"
            min="0"
            value={routine.sets || ""}
            onChange={(e) => handleChange("sets", e.target.value)}
            name="sets"
            className="form-control"
          />
        </div>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
}