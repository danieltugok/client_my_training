<template>
  <q-page class="wrapper" padding>
    <q-breadcrumbs>
      <template v-slot:separator>
        <q-icon size="1.2em" name="chevron_right" color="primary" />
      </template>
      <q-breadcrumbs-el label="Principal" to="/" />
      <q-breadcrumbs-el label="Treino" />
    </q-breadcrumbs>
    <q-toolbar>
      <q-toolbar-title>Treino</q-toolbar-title>
    </q-toolbar>
    <q-card flat bordered>
      <q-tabs v-model="tab">
        <template v-for="(workout, index) in workouts" :key="index">
          <q-tab :name="workout.id" :label="workout.name" />
        </template>
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <template v-for="(workout, index) in workouts" :key="index">
          <q-tab-panel :name="workout.id">
            <div class="text-h6">{{ workout.name }}</div>
            <div>
              <q-chip
                v-for="(muscle_group, index) in workout.muscle_groups"
                :key="index"
                :label="muscle_group.name"
              />
            </div>
            <q-list bordered class="rounded-borders q-my-md">
              <q-item
                v-for="(exercise, index) in workout.exercises"
                :key="index"
                tag="label"
                clickable
                v-ripple
              >
                <q-item-section>
                  <q-item-label>{{ exercise.name }}</q-item-label>
                  <q-item-label caption lines="2">{{ exercise.muscle_group.name }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle color="blue" v-model="exercise.done" />
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
import { ref } from 'vue'
const tab = ref<string | number>(1)
const workouts = ref<any[]>([
  {
    id: 1,
    name: 'Treino A',
    muscle_groups: [
      {
        id: 1,
        name: 'Peito'
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
        id: 3,
        name: 'Supino Declinado',
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
        id: 8,
        name: 'Desenvolvimento Ombro',
        order: 1,
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
    name: 'Treino B',
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
  }
])
</script>