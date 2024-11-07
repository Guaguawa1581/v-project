<template>
  <n-form :model="form" :rules="rules" ref="formRef">
    <n-grid :x-gap="12" :y-gap="12" responsive="screen">
      <n-gi :span="24" :xs="24" :sm="24" :md="12" :lg="12">
        <n-input-group>
          <n-input-group-label round>https://www.</n-input-group-label>
          <n-input :style="{ width: '33%' }" />
          <n-input-group-label round>.com</n-input-group-label>
        </n-input-group>
      </n-gi>
      <n-gi :span="24" :xs="24" :sm="24" :md="12" :lg="12">
        <n-form-item label="Name" path="name">
          <n-input-group round>
            <n-input
              round
              v-model:value="form.name"
              placeholder="Enter your name"
            />

            <n-input-group-label round>Label</n-input-group-label>
            <n-button round>+</n-button>
          </n-input-group>
        </n-form-item>
      </n-gi>
      <n-gi :span="24" :xs="24" :sm="24" :md="12" :lg="12">
        <n-form-item label="Email" path="email">
          <n-input-group>
            <n-input
              v-model:value="form.email"
              placeholder="Enter your email"
            />
          </n-input-group>
        </n-form-item>
      </n-gi>
      <n-gi :span="24" :xs="24" :sm="24" :md="12" :lg="12">
        <n-form-item label="Password" path="password">
          <n-input-group>
            <n-input
              type="password"
              v-model:value="form.password"
              placeholder="Enter your password"
            />
          </n-input-group>
        </n-form-item>
      </n-gi>
      <n-gi :span="24">
        <input type="text" />
      </n-gi>

      <n-gi :span="24" :xs="24" :sm="24" :md="24" :lg="24">
        <n-button @click="handleSubmit">Submit</n-button>
      </n-gi>
    </n-grid>
  </n-form>
</template>

<script>
import { ref } from "vue";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NGrid,
  NGi,
  NInputGroup,
  NInputGroupLabel,
} from "naive-ui";

export default {
  components: {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NGrid,
    NGi,
    NInputGroup,
    NInputGroupLabel,
  },
  setup() {
    const formRef = ref(null);
    const form = ref({
      name: "",
      email: "",
      password: "",
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

    return {
      formRef,
      form,
      rules,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
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
