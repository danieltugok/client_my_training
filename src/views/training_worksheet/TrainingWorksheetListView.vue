<template>
  <q-page class="wrapper" padding>
    <q-toolbar>
      <q-toolbar-title>Fichas treinos</q-toolbar-title>
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
    objective: 'Hipertrofia',
    created_at: '2021-08-01'
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
