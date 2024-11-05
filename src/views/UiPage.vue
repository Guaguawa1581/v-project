<template>
  <div class="box">
    <!-- <TestSoltBox>
      <template #boxSolt>
        <button>wowowo</button>
      </template>
    </TestSoltBox> -->
    <div style="margin-top: 50px">
      <div>{{ store.userInfo }}</div>
      <div>
        <Button @click="toggleLoading">change loading</Button>
        <Button class="mx-3" severity="warn" @click="toggleLoadingCom"
          >change loading Com</Button
        >
      </div>
      <div class="my-3 loadingBox" :class="store.isLoading ? 'bg-blue' : ''">
        {{ store.isLoading }}
      </div>
      <div class="my-34">
        <h3>hello_vue使用這個 compositionAPI</h3>
        <div class="loadingBox" :class="storeCom.isLoading ? 'bg-red' : ''">
          {{ storeCom.isLoading + " CCCCom" }}
        </div>
      </div>
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
import { ref, computed } from "vue";
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
import Button from "primevue/button";
import { useUserStoreCom, useUserStore } from "@/store/user";
const storeCom = useUserStoreCom();
const store = useUserStore();

const toggleLoadingCom = () => {
  storeCom.setIsLoading(!storeCom.isLoading);
};
const toggleLoading = () => {
  console.log(store.isLoading);
  store.setIsLoading(!store.isLoading);
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  & > div {
    margin-bottom: 20px;
  }
}
.loadingBox {
  box-sizing: border-box;
  border: 2px solid rgb(48, 48, 48);
  width: 200px;
  height: 200px;
  background: rgb(247, 247, 139);
}
.bg-blue {
  background-color: lightskyblue;
}
.bg-red {
  background-color: lightcoral;
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
.py-3 {
  padding: 60px 0;
}
.mx-3 {
  margin: 0 60px;
}
.my-3 {
  margin: 60px 0;
}
</style>
