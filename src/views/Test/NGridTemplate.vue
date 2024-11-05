<template>
  <Dialog
    :visible="showModal"
    @update:visible="leaveModal"
    header="填寫目標物件"
    :breakpoints="dialogBreakpoints"
    :style="{ width: '50vw' }"
    modal
    v-bind="$attrs"
  >
    <template #header>
      <div>
        {{ localTargetObject }}
      </div>
    </template>
    <n-form :model="localTargetObject" ref="formRef">
      <n-grid cols="1" :x-gap="16" :y-gap="16">
        <!-- 生成表單項目 -->
        <n-gi v-for="(field, index) in formFields" :key="index">
          <n-form-item :label="field.label">
            <!--  <div>
                <component :is="Button">dddd</component>
                <n-input></n-input> 
              </div> -->
            <component
              :is="field.component"
              v-model:value="localTargetObject[field.model]"
              v-bind="field.props"
            />
          </n-form-item>
        </n-gi>
      </n-grid>
      <n-button @click="submitForm" type="primary">提交</n-button>
    </n-form>
  </Dialog>
</template>

<script setup>
import { ref, watch, toRefs } from "vue";
import {
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NSelect,
  NButton,
  NGrid,
  NGi,
} from "naive-ui";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
const props = defineProps({
  showModal: Boolean,
  initialData: {
    type: Object,
    default: () => ({
      hmiIp: "0.0.0.6",
      hmiPort: 1600,
      SNCode: 3,
      factory: "Taichung",
      group: "Dali",
      EqCode: "0008",
      operationMode: 2,
    }),
  },
});
const emit = defineEmits(["update:show-modal"]);
const { showModal, initialData } = toRefs(props);
const localTargetObject = ref({ ...initialData.value });

const leaveModal = () => {
  emit("update:show-modal");
};

watch(initialData, (newData) => {
  localTargetObject.value = { ...newData }; // 更新本地數據以同步外部更改
});

// 設定 Dialog 的 RWD 斷點
const dialogBreakpoints = {
  "960px": "75vw",
  "640px": "90vw",
};

// 表單欄位配置
const formFields = [
  {
    label: "HMI IP",
    component: NInput,
    model: "hmiIp",
    props: { placeholder: "輸入 HMI IP" },
  },
  {
    label: "HMI Port",
    component: NInputNumber,
    model: "hmiPort",
    props: { placeholder: "輸入 Port 號碼" },
  },
  {
    label: "SN Code",
    component: NInputNumber,
    model: "SNCode",
    props: { placeholder: "輸入 SN Code" },
  },
  {
    label: "工廠",
    component: NInput,
    model: "factory",
    props: { placeholder: "輸入工廠名稱" },
  },
  {
    label: "群組",
    component: NInput,
    model: "group",
    props: { placeholder: "輸入群組名稱" },
  },
  {
    label: "設備代碼",
    component: NInput,
    model: "EqCode",
    props: { placeholder: "輸入設備代碼" },
  },
  {
    label: "操作模式",
    component: NSelect,
    model: "operationMode",
    props: {
      placeholder: "選擇操作模式",
      options: [
        { label: "模式 1", value: 1 },
        { label: "模式 2", value: 2 },
        { label: "模式 3", value: 3 },
      ],
    },
  },
];

const submitForm = () => {
  console.log("提交的數據:", localTargetObject.value);
};
</script>

<style scoped>
/* 自訂樣式 */
</style>
