import { defineStore } from "pinia";
import { login as loginApi, getProfile } from "@/api/auth";

export const useAuthStore = defineStore("auth", {

  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    role: localStorage.getItem("role") || null,
    loading: false,
    error: null,
  }),

  getters: {

    isAuthenticated: (state) => !!state.token,

    isAdmin: (state) => state.role === "admin",

    isUser: (state) => state.role === "user",

  },

  actions: {

    async login(credentials) {

      this.loading = true;
      this.error = null;

      try {

        // Login ke API
        const response = await loginApi(credentials);

        // Backend mengembalikan:
        // {
        //   message: "Login success",
        //   data: {
        //     token: "xxxxx"
        //   }
        // }

        this.token = response.data.data.token;

        localStorage.setItem("token", this.token);

        // Ambil data profile
        await this.fetchProfile();

        return true;

      } catch (error) {

        this.error =
          error.response?.data?.message ||
          "Login gagal.";

        return false;

      } finally {

        this.loading = false;

      }

    },

    async fetchProfile() {

      try {

        const response = await getProfile();

        this.user = response.data.user;
        this.role = response.data.user.role;

        localStorage.setItem(
          "user",
          JSON.stringify(this.user)
        );

        localStorage.setItem(
          "role",
          this.role
        );

      } catch (error) {

        console.error(error);

        this.logout();

      }

    },

    logout() {

      this.token = null;
      this.user = null;
      this.role = null;
      this.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");

    },

  },

});