import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null,
    loading: false,
    error: null,
  }),

  actions: {
    async register({ email, phone, username, password }) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/users/register",
          { email, phone, username, password }
        );

        this.currentUser = data.user;
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

        console.log("Registro exitoso. Usuario:", this.currentUser);

        return data;
      } catch (err) {
        console.error("Error al registrar usuario:", err);
        this.error =
          err.response?.data?.message ||
          "Error al registrar usuario en el servidor";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async login({ email, password }) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/users/login",
          { email, password }
        );

        this.currentUser = data.user;
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

        console.log("currentUser guardado en store:", this.currentUser);

        return data; 
      } catch (err) {
        console.error("Error al iniciar sesión:", err);
        this.error =
          err.response?.data?.message ||
          "Error al iniciar sesión en el servidor";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.currentUser = null;
      localStorage.removeItem("currentUser");
      console.log("Sesión cerrada");
    },

    loadFromStorage() {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        this.currentUser = JSON.parse(stored);
        console.log("Usuario cargado desde localStorage:", this.currentUser);
      }
    },
  },
});
