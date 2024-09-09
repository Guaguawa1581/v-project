<template>
  <n-form ref="formRef" :model="formModel" :rules="rules">
    <n-form-item label="Name" path="name">
      <n-input v-model:value="formModel.name" />
    </n-form-item>
    <n-form-item label="pass" path="pass">
      <n-input v-model:value="formModel.pass" />
    </n-form-item>
    <n-form-item label="passC" path="passC">
      <n-input v-model:value="formModel.passC" />
    </n-form-item>

    <n-form-item label="Age" path="age">
      <n-input v-model:value="formModel.age" type="number" />
    </n-form-item>

    <n-button @click="validateGroupA">Validate Group A (Name only)</n-button>
    <n-button @click="validateGroupB">Validate Group B (Age only)</n-button>
    <n-button @click="restoreValid">Restore Valid</n-button>
  </n-form>
</template>

<script setup>
import { ref } from "vue";
import { NButton, NForm, NFormItem, NInput } from "naive-ui";
const formModel = ref({
  name: "",
  age: null,
});
const formRef = ref(null);
const rules = {
  name: [
    {
      key: "a",
      required: true,
      message: "Name is required",
      trigger: "blur",
    },
    {
      key: "b",
      min: 6,
      message: "Name must be at least 3 characters long",
      trigger: "blur",
    },
  ],
  pass: [
    {
      key: "pass",
      required: true,
      message: "Name is required",
      trigger: "blur",
    },
  ],
  passC: [
    {
      key: "passC",
      required: true,
      message: "Name is required",
      trigger: "blur",
    },
  ],
  age: [
    {
      required: true,
      message: "Age is required",
      trigger: "blur",
    },
    {
      type: "number",
      message: "Age must be a number",
      trigger: "blur",
    },
  ],
};

const validateGroupA = () => {
  formRef.value.validate(
    (errors) => {
      if (!errors) {
        console.log("name valid pass");
      }
    },
    (rule) => {
      console.log("sssssss", rule);
      return rule?.key === "a" || rule?.key === "b";
    }
  );
};

const validateGroupB = () => {
  formRef.value.validate((errors) => {
    if (!errors) {
      console.log("all valid pass");
    }
  });
};
const restoreValid = () => {
  formRef.value?.restoreValidation();
};
</script>
