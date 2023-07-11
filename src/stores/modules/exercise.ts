import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useExerciseStore = defineStore('exercise', () => {
  const exercises = ref<any[]>([])
  const exerciseSelect = ref<any>({})
  const loadingExercise = ref<boolean>(false)
  function setExercises(data: any[]): void {
    exercises.value = data
  }
  function setLoadingExercise(data: boolean): void {
    loadingExercise.value = data
  }
  function setExerciseSelect(data: any): void {
    exerciseSelect.value = data
  }
  return {
    exercises,
    exerciseSelect,
    loadingExercise,
    setExercises,
    setLoadingExercise,
    setExerciseSelect
  }
})
