// src/stores/favoritesStore.js
import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./userStore";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [],     // [{ gameId, createdAt }]
    favoriteIds: [],   // [ "11013", "11226", ... ]
    loading: false,
  }),

  actions: {
    async loadFavorites() {
      const userStore = useUserStore();
      const user = userStore.currentUser;
      if (!user) return;

      this.loading = true;
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/users/${user.id}/favorites`
        );

        this.favorites = data.favorites || [];
        this.favoriteIds = this.favorites.map((f) => String(f.gameId));
      } catch (e) {
        console.error("Error al cargar favoritos:", e);
      } finally {
        this.loading = false;
      }
    },

    async addFavorite(game) {
      const userStore = useUserStore();
      const user = userStore.currentUser;
      if (!user) return;

      try {
        await axios.post(
          `http://localhost:3000/api/users/${user.id}/favorites`,
          { gameId: game.id }
        );

        // actualizar estado local
        if (!this.favoriteIds.includes(String(game.id))) {
          this.favoriteIds.push(String(game.id));
          this.favorites.push({
            gameId: String(game.id),
            createdAt: new Date().toISOString(),
          });
        }
      } catch (e) {
        console.error("Error al agregar favorito:", e);
        throw e;
      }
    },

    async removeFavorite(gameId) {
      const userStore = useUserStore();
      const user = userStore.currentUser;
      if (!user) return;

      try {
        await axios.delete(
          `http://localhost:3000/api/users/${user.id}/favorites/${gameId}`
        );

        // actualizar estado local
        this.favoriteIds = this.favoriteIds.filter(
          (id) => String(id) !== String(gameId)
        );
        this.favorites = this.favorites.filter(
          (f) => String(f.gameId) !== String(gameId)
        );
      } catch (e) {
        console.error("Error al eliminar favorito:", e);
        throw e;
      }
    },
  },
});
