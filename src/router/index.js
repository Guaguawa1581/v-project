import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/test",
      name: "test",

      component: () => import("../views/TestView.vue"),
    },
    {
      path: "/naive",
      name: "TestUI",

      component: () => import("../views/UiPage.vue"),
    },
    {
      path: "/naiveTest",
      name: "NTestUI",

      component: () => import("../views/TestUiPage.vue"),
    },
    {
      path: "/barcode",
      name: "Barcode",
      component: () => import("../views/BarcodeView.vue"),
    },
    {
      path: "/dragTest",
      name: "DragTest",
      component: () => import("../views/DragView.vue"),
    },
    {
      path: "/slotLoop",
      name: "SlotLoop",
      component: () => import("../views/SlotLoopView.vue"),
    },
  ],
});

export default router;
