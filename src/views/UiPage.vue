<template>
  <div class="box">
    <!-- <TestSoltBox>
      <template #boxSolt>
        <button>wowowo</button>
      </template>
    </TestSoltBox> -->
    <div style="margin-top: 50px">
      <div>{{ UserInfo }}</div>
      <div>
        <Checkbox :value="true" />
        <span>
          <i class="fa-brands fa-tiktok"></i>
        </span>
      </div>
      <!-- <TestSoltBox>
        <template #boxAll>
          <TestSlot>
            <template #boxSolt>
              <button style="background-color: lightcoral">eeeeoooo</button>
            </template>
          </TestSlot>
        </template>
      </TestSoltBox>
      <DataTable /> -->
    </div>
    <!-- <div class="nobb innerBox">
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
    </div> -->
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
import TestSoltBox from "@/components/TestSoltBox.vue";
import TestSlot from "@/components/TestSlot.vue";
import DataTable from "primevue/datatable";
import Checkbox from "primevue/checkbox";
import { useUserStore } from "@/store";

const UserInfo = useUserStore();
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

:not([class*="nobb"]) {
  & > .bbb:not(.guagua) {
    color: blue !important;
  }
}
</style>
