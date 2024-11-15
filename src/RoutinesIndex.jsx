import { useState } from 'react';
import { useLoaderData } from "react-router-dom";
import { DAYS_ARRAY } from "./constants/days";
import { useRoutineForm } from "./hooks/useRoutineForm";
import { RoutineUpdate } from "./RoutinesUpdate";

const RoutinesIndex = () => {
  const routines = useLoaderData();
  const [selectedDay, setSelectedDay] = useState("My Routines");
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const { formData, handleFieldChange, handleUpdateRoutine, initializeFormData } = useRoutineForm();

  // Group routines by day
  const routinesByDay = DAYS_ARRAY.reduce((acc, day) => {
    acc[day] = routines.filter(routine => routine.day === day);
    return acc;
  }, {});

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleEditClick = (routine) => {
    setSelectedRoutine(routine);
    initializeFormData(routine);
  };

  const handleCloseModal = () => {
    setSelectedRoutine(null);
  };

  const handleSubmit = async (event, routineId) => {
    await handleUpdateRoutine(event, routineId, () => {
      handleCloseModal();
      window.location.reload(); // This is a temporary solution
    });
  };

  const renderRoutineCard = (routine) => (
    <div className="col-md-6 col-lg-4 mb-3">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <div className="bg-purple-light p-2 rounded-circle me-3">
              <i className="bi bi-lightning-fill text-white"></i>
            </div>
            <h5 className="card-title mb-0" style={{ fontFamily: 'Poppins' }}>
              {routine.exercise.name}
            </h5>
          </div>
          <div className="card-text">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Sets</span>
              <span className="fw-semibold">{routine.sets || '-'}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Reps</span>
              <span className="fw-semibold">{routine.reps}</span>
            </div>
          </div>
        </div>
        <button 
          type="button" 
          className="btn btn-primary" 
          data-bs-toggle="modal" 
          data-bs-target="#editRoutine"
          onClick={() => handleEditClick(routine)}
        >
          Edit Routine
        </button>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <h2 className="display-6 mb-4" style={{ fontFamily: 'Poppins' }}>My Routines</h2>
      
      {/* Day Selection Dropdown */}
      <div className="dropdown mb-4">
        <button 
          className="btn btn-primary dropdown-toggle"
          type="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          {selectedDay}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleDayChange("My Routines")}
            >
              My Routines
            </button>
          </li>
          {DAYS_ARRAY.map((day) => (
            <li key={day}>
              <button
                className="dropdown-item"
                onClick={() => handleDayChange(day)}
              >
                {day}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      {selectedDay === "My Routines" ? (
        <div className="accordion" id="routinesAccordion">
          {DAYS_ARRAY.map((day, index) => (
            routinesByDay[day].length > 0 && (
              <div className="accordion-item" key={day}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="true"
                  >
                    {day} ({routinesByDay[day].length} routines)
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse show"
                  data-bs-parent="#routinesAccordion"
                >
                  <div className="accordion-body">
                    <div className="row">
                      {routinesByDay[day].map(routine => renderRoutineCard(routine))}
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="row">
          {routines
            .filter(routine => routine.day === selectedDay)
            .map(routine => renderRoutineCard(routine))}
        </div>
      )}

      {/* Edit Routine Modal */}
      <div className="modal fade" id="editRoutine" tabIndex="-1" aria-labelledby="editRoutineLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {selectedRoutine && (
              <RoutineUpdate
                routine={{
                  ...selectedRoutine,
                  day: formData.day[selectedRoutine.id] || selectedRoutine.day,
                  sets: formData.sets[selectedRoutine.id] || selectedRoutine.sets,
                  reps: formData.reps[selectedRoutine.id] || selectedRoutine.reps
                }}
                onSubmit={handleSubmit}
                onFieldChange={handleFieldChange}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutinesIndex;