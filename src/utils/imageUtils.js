// src/utils/imageUtils.js
export const getImageUrl = (imagePath) => {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  const adjustedPath = imagePath.startsWith('/exercises') 
    ? `/images${imagePath}`
    : imagePath;
    
  return `${import.meta.env.VITE_API_URL}${adjustedPath}`;
};