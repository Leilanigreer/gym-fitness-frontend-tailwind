// src/components/ExerciseModal.jsx
const ExerciseModal = ({ selectedExercise, onClose }) => {
  if (!selectedExercise) return null;

  const formatSecondaryMuscles = (muscles) => {
    if (!muscles || muscles.length === 0) return null;
    
    return muscles
      .map(muscle => muscle.charAt(0).toUpperCase() + muscle.slice(1))
      .join(', ');
  }; 

  return (
    <div 
      className="modal fade" 
      id="exerciseModal"
      tabIndex="-1" 
      aria-labelledby="exerciseModalLabel" 
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exerciseModalLabel">
              {selectedExercise.name}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          
          <div className="modal-body">
            <div className="exercise-details">
              <div className="mb-3">
                <h6 className="fw-bold">Instructions</h6>
                <ol className="list-decimal pl-6 space-y-2">
                {selectedExercise.instructions.map((instruction, index) => (
                  <li key={index} className="text-grey-700">
                    {instruction}
                  </li>
                ))}
                </ol>
              </div>

              <div className="mb-3">
                <h6 className="fw-bold">Details</h6>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="detail-item">
                      <span className="text-muted">Level: </span>
                      <span>{selectedExercise.capital_level}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="detail-item">
                      <span className="text-muted">Equipment: </span>
                      <span>{selectedExercise.capital_equipment}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="detail-item">
                      <span className="text-muted">Category: </span>
                      <span>{selectedExercise.capital_category}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="detail-item">
                      <span className="text-muted">Force: </span>
                      <span>{selectedExercise.force.charAt(0).toUpperCase() + selectedExercise.force.slice(1)}</span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="detail-item">
                      <span className="text-muted">Primary Muscles: </span>
                      <span>{selectedExercise.capital_primary_muscles}</span>
                    </div>
                  </div>
                  {selectedExercise.secondary_muscles && selectedExercise.secondary_muscles.length > 0 && (
                    <div className="col-12">
                      <div className="detail-item">
                        <span className="text-muted">Secondary Muscles: </span>
                        <span>{formatSecondaryMuscles(selectedExercise.secondary_muscles)}</span>
                      </div>
                    </div>
                  )}
                  {selectedExercise.mechanic && (
                    <div className="col-12">
                      <div className="detail-item">
                        <span className="text-muted">Mechanic: </span>
                        <span>{selectedExercise.mechanic.charAt(0).toUpperCase() + selectedExercise.mechanic.slice(1)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;