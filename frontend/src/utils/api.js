import axios from 'axios'

// 创建 Axios 实例
const api = axios.create({
  baseURL: '', // 开发环境下使用 Vite 配置的 Proxy 代理，所以 baseURL 为空
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 从 localStorage 中获取 JWT Access Token 并注入请求头
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 统一处理返回数据
    return response.data
  },
  error => {
    // 统一处理响应错误
    console.error('API 请求出错:', error)
    return Promise.reject(error)
  }
)

export default api
