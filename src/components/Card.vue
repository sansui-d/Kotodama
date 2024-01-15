<script setup lang="ts">
import { reactive } from 'vue';
import type { ICardProps } from '@/constants/types'
const props = defineProps<ICardProps & { onCardClick?: (cardData?: ICardProps) => void }>()
const cardData  = reactive({ ...props });
const cardBackground = ['bg-emerald-100', 'bg-indigo-400', 'bg-red-200']
const handleCardClick = () => {
  props.onCardClick && props.onCardClick(cardData)
}
</script>

<template>
  <div v-if="cardData?.isEmpyt"></div>
  <div v-else 
    :class="`card inline-block p-1 cursor-pointer ${cardBackground[cardData?.risk ?? 0]}`" 
    @click="handleCardClick"
  >
    <div class="text-[0.5rem]">{{ cardData?.index }}</div>
    <div class="text-xs">{{ cardData?.name }}</div>
    <div class="text-xs">{{ cardData?.blood }}</div>
    <div class="text-xs">{{ cardData?.risk }}</div>
  </div>
</template>

<style scoped></style>
