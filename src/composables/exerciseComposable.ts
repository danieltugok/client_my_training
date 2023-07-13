import { useExerciseStore } from '@/stores/modules/exercise'
import { getExercisesService, getExerciseByIdService } from '@/services/exerciseServices'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export const useExerciseComposable = () => {
  const exerciseStore = useExerciseStore()
  const { setExercises, setLoadingExercise, setExerciseSelect, setExercisesQuery, updateExercise } = exerciseStore
  const { exercises, exerciseSelect, exercisesQuery, loadingExercise } = storeToRefs(exerciseStore)
  const columnsExercise = ref<any[]>([
    {
      name: 'image_url',
      label: 'Imagem',
      field: 'image_url',
      align: 'left'
    },
    {
      name: 'name',
      required: true,
      label: 'Nome',
      field: 'name',
      align: 'left'
    },
    {
      name: 'muscle_groups',
      label: 'Grupo Muscular',
      field: 'muscle_groups',
      align: 'left'
    },
    {
      name: 'actions',
      label: 'Ações',
      field: (row: any) => row.id
    }
  ])
  async function getExercises() {
    setLoadingExercise(true)
    try {
      const { status, data } = await getExercisesService(exercisesQuery.value)
      if (status === 200) setExercises(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingExercise(false)
    }
  }
  async function getExerciseById(id: number) {
    setLoadingExercise(true)
    try {
      const { status, data } = await getExerciseByIdService(id)
      if (status === 200) setExerciseSelect(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingExercise(false)
    }
  }
  return {
    getExercises,
    getExerciseById,
    setLoadingExercise,
    updateExercise,
    setExercisesQuery,
    exercises,
    exerciseSelect,
    exercisesQuery,
    loadingExercise,
    columnsExercise
  }
}
