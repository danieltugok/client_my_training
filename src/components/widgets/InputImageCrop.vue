<template>
  <q-file
    ref="refInput"
    outlined
    v-bind="$attrs"
    v-show="type !== 'image'"
    bottom-slots
    v-model="image"
    :label="label"
    :counter="!!imgSrc"
    accept="image/*"
    @update:model-value="setImage"
  >
    <template v-slot:prepend>
      <q-btn round style="margin-left: -5px" v-if="cropImg" @click="dialogView = true">
        <q-avatar size="42px" rounded>
          <q-img :ratio="1" :src="cropImg" spinner-size="82px" />
        </q-avatar>
      </q-btn>
      <q-icon
        v-else
        name="image"
        color="primary"
        size="2.5rem"
        style="margin-left: -5px"
        @click="refInput.pickFiles()"
      />
    </template>
    <template v-slot:append>
      <q-btn icon="close" v-if="file" flat dense round @click.prevent="clearImage()" class="cursor-pointer" />
    </template>
    <template v-slot:hint> png/jpg </template>
    <template v-slot:file="{ file }">
      <div class="ellipsis relative-position">
        {{ file.name }}
      </div>
    </template>
  </q-file>
  <q-card flat class="q-mb-md transparent" v-if="type == 'image'">
    <q-card-section class="text-center">
      <div v-if="!cropImg">
        <q-avatar
          v-if="!cropImg"
          size="80px"
          font-size="64px"
          color="white"
          class="cursor-pointer bg-transparent text-primary"
          @click="refInput.pickFiles()"
        >
          <q-tooltip class="text-body2 bg-accent" v-if="disable">
            {{ photo ? 'Alterar imagem' : 'Adicionar imagem' }}
          </q-tooltip>
          <q-icon name="sym_r_add_a_photo" />
        </q-avatar>
        <div class="text-subtitle2 text-primary">Adicionar imagem</div>
      </div>
      <q-card flat class="bg-transparent" v-else @click="dialogView = true">
        <q-tooltip class="text-body2 bg-accent"> Visualizar </q-tooltip>
        <q-img
          spinner-color="white"
          :ratio="size.width / size.height"
          :src="cropImg"
          spinner-size="82px"
          style="border-radius: 8px; height: 150px; cursor: pointer"
          fit="contain"
          :style="$q.platform.is.mobile ? 'max-width: 300px' : 'max-width:500px'"
        >
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">Cannot load image</div>
          </template>
        </q-img>
      </q-card>
      <q-btn
        color="white"
        text-color="primary"
        icon="sym_r_edit"
        round
        unelevated
        dense
        v-if="cropImg"
        @click="refInput.pickFiles()"
        class="absolute q-bordered"
        style="bottom: 10px; right: 55px"
      >
        <q-tooltip class="text-body2"> Editar </q-tooltip>
      </q-btn>
      <q-btn
        color="red-4"
        flat=""
        icon="sym_r_close"
        round
        unelevated
        dense
        v-if="cropImg"
        @click.stop="clearImage()"
        class="absolute"
        style="bottom: 10px; right: 10px"
      >
        <q-tooltip class="text-body2"> Remover imagem </q-tooltip>
      </q-btn>
    </q-card-section>
  </q-card>
  <q-dialog v-model="dialogCrop" persistent>
    <q-card>
      <q-toolbar class="q-py-md">
        <q-toolbar-title class="text-h6">Corta imagem </q-toolbar-title>
        <q-btn flat round dense icon="close" class="text-grey-6" v-close-popup />
      </q-toolbar>
      <q-separator />
      <q-card-section>
        <!-- :style="
            $q.platform.is.mobile
              ? 'max-height: 400px ;  min-height:200px, min-width:300px !important'
              : ''
          " -->
        <!-- v-show="viewCropper" -->
        <!-- containerStyle="height: 500px" -->
        <!-- preview=".preview" -->
        <!-- :minCropBoxWidth="size.width"
          :minCropBoxHeight="size.height" -->
        <vue-cropper
          :src="imgSrc"
          ref="refCropper"
          :aspect-ratio="size.width / size.height"
          @ready="$q.loading.hide()"
        />
      </q-card-section>

      <q-separator />
      <q-card-section class="q-py-sm bg-grey-2">
        <div class="row">
          <div class="col q-gutter-sm">
            <q-btn
              color="white"
              round
              unelevated
              text-color="primary"
              class="q-bordered"
              icon="sym_r_crop_free"
              @click="resetCropper"
            />
            <q-btn
              color="white"
              round
              unelevated
              text-color="primary"
              class="q-bordered"
              icon="sym_r_rotate_left"
              @click="rotateLeft"
            />
            <q-btn
              color="white"
              round
              unelevated
              text-color="primary"
              class="q-bordered"
              icon="sym_r_rotate_right"
              @click="rotateRight"
            />
          </div>
          <div class="col text-right">
            <q-btn unelevated round color="primary" icon="sym_r_crop" v-close-popup @click="cropImage" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialogView">
    <q-card>
      <q-toolbar class="q-py-md">
        <q-toolbar-title class="text-h6">Visualizar </q-toolbar-title>
        <q-btn flat round dense icon="close" class="text-grey-6" v-close-popup />
      </q-toolbar>
      <q-separator />
      <q-card-section>
        <q-img
          spinner-color="white"
          :src="cropImg"
          spinner-size="82px"
          style="border-radius: 8px"
          fit="contain"
          :style="$q.platform.is.mobile ? 'width: 300px' : 'width:500px'"
        >
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">Cannot load image</div>
          </template>
        </q-img>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style lang="sass">
