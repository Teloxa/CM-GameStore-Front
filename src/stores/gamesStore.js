// src/stores/games.js
import { defineStore } from "pinia";
import axios from "axios";

export const useGamesStore = defineStore("games", {
  state: () => ({
    games: [],
    selectedGame: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchGames() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await axios.get("http://localhost:3000/api/games");
        this.games = data;
      } catch (err) {
        console.error("Error al obtener juegos:", err);
        this.error =
          err.response?.data?.message || "Error al obtener juegos del servidor";
      } finally {
        this.loading = false;
      }
    },

    async fetchGameById(id) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/games/${id}`
        );
        this.selectedGame = data;
      } catch (err) {
        console.error("Error al obtener juego:", err);
        this.error =
          err.response?.data?.message || "Error al obtener juego del servidor";
      } finally {
        this.loading = false;
      }
    },
  },
});
