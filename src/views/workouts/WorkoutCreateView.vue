<template>
  <q-page class="wrapper" padding>
    <q-form @submit="onSubmit">
      <q-card flat>
        <q-card-section>
          <div class="text-h6">Criar treino</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="formWorkout.name"
            type="text"
            label="Nome"
            outlined
            :rules="[(val: any) => !!val || 'O nome é obrigatorio']"
          />
          <q-select
            :rules="[(val: any) => !!val || 'O grupo muscular é obrigatorio']"
            dropdown-icon="sym_r_expand_more"
            v-model="formWorkout.muscle_groups"
            :options="muscle_groups"
            label="Grupo muscular"
            option-label="name"
            option-value="id"
            multiple
            outlined
            clear-icon="sym_r_close"
            clearable
          />
          <q-card flat bordered>
            <q-card-section>
              <div class="row items-center justify-between">
                <div class="text-body1">Exercícios</div>
                <q-btn
                  color="primary"
                  icon="sym_r_add"
                  no-caps
                  flat
                  round
                  unelevated
                  @click="onAddExercise"
                />
              </div>
            </q-card-section>
            <template v-for="(exercise, index) in formWorkout.exercises" :key="index">
              <q-item v-if="exercise">
                <q-item-section>
                  <q-item-label>{{ exercise?.exercise?.name }}</q-item-label>
                  <q-item-label caption lines="2">{{ exercise?.repetitions?.max }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class="row q-gutter-sm">
                    <q-btn
                      flat
                      color="dark"
                      icon="sym_r_edit"
                      round
                      @click="onEditExercise(index)"
                    />
                    <q-btn
                      flat
                      color="negative"
                      icon="sym_r_delete"
                      round
                      @click="removeExercise(index)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </q-card>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
  <q-dialog v-model="exerciseCreationDialog" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center justify-end">
        <q-btn color="primary" icon="sym_r_close" round flat v-close-popup />
      </q-card-section>
      <q-card-section class="row q-gutter-y-md">
        <div class="col-12">
          <span class="text-body2">Exercicio</span>
          <q-select
            v-model="formExercise.exercise"
            :options="exercisesFiltered"
            option-label="name"
            option-value="id"
            clear-icon="sym_r_close"
            clearable
            outlined
            dropdown-icon="sym_r_expand_more"
            :rules="[(val: any) => !!val || 'O Exercicio é obrigatorio']"
          />
        </div>
        <div class="col-12">
          <span class="text-body2">Repetições</span>
          <q-range
            v-model="formExercise.repetitions"
            :min="1"
            :max="20"
            markers
            label-always
            class="q-pb-md"
          />
        </div>
        <div class="col-12">
          <span class="text-body2">Series</span>
          <q-slider
            v-model="formExercise.series"
            markers
            :min="1"
            :max="6"
            class="q-pb-md"
            marker-labels
          />
        </div>
      </q-card-section>
      <q-card-section class="row justify-end">
        <q-btn
          color="primary"
          label="Adicionar"
          unelevated
          no-caps
          @click="addExercise"
          v-if="formModeExercise === 'create'"
        />
        <q-btn color="primary" label="Salvar" unelevated @click="editExercise" no-caps v-else />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
const exerciseCreationDialog = ref<boolean>(false)
const formModeExercise = ref<string>('create')
const indexExerciseToEdit = ref<number | null>(null)
const muscle_groups = [
  {
    id: 1,
    name: 'Peito'
  },
  {
    id: 2,
    name: 'Costas'
  },
  {
    id: 3,
    name: 'Ombro'
  },
  {
    id: 4,
    name: 'Bíceps'
  },
  {
    id: 5,
    name: 'Tríceps'
  },
  {
    id: 6,
    name: 'Quadríceps'
  },
  {
    id: 7,
    name: 'Posterior de coxa'
  },
  {
    id: 8,
    name: 'Panturiilha'
  },
  {
    id: 9,
    name: 'Abdômen'
  }
]
const exercises = [
  {
    id: 1,
    name: 'Supino reto',
    muscle_groups: [1]
  },
  {
    id: 2,
    name: 'Supino inclinado',
    muscle_groups: [1]
  },
  {
    id: 3,
    name: 'Supino declinado',
    muscle_groups: [1]
  }
]
const exercisesFiltered = computed(() => {
  return exercises.filter((exercise) => {
    return !formWorkout.exercises.some((item) => item.exercise.id === exercise.id)
  })
})
const formWorkout = reactive({
  name: '' as string,
  muscle_groups: [] as any[],
  exercises: [] as any[]
})
const formExercise = reactive({
  exercise: null as object | null,
  repetitions: { min: 8, max: 12 } as object,
  series: 4 as number,
  rest: 30 as number
}) as any
const onSubmit = () => {
  console.log('submit')
}
const resetFormExercise = () => {
  formExercise.exercise = null
  formExercise.repetitions = { min: 8, max: 12 }
  formExercise.series = 4
  formExercise.rest = 30
  formModeExercise.value = 'create'
  indexExerciseToEdit.value = null
}
const onAddExercise = (): void => {
  exerciseCreationDialog.value = true
}
const addExercise = (): void => {
  formWorkout.exercises.push({ ...formExercise })
  resetFormExercise()
  exerciseCreationDialog.value = false
}
const onEditExercise = (index: number): void => {
  formModeExercise.value = 'edit'
  indexExerciseToEdit.value = index
  formExercise.exercise = formWorkout.exercises[index].exercise
  formExercise.repetitions = formWorkout.exercises[index].repetitions
  formExercise.series = formWorkout.exercises[index].series
  formExercise.rest = formWorkout.exercises[index].rest
  exerciseCreationDialog.value = true
}
const editExercise = (): void => {
  if (!indexExerciseToEdit.value && indexExerciseToEdit.value !== 0) return
  formWorkout.exercises[indexExerciseToEdit.value] = { ...formExercise }
  exerciseCreationDialog.value = false
}
const removeExercise = (index: number): void => {
  if (index > -1) formWorkout.exercises.splice(index, 1)
}
</script>
