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
      />
      <Button label="Submit" @click="submitOrderNumber" />
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
let scannedData = "";
let isPageKeydownEnabled = true;

const submitBarcode = () => {
  submittedBarcode.value = barcode.value;
};
const submitOrderNumber = () => {
  console.log("Order number submitted:", orderNumber.value);
};
const inputBarcodeKey = (event) => {
  // console.log("Barcode keydown event:", event);
  const validKeys = /^[0-9A-Za-z-_\$]$/;
  if (event.key === "Enter") {
    // $$$ is password
    // scannedData = scannedData.split("$$$")[1] || "";
    barcode.value = scannedData;

    scannedData = "";
  } else if (validKeys.test(event.key)) {
    console.log("Scanned data:", event.key, event);
    scannedData += event.key;
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
