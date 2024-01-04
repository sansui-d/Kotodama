<script setup lang="ts">
import { BLOODLINE_ORIGIN, RISK_LEVEL } from '@/constants/enum'
import Card from './Card.vue'
defineProps<{
  cardListData?: {
    index?: number
    name?: string
    blood?: BLOODLINE_ORIGIN
    risk?: RISK_LEVEL
    isEmpyt?: boolean
  }[]
}>()
</script>

<template>
  <div class="card-list grid grid-cols-17">
    <Card
      v-for="card in cardListData"
      :key="card.index"
      :index="card.index"
      :name="card.name"
      :blood="card.blood"
      :risk="card.risk"
      :isEmpyt="card.isEmpyt"
    />
  </div>
</template>

<style scoped></style>
