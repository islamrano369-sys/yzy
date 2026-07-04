<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col justify-between">
    <!-- Navbar -->
    <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <span class="text-2xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">YZY Workspace</span>
        </div>
        <nav class="flex items-center space-x-6">
          <router-link to="/" class="text-sm font-medium text-teal-400 hover:text-teal-300 transition">首页</router-link>
          <router-link to="/login" class="text-sm font-medium text-slate-300 hover:text-white transition">登录页演示</router-link>
          <a href="http://127.0.0.1:8000/admin/" target="_blank" class="text-sm font-medium text-slate-300 hover:text-white transition">管理后台</a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-6 py-12">
      <!-- Hero Section -->
      <section class="text-center py-8 mb-12">
        <h1 class="text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-teal-300 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          YZY 项目全栈框架已成功搭建！
        </h1>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto">
          基于现代化的前后端分离架构，集成了企业级开发最佳实践。前端采用轻量高速的 Vue 3 与 Tailwind CSS，后端使用稳健的 Django 与 MySQL。
        </p>
      </section>

      <!-- Grid Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- Tech Stack Card -->
        <div class="bg-slate-800/50 border border-slate-700/60 p-8 rounded-2xl shadow-xl backdrop-blur">
          <h2 class="text-2xl font-bold text-teal-300 mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-teal-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
            技术栈配置
          </h2>
          <ul class="space-y-4">
            <li class="flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-teal-400"></span>
              <span><strong>前端框架：</strong>Vue 3 (Composition API) + Vite</span>
            </li>
            <li class="flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
              <span><strong>样式系统：</strong>Tailwind CSS v4 (极速渲染)</span>
            </li>
            <li class="flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-purple-400"></span>
              <span><strong>数据请求：</strong>Axios (集成统一拦截器)</span>
            </li>
            <li class="flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-rose-400"></span>
              <span><strong>后端服务：</strong>Django 6.0 + Django REST Framework</span>
            </li>
            <li class="flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span><strong>数据库：</strong>MySQL (ORM 模型映射)</span>
            </li>
            <li class="flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span><strong>后台管理：</strong>Django SimpleUI (中文主题)</span>
            </li>
          </ul>
        </div>

        <!-- API Integration Card -->
        <div class="bg-slate-800/50 border border-slate-700/60 p-8 rounded-2xl shadow-xl backdrop-blur flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-bold text-indigo-300 mb-6 flex items-center">
              <svg class="w-6 h-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              前后端 API 联调测试
            </h2>
            <p class="text-slate-400 text-sm mb-6 leading-relaxed">
              测试当前前端项目能否通过 Vite 开发服务器代理（Proxy）成功调用 Django 后端的 RESTful 接口。
            </p>

            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-300 space-y-2 mb-6">
              <div><strong>请求路径：</strong><span class="text-yellow-400">GET /api/status/</span></div>
              <div>
                <strong>后端状态：</strong>
                <span v-if="loadingStatus" class="text-slate-400">正在检查...</span>
                <span v-else-if="apiStatus === 'success'" class="text-emerald-400 font-bold">连接成功 (HTTP 200)</span>
                <span v-else class="text-rose-400 font-bold">连接失败 (未运行或密码配置错误)</span>
              </div>
              <div v-if="apiResponse" class="mt-2 pt-2 border-t border-slate-800 text-slate-400">
                {{ apiResponse }}
              </div>
            </div>
          </div>

          <button 
            @click="checkBackendStatus" 
            :disabled="loadingStatus"
            class="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 transform active:scale-95 shadow-md flex items-center justify-center space-x-2"
          >
            <span v-if="loadingStatus">检测中...</span>
            <span v-else>立即测试连接</span>
          </button>
        </div>
      </div>

      <!-- RESTful CRUD Database demonstration -->
      <section class="bg-slate-800/30 border border-slate-700/40 rounded-2xl p-8 mb-12">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl font-extrabold text-white mb-2">系统消息 (MySQL ORM 联调演示)</h2>
            <p class="text-slate-400 text-sm">
              利用 RESTful API (`/api/messages/`) 对 MySQL 数据库进行增删改查测试。请确保本地 MySQL 已运行且配置完备。
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Add message form -->
          <div class="lg:col-span-1 bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h3 class="text-lg font-bold text-white mb-4">新增消息</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">标题</label>
                <input 
                  v-model="newMessage.title" 
                  type="text" 
                  placeholder="请输入消息标题"
                  class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">内容</label>
                <textarea 
                  v-model="newMessage.content" 
                  rows="4"
                  placeholder="请输入消息具体内容"
                  class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                ></textarea>
              </div>
              <button 
                @click="postMessage"
                :disabled="submitting"
                class="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2.5 rounded-lg transition text-sm flex items-center justify-center"
              >
                {{ submitting ? '发送中...' : '提交到 MySQL' }}
              </button>
            </div>
          </div>

          <!-- Message list -->
          <div class="lg:col-span-2 bg-slate-900/30 border border-slate-800/80 p-6 rounded-xl flex flex-col justify-between min-h-[300px]">
            <div>
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-white">消息列表</h3>
                <button @click="fetchMessages" class="text-xs text-teal-400 hover:text-teal-300 flex items-center space-x-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 4.89L20 6M4 4h5M4 4v5"></path></svg>
                  <span>刷新</span>
                </button>
              </div>

              <div v-if="loadingMessages" class="text-center py-12 text-slate-500 text-sm">
                正在加载数据...
              </div>

              <div v-else-if="messages.length === 0" class="text-center py-12 text-slate-500 text-sm border-2 border-dashed border-slate-800 rounded-lg">
                暂无消息。您可以在左侧提交新消息，或者在 Django 后台录入。
              </div>

              <div v-else class="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                <div 
                  v-for="msg in messages" 
                  :key="msg.id" 
                  class="bg-slate-800/40 border border-slate-700/40 p-4 rounded-lg flex items-start justify-between space-x-4 hover:border-slate-600 transition"
                >
                  <div class="space-y-1">
                    <h4 class="font-semibold text-white text-sm">{{ msg.title }}</h4>
                    <p class="text-slate-400 text-xs leading-relaxed">{{ msg.content }}</p>
                    <div class="text-[10px] text-slate-500 pt-1">ID: {{ msg.id }} | 创建时间: {{ formatTime(msg.created_at) }}</div>
                  </div>
                  <button 
                    @click="deleteMessage(msg.id)"
                    class="text-rose-400 hover:text-rose-300 text-xs p-1"
                    title="删除"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-800 py-6 text-center text-slate-500 text-xs">
      <div class="max-w-7xl mx-auto px-6">
        &copy; 2026 YZY Framework. All rights reserved. 根据 AGENTS.md 规范定制。
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../utils/api'

