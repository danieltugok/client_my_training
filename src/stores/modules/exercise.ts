import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useExerciseStore = defineStore('exercise', () => {
  const exercises = ref<any[]>([])
  const exerciseSelect = ref<any>({})
  const exercisesQuery = ref<object>({})
  const loadingExercise = ref<boolean>(false)
  function setExercises(data: any[]): void {
    exercises.value = data
  }
  function setLoadingExercise(data: boolean): void {
    loadingExercise.value = data
  }
  function updateExercise(data: any): void {
    console.log(data)
    // const index = exercises.value.findIndex((exercise) => exercise.id === data.id)
    // console.log(exercises.value[index])
    // if (index !== -1) exercises.value[index] = data
    // const item = exercises.value.find((exercise) => exercise.id === data.id)
    // if (isProxy(item)) Object.assign(toRaw(item), data)
    // else Object.assign(item, data)
    // exercisesKey.value += 1
  }
  function setExercisesQuery(data: any): void {
    exercisesQuery.value = data
  }
  function setExerciseSelect(data: any): void {
    exerciseSelect.value = data
  }
  return {
    exercises,
    exerciseSelect,
    exercisesQuery,
    loadingExercise,
    setExercises,
    setLoadingExercise,
    setExerciseSelect,
    setExercisesQuery,
    updateExercise
  }
})
