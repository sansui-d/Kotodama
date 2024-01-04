<script setup lang="ts">
import { BLOODLINE_ORIGIN, RISK_LEVEL } from '@/constants/enum'
defineProps<{
  index?: number
  name?: string
  blood?: BLOODLINE_ORIGIN
  risk?: RISK_LEVEL
  isEmpyt?: boolean
}>()
const cardBackground = ['bg-emerald-100', 'bg-indigo-400']
</script>

<template>
  <div v-if="isEmpyt"></div>
  <div v-else :class="`card inline-block p-1 ${cardBackground[risk ?? 0]}`">
    <div class="text-[0.5rem]">{{ index }}</div>
    <div class="text-xs">{{ name }}</div>
    <div class="text-xs">{{ blood }}</div>
    <div class="text-xs">{{ risk }}</div>
  </div>
</template>

<style scoped></style>
