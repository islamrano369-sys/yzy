<template>
  <div class="min-h-screen bg-[#090714] text-slate-100 font-sans flex flex-col justify-center items-center px-4 relative overflow-hidden">
    <!-- Background glows -->
    <div class="absolute w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -top-40 -left-40"></div>
    <div class="absolute w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] -bottom-40 -right-40"></div>

    <div class="w-full max-w-md z-10 text-center">
      <!-- Logo -->
      <div class="flex items-center justify-center gap-3 mb-8">
        <span class="grid size-10 place-items-center rounded-xl bg-[var(--mint)] font-black text-[#17142f] text-xl">N</span>
        <span class="text-2xl font-black tracking-[-0.04em]">NOVA AI</span>
      </div>

      <!-- Glass Card -->
      <div class="bg-slate-900/60 border border-slate-800/80 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl">
        <!-- Loading State -->
        <div v-if="state === 'loading'" class="py-6 flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-t-teal-400 border-slate-800 mb-6"></div>
          <h2 class="text-xl font-bold mb-2">正在激活账号...</h2>
          <p class="text-sm text-slate-400">正在向服务器验证您的激活令牌，请稍后。</p>
        </div>

        <!-- Success State -->
        <div v-else-if="state === 'success'" class="py-6">
          <div class="w-16 h-16 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ✓
          </div>
          <h2 class="text-2xl font-extrabold text-white mb-3">账号激活成功！</h2>
          <p class="text-sm text-slate-400 mb-8 leading-relaxed">
            您的账户已被成功启用。您现在可以登录并开启您的 AI 编程与智能体创造之旅了。
          </p>
          <button 
            @click="goToLogin"
            class="btn-primary w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            立即去登录
          </button>
        </div>

        <!-- Error State -->
        <div v-else class="py-6">
          <div class="w-16 h-16 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-light">
            ✕
          </div>
          <h2 class="text-2xl font-extrabold text-white mb-3">激活链接失效</h2>
          <p class="text-sm text-slate-400 mb-8 leading-relaxed">
            可能由于激活链接已过期、已被使用过，或网络请求超时导致。请确认是否已经激活过，或尝试重新注册。
          </p>
          <div class="flex flex-col gap-3">
            <button 
              @click="goToHome"
              class="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300 text-sm"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../utils/api'
import { useStore } from '../composables/useStore'

const route = useRoute()
const router = useRouter()
const { openAuth } = useStore()

// State: 'loading' | 'success' | 'error'
const state = ref('loading')

onMounted(async () => {
  const { uid, token } = route.params
  if (!uid || !token) {
    state.value = 'error'
    return
  }

  try {
    // Send activation post request to Djoser activation endpoint
    await api.post('/api/auth/users/activation/', {
      uid,
      token
    })
    state.value = 'success'
  } catch (error) {
    console.error('账号激活出错:', error)
    state.value = 'error'
  }
})

const goToLogin = () => {
  router.push('/').then(() => {
    // Wait a brief moment for page redirect before opening login modal
    setTimeout(() => {
      openAuth('login')
    }, 100)
  })
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.btn-primary {
  background: linear-gradient(135deg, var(--mint) 0%, #10b981 100%);
  color: #17142f;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);
}
.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>
