<template>
  <div>
    <button id="counter" @click="increment">{{ count }}</button>
    <div class="btnBox"><button @click="clearDate">clear date</button></div>
    <div>
      <NDatePicker
        class="input-box-date w-100"
        v-model:formatted-value="date"
        value-format="yyyy-MM-dd'T'HH:mm:ss"
        type="datetime"
        clearable
        update-value-on-close
      />
    </div>
    <div>
      <Paginator :rows="10" :totalRecords="120"></Paginator>
    </div>
  </div>
</template>
<script setup>
import Paginator from "primevue/paginator";
import { ref, nextTick } from "vue";
import { NDatePicker } from "naive-ui";
const count = ref(0);
const date = ref("2024-12-31T00:00:00");
async function increment() {
  count.value++;

  // DOM not yet updated
  console.log(document.getElementById("counter").textContent); // 0
  await nextTick();
  // DOM is now updated
  console.log(document.getElementById("counter").textContent); // 1
}
const clearDate = () => {
  date.value = null;
};
</script>
<style lang="scss" scoped>
.btnBox {
  margin: 20px 0;
}
</style>
