// src/ExercisesIndex.jsx
import { useLoaderData, useRevalidator } from "react-router-dom";
import ExerciseModal from "./components/ExerciseModal";
import ExerciseCard from "./components/ExerciseCard";
import { useRoutineForm } from "./hooks/useRoutineForm";
import { isAuthenticated } from "./utils/auth";
import { useState, useMemo } from "react";

export function ExercisesIndex() {
  const [selectedExercise, setSelectedExercise] = useState('');
  const revalidator = useRevalidator();
  const exercises = useLoaderData();
  const ITEMS_PER_PAGE = 12;

  const [activeFilters, setActiveFilters] = useState({
    level: '',
    category: '',
    equipment: '',
    primary_muscles: ''
  });

  const [pendingFilters, setPendingFilters] = useState({
  level: '',
  category: '',
  equipment: '',
    primary_muscles: ''
  });  

  const [currentPage, setCurrentPage] = useState(1);

  const safeExercises = useMemo(() => {
    return Array.isArray(exercises) ? exercises : [];
  }, [exercises]);
  
  const uniqueValues = useMemo(() => {
    if (!Array.isArray(safeExercises) || safeExercises.length === 0) {
      return {
        level: [],
        category: [],
        equipment: [],
        primary_muscles: []
      };
    }

    return {
      level: [...new Set(safeExercises.map(ex => ex?.level))]
        .filter(Boolean)
        .sort()
        .map(level => ({
          value: level,
          display: safeExercises.find(ex => ex?.level === level)?.capital_level || level
        })),
      category: [...new Set(safeExercises.map(ex => ex?.category))]
        .filter(Boolean)
        .sort()
        .map(category => ({
          value: category,
          display: safeExercises.find(ex => ex?.category === category)?.capital_category || category
        })),
      equipment: [...new Set(safeExercises.map(ex => ex?.equipment))]
        .filter(Boolean)
        .sort()
        .map(equipment => ({
          value: equipment,
          display: safeExercises.find(ex => ex?.equipment === equipment)?.capital_equipment || equipment
        })),
      primary_muscles: [...new Set(safeExercises.map(ex => ex?.primary_muscles?.[0]))]
        .filter(Boolean)
        .sort()
        .map(primary_muscles => ({
          value: primary_muscles,
          display: safeExercises.find(ex => ex?.primary_muscles?.[0] === primary_muscles)?.capital_primary_muscles || primary_muscles
        }))
    };
  }, [safeExercises]);

  const hasFilterChanges = useMemo(() => {
    return Object.keys(activeFilters).some(
      key => activeFilters[key] !== pendingFilters[key]
    );
  }, [activeFilters, pendingFilters]);

  const filteredExercises = useMemo(() => {
    return safeExercises.filter(exercise => {
      return (
        (activeFilters.level === '' || exercise.level === activeFilters.level) &&
        (activeFilters.category === '' || exercise.category === activeFilters.category) &&
        (activeFilters.equipment === '' || exercise.equipment === activeFilters.equipment) &&
        (activeFilters.primary_muscles === '' || exercise.primary_muscles[0] === activeFilters.primary_muscles)
      );
    });
  }, [activeFilters, safeExercises]);
  
  const currentExercises = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredExercises.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredExercises, currentPage]);

  const { formData, handleAddExercise, handleFieldChange } = useRoutineForm();

  if (!Array.isArray(exercises)) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleLearnMoreClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseModal = () => {
    setSelectedExercise('');
  };

  const handleRoutineSubmit = async (event, formData) => {
    try {
      await handleAddExercise(event, formData);
      revalidator.revalidate();
      return true;
    } catch (error) {
      console.error('Error submitting routine:', error);
      return false;
    }
  };

  const handleFilterChange = (filterType, value) => {
    setPendingFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleApplyFilters = () => {
    setActiveFilters(pendingFilters);
    setCurrentPage(1); 
  };

  const handleResetFilters = () => {
    const emptyFilters = {
      level: '',
      category: '',
      equipment: '',
      primary_muscles: ''
    };
    setActiveFilters(emptyFilters);
    setPendingFilters(emptyFilters);
    setCurrentPage(1);
  };

  const totalItems = filteredExercises.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);


  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(newPage);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Are you ready to get in shape? 
          <br></br>
          Here we go!
        </h1>

        {/* Filters Card */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Exercise Level Select */}
              <select 
                className="w-full h-12 px-4 rounded-md border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 
                          transition-colors bg-white"
                value={pendingFilters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
              >
                <option value="">Exercise Level</option>
                {uniqueValues.level.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.display}
                  </option>
                ))}
              </select>

              {/* Category Select */}
              <select 
                className="w-full h-12 px-4 rounded-md border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 
                          transition-colors bg-white"
                value={pendingFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">Category</option>
                {uniqueValues.category.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.display}
                  </option>
                ))}
              </select>

              {/* Equipment Select */}
              <select 
                className="w-full h-12 px-4 rounded-md border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 
                          transition-colors bg-white"
                value={pendingFilters.equipment}
                onChange={(e) => handleFilterChange('equipment', e.target.value)}
              >
                <option value="">Equipment</option>
                {uniqueValues.equipment.map(equipment => (
                  <option key={equipment.value} value={equipment.value}>
                    {equipment.display}
                  </option>
                ))}
              </select>

              {/* Primary Muscles Select */}
              <select 
                className="w-full h-12 px-4 rounded-md border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 
                          transition-colors bg-white"
                value={pendingFilters.primary_muscles}
                onChange={(e) => handleFilterChange('primary_muscles', e.target.value)}
              >
                <option value="">Primary Muscles</option>
                {uniqueValues.primary_muscles.map(primary_muscles => (
                  <option key={primary_muscles.value} value={primary_muscles.value}>
                    {primary_muscles.display}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                          ${Object.values(activeFilters).some(filter => filter !== '')
                            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                onClick={handleResetFilters}
                disabled={!Object.values(activeFilters).some(filter => filter !== '')}
              >
                Reset Filters
              </button>
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                          ${hasFilterChanges
                            ? 'bg-primary hover:bg-primary/90 text-white'
                            : 'bg-primary/50 text-white/90 cursor-not-allowed'}`}
                onClick={handleApplyFilters}
                disabled={!hasFilterChanges}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing {Math.min(ITEMS_PER_PAGE, filteredExercises.length)} of {filteredExercises.length} exercises
            {Object.values(activeFilters).some(filter => filter !== '') && " (filtered)"}
          </p>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {currentExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isAuthenticated={isAuthenticated()}
              onRoutineSubmit={handleRoutineSubmit}
              onFieldChange={handleFieldChange}
              formData={formData}
              onLearnMore={handleLearnMoreClick}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-8" aria-label="Exercise pagination">
            <ul className="flex justify-center items-center gap-2">
              {/* First Page */}
              <li>
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors
                            ${currentPage === 1
                              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                              : 'text-gray-700 bg-white hover:bg-gray-100 border border-gray-200'}`}
                >
                  ««
                </button>
              </li>

              {/* Previous Page */}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors
                            ${currentPage === 1
                              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                              : 'text-gray-700 bg-white hover:bg-gray-100 border border-gray-200'}`}
                >
                  «
                </button>
              </li>

              {/* Page Numbers */}
              {getPageNumbers().map(pageNum => (
                <li key={pageNum}>
                  <button
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors
                              ${pageNum === currentPage
                                ? 'bg-primary text-white'
                                : 'text-gray-700 bg-white hover:bg-gray-100 border border-gray-200'}`}
                  >
                    {pageNum}
                  </button>
                </li>
              ))}

              {/* Next Page */}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors
                            ${currentPage === totalPages
                              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                              : 'text-gray-700 bg-white hover:bg-gray-100 border border-gray-200'}`}
                >
                  »
                </button>
              </li>

              {/* Last Page */}
              <li>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors
                            ${currentPage === totalPages
                              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                              : 'text-gray-700 bg-white hover:bg-gray-100 border border-gray-200'}`}
                >
                  »»
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Modal */}
      <ExerciseModal 
        selectedExercise={selectedExercise} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
