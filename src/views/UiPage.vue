<template>
  <n-form :model="localTargetObjectTest" ref="testFormRef">
    <n-grid class="mYa-s2" :x-gap="12" :y-gap="12">
      <n-gi :span="4">
        <n-form-item
          :path="'newField'"
          :rule="{
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          }"
          :show-label="false"
        >
          <n-input-group class="input_size_free custom_inputgroup">
            <n-input
              v-model:value="localTargetObjectTest.newField"
              :round="isRound"
              class=""
            />
          </n-input-group>
        </n-form-item>
      </n-gi>
      <n-gi :span="12">
        <n-input-group class="input_size_free custom_inputgroup">
          <n-input-group-label :class="isRound ? 'round' : ''"
            >WWWW</n-input-group-label
          >
          <n-tooltip trigger="click">
            <template #trigger>
              <n-button
                type="primary"
                :round="isRound"
                :class="isRound ? 'round' : ''"
                @click="() => (isRound = !isRound)"
                >isRound</n-button
              >
            </template>
            <span>Tooltip</span>
          </n-tooltip>
        </n-input-group>
      </n-gi>
      <n-gi :span="4">
        <n-input-group class="input_size_free custom_inputgroup">
          <n-button
            type="primary"
            :round="isRound"
            :class="isRound ? 'round' : ''"
            @click="() => (isRound = !isRound)"
            >isRound</n-button
          >
        </n-input-group>
      </n-gi>
      <n-gi :span="12">
        <n-input-group class="input_size_free custom_inputgroup">
          <n-button
            type="primary"
            :style="{ width: '40%' }"
            :round="isRound"
            :class="isRound ? 'round' : ''"
            @click="() => (isRound = !isRound)"
            >isRound</n-button
          >
          <n-input-group-label :class="isRound ? 'round' : ''"
            >Label</n-input-group-label
          >
        </n-input-group>
      </n-gi>
      <n-gi :span="12">
        <n-form-item
          :path="'newGroup'"
          :rule="[
            {
              validator: (rule, value) => {
                if (value?.first !== '') {
                  return true;
                }
                return false;
              },

              message: 'first is required',
              trigger: 'blur',
            },
            {
              validator: (rule, value) => {
                if (value?.second !== '') {
                  return true;
                }
                return false;
              },
              message: 'second is required',
              trigger: 'blur',
            },
          ]"
          :show-label="false"
        >
          <n-input-group class="input_size_free custom_inputgroup">
            <n-button
              type="primary"
              :style="{ width: '40%' }"
              :round="isRound"
              :class="isRound ? 'round' : ''"
              @click="() => (isRound = !isRound)"
              >isRound</n-button
            >

            <n-input
              :style="{ width: '20%' }"
              :round="isRound"
              class=""
              v-model:value="localTargetObjectTest.newGroup.first"
            />

            <n-input-group-label :class="isRound ? 'round' : ''"
              >Label</n-input-group-label
            >
            <n-input
              :style="{ width: '20%' }"
              :round="isRound"
              class=""
              v-model:value="localTargetObjectTest.newGroup.second"
            />
          </n-input-group>
        </n-form-item>
      </n-gi>
      <n-gi :span="12">
        <n-input-group class="input_size_free custom_inputgroup">
          <n-form-item
            path="firstName"
            :show-label="false"
            :rule="{
              required: true,
              message: 'This firstName is required',
              trigger: 'blur',
            }"
          >
            <n-input
              v-model="localTargetObjectTest.firstName"
              placeholder="First Name"
            />
          </n-form-item>

          <n-form-item
            path="lastName"
            :show-label="false"
            :rule="{
              required: true,
              message: 'This lastName is required',
              trigger: 'blur',
            }"
          >
            <n-input
              v-model="localTargetObjectTest.lastName"
              placeholder="Last Name"
            />
          </n-form-item>

          <n-form-item
            path="email"
            :show-label="false"
            :rule="{
              required: true,
              message: 'This email is required',
              trigger: 'blur',
            }"
          >
            <n-input
              v-model="localTargetObjectTest.email"
              placeholder="Email"
            />
          </n-form-item>
        </n-input-group>
      </n-gi>
      <n-gi :span="12">
        <n-input-group class="input_size_free custom_inputgroup">
          <n-input-number
            :class="isRound ? 'round' : ''"
            button-placement="both"
          >
            <template
              v-for="(slotContent, slotName) in testSlots"
              v-slot:[slotName]
              :key="slotName"
            >
              <template v-if="typeof slotContent === 'string'">
                {{ slotContent }}
              </template>
              <template v-else>
                <component :is="slotContent" />
              </template>
            </template>
          </n-input-number>
        </n-input-group>
      </n-gi>
      <n-gi :span="4">
        <n-input-group class="input_size_free custom_inputgroup">
          <n-select
            :class="isRound ? 'round' : ''"
            placeholder="Select"
            :options="[
              { label: 'Option 1', value: 'Option 1' },
              { label: 'Option 2', value: 'Option 2' },
            ]"
            disabled
          />
        </n-input-group>
      </n-gi>
      <n-gi :span="4">
        <n-input-group class="input_size_free custom_inputgroup">
          <n-date-picker type="date" :class="isRound ? 'round' : ''" />
        </n-input-group>
      </n-gi>
      <n-gi :span="12">
        <n-input-group class="input_size_free custom_inputgroup">
          <n-date-picker type="date" :class="isRound ? 'round' : ''" />
        </n-input-group>
      </n-gi>
      <n-gi :span="18">
        <n-input-group class="input_size_free custom_inputgroup">
          <n-select
            :class="isRound ? 'round' : ''"
            placeholder="Select"
            :options="[
              { label: 'Option 1', value: 'Option 1' },
              { label: 'Option 2', value: 'Option 2' },
            ]"
            status="error"
          />
        </n-input-group>
      </n-gi>
      <n-gi :span="18">
        <n-input-group class="input_size_free custom_inputgroup">
          <n-input
            v-model:value="localTargetObjectTest.description"
            type="textarea"
            placeholder="Auto Resize"
            :autosize="{ minRows: 6 }"
          />
        </n-input-group>
      </n-gi>

      <n-gi :span="18">
        <n-input-group class="input_size_free custom_inputgroup">
          <div
            class="text-danger"
            style="
              white-space: pre-wrap;
              background: #fff;
              padding: 12px;
              border: 1px solid #ccc;
              width: 100%;
            "
          >
            {{ JSON.stringify(localTargetObjectTest.description) }}
          </div>
        </n-input-group>
      </n-gi>
      <n-gi :span="6">
        <n-button type="success" @click="sendDescription"
          >送出 description</n-button
        >
      </n-gi>
      <n-gi :span="18">
        <n-input-group class="input_size_free custom_inputgroup">
          <div class="text-white bg-danger p-2">
            {{ desRes }}
          </div>
        </n-input-group>
      </n-gi>
    </n-grid>
  </n-form>
