<template>
  <article class="relative flex flex-col rounded-[28px] border p-7" :class="plan.featured ? 'border-[var(--coral)] bg-[var(--surface)] shadow-[var(--shadow)]' : 'border-[var(--line)] bg-[var(--surface)]'">
    <span v-if="plan.featured" class="absolute right-5 top-5 rounded-full bg-[var(--coral)] px-3 py-1 text-xs font-black text-[#17142f]">推荐</span>
    <h3 class="text-2xl font-extrabold">{{ plan.title }}</h3>
    <p class="mt-2 text-sm text-[var(--muted)]">{{ plan.description }}</p>
    <div class="my-7"><span class="text-5xl font-black tracking-[-0.06em]">¥{{ plan.price }}</span><span class="text-sm text-[var(--muted)]">{{ plan.period }}</span></div>
    <ul class="mb-8 grid gap-4">
      <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-3 text-sm"><Check :size="17" class="text-[var(--brand)]" />{{ feature }}</li>
    </ul>
    <button class="mt-auto" :class="plan.featured ? 'btn-primary' : 'btn-secondary'" @click="$emit('select', plan)">选择{{ plan.title }}</button>
  </article>
</template>

<script setup>
import { Check } from '@lucide/vue'
defineProps({ plan: { type: Object, required: true } })
defineEmits(['select'])
</script>
