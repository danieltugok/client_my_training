<template>
  <q-page class="flex flex-center" padding>
    <q-form @submit="onSubmit">
      <q-card flat class="wrapper">
        <div class="text-h6 row justify-center">Recuperar senha</div>
        <q-card-section>
          <q-input
            v-model="email"
            type="email"
            label="Email"
            outlined
            :dense="!$q.screen.lt.sm"
            :rules="[(val: string) => !!val || 'Campo obrigatório']"
          />
          <q-btn
            color="primary"
            label="Enviar email"
            type="submit"
            class="full-width q-mt-md"
            :dense="!$q.screen.lt.sm"
            unelevated
            no-caps
            :loading="loading"
          />
          <div class="row justify-center items-center q-mt-lg">
            <span>Não tem uma conta?</span>
            <router-link
              to="/signin"
              class="mouse-pointer text-primary"
              style="text-decoration: none; margin-left: 5px"
            >
              Voltar
            </router-link>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const email = ref<string>('')
const loading = ref<boolean>(false)
function onSubmit() {
  console.log('submit')
}
</script>
<style scoped lang="sass">
.wrapper
  min-width: 356px
  max-width: 448px
</style>
```
