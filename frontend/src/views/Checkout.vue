<template>
  <NotFound v-if="!item" />
  <section v-else class="section-space min-h-[75vh] bg-[var(--bg-soft)]">
    <div class="page-shell max-w-5xl">
      <div v-if="status === 'success'" class="surface-card mx-auto max-w-2xl p-8 text-center sm:p-12">
        <span class="mx-auto grid size-20 place-items-center rounded-full bg-[var(--mint)] text-[#17142f]"><Check :size="38" /></span><p class="kicker mt-8">Payment complete</p><h1 class="text-4xl font-black tracking-[-.05em]">支付成功</h1><p class="mt-4 text-[var(--muted)]">{{ type === 'course' ? '课程已加入“我的课程”。' : '会员权益已即时生效。' }}</p><RouterLink to="/profile" class="btn-primary mt-8">前往个人中心 <ArrowRight :size="17" /></RouterLink>
      </div>
      <template v-else>
        <p class="kicker">Secure checkout</p><h1 class="section-title mb-10">确认订单</h1>
        <div class="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div class="surface-card p-7"><h2 class="text-xl font-black">支付方式</h2><button class="mt-6 flex w-full items-center justify-between rounded-[20px] border-2 border-[#1677ff] bg-[#1677ff]/8 p-5 text-left"><span class="flex items-center gap-4"><span class="grid size-11 place-items-center rounded-xl bg-[#1677ff] font-black text-white">支</span><span><strong class="block">支付宝</strong><small class="text-[var(--muted)]">前端模拟支付，不产生真实扣款</small></span></span><CheckCircle2 class="text-[#1677ff]" :size="22" /></button><div class="mt-8 rounded-[18px] bg-[var(--bg)] p-5 text-sm leading-7 text-[var(--muted)]">当前项目只开发前端页面。点击确认支付后，将模拟处理状态并把订单写入本地浏览器。</div></div>
          <aside class="surface-card p-7"><h2 class="text-xl font-black">订单摘要</h2><div class="my-7 border-y border-[var(--line)] py-6"><span class="text-sm text-[var(--muted)]">{{ type === 'course' ? '在线课程' : '会员套餐' }}</span><h3 class="mt-2 text-2xl font-black">{{ item.title }}</h3></div><div class="flex items-end justify-between"><span class="text-sm text-[var(--muted)]">应付金额</span><strong class="text-4xl">¥{{ item.price }}</strong></div><button class="btn-primary mt-8 w-full" :disabled="status === 'processing'" @click="pay">{{ status === 'processing' ? '支付处理中…' : '确认支付宝支付' }}</button></aside>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRight, Check, CheckCircle2 } from '@lucide/vue'
import NotFound from './NotFound.vue'
import { plans } from '../data/site'
import { useStore } from '../composables/useStore'

const route = useRoute()
const router = useRouter()
const { user, openAuth, purchaseCourse, purchaseMembership, courses } = useStore()
const type = computed(() => route.params.type)
const item = computed(() => type.value === 'course' ? courses.value.find((entry) => entry.slug === route.params.id) : plans.find((entry) => entry.id === route.params.id))
const status = ref('idle')
if (!user.value) {
  openAuth('login')
  router.replace('/')
}
const pay = () => {
  status.value = 'processing'
  window.setTimeout(() => {
    if (type.value === 'course') purchaseCourse(item.value)
    else purchaseMembership(item.value)
    status.value = 'success'
  }, 900)
}
</script>
