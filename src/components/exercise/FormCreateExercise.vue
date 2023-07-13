<template>
  <q-card style="min-width: 500px">
    <q-form @submit="onSubmit">
      <q-toolbar>
        <q-toolbar-title class="text-body1"> Criar Exercicios </q-toolbar-title>
        <q-btn flat round dense icon="sym_r_close" to="/exercises" />
      </q-toolbar>
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        alternative-labels
        :contracted="$q.screen.lt.sm"
        flat
        :dense="$q.screen.lt.sm"
        inactive-color="grey-5"
      >
        <q-step :name="1" title="Info" icon="settings" :done="step > 1" color="primary">
          <q-form @submit="step++">
            <q-card flat>
              <q-separator spaced />
              <q-card-section>
                <q-input
                  v-model="form.name"
                  type="text"
                  label="Nome"
                  outlined
                  :dense="!$q.screen.lt.sm"
                  :rules="[(val: any) => !!val || 'O nome é obrigatorio']"
                />
                <q-input
                  v-model="form.description"
                  type="textarea"
                  label="Descrição"
                  outlined
                  :dense="!$q.screen.lt.sm"
                  :rules="[(val: any) => !!val || 'O nome é obrigatorio']"
                />
                <q-select
                  :rules="[(val: any) => val.length > 0 || 'O grupo muscular é obrigatorio']"
                  dropdown-icon="sym_r_expand_more"
                  v-model="form.muscle_groups"
                  :options="muscleGroups"
                  label="Grupo muscular"
                  option-label="name"
                  option-value="id"
                  multiple
                  outlined
                  clear-icon="sym_r_close"
                  clearable
                  :dense="!$q.screen.lt.sm"
                >
                  <template v-slot:selected-item="scope">
                    <q-chip
                      removable
                      @remove="scope.removeAtIndex(scope.index)"
                      :tabindex="scope.tabindex"
                      color="primary"
                      text-color="white"
                      icon-remove="sym_r_close"
                      dense
                      square
                      class="q-pa-sm text-caption"
                    >
                      {{ scope.opt.name }}
                    </q-chip>
                  </template>
                </q-select>
              </q-card-section>
              <q-separator spaced />
              <q-card-section class="q-gutter-y-sm">
                <q-btn color="primary" label="Avancar" unelevated class="full-width" no-caps type="submit" />
              </q-card-section>
            </q-card>
          </q-form>
        </q-step>
        <q-step :name="2" title="Foto" icon="sym_r_image" :done="step > 2">
          <q-form @submit="step++">
            <q-card flat>
              <q-separator spaced />
              <q-card-section>
                <input-image-crop label="image" type="input" @update="updateImage" :dense="!$q.screen.lt.sm" />
              </q-card-section>
              <q-separator spaced />
              <q-card-section class="q-gutter-y-sm">
                <q-btn color="primary" label="Avancar" unelevated class="full-width" no-caps type="submit" />
                <q-btn color="primary" label="Voltar" outline class="full-width" no-caps @click="step--" />
              </q-card-section>
            </q-card>
          </q-form>
        </q-step>
        <q-step :name="3" title="Video" icon="sym_r_movie" :done="step > 2">
          <q-form @submit="step++">
            <q-card flat>
              <q-card-section>
                <q-select
                  :rules="[(val: any) => val.length > 0 || 'O grupo muscular é obrigatorio']"
                  dropdown-icon="sym_r_expand_more"
                  v-model="form.muscle_groups"
                  :options="muscleGroups"
                  label="Grupo muscular"
                  option-label="name"
                  option-value="id"
                  multiple
                  outlined
                  clear-icon="sym_r_close"
                  clearable
                  :dense="!$q.screen.lt.sm"
                >
                  <template v-slot:selected-item="scope">
                    <q-chip
                      removable
                      @remove="scope.removeAtIndex(scope.index)"
                      :tabindex="scope.tabindex"
                      color="primary"
                      text-color="white"
                      icon-remove="sym_r_close"
                      dense
                      square
                    >
                      {{ scope.opt.name }}
                    </q-chip>
                  </template>
                </q-select>
              </q-card-section>
              <q-separator spaced />
              <q-card-section class="q-pt-none q-gutter-y-sm">
                <q-btn color="primary" label="Avancar" unelevated class="full-width" no-caps type="submit" />
                <q-btn color="primary" label="Voltar" outline class="full-width" no-caps @click="step--" />
              </q-card-section>
            </q-card>
          </q-form>
        </q-step>
      </q-stepper>
    </q-form>
  </q-card>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import InputImageCrop from '@/components/widgets/InputImageCrop.vue'
const $q = useQuasar()
const step = ref<number>(1)
const form = reactive({
  name: '',
  description: '',
  muscle_groups: [],
  image_url: '',
  video_url: ''
})
const image = ref<any>(null)
const muscleGroups = [
  { id: 1, name: 'Peito' },
  { id: 2, name: 'Costas' },
  { id: 3, name: 'Ombro' },
  { id: 4, name: 'Biceps' },
  { id: 5, name: 'Triceps' },
  { id: 6, name: 'Perna' },
  { id: 7, name: 'Abdomen' }
]
function updateImage(blob: any): void {
  image.value = blob
}
function onSubmit() {
  $q.notify({
    color: 'positive',
    message: 'Exercise updated successfully',
    icon: 'check'
  })
}
</script>
