<template>
  <div @keydown="pageKeydownHandler">
    <h1>Barcode Scanner</h1>
    <div
      class="d-flex"
      tabindex="0"
      @focus="focusHandler"
      @blur="blurHandler"
      @keydown.stop
    >
      <p>Focus here and scan the barcode</p>
      <p v-if="barcode" class="barcode_text ms-4">
        Scanned Data: {{ barcode }}
      </p>
    </div>
    <div class="d-flex">
      <InputText
        class="me-2"
        v-model="orderNumber"
        placeholder="Enter order number"
        @focus="disablePageKeydown"
        @blur="enablePageKeydown"
        @keydown="justBarcodeReader"
      />
      <Button label="Submit" @click="submitOrderNumber" />
    </div>
    <div class="d-flex">
      <InputText
        class="me-2"
        v-model="tempBarcodeData"
        placeholder="Enter number"
        @keydown.stop="justBarcodeReader"
      />
      <Button
        severity="help"
        label="判斷鍵盤or掃描器"
        @click="clearTestBarcode"
      />

      <div class="ms-5">SCANNED: {{ tempShowBarcode }}</div>
    </div>
    <Button label="Submit" @click="submitBarcode" />
    <Button
      class="ms-2"
      severity="warn"
      @click="
        () => {
          barcode = '';
        }
      "
      >Clean</Button
    >
    <div v-if="submittedBarcode">
      <h2>Barcode Content:</h2>
      <p>{{ submittedBarcode }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const barcode = ref("");
const orderNumber = ref("");
const submittedBarcode = ref("");
let scannedData = ""; // 掃描字元
let isPageKeydownEnabled = true;

const submitBarcode = () => {
  submittedBarcode.value = barcode.value;
};
const submitOrderNumber = () => {
  console.log("Order number submitted:", orderNumber.value);
};
const inputBarcodeKey = (event) => {
  // console.log("Barcode keydown event:", event);
  // 驗證字元
  const validKeys = /^[!-~]$/;
  // 四段碼Regex "最多4字元-最多20字元-固定4位數字-任何字元"
  const woNoPattern = /^.{1,4}-.{1,20}-\d{4}-.+$/;

  if (validKeys.test(event.key)) {
    console.log("Scanned data:", event.key, event);
    scannedData += event.key;
  } else if (event.key === "Enter") {
    // $$$ is password
    // scannedData = scannedData.split("$$$")[1] || "";
    console.log("finalData", scannedData);
    if (woNoPattern.test(scannedData)) {
      barcode.value = scannedData;
    } else {
      window.$message.error("條碼格式錯誤");
    }

    scannedData = "";
  }
};
const pageKeydownHandler = (event) => {
  inputBarcodeKey(event);
};
const disablePageKeydown = () => {
  isPageKeydownEnabled = false;
};
const enablePageKeydown = () => {
  isPageKeydownEnabled = true;
};
const focusHandler = () => {
  console.log("Focus on scanner area");
};
const blurHandler = () => {
  console.log("Blur from scanner area");
};

// 透過輸入時間判斷是否是條碼掃描器輸入
const tempShowBarcode = ref("");
const tempBarcodeData = ref("");

let lastTimestamp = 0;
let timer = null;
// 門檻值：假設人工輸入時間間隔通常大於 50ms，條碼機連續輸入間隔會遠小於此數值
const threshold = 50; // 毫秒

const justBarcodeReader = (event) => {
  const now = Date.now();
  if (lastTimestamp === 0) {
    lastTimestamp = now;
  }
  const delta = now - lastTimestamp;
  console.log("delta", delta);
  if (delta <= threshold) {
    const validKeys = /^[!-~]$/;

    if (validKeys.test(event.key)) {
      // console.log("test Scanned data:", event.key, event);
      tempShowBarcode.value += event.key;
    } else if (event.key === "Enter") {
      // $$$ is password
      // scannedData = scannedData.split("$$$")[1] || "";
      lastTimestamp = 0;
      tempBarcodeData.value = "";
      console.log("enter end");
    }
  } else {
    tempShowBarcode.value = "";
  }

  lastTimestamp = now;
};
const clearTestBarcode = () => {
  tempShowBarcode.value = "";
  tempBarcodeData.value = "";
  testScannedData = ""; // 掃描字元
  lastTimestamp = 0;
  clearTimeout(timer);
};

onMounted(() => {
  window.addEventListener("keydown", pageKeydownHandler);
});
onUnmounted(() => {
  window.removeEventListener("keydown", pageKeydownHandler);
});
</script>

<style scoped lang="scss">
.d-flex {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: text;
  outline: none;
}
.d-flex:focus {
  border-color: #007bff;
  background-color: #e7f3ff;
}
.barcode_text {
  font-size: 1.5rem;
  color: rgb(216, 22, 51);
}
</style>
