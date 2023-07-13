import { useExerciseStore } from '@/stores/modules/exercise'
import { getExercisesService, getExerciseByIdService } from '@/services/exerciseServices'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export const useExerciseComposable = () => {
  const exerciseStore = useExerciseStore()
  const { setExercises, setLoadingExercise, setExerciseSelect } = exerciseStore
  const { exercises, exerciseSelect, loadingExercise } = storeToRefs(exerciseStore)
  const columnsExercise = ref<any[]>([
    {
      name: 'name',
      label: 'Nome',
      field: 'name',
      align: 'left',
      sortable: true
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
  async function getExercises(query: any) {
    setLoadingExercise(true)
    try {
      const { status, data } = await getExercisesService(query)
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
    exercises,
    exerciseSelect,
    loadingExercise,
    columnsExercise
  }
}
