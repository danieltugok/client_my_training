<template>
  <q-page class="wrapper" padding>
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
      <q-tab-panels v-model="tab" animated>
        <template v-for="(workout, index) in workouts" :key="index">
          <q-tab-panel :name="workout.id">
            <div class="text-h6">Treino {{ workout.name }}</div>
            <div>
              <q-chip
                v-for="(muscle_group, index) in workout.muscle_groups"
                :key="index"
                clickable
                square
                :selected="muscleGroupsSelect.filter((item: number) => item === muscle_group.id).length > 0"
                @click="setMuscleGroupsSelect(muscle_group.id)"
                :label="muscle_group.name"
                :color="muscleGroupsSelect.filter((item: number) => item === muscle_group.id).length > 0 ? 'primary' : 'grey-5 '"
                :text-color="muscleGroupsSelect.filter((item: number) => item === muscle_group.id).length > 0 ? 'white' : 'dark'"
                ><q-badge color="orange" text-color="white" floating transparent round >{{
                  workout.exercises.filter((item: any) => item.muscle_group.id === muscle_group.id)
                    .length
                }}</q-badge>
              </q-chip>
              <!-- <q-tabs
                indicator-color="transparent"
                no-caps
                outside-arrows
                mobile-arrows
                inline-label
                dense
              >
                <q-tab
                  v-for="(muscle_group, index) in workout.muscle_groups"
                  :key="index"
                  dense
                  @click="setMuscleGroupsSelect(muscle_group.id)"
                  :label="muscle_group.name"
                  :class="muscleGroupsSelect.filter((item: number) => item === muscle_group.id).length > 0 ? 'bg-primary text-white' : ''"
                >
                  <q-badge color="primary" text-color="white" floating>{{
                    workout.exercises.filter(
                      (item: any) => item.muscle_group.id === muscle_group.id
                    ).length
                  }}</q-badge>
                </q-tab>
              </q-tabs> -->
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
            <q-list bordered class="rounded-borders q-my-md">
              <q-item
                v-for="(exercise, index) in workout.exercises.filter((item:any) =>
                  muscleGroupsSelect.includes(item.muscle_group.id)
                )"
                :key="index"
                clickable
                v-ripple
              >
                <q-item-section>
                  <q-item-label>{{ exercise.name }}</q-item-label>
                  <q-item-label caption lines="2">{{ exercise.muscle_group.name }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox color="positive" v-model="exercise.done" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </template>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
const tab = ref<string | number>(1)
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
        name: 'Peito'
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
        repetition: 10 / 12,
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 1,
          name: 'Peito'
        },
        done: false
      },
      {
        id: 2,
        name: 'Supino Inclinado',
        order: 2,
        repetition: 10 / 12,
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 1,
          name: 'Peito'
        },
        done: false
      },
      {
        id: 3,
        name: 'Supino Declinado',
        order: 3,
        repetition: '10 / 12',
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 1,
          name: 'Peito'
        },
        done: false
      },
      {
        id: 8,
        name: 'Desenvolvimento Ombro',
        order: 4,
        repetition: 10 / 12,
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
        repetition: 10 / 12,
        series: 4,
        weight: 'Alta',
        muscle_group: {
          id: 3,
          name: 'Ombro'
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
        repetition: 10 / 12,
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
        repetition: 10 / 12,
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
        repetition: 10 / 12,
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
        repetition: 10 / 12,
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
        repetition: 10 / 12,
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
        repetition: 10 / 12,
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
        repetition: 10 / 12,
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
        repetition: 10 / 12,
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
        repetition: 10 / 12,
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
        repetition: 10 / 12,
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
        repetition: 10 / 12,
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
        repetition: 10 / 12,
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
setMuscleGroups()
watch(tab, () => {
  setMuscleGroups()
})
</script>
