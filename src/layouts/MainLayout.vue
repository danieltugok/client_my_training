<template>
  <q-layout view="FHr Lpr lFf">
    <q-header :class="$q.dark.isActive ? 'bg-dark' : 'bg-white text-dark'" bordered>
      <q-toolbar>
        <q-btn
          icon="sym_r_notes"
          @click="toggleLeftDrawer"
          color="orange-3"
          text-color="primary"
          unelevated
          dense
          v-if="false"
        />
        <q-toolbar-title> my training </q-toolbar-title>
        <div class="q-gutter-sm">
          <q-btn
            dense
            unelevated
            @click="$q.dark.toggle()"
            :icon="$q.dark.isActive ? 'sym_r_dark_mode' : 'sym_r_wb_sunny'"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-footer>
      <mobile-menu />
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      show-if-above
      bordered
      :class="$q.dark.isActive ? '' : 'bg-white text-dark'"
    >
      <sidebar-menu />
    </q-drawer>
    <q-page-container :class="$q.dark.isActive ? '' : 'bg-grey-1'">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SidebarMenu from '@/components/menus/SidebarMenu.vue'
import MobileMenu from '@/components/menus/MobileMenu.vue'
const leftDrawerOpen = ref<boolean>(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
