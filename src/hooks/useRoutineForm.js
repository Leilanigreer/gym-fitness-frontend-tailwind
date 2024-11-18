// src/hooks/useRoutineForm.js
import { useState } from "react";
import apiClient from "../config/axios";

export function useRoutineForm() {
  const [formData, setFormData] = useState({
    reps: {},
    day: {},
    sets: {},
  });

  const handleAddExercise = async (event, formData) => {
    event.preventDefault();
    
    console.log('handleAddExercise - received:', formData);

    const { exerciseId, day, sets, reps } = formData;

    const params = {
      exercise_id: exerciseId,
      day,
      sets: parseInt(sets, 10),
      reps: parseInt(reps, 10),
    };

    console.log('handleAddExercise - sending params:', params);

    try {
      const response = await apiClient.post("/routines.json", params);
      
      setFormData(prev => ({
        reps: { ...prev.reps, [exerciseId]: "" },
        day: { ...prev.day, [exerciseId]: "" },
        sets: { ...prev.sets, [exerciseId]: "" },
      }));

      return response.data;
    } catch (error) {
      console.error("Error adding exercise:", error);
      throw error;
    }
  };

  const handleFieldChange = (field, exerciseId, value) => {
    console.log('handleFieldChange:', { field, exerciseId, value });
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [exerciseId]: value },
    }));
  };


  const handleUpdateRoutine = async (event, routineId, onSuccess) => {
    event.preventDefault();

    const params = {
      reps: formData.reps[routineId],
      sets: formData.sets[routineId],
      day: formData.day[routineId],
    };
    try {
      await apiClient.patch(`/routines/${routineId}.json`, params);
      
      setFormData(prev => ({
        reps: { ...prev.reps, [routineId]: "" },
        day: { ...prev.day, [routineId]: "" },
        sets: { ...prev.sets, [routineId]: "" },
      }));

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  }; 

  const initializeFormData = (routine) => {
    setFormData({
      reps: { [routine.id]: routine.reps },
      day: { [routine.id]: routine.day },
      sets: { [routine.id]: routine.sets },
    });
  };

  return {
    formData,
    handleAddExercise,
    handleFieldChange,
    handleUpdateRoutine,
    initializeFormData,
  };
}