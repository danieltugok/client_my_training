<template>
  <q-page class="wrapper" padding>
    <q-toolbar>
      <q-toolbar-title>Exercicios</q-toolbar-title>
      <q-btn flat dense icon="sym_r_add" label="Adicionar" no-caps to="/exercises/create" />
    </q-toolbar>
    <!-- <q-tabs no-caps align="justify" v-model="muscleGroup">
      <q-tab label="Todos" name="all" />
      <q-tab v-for="group in muscleGroups" :key="group.id" :label="group.name" :name="group.name" />
    </q-tabs> -->
    <q-table
      :rows="exercises"
      flat
      row-key="name"
      bordered
      :grid="gridMode"
      :columns="columnsExercise"
      :loading="loadingExercise"
      v-model:pagination="pagination"
    >
      <template v-slot:item="props">
        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4">
          <q-card flat bordered>
            <q-card-section class="text-center">
              <strong>{{ props.row.name }}</strong>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center">
              <div>{{ props.row.description }}</div>
            </q-card-section>
          </q-card>
        </div>
      </template>
      <template #body-cell-image_url="props">
        <q-td :props="props">
          <q-avatar rounded>
            <q-img :src="props.value" spinner-color="white" spinner-size="52px" />
          </q-avatar>
        </q-td>
      </template>
      <template #body-cell-muscle_groups="props">
        <q-td :props="props" class="q-gutter-xs">
          <template v-for="group in props.value" :key="group.id">
            <q-chip :label="group.name" dense />
          </template>
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props" class="q-gutter-xs">
          <q-btn icon="sym_r_edit" dense round flat :to="`/exercises/${+props.value}/edit`" />
          <q-btn icon="sym_r_visibility" dense round flat :to="`/exercises/${+props.value}/details`" />
          <q-btn icon="sym_r_delete" dense round flat />
        </q-td>
      </template>
      <template #pagination>
        <q-pagination
          v-model="pagination.page"
          :max="pagesNumber"
          :max-pages="5"
          active-design="unelevated"
          :color="$q.dark.isActive ? 'white' : 'dark'"
          active-color="primary"
          direction-links
          gutter="sm"
        />
      </template>
    </q-table>
    <q-dialog v-model="dialogEdit" persistent>
      <form-edit-exercise :id="props.id" />
    </q-dialog>
    <q-dialog v-model="dialogCreate" persistent>
      <form-create-exercise />
    </q-dialog>
    <q-dialog v-model="dialogDetail" persistent>
      <form-detail-exercise :id="props.id" />
    </q-dialog>
  </q-page>
</template>
<script lang="ts" setup>
import FormEditExercise from '@/components/exercise/FormEditExercise.vue'
import FormDetailExercise from '@/components/exercise/FormDetailExercise.vue'
import FormCreateExercise from '@/components/exercise/FormCreateExercise.vue'
import { ref, computed, watch } from 'vue'
import { useExerciseComposable } from '@/composables/exerciseComposable'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const { exercises, loadingExercise, columnsExercise, getExercises } = useExerciseComposable()
const props = defineProps({
  id: {
    type: Number,
    required: false,
    default: null
  },
  type: {
    type: String,
    required: false,
    default: ''
  }
})
const dialogEdit = ref<boolean>(false)
const dialogCreate = ref<boolean>(false)
const dialogDetail = ref<boolean>(false)
const gridMode = ref<boolean>(false)
const pagination = ref<any>({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 12
})
// const muscleGroups = ref<any>([
//   {
//     id: 1,
//     name: 'Peitoral'
//   },
//   {
//     id: 2,
//     name: 'Bíceps'
//   },
//   {
//     id: 3,
//     name: 'Tríceps'
//   },
//   {
//     id: 4,
//     name: 'Ombros'
//   },
//   {
//     id: 5,
//     name: 'Costas',
//     slug: 'costas'
//   },
//   {
//     id: 6,
//     name: 'Quadríceps'
//   },
//   {
//     id: 7,
//     name: 'Isquiotibiais / Posterior de coxa'
//   },
//   {
//     id: 8,
//     name: 'Panturrilha'
//   },
//   {
//     id: 9,
//     name: 'Abdômen'
//   },
//   {
//     id: 10,
//     name: 'Glúteos'
//   }
// ])
// const muscleGroup = ref<string>('all')
function dialogOpen(): void {
  if (props.type === 'create' && !props.id) dialogCreate.value = true
  else if (props.type === 'edit' && props.id) dialogEdit.value = true
  else if (props.type === 'details' && props.id) dialogDetail.value = true
  else {
    dialogCreate.value = false
    dialogEdit.value = false
    dialogDetail.value = false
  }
}
watch(
  () => props.type,
  () => {
    dialogOpen()
  }
)
// watch(muscleGroup, () => {
//   getExercises(query)
// })
const pagesNumber = computed(() => Math.ceil(exercises.value.length / pagination.value.rowsPerPage))
// const query = computed(() => {
//   if (muscleGroup.value === 'all') return {}
//   else return { muscleGroups: muscleGroup.value }
// })
dialogOpen()
getExercises()
</script>
<style lang="sass"></style>