.cropper-crop-box
  border-radius: 8px
  height: 100%
</style>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const refInput = ref<any>(null)
const refCropper = ref<any>(null)
const dialogCrop = ref<boolean>(false)
const dialogView = ref<boolean>(false)
const disable = ref<boolean>(false)
const image = ref<any | null>(null)
const imgSrc = ref<any | null>(null)
const cropImg = ref<any | null>(null)
const file = ref<any | null>(null)
const emit = defineEmits(['update'])
const props = defineProps({
  photo: {
    type: [Blob, String],
    default: null
  },
  label: {
    type: String,
    default: 'Image'
  },
  aspect: {
    type: Number,
    default: 1
  },
  size: {
    type: Object,
    default: () => ({ height: 1000, width: 1000 })
  },
  type: {
    type: String,
    default: 'image'
  }
})

const setImage = (file: any): void => {
  $q.loading.show()
  dialogCrop.value = true
  file.value = file
  if (!file.value.type.includes('image/')) {
    alert('Porfavor selecione uma imagem')
    return
  }
  if (typeof FileReader === 'function') {
    const reader = new FileReader()
    reader.onload = (event: any) => {
      refCropper.value.setCropBoxData({
        left: 0,
        top: 0,
        width: 100,
        height: 100
      })
      imgSrc.value = event.target.result
      refCropper.value.replace(event.target.result)
    }
    reader.readAsDataURL(file.value)
    $q.loading.hide()
  } else {
    alert('Desculpe, seu navegador não suporta a API FileReader')
  }
}

const cropImage = (): void => {
  $q.loading.show()
  cropImg.value = refCropper.value.getCroppedCanvas().toDataURL()
  let canvas = refCropper.value.getCroppedCanvas({
    width: props.size.width,
    height: props.size.height
  })
  canvas.toBlob((blob: any) => {
    emit('update', blob)
  })
  $q.loading.hide()
}

const clearImage = (): void => {
  cropImg.value = null
  file.value = null
  image.value = null
}

const resetCropper = (): void => {
  refCropper.value.reset()
}
const rotateLeft = (): void => {
  refCropper.value.rotate(-90)
}
const rotateRight = (): void => {
  refCropper.value.rotate(90)
}
const getNameImage = (name: string) => {
  let ArryName = name.split('/')
  return ArryName[ArryName.length - 1]
}
const initInputCrop = (): void => {
  if (props.photo && image.value == null) {
    cropImg.value = props.photo
    image.value = new File([''], getNameImage(cropImg.value))
  }
}
watch(
  () => props.photo,
  (val) => {
    if (val) initInputCrop()
  }
)
onMounted(() => {
  initInputCrop()
})

onUnmounted(() => {
  clearImage()
})
</script>
