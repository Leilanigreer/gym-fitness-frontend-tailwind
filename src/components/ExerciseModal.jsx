import { useEffect } from 'react';

const ExerciseModal = ({ selectedExercise, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!selectedExercise) return null;

  const formatSecondaryMuscles = (muscles) => {
    if (!muscles || muscles.length === 0) return null;
    return muscles
      .map(muscle => muscle.charAt(0).toUpperCase() + muscle.slice(1))
      .join(', ');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h5 className="text-xl font-semibold">
            {selectedExercise.name}
          </h5>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          {/* Instructions Section */}
          <div className="mb-6">
            <h6 className="font-bold text-base mb-3">Instructions</h6>
            <ol className="list-decimal pl-6 space-y-2">
              {selectedExercise.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-900">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {/* Details Section */}
          <div className="mb-6">
            <h6 className="font-bold text-base mb-3">Details</h6>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2">
                  <span className="text-gray-500">Level: </span>
                  <span>{selectedExercise.capital_level}</span>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className="text-gray-500">Equipment: </span>
                  <span>{selectedExercise.capital_equipment}</span>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className="text-gray-500">Category: </span>
                  <span>{selectedExercise.capital_category}</span>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className="text-gray-500">Force: </span>
                  <span>{selectedExercise.force.charAt(0).toUpperCase() + selectedExercise.force.slice(1)}</span>
                </div>
              </div>
              <div className="col-span-2">
                <div className="mb-2">
                  <span className="text-gray-500">Primary Muscles: </span>
                  <span>{selectedExercise.capital_primary_muscles}</span>
                </div>
              </div>
              {selectedExercise.secondary_muscles && selectedExercise.secondary_muscles.length > 0 && (
                <div className="col-span-2">
                  <div className="mb-2">
                    <span className="text-gray-500">Secondary Muscles: </span>
                    <span>{formatSecondaryMuscles(selectedExercise.secondary_muscles)}</span>
                  </div>
                </div>
              )}
              {selectedExercise.mechanic && (
                <div className="col-span-2">
                  <div className="mb-2">
                    <span className="text-gray-500">Mechanic: </span>
                    <span>{selectedExercise.mechanic.charAt(0).toUpperCase() + selectedExercise.mechanic.slice(1)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;