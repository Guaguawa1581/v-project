import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("testUser", () => {
  // State → Default
  const userInfo = ref({
    userId: "",
    name: "",
    age: "",
    permisson: -1,
  });
  const isLoading = ref(false);

  // Action → Setter
  const setUserInfo = (data) => {
    userInfo.value = data;
  };
  const setIsLoading = (isLoading) => {
    isLoading.value = isLoading;
  };

  // Getters
  const getUserInfo = computed(() => userInfo.value);
  const getIsLoading = computed(() => isLoading.value);

  return {
    setUserInfo,
    setIsLoading,
    getUserInfo,
    getIsLoading,
  };
});

// export const UserInfo = useUserStore.getUserInfo;
// export const IsLoading = useUserStore.getUserInfo;

// export const setUserInfo = useUserStore.setUserInfo;
// export const setIsLoading = useUserStore.setIsLoading;
