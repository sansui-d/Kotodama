<script setup lang="ts">
import CardList from '@/components/CardList.vue'
import { BLOODLINE_ORIGIN, RISK_LEVEL } from '@/constants/enum'
const data = [
  {
    index: 1,
    name: '皇帝',
    blood: BLOODLINE_ORIGIN.BLACK,
    risk: RISK_LEVEL.NONE
  },
  {
    index: 2,
    name: '血系结罗',
    blood: BLOODLINE_ORIGIN.BLACK,
    risk: RISK_LEVEL.LOW
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  },
  {
    isEmpyt: true
  }
]
</script>

<template>
  <div class="title text-center text-lg text-emerald-400">Dragon Raja - Kotodama</div>
  <div class="card-list">
    <CardList :cardListData="data" />
  </div>
</template>

<style scoped></style>