// Status check states
const apiStatus = ref('idle')
const apiResponse = ref(null)
const loadingStatus = ref(false)

// Messages state
const messages = ref([])
const loadingMessages = ref(false)
const submitting = ref(false)
const newMessage = ref({
  title: '',
  content: ''
})

// Check Django API status
const checkBackendStatus = async () => {
  loadingStatus.value = true
  apiStatus.value = 'idle'
  apiResponse.value = null
  try {
    const res = await api.get('/api/status/')
    apiStatus.value = 'success'
    apiResponse.value = res
  } catch (error) {
    apiStatus.value = 'error'
    apiResponse.value = error.message
  } finally {
    loadingStatus.value = false
  }
}

// Fetch messages list
const fetchMessages = async () => {
  loadingMessages.value = true
  try {
    const res = await api.get('/api/messages/')
    messages.value = res
  } catch (error) {
    console.error('获取消息失败:', error)
  } finally {
    loadingMessages.value = false
  }
}

// Create message
const postMessage = async () => {
  if (!newMessage.value.title || !newMessage.value.content) {
    alert('请填写标题和内容！')
    return
  }
  submitting.value = true
  try {
    await api.post('/api/messages/', newMessage.value)
    newMessage.value.title = ''
    newMessage.value.content = ''
    await fetchMessages()
  } catch (error) {
    alert('提交数据失败，请确认后端服务已启动且数据库可访问！')
    console.error(error)
  } finally {
    submitting.value = false
  }
}

// Delete message
const deleteMessage = async (id) => {
  if (!confirm('确认删除此条消息吗？')) return
  try {
    await api.delete(`/api/messages/${id}/`)
    await fetchMessages()
  } catch (error) {
    alert('删除数据失败！')
    console.error(error)
  }
}

// Helper to format iso strings
const formatTime = (isoString) => {
  const d = new Date(isoString)
  return d.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
}

onMounted(() => {
  checkBackendStatus()
  fetchMessages()
})
</script>
