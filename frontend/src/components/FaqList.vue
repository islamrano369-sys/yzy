<template>
  <div class="divide-y divide-[var(--line)] border-y border-[var(--line)]">
    <article v-for="([question, answer], index) in items" :key="question">
      <button class="flex w-full items-center justify-between gap-4 py-6 text-left text-lg font-bold" @click="active = active === index ? -1 : index">
        {{ question }}
        <Plus :size="19" class="shrink-0 transition" :class="{ 'rotate-45': active === index }" />
      </button>
      <p v-if="active === index" class="max-w-3xl pb-6 leading-8 text-[var(--muted)]">{{ answer }}</p>
    </article>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@lucide/vue'
defineProps({ items: { type: Array, required: true } })
const active = ref(0)
</script>
