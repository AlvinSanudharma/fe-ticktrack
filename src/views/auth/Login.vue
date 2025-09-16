<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import feather from "feather-icons";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();
const { loading, error } = storeToRefs(authStore);
const { login } = authStore;

const form = ref({
  email: null,
  password: null,
});

const isToggled = ref(false);

onMounted(async () => {
  feather.replace();
});

const handleSubmit = async () => {
  await login(form.value);

  if (error.value === "Unauthorized") {
    form.value.password = null;

    toast.error("Email atau password salah");
  } else {
    toast.error("Terjadi kesalahan");
  }
};

const togglePassword = () => {
  isToggled.value = !isToggled.value;
};
</script>

<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <div class="mt-1 relative">
        <input
          v-model="form.email"
          type="email"
          id="email"
          name="email"
          required
          class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="nama@perusahaan.com"
        />
        <div
          class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
        >
          <i data-feather="mail" class="w-4 h-4 text-gray-400"></i>
        </div>
      </div>
    </div>

    <!-- Password -->
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <div class="mt-1 relative">
        <input
          v-model="form.password"
          :type="isToggled ? 'text' : 'password'"
          id="password"
          name="password"
          required
          class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="••••••••"
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            @click="togglePassword"
            type="button"
            class="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              v-if="!isToggled"
              class="w-4 h-4"
              id="password-toggle"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              id="password-toggle-hide"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3_80)">
                <path
                  d="M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 1L23 23"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3_80">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Remember Me & Forgot Password -->
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="remember" class="ml-2 block text-sm text-gray-700"
          >Ingat saya</label
        >
      </div>
      <a href="#" class="text-sm text-blue-600 hover:text-blue-800"
        >Lupa password?</a
      >
    </div>

    <!-- Submit Button -->
    <div>
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span v-if="!loading">Masuk</span>
        <span v-else>Loading...</span>
      </button>
    </div>
  </form>

  <!-- Divider -->
  <div class="mt-6">
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-white text-gray-500">Atau</span>
      </div>
    </div>
  </div>

  <!-- Register Link -->
  <div class="mt-6 text-center">
    <p class="text-sm text-gray-600">
      Belum punya akun?
      <RouterLink
        :to="{ name: 'register' }"
        class="font-medium text-blue-600 hover:text-blue-800"
        >Daftar sekarang</RouterLink
      >
    </p>
  </div>
</template>
