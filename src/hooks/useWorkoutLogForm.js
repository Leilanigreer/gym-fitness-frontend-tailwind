// src/hooks/useWorkoutLogForm.js
import { useState, useEffect } from "react";
import apiClient from "../config/axios";

export function useWorkoutLogForm(routine, selectedDate, onSuccess) {
  const workoutLog = routine.workout_log;
  const isExisting = Boolean(workoutLog.id);

  const [formData, setFormData] = useState({
    actual_sets: workoutLog.actual_sets,
    actual_reps: workoutLog.actual_reps,
    notes: workoutLog.notes || ''
  });

  useEffect(() => {
    setFormData({
      actual_sets: workoutLog.actual_sets,
      actual_reps: workoutLog.actual_reps,
      notes: workoutLog.notes || ''
    });
  }, [workoutLog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateToUse = new Date(selectedDate);
    dateToUse.setHours(12, 0, 0, 0);

    const formattedDate = `${dateToUse.getFullYear()}-${
      String(dateToUse.getMonth() + 1).padStart(2, '0')}-${
      String(dateToUse.getDate()).padStart(2, '0')}`;
    
    const params = {
      workout_log: {
        routine_id: routine.id,
        workout_date: formattedDate,
        completed: true,
        ...formData
      }
    };

    try {
      if (isExisting) {
        await apiClient.patch(
          `/workout_logs/${workoutLog.id}.json`,
          params
        );
      } else {
        await apiClient.post("/workout_logs.json", params);
      }

      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (error) {
      console.error("Error logging workout:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('_') ? parseInt(value) : value
    }));
  };

  return {
    formData,
    handleSubmit,
    handleInputChange,
    isExisting
  };
}