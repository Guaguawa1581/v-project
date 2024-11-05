import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStoreCom = defineStore("testUserCommmmm", () => {
  // State → Default
  const userInfo = ref({
    userId: "",
    name: "",
    age: "",
    permisson: -1,
  });
  const isLoading = ref(false);

  // Getters
  const getUserInfo = computed(() => userInfo.value);
  const getIsLoading = computed(() => isLoading.value);

  // Action → Setter
  const setUserInfo = (data) => {
    userInfo.value = data;
  };
  const setIsLoading = (value) => {
    isLoading.value = value;
  };

  return {
    setUserInfo,
    setIsLoading,
    userInfo,
    isLoading,
  };
});

// options API devtools可追蹤
export const useUserStore = defineStore("testUser", {
  // State
  state: () => {
    return {
      userInfo: {
        userId: "",
        name: "",
        age: "",
        permission: -1,
      },
      isLoading: false,
    };
  },

  // Getters
  getters: {},

  // Actions
  actions: {
    setUserInfo(data) {
      this.userInfo = data;
    },
    setIsLoading(value) {
      console.log("lllllloading", value);
      this.isLoading = value;
      console.log(this.isLoading);
    },
  },
});
