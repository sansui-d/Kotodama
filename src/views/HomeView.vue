<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import CardList from '@/components/CardList.vue'
import CardWrapper from '@/components/CardWrapper.vue'
import { kotodama } from '@/constants/constants'
import { useCardWrapperStore } from '@/stores/cardWrapperDataStore'
import type { ICardProps } from '@/constants/types'

const { cardData } = storeToRefs(useCardWrapperStore())
const { setCardWrapperData } = useCardWrapperStore()
const showCardWrapper = ref(false);

const handleCardClick = (card?: ICardProps) => {
  setCardWrapperData({ ...card })
  showCardWrapper.value = true
}

const handleCloseWrapper = () => {
  showCardWrapper.value = false
}
</script>

<template>
  <div class="title text-center text-lg text-emerald-400">Dragon Raja - Kotodama</div>
  <div class="card-list">
    <CardList :cardListData="kotodama" :onCardClick="handleCardClick" />
  </div>
  <CardWrapper v-if="showCardWrapper" :cardData="cardData" :onClose="handleCloseWrapper" />
</template>

<style scoped></style>
