import { useState } from 'react';
import { useLoaderData } from "react-router-dom";
import { DAYS_ARRAY } from "./constants/days";
import { useRoutineForm } from "./hooks/useRoutineForm";
import { RoutineUpdate } from "./RoutinesUpdate";
import { Zap, ChevronDown } from 'lucide-react';

const RoutinesIndex = () => {
  const routines = useLoaderData();
  const [selectedDay, setSelectedDay] = useState("My Routines");
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { formData, handleFieldChange, handleUpdateRoutine, initializeFormData } = useRoutineForm();

  // Group routines by day
  const routinesByDay = DAYS_ARRAY.reduce((acc, day) => {
    acc[day] = routines.filter(routine => routine.day === day);
    return acc;
  }, {});

  const handleDayChange = (day) => {
    setSelectedDay(day);
    setDropdownOpen(false);
  };

  const handleEditClick = (routine) => {
    setSelectedRoutine(routine);
    initializeFormData(routine);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoutine(null);
  };

  const handleSubmit = async (event, routineId) => {
    await handleUpdateRoutine(event, routineId, () => {
      handleCloseModal();
      window.location.reload();
    });
  };

  const RoutineCard = ({ routine }) => (
    <div className="w-full md:w-1/2 lg:w-1/3 p-3">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full border border-gray-200">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Zap className="text-primary w-5 h-5" />
            </div>
            <h5 className="text-lg font-semibold text-gray-900">
              {routine.exercise.name}
            </h5>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Sets</span>
              <span className="font-semibold">{routine.sets || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Reps</span>
              <span className="font-semibold">{routine.reps}</span>
            </div>
          </div>
          <button 
            onClick={() => handleEditClick(routine)}
            className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Edit Routine
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-4xl mb-6 text-gray-900">My Routines</h2>
      
      {/* Day Selection Dropdown */}
      <div className="relative mb-6">
        <button 
          className="flex items-center justify-between w-48 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>{selectedDay}</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        
        {dropdownOpen && (
          <div className="absolute z-10 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="py-1">
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                onClick={() => handleDayChange("My Routines")}
              >
                My Routines
              </button>
              {DAYS_ARRAY.map((day) => (
                <button
                  key={day}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                  onClick={() => handleDayChange(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      {selectedDay === "My Routines" ? (
        <div className="space-y-4">
          {DAYS_ARRAY.map((day, index) => (
            routinesByDay[day].length > 0 && (
              <div key={day} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                  onClick={() => {
                    const element = document.getElementById(`content-${index}`);
                    element.classList.toggle('hidden');
                  }}
                >
                  <span className="text-lg font-medium text-gray-900">
                    {day} ({routinesByDay[day].length} routines)
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </button>
                <div id={`content-${index}`} className="p-4">
                  <div className="flex flex-wrap -mx-3">
                    {routinesByDay[day].map(routine => (
                      <RoutineCard key={routine.id} routine={routine} />
                    ))}
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap -mx-3">
          {routines
            .filter(routine => routine.day === selectedDay)
            .map(routine => (
              <RoutineCard key={routine.id} routine={routine} />
            ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="inline-block w-full max-w-lg p-6 my-8 text-left align-middle bg-white rounded-lg shadow-xl">
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
      )}
    </div>
  );
};

export default RoutinesIndex;