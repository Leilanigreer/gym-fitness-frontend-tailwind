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
  const ITEMS_PER_PAGE = 20;

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

  const handleRoutineSubmit = async (event, exerciseId) => {
    await handleAddExercise(event, exerciseId);
    revalidator.revalidate();
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
    <div className="container-fluid bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-11 col-sm-12 py-4">
          <h1 className="display-4 mb-4 fw-bold text-purple text-center">
            Are you ready to get in shape? Here we go!
          </h1>

            <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <select 
                    className="form-select" 
                    value={pendingFilters.level}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                    aria-label="Exercise level"
                  >
                    <option value="">Exercise Level</option>
                    {uniqueValues.level.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.display}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-3">
                  <select 
                    className="form-select"
                    value={pendingFilters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    aria-label="Exercise Category"
                  >
                    <option value="">Category</option>
                    {uniqueValues.category.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.display}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-3">
                  <select 
                    className="form-select"
                    value={pendingFilters.equipment}
                    onChange={(e) => handleFilterChange('equipment', e.target.value)}
                    aria-label="Exercise Equipment"
                  >
                    <option value="">Equipment</option>
                    {uniqueValues.equipment.map(equipment => (
                      <option key={equipment.value} value={equipment.value}>
                        {equipment.display}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <select 
                    className="form-select"
                    value={pendingFilters.primary_muscles}
                    onChange={(e) => handleFilterChange('primary_muscles', e.target.value)}
                    aria-label="Primary Muscles"
                  >
                    <option value="">Primary Muscles</option>
                    {uniqueValues.primary_muscles.map(primary_muscles => (
                      <option key={primary_muscles.value} value={primary_muscles.value}>
                        {primary_muscles.display}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 d-flex justify-content-end gap-2">
                  <button 
                    className="btn btn-secondary"
                    onClick={handleResetFilters}
                    disabled={!Object.values(activeFilters).some(filter => filter !== '')}
                  >
                    Reset Filters
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleApplyFilters}
                    disabled={!hasFilterChanges}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 text-center">
            <p className="text-muted">
              Showing {Math.min(ITEMS_PER_PAGE, filteredExercises.length)} of {filteredExercises.length} exercises
              {Object.values(activeFilters).some(filter => filter !== '') && " (filtered)"}
            </p>
          </div>

          <div className="row g-4">
          {currentExercises.map((exercise) => (
            <div key={exercise.id} className="col-sm-6 col-md-4 col-lg-3">
              <ExerciseCard
                exercise={exercise}
                isAuthenticated={isAuthenticated()}
                onRoutineSubmit={handleRoutineSubmit}
                onFieldChange={handleFieldChange}
                formData={formData}
                onLearnMore={handleLearnMoreClick}
              />
            </div>
          ))}
          </div>

        {totalPages > 1 && (
            <nav className="mt-4" aria-label="Exercise pagination">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    ««
                  </button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                </li>
                {getPageNumbers().map(pageNum => (
                  <li
                    key={pageNum}
                    className={`page-item ${pageNum === currentPage ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    »»
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
      <ExerciseModal 
        selectedExercise={selectedExercise} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}