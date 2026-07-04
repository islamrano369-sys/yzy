<template>
  <div>
    <section class="border-b border-[var(--line)] py-24"><div class="page-shell text-center"><p class="kicker">NOVA membership</p><h1 class="section-title mx-auto">把 AI 变成长期生产力。</h1><p class="section-copy mx-auto mt-7">解锁全部智能体、会员工作流和课程折扣。按你的使用周期选择套餐。</p></div></section>
    <section class="section-space"><div class="page-shell grid gap-5 lg:grid-cols-3"><PricingCard v-for="plan in plans" :key="plan.id" :plan="plan" @select="selectPlan" /></div></section>
    <section class="section-space bg-[var(--bg-soft)]"><div class="page-shell grid gap-14 lg:grid-cols-[.75fr_1.25fr]"><div><p class="kicker">Common questions</p><h2 class="section-title">购买前常见问题</h2></div><FaqList :items="faqs" /></div></section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import FaqList from '../components/FaqList.vue'
import PricingCard from '../components/PricingCard.vue'
import { faqs, plans } from '../data/site'
import { useStore } from '../composables/useStore'
const router = useRouter()
const { user, openAuth } = useStore()
const selectPlan = (plan) => {
  if (!user.value) return openAuth('login')
  router.push(`/checkout/membership/${plan.id}`)
}
</script>
