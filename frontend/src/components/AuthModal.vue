<template>
  <Teleport to="body">
    <div v-if="authOpen" class="fixed inset-0 z-50 grid place-items-center bg-[#090714]/70 p-4 backdrop-blur-md" @click.self="closeAuth">
      <section class="surface-card reveal w-full max-w-md p-6 sm:p-8" role="dialog" aria-modal="true" aria-label="注册登录">
        <div class="mb-7 flex items-start justify-between">
          <div>
            <p class="kicker">{{ authMode === 'login' ? 'Welcome back' : 'Join NOVA' }}</p>
            <h2 class="text-3xl font-extrabold tracking-[-0.04em]">{{ authMode === 'login' ? '继续你的创造' : '创建学习账号' }}</h2>
          </div>
          <button class="grid size-10 place-items-center rounded-full bg-[var(--bg)]" aria-label="关闭弹窗" @click="closeAuth"><X :size="18" /></button>
        </div>

        <form class="grid gap-4" @submit.prevent="submit">
          <label v-if="authMode === 'register'" class="grid gap-2 text-sm font-semibold">
            昵称
            <input v-model.trim="form.name" class="input-field" placeholder="你的昵称">
          </label>
          <label class="grid gap-2 text-sm font-semibold">
            邮箱
            <input v-model.trim="form.email" class="input-field" type="email" placeholder="name@example.com">
          </label>
          <label class="grid gap-2 text-sm font-semibold">
            密码
            <input v-model="form.password" class="input-field" type="password" placeholder="至少 6 位">
          </label>
          <p v-if="error" class="text-sm font-semibold text-[var(--coral)]">{{ error }}</p>
          <button class="btn-primary mt-2 w-full" type="submit">
            {{ authMode === 'login' ? '登录' : '创建账号' }}
            <ArrowRight :size="17" />
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-[var(--muted)]">
          {{ authMode === 'login' ? '还没有账号？' : '已有账号？' }}
          <button class="font-bold text-[var(--brand)]" @click="switchMode">{{ authMode === 'login' ? '立即注册' : '返回登录' }}</button>
        </p>
      </section>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ArrowRight, X } from '@lucide/vue'
import { useStore } from '../composables/useStore'

const { authOpen, authMode, closeAuth, login, register } = useStore()
const form = reactive({ name: '', email: '', password: '' })
const error = ref('')

const switchMode = () => {
  authMode.value = authMode.value === 'login' ? 'register' : 'login'
  error.value = ''
}

const submit = () => {
  if (!form.email || form.password.length < 6 || (authMode.value === 'register' && !form.name)) {
    error.value = '请填写完整信息，密码至少 6 位。'
    return
  }
  if (authMode.value === 'login') login(form)
  else register(form)
  error.value = ''
  closeAuth()
}
</script>
