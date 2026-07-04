<template>
  <header class="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--nav)] backdrop-blur-xl">
    <div class="page-shell flex h-[72px] items-center justify-between gap-5">
      <RouterLink to="/" class="flex items-center gap-3" aria-label="NOVA AI 首页">
        <span class="grid size-9 place-items-center rounded-xl bg-[var(--mint)] font-black text-[#17142f]">N</span>
        <span class="text-lg font-extrabold tracking-[-0.04em]">NOVA AI</span>
      </RouterLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="主导航">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="rounded-full px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]" active-class="!bg-[var(--surface)] !text-[var(--text)]">
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <button class="grid size-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)]" :aria-label="theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'" @click="toggleTheme">
          <Sun v-if="theme === 'dark'" :size="18" />
          <Moon v-else :size="18" />
        </button>
        <RouterLink v-if="user" to="/profile" class="hidden min-h-10 items-center gap-2 rounded-full bg-[var(--surface)] px-3 text-sm font-bold sm:flex">
          <span class="grid size-7 place-items-center rounded-full bg-[var(--lavender)] text-[#17142f]">{{ user.name.slice(0, 1).toUpperCase() }}</span>
          {{ user.name }}
        </RouterLink>
        <button v-else class="hidden min-h-10 rounded-full bg-[var(--text)] px-4 text-sm font-bold text-[var(--bg)] sm:block" @click="openAuth('login')">
          注册登录
        </button>
        <button class="grid size-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] lg:hidden" aria-label="打开导航菜单" @click="mobileOpen = !mobileOpen">
          <X v-if="mobileOpen" :size="19" />
          <Menu v-else :size="19" />
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="border-t border-[var(--line)] bg-[var(--bg)] lg:hidden">
      <nav class="page-shell grid gap-2 py-4">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="rounded-2xl px-4 py-3 font-semibold hover:bg-[var(--surface)]" @click="mobileOpen = false">{{ item.label }}</RouterLink>
        <RouterLink v-if="user" to="/profile" class="rounded-2xl bg-[var(--surface)] px-4 py-3 font-bold" @click="mobileOpen = false">个人中心</RouterLink>
        <button v-else class="rounded-2xl bg-[var(--coral)] px-4 py-3 text-left font-bold text-[#17142f]" @click="openAuth('login'); mobileOpen = false">注册登录</button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, Moon, Sun, X } from '@lucide/vue'
import { useStore } from '../composables/useStore'

const navItems = [
  { to: '/', label: '首页' },
  { to: '/courses', label: 'AI 编程课' },
  { to: '/agents', label: 'AI 智能体' },
  { to: '/membership', label: '会员套餐' },
]

const mobileOpen = ref(false)
const { theme, user, toggleTheme, openAuth } = useStore()
</script>
