<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-center items-center px-4 relative overflow-hidden">
    <!-- Background glow -->
    <div class="absolute w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -top-40 -left-40"></div>
    <div class="absolute w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] -bottom-40 -right-40"></div>

    <div class="w-full max-w-md z-10">
      <!-- Back Link -->
      <div class="mb-8">
        <router-link to="/" class="inline-flex items-center text-sm text-slate-400 hover:text-teal-400 transition space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span>返回首页</span>
        </router-link>
      </div>

      <!-- Card -->
      <div class="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold tracking-tight text-white mb-2">欢迎回来</h2>
          <p class="text-slate-400 text-sm">请输入您的账户密码登录 YZY 系统</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">用户名</label>
            <input 
              v-model="username" 
              type="text" 
              required
              placeholder="admin"
              class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">密码</label>
              <a href="#" class="text-xs text-teal-400 hover:text-teal-300">忘记密码？</a>
            </div>
            <input 
              v-model="password" 
              type="password" 
              required
              placeholder="••••••••"
              class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition"
            />
          </div>

          <div class="flex items-center">
            <input 
              id="remember-me" 
              type="checkbox" 
              v-model="rememberMe"
              class="h-4 w-4 rounded border-slate-800 bg-slate-950 text-teal-500 focus:ring-teal-500"
            />
            <label for="remember-me" class="ml-2 block text-xs text-slate-400">
              记住我的登录状态
            </label>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-xl transition duration-300 transform active:scale-95 shadow-md flex items-center justify-center space-x-2"
          >
            <span v-if="loading">正在登录...</span>
            <span v-else>立即登录</span>
          </button>
        </form>

        <div class="mt-8 text-center pt-6 border-t border-slate-800/60">
          <p class="text-xs text-slate-500">
            没有账号？
            <a href="#" class="text-teal-400 hover:text-teal-300 font-semibold">创建新账号</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const handleLogin = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    // Mock login save token
    localStorage.setItem('token', 'mock-jwt-token-value-yzy')
    alert(`登录成功！欢迎，${username.value || '管理员'}`)
    router.push('/')
  }, 1000)
}
</script>
