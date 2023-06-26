<template>
  <q-page class="wrapper" padding>
    <q-toolbar>
      <q-toolbar-title>Treinos</q-toolbar-title>
      <q-btn flat dense icon="sym_r_add" label="Adicionar" no-caps to="/workouts/create" />
    </q-toolbar>
    <q-table :rows="data" :columns="columns" row-key="name" flat bordered :grid="gridMode">
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card flat bordered>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
                <q-item-label caption lines="2" class="q-gutter-x-sm">
                  <template v-for="(group, index) in props.row.muscle_groups" :key="index">
                    <q-badge :label="group.name" /> </template
                ></q-item-label>
              </q-item-section>
              <q-item-section side> {{ props.row.exercises.length }} Exercícios </q-item-section>
            </q-item>
          </q-card>
        </div>
      </template>
      <template v-slot:body-cell-muscle_groups="props">
        <q-td :props="props" class="q-gutter-sm">
          <template v-for="(group, index) in props.value" :key="index">
            <q-badge :label="group.name" />
          </template>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const gridMode = ref<boolean>(true)
const data = ref<any[]>([
  {
    id: 1,
    name: 'Treino 1',
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
        muscle_group: {
          id: 1,
          name: 'Peito'
        }
      },
      {
        id: 2,
        name: 'Supino Inclinado',
        muscle_group: {
          id: 1,
          name: 'Peito'
        }
      },
      {
        id: 3,
        name: 'Supino Declinado',
        muscle_group: {
          id: 1,
          name: 'Peito'
        }
      },
      {
        id: 4,
        name: 'Desenvolvimento',
        muscle_group: {
          id: 3,
          name: 'Ombro'
        }
      },
      {
        id: 5,
        name: 'Elevação Lateral',
        muscle_group: {
          id: 3,
          name: 'Ombro'
        }
      },
      {
        id: 6,
        name: 'Tríceps Pulley',
        muscle_group: {
          id: 5,
          name: 'Tríceps'
        }
      },
      {
        id: 7,
        name: 'Tríceps Testa',
        muscle_group: {
          id: 5,
          name: 'Tríceps'
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Treino 2',
    muscle_groups: [
      {
        id: 2,
        name: 'Costas'
      },
      {
        id: 4,
        name: 'Bíceps'
      }
    ],
    exercises: [
      {
        id: 8,
        name: 'Puxada Frontal',
        muscle_group: {
          id: 2,
          name: 'Costas'
        }
      },
      {
        id: 9,
        name: 'Remada Baixa',
        muscle_group: {
          id: 2,
          name: 'Costas'
        }
      },
      {
        id: 10,
        name: 'Rosca Direta',
        muscle_group: {
          id: 4,
          name: 'Bíceps'
        }
      },
      {
        id: 11,
        name: 'Rosca Alternada',
        muscle_group: {
          id: 4,
          name: 'Bíceps'
        }
      }
    ]
  },
  {
    id: 3,
    name: 'Treino 3',
    muscle_groups: [
      {
        id: 5,
        name: 'Pernas'
      }
    ],
    exercises: [
      {
        id: 12,
        name: 'Agachamento',
        muscle_group: {
          id: 5,
          name: 'Pernas'
        }
      },
      {
        id: 13,
        name: 'Leg Press',
        muscle_group: {
          id: 5,
          name: 'Pernas'
        }
      },
      {
        id: 14,
        name: 'Cadeira Extensora',
        muscle_group: {
          id: 5,
          name: 'Pernas'
        }
      },
      {
        id: 15,
        name: 'Cadeira Flexora',
        muscle_group: {
          id: 5,
          name: 'Pernas'
        }
      }
    ]
  }
])
const columns = ref<any[]>([
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {
    name: 'muscle_groups',
    label: 'Grupos',
    field: 'muscle_groups',
    align: 'left',
    sortable: true
  }
])
</script>
