<template>
  <q-list class="column full-height">
    <template v-for="(menuItem, index) in availableItems" :key="index">
      <component :is="sidebarItem" :menu-item="menuItem" />
      <q-separator v-if="menuItem?.separator"></q-separator>
      <q-space v-if="menuItem?.space" />
    </template>
  </q-list>
</template>

<script lang="ts" setup>
import { useCurrentUser } from 'src/composables/user'
import { computed } from 'vue'
import { RouteLocationRaw } from 'vue-router'
import PosSidebarItem from '../_molecules/PosSidebarItem.vue'
import SidebarItem from '../_molecules/SidebarItem.vue'

interface Props {
  pos?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pos: false,
})

const sidebarItem = computed(() => (props.pos ? PosSidebarItem : SidebarItem))

const { hasRole, can } = useCurrentUser()
const { availableItems } = useMenuItems()

function useMenuItems() {
  const availableItems = computed(() => {
    return menuItems.filter((v) => {
      if (v.separator === true) {
        return true
      }
      if (!v?.role && !v?.can) {
        return true
      }
      if (v?.can) {
        return can.value(v.can)
      } else if (v?.role) {
        return hasRole.value(v.role)
      }
    })
  })
  return { availableItems }
}

type MenuItem = {
  icon: string
  label: string
  to: RouteLocationRaw
  can?: string
  role?: string
  separator?: boolean
  space?: boolean
}

const menuItems: Array<MenuItem> = [
  {
    icon: 'search',
    label: 'Search',
    to: '/admin/users/',
    can: 'search:User',
    separator: true,
  },
  {
    icon: 'person_add',
    label: 'New User',
    to: { name: 'admin:users:create' },
    can: 'create:User',
    space: true,
  },

  {
    icon: 'admin_panel_settings',
    label: 'App Settings',
    to: { name: 'admin:settings' },
    role: '*',
  },
]

if (process.env.MODE === 'electron') {
  menuItems.splice(2, 0, {
    icon: 'settings',
    label: 'Terminal Setup',
    to: { name: 'pos:setup' },
  })
}
</script>