</template>

<script setup>
import axios from "axios";
import { h, ref, markRaw } from "vue";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NGrid,
  NGi,
  NInputGroup,
  NInputGroupLabel,
  NInputNumber,
  NSelect,
  NAvatar,
  NBadge,
  NEllipsis,
  NTooltip,
  NDatePicker,
} from "naive-ui";
import { Anchor } from "@vicons/fa";
const formRef = ref(null);
const form = ref({
  name: "",
  email: "",
  password: "",
});
const isRound = ref(false);
const localTargetObjectTest = ref({
  newField: "",
  newGroup: {
    first: "",
    second: "",
  },
  firstName: "",
  lastName: "",
  email: "",
  description: "",
});
const dynamicIcon = markRaw(Anchor);
const testSlots = ref({
  // q: h("p", null, "a"),意思

  "add-icon": Anchor,
  prefix: "$$",
});
const rules = {
  name: {
    required: true,
    message: "Name is required",
    trigger: "blur",
  },
  email: {
    required: true,
    message: "Email is required",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "Password is required",
    trigger: "blur",
  },
};
const desRes = ref("");
const handleSubmit = () => {
  formRef.value.validate((err) => {
    if (!err) {
      window.$message.success("Form submitted successfully");
      console.log(form.value);
    } else {
      window.$message.warning("Please fill in the form correctly");
    }
  });
};
const sendDescription = async () => {
  try {
    const res = await axios.post(
      "https://192.168.100.87:5004/api/RMS/Admin/Kanban/GetColsBySQL",
      {
        query: localTargetObjectTest.value.description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ API response:", res.data);
    window.$message.success("送出成功");
    desRes.value = res.data;
  } catch (err) {
    console.error("❌ API error:", err);
    window.$message.error("送出失敗");
    desRes.value = err.response?.data?.messageBox.message || "發生錯誤";
  }
};
</script>

<style scoped>
.n-grid {
  background-color: lightblue;
  padding: 20px;
}
.form-container {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.is-invalid {
  border-color: red;
}

span {
  color: red;
  font-size: 0.875rem;
}
</style>
