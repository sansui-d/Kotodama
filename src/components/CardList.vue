<script setup lang="ts">
import type { ICardProps } from '@/constants/types'
import Card from './Card.vue'
defineProps<{ cardListData?: ICardProps[]; onCardClick?: (cardData?: ICardProps) => void }>()
</script>

<template>
  <div class="card-list grid grid-cols-17 grid-rows-7">
    <Card v-for="card in cardListData" :key="card.index" v-bind="{ ...card }" :onCardClick="onCardClick" />
  </div>
</template>

<style scoped></style>
