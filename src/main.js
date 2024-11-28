import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";
import { createDiscreteApi } from "naive-ui";
import App from "./App.vue";
import router from "./router";

const primaryColor = [
  { name: "noir", palette: {} },
  {
    name: "orange",
    palette: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
      950: "#431407",
    },
  },
  {
    name: "blue",
    palette: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554",
    },
  },
];
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: primaryColor[2].palette,
    colorScheme: {
      light: {
        // 使用design token, 動態調整顏色 參考primevue theme文件
        primary: {
          color: "{primary.500}",
          contrastColor: "#ffffff",
          hoverColor: "{primary.600}",
          activeColor: "{primary.700}",
        },
        highlight: {
          background: "{primary.50}",
          focusBackground: "{primary.100}",
          color: "{primary.700}",
          focusColor: "{primary.800}",
        },
      },
      dark: {
        primary: {
          color: "{primary.400}",
          contrastColor: "{surface.900}",
          hoverColor: "{primary.300}",
          activeColor: "{primary.200}",
        },
        highlight: {
          background: "color-mix(in srgb, {primary.400}, transparent 84%)",
          focusBackground: "color-mix(in srgb, {primary.400}, transparent 76%)",
          color: "rgba(255,255,255,.87)",
          focusColor: "rgba(255,255,255,.87)",
        },
      },
    },
  },
});
const { message, dialog } = createDiscreteApi(["message", "dialog"]);
window.$message = message;
window.$dialog = dialog;
const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
// PrimeVue
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: MyPreset,
    options: {
      prefix: "p", //same as default
      darkModeSelector: ".app-dark",
      cssLayer: false, //default
    },
  },
});

app.mount("#app");
