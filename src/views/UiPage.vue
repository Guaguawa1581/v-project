<template>
  <div class="box">
    <div class="nobb innerBox">
      <div class="bbb">NoBB~~</div>
      <div class="guagua bbb">NoBB~~ GGGua</div>
    </div>
    <div class="innerBox" style="margin-top: 100px">
      <div class="bbb">BB BBBBBB</div>
      <div class="guagua bbb">Guagua BB</div>
    </div>
    <div class="" style="margin-top: 100px">
      <div>No InnerBox</div>
      <div class="bbb">BB BBBBBB</div>
      <div class="guagua bbb">Guagua BB</div>
    </div>
    <div class="" style="margin-top: 100px">
      <div>LLLLLOOOO</div>
      <div class="nobb">
        <div class="kkd">
          <div class="ooeoeo">
            <div class="bbb">BB BBBBBB</div>
          </div>
        </div>
      </div>

      <div class="guagua bbb">Guagua BB</div>
    </div>
    <div>
      <n-input />
      <n-input-number></n-input-number>
      <n-date-picker></n-date-picker>
      <n-time-picker></n-time-picker>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import {
  NInputGroup,
  NInput,
  NInputNumber,
  NDatePicker,
  NTimePicker,
} from "naive-ui";
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  & > div {
    margin-bottom: 20px;
  }
}
</style>
<style lang="scss">
.box {
  font-size: 30px;
  font-weight: 800;
}
// *:not(.nobb) {
//   .bbb:not(.guagua) {
//     color: blue !important;
//   }
// }

:not([class*="nobb"]) > .bbb:not(.guagua) {
  color: blue !important;
}
</style>
