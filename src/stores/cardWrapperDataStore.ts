import { ref } from "vue";
import { defineStore } from "pinia";
import type { ICardProps } from '@/constants/types'

export const useCardWrapperStore = defineStore("card-wrapper", () => {
  const cardData = ref<ICardProps>({});
  function setCardWrapperData(data: ICardProps) {
    cardData.value = data
  }

  return { cardData, setCardWrapperData };
});
