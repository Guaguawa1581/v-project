<template>
  <div class="grid-container">
    <!-- q: 這樣有多個同名稱的slot了嗎？ -->
    <div v-for="(item, index) in tempList" :key="index" class="grid-item">
      <slot name="item" :index="index" v-bind="item">
        <!-- 插槽的默認內容 -->
        <div>默認內容：{{ item }}</div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef } from "vue";
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});
const tempList = toRef(props, "list");
// 定義 gridItems 列表
// const gridItems = ref(["Apple", "Banana", "Cherry", "Date"]);
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.grid-item {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  border-radius: 5px;
}
</style>
