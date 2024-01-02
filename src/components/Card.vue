<script setup lang="ts">
import { BLOODLINE_ORIGIN, RISK_LEVEL } from '@/constants/enum'
defineProps<{
  index: string
  name: string
  blood: BLOODLINE_ORIGIN
  risk: RISK_LEVEL
}>()
</script>

<template>
  <div class="card inline-block p-1">
    <div class="text-[0.5rem]">{{ index }}</div>
    <div class="text-xs">{{ name }}</div>
    <div class="text-xs">{{ blood }}</div>
    <div class="text-xs">{{ risk }}</div>
  </div>
</template>

<style scoped></style>
