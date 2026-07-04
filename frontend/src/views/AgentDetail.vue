<template>
  <NotFound v-if="!agent" />
  <div v-else>
    <section class="border-b border-[var(--line)] py-20"><div class="page-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr]"><div><RouterLink to="/agents" class="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--muted)]"><ArrowLeft :size="16" /> 返回智能体</RouterLink><p class="kicker">{{ agent.industry }}</p><h1 class="text-[clamp(54px,7vw,88px)] font-black leading-[.93] tracking-[-.07em]">{{ agent.name }}</h1><p class="section-copy mt-7">{{ agent.description }}</p><div class="mt-9 rounded-[20px] bg-[var(--surface-strong)] p-5"><span class="text-xs font-black text-[var(--brand)]">工作流</span><p class="mt-2 font-bold">{{ agent.capability }}</p></div></div>
      <div class="surface-card p-6 sm:p-8"><div class="mb-7 flex items-center justify-between"><div><p class="text-sm text-[var(--muted)]">NOVA AGENT</p><h2 class="text-2xl font-black">任务工作台</h2></div><span class="grid size-12 place-items-center rounded-2xl bg-[var(--lavender)] text-[#17142f]"><Bot :size="25" /></span></div>
        <template v-if="isMember"><label class="grid gap-3 text-sm font-bold">输入任务<textarea v-model="prompt" class="input-field min-h-36 resize-none" :placeholder="agent.sample"></textarea></label><p v-if="error" class="mt-3 text-sm font-bold text-[var(--coral)]">{{ error }}</p><button class="btn-primary mt-5 w-full" @click="run">运行智能体 <Sparkles :size="17" /></button><div v-if="result" class="mt-6 rounded-[20px] bg-[var(--bg)] p-5 leading-8"><strong class="mb-2 block text-sm text-[var(--brand)]">执行结果</strong>{{ result }}</div></template>
        <div v-else class="rounded-[24px] border border-[var(--line)] bg-[var(--bg)] p-7 text-center"><LockKeyhole :size="30" class="mx-auto text-[var(--brand)]" /><h3 class="mt-5 text-2xl font-black">会员专属工作台</h3><p class="mt-3 leading-7 text-[var(--muted)]">开通会员后解锁全部行业智能体和持续更新的工作流。</p><RouterLink to="/membership" class="btn-primary mt-6">查看会员套餐</RouterLink></div>
      </div></div></section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Bot, LockKeyhole, Sparkles } from '@lucide/vue'
import NotFound from './NotFound.vue'
import { agents } from '../data/site'
import { useStore } from '../composables/useStore'
const route = useRoute()
const agent = computed(() => agents.find((item) => item.slug === route.params.slug))
const { isMember } = useStore()
const prompt = ref('')
const error = ref('')
const result = ref('')
const run = () => {
  if (!prompt.value.trim()) { error.value = '请输入一个具体任务。'; return }
  error.value = ''
  result.value = agent.value.result
}
</script>
