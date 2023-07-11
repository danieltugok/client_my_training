<template>
  <q-page :padding="!$q.screen.lt.sm">
    <q-breadcrumbs v-if="!$q.screen.lt.sm">
      <template v-slot:separator>
        <q-icon size="1.2em" name="chevron_right" color="primary" />
      </template>
      <q-breadcrumbs-el label="Principal" to="/" />
      <q-breadcrumbs-el label="Treino" />
    </q-breadcrumbs>
    <q-toolbar v-if="!$q.screen.lt.sm">
      <q-toolbar-title>Treino</q-toolbar-title>
    </q-toolbar>
    <q-card flat>
      <q-tabs v-model="tab">
        <template v-for="(workout, index) in workouts" :key="index">
          <q-tab :name="workout.id" :label="workout.name" />
        </template>
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated class="q-px-none">
        <template v-for="(workout, index) in workouts" :key="index">
          <q-tab-panel :name="workout.id" class="q-px-sm">
            <div class="text-h6">Treino {{ workout.name }}</div>
            <div>
              <!-- :selected="muscleGroupsSelect.filter((item: number) => item === muscle_group.id).length > 0" -->
              <q-chip
                dense
                v-for="(muscle_group, index) in workout.muscle_groups"
                :key="index"
                clickable
                square
                @click="setMuscleGroupsSelect(muscle_group.id)"
                :label="muscle_group.name"
                :color="muscleGroupsSelect.filter((item: number) => item === muscle_group.id).length > 0 ? 'dark' : 'grey-5'"
                :text-color="muscleGroupsSelect.filter((item: number) => item === muscle_group.id).length > 0 ? 'white' : 'dark'"
                ><q-badge color="primary" text-color="white" floating transparent round>{{
                  workout.exercises.filter((item: any) => item.muscle_group.id === muscle_group.id).length
                }}</q-badge>
              </q-chip>
            </div>
            <q-linear-progress
              stripe
              rounded
              size="20px"
              :value="
                workout.exercises.filter((exercise: any) => exercise.done).length /
                workout.exercises.length
              "
              color="positive"
              class="q-mt-sm"
            />
            <q-separator spaced />
            <template
              v-for="(exercise, index) in workout.exercises.filter((item:any) =>
                  muscleGroupsSelect.includes(item.muscle_group.id)
                )"
              :key="index"
            >
              <q-item clickable v-ripple @click="openDetails(exercise)">
                <q-item-section avatar>
                  <q-avatar rounded>
                    <img src="@/assets/gifs/b6.gif" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ exercise.name }}</q-item-label>
                  <q-item-label caption lines="2">{{ exercise.muscle_group.name }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox color="positive" v-model="exercise.done" size="md" />
                </q-item-section>
              </q-item>
              <q-separator />
            </template>
            <q-btn color="dark" label="Finalizar" class="full-width q-my-md" no-caps />
          </q-tab-panel>
        </template>
      </q-tab-panels>
    </q-card>
  </q-page>
  <q-dialog v-model="dialogExerciseDetails" persistent :maximized="$q.screen.lt.sm" position="bottom">
    <q-card style="min-width: 300px" flat>
      <q-toolbar>
        <q-toolbar-title> Detalhes </q-toolbar-title>
        <q-btn flat round dense icon="sym_r_close" v-close-popup />
      </q-toolbar>
      <video :width="$q.screen.width" height="240" controls autoplay>
        <source src="@/assets/videos/video.mp4" type="video/mp4" />
      </video>
      <q-card-section>
        <div class="text-h6">{{ exerciseSelected.name }}</div>
        <div>
          Exercício para trabalhar os músculos do peito e ombros. É realizado com halteres ou cabos, com os braços se
          movendo lateralmente em forma de cruz.
        </div>
      </q-card-section>
      <q-card-section>
        <q-list bordered class="rounded-borders">
          <q-item>
            <q-item-section>
              <q-item-label>Repeticoes</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ exerciseSelected.repetition }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Series</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ exerciseSelected.series }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Grupo Muscular</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip :label="exerciseSelected.muscle_group.name" />
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label>Carga</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ exerciseSelected.weight }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
const tab = ref<string | number>(1)
const dialogExerciseDetails = ref<boolean>(false)
const exerciseSelected = ref<any>({})
const muscleGroupsSelect = ref<any[]>([])
const setMuscleGroupsSelect = (group_id: number) => {
  if (muscleGroupsSelect.value.filter((item: number) => item === group_id).length > 0)
    muscleGroupsSelect.value = muscleGroupsSelect.value.filter((item: number) => item !== group_id)
  else muscleGroupsSelect.value.push(group_id)
}
const workouts = ref<any[]>([
  {
    id: 1,
    name: 'A',
    muscle_groups: [
      {
        id: 1,
        name: 'Peitoral'
      },
      {
        id: 9,
        name: 'Trapézio'
      },
      {
        id: 3,
        name: 'Ombro'
      },
      {
        id: 5,
        name: 'Tríceps'
      }
    ],
    exercises: [
      {
        id: 1,
        name: 'Supino Reto',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 1,
          name: 'Peitoral'
        },
        done: false
      },
      {
        id: 2,
        name: 'Supino Inclinado',
        order: 2,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 1,
          name: 'Peitoral'
        },
        done: false
      },
      {
        id: 3,
        name: 'Supino Declinado',
        order: 3,
        repetition: '"10 / 12"',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 1,
          name: 'Peitoral'
        },
        done: false
      },
      {
        id: 8,
        name: 'Desenvolvimento Ombro',
        order: 4,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 3,
          name: 'Ombro'
        },
        done: false
      },
      {
        id: 9,
        name: 'Elevação Lateral',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 3,
          name: 'Ombro'
        },
        done: false
      },
      {
        id: 22,
        name: 'Elevação Frontal',
        order: 2,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 3,
          name: 'Ombro'
        },
        done: false
      },
      {
        id: 23,
        name: 'Tríceps Pulley',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 5,
          name: 'Tríceps'
        },
        done: false
      },
      {
        id: 24,
        name: 'Tríceps Testa',
        order: 2,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 5,
          name: 'Tríceps'
        },
        done: false
      },
      {
        id: 25,
        name: 'Tríceps Corda',
        order: 3,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 5,
          name: 'Tríceps'
        },
        done: false
      },
      {
        id: 26,
        name: 'Tríceps Banco',
        order: 4,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 5,
          name: 'Tríceps'
        },
        done: false
      },
      {
        id: 27,
        name: 'Encolhimento',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 9,
          name: 'Trapézio'
        },
        done: false
      },
      {
        id: 28,
        name: 'Remada Alta',
        order: 2,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 9,
          name: 'Trapézio'
        },
        done: false
      },
      {
        id: 29,
        name: 'Remada Baixa',
        order: 3,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 9,
          name: 'Trapézio'
        },
        done: false
      }
    ]
  },
  {
    id: 2,
    name: 'B',
    muscle_groups: [
      {
        id: 2,
        name: 'Costas'
      },
      {
        id: 4,
        name: 'Bíceps'
      },
      {
        id: 6,
        name: 'Abdômen'
      }
    ],
    exercises: [
      {
        id: 4,
        name: 'Puxada Frontal',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 2,
          name: 'Costas'
        },
        done: false
      },
      {
        id: 5,
        name: 'Puxada Frente',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 2,
          name: 'Costas'
        },
        done: false
      },
      {
        id: 6,
        name: 'Puxada Costas',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 2,
          name: 'Costas'
        },
        done: false
      },
      {
        id: 7,
        name: 'Rosca Direta',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 4,
          name: 'Bíceps'
        },
        done: false
      }
    ]
  },
  {
    id: 3,
    name: 'C',
    muscle_groups: [
      {
        id: 7,
        name: 'Posteriores de Coxa'
      },
      {
        id: 8,
        name: 'Panturrilha'
      },
      {
        id: 10,
        name: 'Quadríceps'
      }
    ],
    exercises: [
      {
        id: 10,
        name: 'Agachamento Livre',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 10,
          name: 'Quadríceps'
        },
        done: false
      },
      {
        id: 11,
        name: 'Leg Press 45º',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 10,
          name: 'Quadríceps'
        },
        done: false
      },
      {
        id: 12,
        name: 'Cadeira Extensora',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 10,
          name: 'Quadríceps'
        },
        done: false
      },
      {
        id: 13,
        name: 'Cadeira Flexora',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 7,
          name: 'Posteriores de Coxa'
        },
        done: false
      },
      {
        id: 14,
        name: 'Stiff Barra Reta',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 7,
          name: 'Posteriores de Coxa'
        },
        done: false
      },
      {
        id: 15,
        name: 'Panturrilha Sentado',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 8,
          name: 'Panturrilha'
        },
        done: false
      },
      {
        id: 16,
        name: 'Panturrilha em Pé',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 8,
          name: 'Panturrilha'
        },
        done: false
      },
      {
        id: 17,
        name: 'Panturrilha no Leg Press 45º',
        order: 1,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 8,
          name: 'Panturrilha'
        },
        done: false
      }
    ]
  }
])
const setMuscleGroups = () => {
  const muscleGroups = workouts.value
    .filter((workout: any) => workout.id === tab.value)
    .map((workout: any) => workout.muscle_groups)
    .flat()

  muscleGroupsSelect.value = muscleGroups.map((muscleGroup: any) => muscleGroup.id)
}
const openDetails = (value: any): void => {
  exerciseSelected.value = value
  dialogExerciseDetails.value = true
}
setMuscleGroups()
watch(tab, () => {
  setMuscleGroups()
})
</script>
