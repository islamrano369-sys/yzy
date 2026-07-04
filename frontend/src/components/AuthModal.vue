<template>
  <Teleport to="body">
    <div v-if="authOpen" class="fixed inset-0 z-50 grid place-items-center bg-[#090714]/70 p-4 backdrop-blur-md" @click.self="closeAuth">
      <section class="surface-card reveal w-full max-w-md p-6 sm:p-8" role="dialog" aria-modal="true" aria-label="注册登录">
        <div class="mb-7 flex items-start justify-between">
          <div>
            <p class="kicker">
              {{ authMode === 'login' ? 'Welcome back' : (authMode === 'register' ? 'Join NOVA' : 'Verify Email') }}
            </p>
            <h2 class="text-3xl font-extrabold tracking-[-0.04em]">
              {{ authMode === 'login' ? '继续你的创造' : (authMode === 'register' ? '创建学习账号' : '等待激活') }}
            </h2>
          </div>
          <button class="grid size-10 place-items-center rounded-full bg-[var(--bg)]" aria-label="关闭弹窗" @click="closeAuth"><X :size="18" /></button>
        </div>

        <div v-if="authMode === 'activation-sent'" class="py-4 text-center">
          <div class="w-16 h-16 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl">
            ✓
          </div>
          <p class="text-sm text-slate-400 mb-6 leading-relaxed">
            我们已向您的邮箱 <strong class="text-slate-200">{{ form.email }}</strong> 发送了一封激活邮件。<br>
            请前往该邮箱并点击邮件中的激活链接以启用您的账号。
          </p>
          <button class="btn-primary w-full py-3 flex items-center justify-center gap-2" @click="authMode = 'login'">
            已激活，去登录
            <ArrowRight :size="17" />
          </button>
        </div>

        <form v-else class="grid gap-4" @submit.prevent="submit">
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
          <button class="btn-primary mt-2 w-full flex items-center justify-center gap-2" type="submit">
            {{ authMode === 'login' ? '登录' : '创建账号' }}
            <ArrowRight :size="17" />
          </button>
        </form>

        <p v-if="authMode !== 'activation-sent'" class="mt-6 text-center text-sm text-[var(--muted)]">
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

const submit = async () => {
  if (!form.email || form.password.length < 6 || (authMode.value === 'register' && !form.name)) {
    error.value = '请填写完整信息，密码至少 6 位。'
    return
  }
  error.value = ''
  try {
    if (authMode.value === 'login') {
      await login(form)
      closeAuth()
    } else {
      await register(form)
      authMode.value = 'activation-sent'
    }
  } catch (err) {
    if (err.response && err.response.data) {
      const data = err.response.data
      if (typeof data === 'object') {
        const keys = Object.keys(data)
        if (keys.length > 0) {
          const firstKey = keys[0]
          const firstError = data[firstKey]
          error.value = `${firstKey === 'username' ? '邮箱' : firstKey}: ${Array.isArray(firstError) ? firstError[0] : firstError}`
        } else {
          error.value = '提交失败，请检查输入。'
        }
      } else {
        error.value = String(data)
      }
    } else {
      error.value = '连接服务失败，请确认后端已启动并连接数据库！'
    }
  }
}
</script>
