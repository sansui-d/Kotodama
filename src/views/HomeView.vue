<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CardList from '@/components/CardList.vue'
import CardWrapper from '@/components/CardWrapper.vue'
import { kotodama } from '@/constants/constants'
import { useCardWrapperStore } from '@/stores/cardWrapperDataStore'
import type { ICardProps } from '@/constants/types'
const { cardData } = storeToRefs(useCardWrapperStore())
const { setCardWrapperData } = useCardWrapperStore()
const handleCardClick = (card?: ICardProps) => {
  setCardWrapperData({ ...card })
}
</script>

<template>
  <div class="title text-center text-lg text-emerald-400">Dragon Raja - Kotodama</div>
  <div class="card-list">
    <CardList :cardListData="kotodama" :onCardClick="handleCardClick" />
  </div>
  <CardWrapper :cardData="cardData" />
</template>

<style scoped></style>
