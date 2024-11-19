// src/WorkoutLog.jsx
import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import { WorkoutLogForm } from './components/WorkoutLogForm';
import ExerciseModal from './components/ExerciseModal';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const Calendar = ({ selectedDate, onSelect, onClose }) => {
  const today = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const weeks = [];
  let days = [];
  let day = 1;

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<td key={`empty-${i}`} className="p-2"></td>);
  }

  // Fill in the days of the month
  while (day <= daysInMonth) {
    const date = new Date(currentYear, currentMonth, day);
    const isToday = date.toDateString() === today.toDateString();
    const isSelected = date.toDateString() === selectedDate.toDateString();
    const isPast = date < today;

    days.push(
      <td key={day} className="p-1">
        <button
          onClick={() => {
            if (isPast) {
              onSelect(date);
              onClose();
            }
          }}
          disabled={!isPast}
          className={`w-full h-10 rounded-full transition-colors ${
            isSelected 
              ? 'bg-primary text-white' 
              : isToday
                ? 'bg-primary/10 text-primary'
                : isPast
                  ? 'hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          {day}
        </button>
      </td>
    );

    if (days.length === 7) {
      weeks.push(<tr key={day}>{days}</tr>);
      days = [];
    }
    day++;
  }

  // Add any remaining days
  if (days.length > 0) {
    weeks.push(<tr key={day}>{days}</tr>);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <th key={day} className="p-2 text-sm font-medium text-gray-600">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    </div>
  );
};


export function WorkoutLog() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedExercise, setSelectedExercise] =useState("")
  
  const { dates = [] } = useLoaderData();

  const revalidator = useRevalidator();

  const handleLearnMoreClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseModal = () => {
    setSelectedExercise('');
  };

  const handleLogUpdate = () => {
    revalidator.revalidate();
  };

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const formatDateForComparison = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${
      String(d.getMonth() + 1).padStart(2, '0')}-${
      String(d.getDate()).padStart(2, '0')}`;
  };

  const selectedDateData = dates.find(dateData => 
    dateData.date === formatDateForComparison(selectedDate)
  );

  const getNoRoutinesMessage = () => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    
    if (selectedDate > today) {
      return "You can't log workouts for a day in the future.";
    }
    else if (selectedDate < oneMonthAgo && !selectedDateData) {
      return "No workouts were logged for this day.";
    }
    return "No routines scheduled for this day.";
  };

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  if (!Array.isArray(dates)) {
    return (
      <div className="alert alert-danger">
        Error: Failed to load workout data. Please check your loader function.
        <pre>{JSON.stringify({ dates }, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Navigation Controls */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
            onClick={goToPreviousDay}
          >
            <ChevronLeft className="w-4 h-4 inline mr-1" />
            Previous Day
          </button>
          <button 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            onClick={goToToday}
          >
            Today
          </button>
          <button 
            className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
            onClick={goToNextDay}
          >
            Next Day
            <ChevronRight className="w-4 h-4 inline ml-1" />
          </button>
        </div>
        
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <CalendarIcon className="w-4 h-4 inline mr-2" />
          Calendar
        </button>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowCalendar(false)} />
            <div className="relative z-50">
              <Calendar
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
                onClose={() => setShowCalendar(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Selected Date Display */}
      <h2 className="text-2xl font-semibold mb-6">
        Workout Log for {selectedDate.toLocaleDateString()} ({getDayName(selectedDate)})
        {selectedDate.toDateString() === new Date().toDateString() && 
          <span className="ml-2 text-primary">(Today)</span>
        }
      </h2>

      {/* Routines List */}
      <div className="space-y-6">
        {selectedDateData?.routines.map(routine => (
          <div key={routine.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{routine.exercise_name}</h3>
                <button 
                  className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors"
                  onClick={() => handleLearnMoreClick(routine.exercise)}
                >
                  Learn More
                </button>
              </div>
              <WorkoutLogForm 
                routine={routine} 
                selectedDate={selectedDate}
                onSuccess={handleLogUpdate}
              />
            </div>
          </div>
        )) || (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md">
            {getNoRoutinesMessage()}
          </div>
        )}
      </div>

      <ExerciseModal 
        selectedExercise={selectedExercise} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}