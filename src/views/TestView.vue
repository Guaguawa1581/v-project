<template>
  <div class="container-box">
    <button id="counter" @click="increment">{{ count }}</button>
    <div class="btnBox"><button @click="clearDate">clear date</button></div>
    <div>
      <n-date-picker
        class="input-box-date w-100"
        v-model:formatted-value="date"
        value-format="yyyy-MM-dd'T'HH:mm:ss"
        type="datetime"
        clearable
        update-value-on-close
      />
    </div>
    <div>
      <Paginator
        :template="{
          default:
            'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        :rows="10"
        :totalRecords="120"
        :pageLinkSize="2"
        class=""
      >
      </Paginator>
    </div>
    <div>
      <InputOtp v-model:modelValue="tempData.otpValue" :length="otpLength" />
    </div>
    <div>
      <InputMask
        id="basic"
        v-model="tempData.maskValue"
        mask="9.9.9.9"
        placeholder="0.0.0.0"
      />
    </div>
    <div>
      <button @click="updateMessage">更新訊息</button>
      <p>{{ message }}</p>
    </div>
    <div>
      <InputOtp v-model="tempData.otpValue" :length="4" style="gap: 0">
        <template #default="{ attrs, events, index }">
          <input
            type="text"
            v-bind="attrs"
            v-on="events"
            class="custom-otp-input"
          />
          <div v-if="index < 4" class="px-4">.</div>
        </template>
      </InputOtp>
    </div>

    <div class="input-box">
      <input type="text" @paste="onPaste" @copy="(e) => onCopy(e, 1)" />
      <div>.</div>
      <input type="text" @paste="onPaste" @copy="(e) => onCopy(e, 2)" />
      <div>.</div>
      <input type="text" @paste="onPaste" @copy="(e) => onCopy(e, 3)" />
      <div>.</div>
      <input type="text" @paste="onPaste" @copy="(e) => onCopy(e, 4)" />
    </div>
    <div>
      <label for="" class="me-5" @click="focusCheck">CCCCCTT</label>
      <n-checkbox ref="testCheck" v-model:checked="isTestCheck"
        >checkTEst</n-checkbox
      >
      <p>Checkbox is {{ isTestCheck ? "checked" : "unchecked" }}</p>
    </div>
    <div class="my-5"><input type="text" /></div>
    <div>
      <h3>Textarea</h3>
      <Textarea v-model="textareaValue" rows="5" cols="60" />
      <div>
        <Button @click="sendSql">Submit</Button>
      </div>
      <p>
        Textarea value:
        <span class="text-danger">{{ JSON.stringify(textareaValue) }}</span>
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick } from "vue";
import { NDatePicker, NCheckbox } from "naive-ui";
import Button from "primevue/button";
import Paginator from "primevue/paginator";
import InputOtp from "primevue/inputotp";
import InputMask from "primevue/inputmask";
import Textarea from "primevue/textarea";
import axios from "axios";

const count = ref(0);
const date = ref("2024-12-31T00:00:00");
const tempData = ref({
  otpValue: "",
  maskValue: "",
  otpValue: "10.198.123.13",
});
const otpValue = ref("");
const otpLength = ref(6);
const testCheck = ref(null);
const isTestCheck = ref(false);
const textareaValue = ref("");
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

const message = ref("初始訊息");

function updateMessage() {
  message.value = "更新後的訊息";

  console.log("更新訊息後 (同步)");
  nextTick(() => {
    console.log("DOM 更新後 (nextTick)");
  });
  console.log("nextTick 後 (同步)");
}

const onPaste = (e) => {
  console.log(e);
};
const onCopy = (e, index) => {
  console.log("onCopy", index, e);
};
const focusCheck = () => {
  isTestCheck.value = !isTestCheck.value;
  testCheck.value.focus();
};
const sendSql = async () => {
  try {
    const res = await axios.post(
      "https://localhost:44314/api/RMS/Admin/Kanban/GetColsBySQL",
      {
        query: textareaValue.value,
      }
    );
    if (res.data?.messageBox) {
      console.log(res);
      window.$message.success(res.data.messageBox.message);
    }
  } catch (e) {
    console.log(e);
    window.$message.error(e.response?.data?.messageBox.message || "發生錯誤");
  }
};
</script>
<style lang="scss" scoped>
.btnBox {
  margin: 20px 0;
}
.container-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 50px;
}
.custom-otp-input {
  width: 48px;
  height: 48px;
  font-size: 24px;
  appearance: none;
  text-align: center;
  transition: all 0.2s;
  border-radius: 0;
  border: 1px solid var(--p-inputtext-border-color);
  background: transparent;
  outline-offset: -2px;
  outline-color: transparent;
  border-right: 0 none;
  transition: outline-color 0.3s;
  color: var(--p-inputtext-color);

  &:focus {
    outline: 2px solid var(--p-focus-ring-color);
  }

  &:first-child,
  &:nth-child(5) {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  &:nth-child(3),
  &:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-right-width: 1px;
    border-right-style: solid;
    border-color: var(--p-inputtext-border-color);
  }
}
.input-box {
  display: flex;
  input {
    text-align: center;
    border: none;
    outline: none;
  }
}
.pre-line {
  white-space: pre-line;
}
</style>
