import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutineForm } from '../components/RoutineForm';
import { getImageUrl } from '../utils/imageUtils';

const ExerciseCard = ({ 
  exercise, 
  isAuthenticated,
  onRoutineSubmit,
  onFieldChange,
  formData,
  onLearnMore
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState(new Set());

  const handleImageError = (imageUrl, error) => {
    console.error('Image load failed:', imageUrl, error);
    if (!failedImages.has(imageUrl)) {
      setFailedImages(prev => new Set(prev).add(imageUrl));
    }
  };

  const handleImageNavigation = (direction) => (e) => {
    e.preventDefault();
    setCurrentImageIndex(prev => {
      if (direction === 'prev') {
        return prev === 0 ? exercise.images.length - 1 : prev - 1;
      }
      return prev === exercise.images.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div className="card h-100 shadow-sm hover-shadow-md transition">
      {/* Card Header */}
      <div className="card-header h5 border-bottom-0">
        {exercise.name}
      </div>

      {/* Image Carousel */}
        {exercise.images?.length > 0 && (
        <div className="position-relative">
          <div className="carousel slide">
            <div className="carousel-inner">
              {exercise.images.map((image, index) => {
                const imageUrl = getImageUrl(image);
                return (
                  <div key={index} className={`carousel-item ${index === currentImageIndex ? 'active' : ''}`}>
                    <img
                      src={failedImages.has(imageUrl) ? 'https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/646341573a0b4fac8bf02fc7_18.png' : imageUrl}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                      alt={`${exercise.name} position ${index + 1}`}
                      onError={(e) => handleImageError(imageUrl, e)}
                    />
                  </div>
                );
              })}
            </div>
            {exercise.images.length > 1 && (
              <>
                <button 
                  className="carousel-control-prev" 
                  onClick={handleImageNavigation('prev')}
                  type="button"
                >
                  <span className="carousel-control-prev-icon" />
                </button>
                <button 
                  className="carousel-control-next" 
                  onClick={handleImageNavigation('next')}
                  type="button"
                >
                  <span className="carousel-control-next-icon" />
                </button>
              </>
            )}
          </div>
          <div className="position-absolute top-0 start-0 m-2">
            <span className={`badge bg-${
              exercise.level === 'beginner' ? 'success' : 
              exercise.level === 'intermediate' ? 'warning' : 'danger'
            }`}>
              {exercise.capital_level}
            </span>
          </div>
        </div>
      )}

      {/* Card Body with Visual Sections */}
      <div className="card-body d-flex flex-column gap-3">
        {/* Category and Equipment Section */}
        <div className="border-bottom pb-3">
          <div className="d-flex flex-wrap gap-2">
            <span className="badge bg-info">{exercise.capital_category}</span>
            <span className="badge bg-secondary">{exercise.capital_equipment}</span>
          </div>
        </div>

        {/* Muscles Section */}
        <div className="border-bottom pb-3">
          <small className="text-muted d-block mb-2">Target Muscles:</small>
          <div className="d-flex flex-wrap gap-2">
            {exercise.capital_primary_muscles.split(',').map((muscle, index) => (
              <span key={index} className="badge bg-purple">{muscle.trim()}</span>
            ))}
          </div>
        </div>

        {/* Schedule Section */}
        {isAuthenticated && exercise.scheduled_days && Object.keys(exercise.scheduled_days).length > 0 && (
          <div className="border-bottom pb-3">
            <small className="text-muted d-block mb-2">Scheduled Days:</small>
            <div className="d-flex flex-wrap gap-2">
              {Object.keys(exercise.scheduled_days).map((day) => (
                <span key={day} className="badge bg-secondary">{day}</span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons Section */}
        <div className="mt-auto">
          <div className="d-flex gap-2 mb-3">
            <button 
              className="btn btn-primary btn-sm px-3 py-1"
              onClick={() => onLearnMore(exercise)}
              data-bs-toggle="modal"
              data-bs-target="#exerciseModal"
            >
              Learn More
            </button>
            
            {isAuthenticated ? (
              <button 
                className="btn btn-success btn-sm px-3 py-1" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target={`#routineForm${exercise.id}`}
              >
                Add to Routine
              </button>
            ) : (
              <div className="alert alert-info p-2 mb-0 flex-grow-1" role="alert">
                <Link to="/login" className="alert-link">Log in</Link> or{" "}
                <Link to="/signup" className="alert-link">Signup</Link>{" "}
                to add this exercise!
              </div>
            )}
          </div>

          {/* Routine Form Collapse */}
          {isAuthenticated && (
            <div className="collapse" id={`routineForm${exercise.id}`}>
              <div className="card card-body bg-light">
                <RoutineForm
                  exerciseId={exercise.id}
                  onSubmit={onRoutineSubmit}
                  onFieldChange={onFieldChange}
                  formData={formData}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;