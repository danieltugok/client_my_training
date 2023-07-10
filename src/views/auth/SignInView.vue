<template>
  <q-page class="flex flex-center" padding>
    <q-form @submit="onSubmit">
      <q-card flat class="wrapper">
        <q-card-section class="text-center q-pt-none">
          <div class="text-h6">Acessar</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="email"
            type="email"
            label="Email"
            outlined
            :dense="!$q.screen.lt.sm"
            :rules="[(val: string) => !!val || 'Campo obrigatório']"
          />
          <q-input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Senha"
            outlined
            :dense="!$q.screen.lt.sm"
            :rules="[(val: string) => !!val || 'Campo obrigatório']"
            @keyup.enter="onSubmit"
          >
            <template #append>
              <q-btn
                v-if="password"
                color="primary"
                flat
                :label="!showPassword ? 'Mostrar' : 'Esconder'"
                :dense="!$q.screen.lt.sm"
                padding="xs sm"
                no-caps
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
          <div class="row justify-end">
            <router-link
              style="text-decoration: none; margin-top: -10px"
              class="mouse-pointer text-primary"
              to="/forgot-password"
              >Esqueceu a senha</router-link
            >
          </div>
          <q-btn
            color="primary"
            label="Acessar"
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
              to="/signup"
              class="mouse-pointer text-primary"
              style="text-decoration: none; margin-left: 5px"
            >
              Cadastre-se
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
const password = ref<string>('')
const showPassword = ref<boolean>(false)
const loading = ref<boolean>(false)
const onSubmit = () => {
  console.log('submit')
}
</script>
<style scoped lang="sass">
.wrapper
  min-width: 356px
  max-width: 448px
</style>
```
