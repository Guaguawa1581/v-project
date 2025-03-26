<template>
  <div class="container">
    <h1>期貨槓桿保證金計算器</h1>
    <div>
      <label>選擇商品類型：</label>
      <select v-model="selectedType" @change="resetForm">
        <option value="stock">個股</option>
        <option value="index">指數</option>
      </select>
    </div>

    <div v-if="selectedType === 'stock'">
      <h2>個股</h2>
      <label>
        操作數量：
        <input type="number" v-model.number="stockData.quantity" />
      </label>
      <label>
        目前股價：
        <input type="number" v-model.number="stockData.price" />
      </label>
    </div>

    <div v-if="selectedType === 'index'">
      <h2>指數</h2>
      <label>
        每點價值：
        <input type="number" v-model.number="indexData.valuePerPoint" />
      </label>
      <label>
        目前點數：
        <input type="number" v-model.number="indexData.currentPoints" />
      </label>
    </div>

    <div>
      <h2>計算結果</h2>
      <p>實際價值：{{ actualValue }}</p>
      <p v-if="selectedType === 'stock'">原始保證金：{{ initialMargin }}</p>
      <p v-if="selectedType === 'stock'">維持保證金：{{ maintenanceMargin }}</p>
      <p v-if="selectedType === 'index'">
        原始保證金：{{ indexMarginData.initialMargin }}
      </p>
      <p v-if="selectedType === 'index'">
        維持保證金：{{ indexMarginData.maintenanceMargin }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
// 預設為個股
const selectedType = ref("stock");
const indexOptions = ref([
  { label: "選擇商品類型", value: "" },
  { type: "index", code: "TMF", label: "微型台指期", tempIndex: 0, value: 10 },
]);
const stockOptions = ref([
  { label: "選擇商品類型", value: "" },
  { type: "stock", code: "2330", label: "微台積電", tempIndex: 0, value: 200 },
]);

const stockData = ref({
  quantity: 0,
  price: 0,
});
const indexData = ref({
  valuePerPoint: 0,
  currentPoints: 0,
});
const indexMarginData = ref({
  initialMargin: 50000, // 固定的原始保證金
  maintenanceMargin: 45000, // 固定的維持保證金
});

const actualValue = computed(() => {
  if (selectedType.value === "stock") {
    return stockData.value.quantity * stockData.value.price;
  }
  if (selectedType.value === "index") {
    return indexData.value.valuePerPoint * indexData.value.currentPoints;
  }
  return 0;
});

const initialMargin = computed(() => {
  if (selectedType.value === "stock") {
    return (actualValue.value * 10.35) / 100;
  }
  return 0;
});

const maintenanceMargin = computed(() => {
  if (selectedType.value === "stock") {
    return (actualValue.value * 13.5) / 100;
  }
  return 0;
});

const resetForm = () => {
  stockData.value = { quantity: 0, price: 0 };
  indexData.value = { valuePerPoint: 0, currentPoints: 0 };
};
</script>
