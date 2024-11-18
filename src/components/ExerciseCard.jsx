// src/components/ExerciseCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutineForm } from '../components/RoutineForm';
import { getImageUrl } from '../utils/imageUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [isRoutineFormOpen, setIsRoutineFormOpen] = useState(false);

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

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-secondary';
      case 'intermediate':
        return 'bg-accent';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
      </div>

      {/* Image Carousel */}
      {exercise.images?.length > 0 && (
        <div className="relative w-full aspect-video">
          <div className="absolute inset-0">
            {exercise.images.map((image, index) => {
              const imageUrl = getImageUrl(image);
              return (
                <div 
                  key={index} 
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0'
                  }`}
                >
                  <img
                    src={failedImages.has(imageUrl) ? '/placeholder-image.png' : imageUrl}
                    className="w-full h-full object-cover"
                    alt={`${exercise.name} position ${index + 1}`}
                    onError={(e) => handleImageError(imageUrl, e)}
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          {exercise.images.length > 1 && (
            <>
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors z-20"
                onClick={handleImageNavigation('prev')}
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors z-20"
                onClick={handleImageNavigation('next')}
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </>
          )}

          {/* Level Badge */}
          <div className="absolute left-2.5 top-2.5 z-20">
            <span className={`px-1.5 py-0.25 rounded-full text-sm font-medium text-white ${getLevelColor(exercise.level)}`}>
              {exercise.capital_level}
            </span>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-6 space-y-4 flex-1">
        {/* Category and Equipment */}
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-0.5 rounded-full text-sm font-medium text-white bg-accent">
            {exercise.capital_category}
          </span>
          <span className="px-2 py-0.5 rounded-full text-sm font-medium text-white bg-gray-500">
            {exercise.capital_equipment}
          </span>
        </div>

        {/* Target Muscles */}
        <div>
          <span className="text-sm text-gray-600">Target Muscles:</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {exercise.capital_primary_muscles.split(',').map((muscle, index) => (
              <span key={index} className="px-2 py-0.5 rounded-full text-sm font-medium text-white bg-primary">
                {muscle.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Scheduled Days */}
        {isAuthenticated && exercise.scheduled_days && Object.keys(exercise.scheduled_days).length > 0 && (
          <div>
            <span className="text-sm text-gray-600">Scheduled Days:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.keys(exercise.scheduled_days).map((day) => (
                <span key={day} className="px-3 py-1 rounded-full text-sm font-medium text-white bg-gray-500">
                  {day}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2"> {/* Reduced gap and padding-top */}
          <button 
            onClick={() => onLearnMore(exercise)}
            className="flex-1 px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-xs font-medium"
          >
            Learn More
          </button>
          
          {isAuthenticated ? (
            <button 
              onClick={() => setIsRoutineFormOpen(!isRoutineFormOpen)}
              className="flex-1 px-3 py-1.5 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors text-xs font-medium"
            >
              Add to Routine
            </button>
          ) : (
            <div className="flex-1 bg-[#FFEAD9] rounded-md p-3 text-xs text-center"> {/* Reduced padding */}
              <Link to="/login" className="text-[#BF5600] hover:text-[#822300] text-sm font-medium">Log in</Link>
              {" "}or{" "}
              <Link to="/signup" className="text-[#BF5600] hover:text-[#822300] text-sm font-medium">Sign up</Link>
              {" "}to add this exercise!
            </div>
          )}
        </div>

        {/* Routine Form */}
        {isAuthenticated && (
          <div 
            className={`transform transition-all duration-300 ease-in-out overflow-hidden ${
              isRoutineFormOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-gray-50 rounded-md p-4 mt-4">
            <RoutineForm
              exerciseId={exercise.id}
              onSubmit={async (e, formData) => {
                try {
                  await onRoutineSubmit(e, formData);
                  setIsRoutineFormOpen(false);
                } catch (error) {
                  console.error('Error submitting routine:', error);
                }
              }}
              onFieldChange={onFieldChange}
              formData={formData}
            />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseCard;