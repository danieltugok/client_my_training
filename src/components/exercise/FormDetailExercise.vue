<template>
  <q-card>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-card-section>
        <q-btn flat label="Cancel" color="primary" to="/exercises" />
        <q-btn flat label="Turn on Wifi" color="primary" to="/exercises" />
      </q-card-section>
    </q-form>
  </q-card>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar';
const $q = useQuasar();
function onSubmit() {
  $q.notify({
    color: 'positive',
    message: 'Exercise updated successfully',
    icon: 'check'
  })
}
</script>
