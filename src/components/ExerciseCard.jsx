// src/components/ExerciseCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutineForm } from '../components/RoutineForm';
import { getImageUrl } from '../utils/imageUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getShortDay } from '../constants/days';

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
        return 'bg-[#27ae60]';
      case 'intermediate':
        return 'bg-[#2f80ed]';
      case 'advanced':
        return 'bg-[#333333]';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">

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
          <div className="absolute left-2.5 top-0.5 z-20">
            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium text-white ${getLevelColor(exercise.level)}`}>
              {exercise.capital_level}
            </span>
          </div>
        </div>
      )}

      {/* Card Header */}
      <div className="pt-2 px-3 pb-1">
        <h3 className="text-lg font-semibold text-gray-900 truncate whitespace-nowrap overflow-hidden">
          {exercise.name}
        </h3>
      </div>

      {/* Card Content */}
      <div className="px-4 pt-2 pb-4 flex-1"> 
        {/* Category and Equipment */}
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white bg-gray-600">
            {exercise.capital_category}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white bg-gray-600">
            {exercise.capital_equipment}
          </span>
        </div>

        {/* First Divider */}
        <div className="border-t border-gray-100 my-4" /> 

        {/* Target Muscles */}
        <div className="pb-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 whitespace-nowrap">Target Muscles:</span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {exercise.capital_primary_muscles.split(',').map((muscle, index) => (
                <span key={index} className="px-2 py-0.5 rounded-full text-xs font-medium text-white bg-gray-600">
                  {muscle.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Second Divider */}
        <div className="border-t border-gray-100 my-4" /> 

        {/* Scheduled Days */}
        {isAuthenticated && (
          <>
            <div>
              <span className="text-xs text-gray-600 block mb-2">Scheduled Days:</span>
              {exercise.scheduled_days && Object.keys(exercise.scheduled_days).length > 0 ? (
                <div className="flex flex-wrap gap-1.5"> 
                  {Object.keys(exercise.scheduled_days).map((day) => (
                    <span key={day} className="px-2 py-1 rounded-full text-xs font-medium text-white bg-gray-600">
                      {getShortDay(day)}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-gray-600">
                  None
                </span>
              )}
            </div>
            {/* Third Divider */}
            <div className="border-t border-gray-100 my-4" /> 
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => onLearnMore(exercise)}
            className="w-full px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Learn More
          </button>
          
          {isAuthenticated ? (
            <div 
              onClick={() => setIsRoutineFormOpen(!isRoutineFormOpen)}
              className="flex items-center gap-2 cursor-pointer justify-center"
            >
              <svg className="text-primary hover:text-primary/90 transition-colors" width="36" height="36" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="11" fill="currentColor"/>
                <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2"/>
              </svg>
              <span className="text-gray-800 text-sm font-normal">Add to Routine</span>
            </div>
          ) : (
            <div className="flex items-start gap-2 justify-center">
              <svg className="text-primary" width="36" height="36" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="11" fill="currentColor"/>
                <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-gray-800 text-sm font-normal">Add to Routine</span>
                <div className="text-xs">
                  <Link to="/login" className="text-burnt-orange hover:text-[#822300] text-sm font-medium">Log in</Link>
                  {" "}or{" "}
                  <Link to="/signup" className="text-burnt-orange hover:text-[#822300] text-sm font-medium">Sign up</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

        {/* Routine Form */}
        {isAuthenticated && (
          <div 
            className={`transform transition-all duration-300 ease-in-out overflow-hidden ${
              isRoutineFormOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-4 border-t border-gray-100 my-2">
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
  );
};

export default ExerciseCard;