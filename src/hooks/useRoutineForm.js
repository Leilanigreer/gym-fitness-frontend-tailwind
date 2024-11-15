// src/hooks/useRoutineForm.js
import { useState } from "react";
import apiClient from "../config/axios";

export function useRoutineForm() {
  const [formData, setFormData] = useState({
    reps: {},
    day: {},
    sets: {},
  });

  const handleAddExercise = async (event, exerciseId) => {
    event.preventDefault();

    const params = {
      exercise_id: exerciseId,
      day: formData.day[exerciseId],
      sets: formData.sets[exerciseId],
      reps: formData.reps[exerciseId],
    };

    try {
      await apiClient.post("/routines.json", params);
      
      setFormData(prev => ({
        reps: { ...prev.reps, [exerciseId]: "" },
        day: { ...prev.day, [exerciseId]: "" },
        sets: { ...prev.sets, [exerciseId]: "" },
      }));
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  const handleFieldChange = (field, exerciseId, value) => {
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