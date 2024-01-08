<script setup lang="ts">
import type { ICardProps } from '@/constants/types'
import { useCardWrapperStore } from '@/stores/cardWrapperDataStore'
const props = defineProps<ICardProps>()
const { setCardWrapperData } = useCardWrapperStore()
const cardBackground = ['bg-emerald-100', 'bg-indigo-400', 'bg-red-200']
const handleClick = () => {
  console.log({ ...props })
  setCardWrapperData({ ...props })
}
</script>

<template>
  <div v-if="isEmpyt"></div>
  <div v-else :class="`card inline-block p-1 cursor-pointer ${cardBackground[risk ?? 0]}`" @click="handleClick">
    <div class="text-[0.5rem]">{{ index }}</div>
    <div class="text-xs">{{ name }}</div>
    <div class="text-xs">{{ blood }}</div>
    <div class="text-xs">{{ risk }}</div>
  </div>
</template>

<style scoped></style>
