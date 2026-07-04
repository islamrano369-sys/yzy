<template>
  <section class="section-space min-h-[75vh]">
    <div class="page-shell">
      <div class="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p class="kicker">Personal center</p><h1 class="section-title">你好，{{ user?.name }}</h1></div><button class="btn-secondary" @click="logoutAndLeave">退出登录</button></div>
      <div class="grid gap-6 lg:grid-cols-[260px_1fr]">
        <nav class="surface-card flex h-fit gap-2 p-3 lg:grid"><button v-for="item in tabs" :key="item.id" class="flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold" :class="active === item.id ? 'bg-[var(--surface-strong)] text-[var(--brand)]' : 'text-[var(--muted)]'" @click="active = item.id"><component :is="item.icon" :size="18" />{{ item.label }}</button></nav>
        <div class="surface-card p-6 sm:p-8">
          <div v-if="active === 'profile'"><h2 class="text-2xl font-black">个人信息</h2><div class="mt-8 flex items-center gap-5"><span class="grid size-20 place-items-center rounded-[24px] bg-[var(--lavender)] text-3xl font-black text-[#17142f]">{{ user?.name.slice(0, 1).toUpperCase() }}</span><div><strong class="text-xl">{{ user?.name }}</strong><p class="mt-1 text-[var(--muted)]">{{ user?.email }}</p></div></div><div class="mt-8 rounded-[22px] bg-[var(--bg)] p-5"><span class="text-sm text-[var(--muted)]">会员状态</span><p class="mt-2 text-lg font-black">{{ isMember ? membership.title : '普通用户' }}</p></div></div>
          <div v-if="active === 'courses'"><h2 class="text-2xl font-black">我的课程</h2><div v-if="purchasedCourses.length" class="mt-7 grid gap-4"><article v-for="course in purchasedCourses" :key="course.slug" class="rounded-[22px] border border-[var(--line)] p-5"><div class="flex items-center justify-between"><strong>{{ course.title }}</strong><span class="text-sm text-[var(--muted)]">{{ course.progress }}%</span></div><div class="mt-4 h-2 rounded-full bg-[var(--bg-soft)]"><div class="h-full rounded-full bg-[var(--coral)]" :style="{ width: `${course.progress}%` }"></div></div></article></div><EmptyState v-else title="还没有购买课程" link="/courses" action="查看课程" /></div>
          <div v-if="active === 'orders'"><h2 class="text-2xl font-black">会员订单</h2><div v-if="orders.length" class="mt-7 grid gap-3"><article v-for="order in orders" :key="order.number" class="grid gap-3 rounded-[20px] border border-[var(--line)] p-5 sm:grid-cols-[1fr_auto_auto] sm:items-center"><div><strong>{{ order.title }}</strong><p class="mt-1 text-xs text-[var(--muted)]">{{ order.number }} · {{ order.date }}</p></div><span class="text-sm font-bold text-[var(--brand)]">{{ order.status }}</span><strong>¥{{ order.amount }}</strong></article></div><EmptyState v-else title="暂无订单记录" link="/membership" action="查看会员" /></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { BookOpen, ReceiptText, UserRound } from '@lucide/vue'
import { useStore } from '../composables/useStore'
const router = useRouter()
const { user, membership, isMember, purchasedCourses, orders, openAuth, logout } = useStore()
const active = ref('profile')
const tabs = [{ id: 'profile', label: '个人信息', icon: UserRound }, { id: 'courses', label: '我的课程', icon: BookOpen }, { id: 'orders', label: '会员订单', icon: ReceiptText }]
const EmptyState = (props) => h('div', { class: 'mt-7 rounded-[22px] bg-[var(--bg)] p-8 text-center' }, [h('p', { class: 'text-[var(--muted)]' }, props.title), h('a', { href: props.link, class: 'btn-secondary mt-5' }, props.action)])
onMounted(() => { if (!user.value) { openAuth('login'); router.replace('/') } })
const logoutAndLeave = () => { logout(); router.push('/') }
</script>
