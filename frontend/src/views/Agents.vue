<template>
  <div>
    <section class="border-b border-[var(--line)] bg-[#17142f] py-24 text-white"><div class="page-shell"><p class="kicker !text-[var(--mint)]">Industry AI agents</p><h1 class="section-title max-w-4xl">不是聊天机器人，<br>是进入业务流程的工作伙伴。</h1><p class="mt-7 max-w-2xl text-lg leading-8 text-white/65">选择行业智能体，查看能力并直接执行任务。会员可解锁全部工作台。</p></div></section>
    <section class="section-space"><div class="page-shell"><div class="mb-9 flex flex-wrap gap-2"><button v-for="item in filters" :key="item" class="rounded-full border px-4 py-2 text-sm font-bold" :class="active === item ? 'border-[var(--brand)] bg-[var(--brand)] text-white' : 'border-[var(--line)] bg-[var(--surface)]'" @click="active = item">{{ item }}</button></div><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4"><AgentCard v-for="agent in visibleAgents" :key="agent.slug" :agent="agent" /></div></div></section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AgentCard from '../components/AgentCard.vue'
import { agents } from '../data/site'
const filters = ['全部', '电商运营', '教育培训', '内容创作', '数据分析']
const active = ref('全部')
const visibleAgents = computed(() => active.value === '全部' ? agents : agents.filter((agent) => agent.industry === active.value))
</script>
