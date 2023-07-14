<template>
  <q-card style="min-width: 500px">
    <q-form @submit="onSubmit">
      <q-toolbar>
        <q-toolbar-title class="text-body1"> Editar exercicios </q-toolbar-title>
        <q-btn flat round dense icon="sym_r_close" to="/exercises" />
      </q-toolbar>
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        alternative-labels
        header-nav
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
                  :rules="[(val: any) => !!val || 'O grupo muscular é obrigatorio']"
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
              <q-card-section class="q-gutter-y-sm row justify-end">
                <q-btn color="primary" label="Avancar" unelevated no-caps type="submit" :dense="!$q.screen.lt.sm" />
              </q-card-section>
            </q-card>
          </q-form>
        </q-step>
        <q-step :name="2" title="Foto" icon="sym_r_image" :done="step > 2">
          <q-form @submit="step++">
            <q-card flat>
              <q-separator spaced />
              <q-card-section>
                <input-image-crop
                  label="image"
                  type="image"
                  @update="onSelectImagem"
                  :dense="!$q.screen.lt.sm"
                  :photo="image"
                />
              </q-card-section>
              <q-separator spaced />
              <q-card-section class="row justify-end q-gutter-x-sm">
                <q-btn color="primary" label="Voltar" outline no-caps @click="step--" :dense="!$q.screen.lt.sm" />
                <q-btn color="primary" label="Avancar" unelevated no-caps type="submit" :dense="!$q.screen.lt.sm" />
              </q-card-section>
            </q-card>
          </q-form>
        </q-step>
        <q-step :name="3" title="Video" icon="sym_r_movie" :done="step > 2">
          <q-form @submit="onEditExercise">
            <q-card flat>
              <q-card-section>
                <q-file
                  outlined
                  v-model="video"
                  label="Video"
                  counter
                  @update:model-value="onSelectVideo"
                  accept=".mp4, .avi, .mov, .wmv, .flv, .mkv, .webm"
                >
                  <template v-slot:prepend>
                    <q-icon name="sym_r_movie" />
                  </template>
                </q-file>
                <video controls autoplay ref="refVideoExercice" :src="form.video_url" loop></video>
              </q-card-section>
              <q-separator spaced />
              <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
                <q-btn color="primary" label="Voltar" outline no-caps @click="step--" :dense="!$q.screen.lt.sm" />
                <q-btn color="primary" label="Salvar" unelevated no-caps type="submit" :dense="!$q.screen.lt.sm" />
              </q-card-section>
            </q-card>
          </q-form>
        </q-step>
      </q-stepper>
    </q-form>
  </q-card>
</template>
<script lang="ts" setup>
import { reactive, ref, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import { useExerciseComposable } from '@/composables/exerciseComposable'
import { editExerciseService, uploadFileExerciseService } from '@/services/exerciseServices'
import InputImageCrop from '@/components/widgets/InputImageCrop.vue'
import router from '@/router'
const { exerciseSelect, getExerciseById, getExercises } = useExerciseComposable()
const $q = useQuasar()
const step = ref<number>(1)
const refVideoExercice = ref<any>(null)
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const form = reactive({
  name: '' as string,
  description: '' as string,
  muscle_groups: [] as object[],
  image_url: '' as string,
  video_url: '' as string
})
const image = ref<any>(null)
const video = ref<any>(null)
const muscleGroups = [
  { id: 1, name: 'Peito' },
  { id: 2, name: 'Costas' },
  { id: 3, name: 'Ombro' },
  { id: 4, name: 'Biceps' },
  { id: 5, name: 'Triceps' },
  { id: 6, name: 'Perna' },
  { id: 7, name: 'Abdomen' }
]
function onSelectImagem(blob: any): void {
  image.value = blob
}
function onSelectVideo(blob: any): void {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onloadend = (e: any) => {
    refVideoExercice.value.src = e.target.result
  }
}
function clearForm(): void {
  form.name = ''
  form.description = ''
  form.muscle_groups = []
  form.image_url = ''
  form.video_url = ''
  image.value = null
  video.value = null
}
function onSubmit() {
  $q.notify({
    color: 'positive',
    message: 'Exercise updated successfully',
    icon: 'check'
  })
}
function getNameImage(url: string): string {
  const name = url.split('/')
  return name[name.length - 1]
}
async function initEditExercise(): Promise<void> {
  await getExerciseById(props.id)
  form.name = exerciseSelect.value.name
  form.description = exerciseSelect.value.description
  form.muscle_groups = exerciseSelect.value.muscle_groups
  form.video_url = exerciseSelect.value.video_url
  form.image_url = exerciseSelect.value.image_url
  image.value = exerciseSelect.value.image_url
  video.value = new File([''], getNameImage(exerciseSelect.value.video_url))
}
async function uploadFileExercise(file: any): Promise<any> {
  try {
    const { data, status } = await uploadFileExerciseService(file)
    if (status === 201) return data
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Erro ao fazer upload do arquivo',
      icon: 'close'
    })
    return null
  }
}
async function onEditExercise(): Promise<void> {
  try {
    $q.loading.show()
    if (image.value !== form.image_url) form.image_url = await uploadFileExercise(image.value)
    if (video.value !== form.video_url) form.video_url = await uploadFileExercise(video.value)
    form.muscle_groups = form.muscle_groups.map((muscle: any) => muscle.id)
    const { status } = await editExerciseService(props.id, form)
    if (status === 200 || status === 201) {
      getExercises()
      $q.notify({
        color: 'positive',
        message: 'Exercise updated successfully',
        icon: 'check'
      })
      router.push('/exercises')
    }
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Erro ao editar exercicio',
      icon: 'close'
    })
  } finally {
    $q.loading.hide()
  }
}
initEditExercise()
onUnmounted(() => {
  clearForm()
})
</script>
<style lang="sass" scoped>
video
  width: 100%
  height: auto
  max-height: 200px
  object-fit: contain
</style>
```
