import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./userStore";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [],    
    favoriteIds: [],  
    loading: false,
    error: null,
  }),

  actions: {
    async loadFavorites() {
      this.loading = true;
      this.error = null;

      try {
        const userStore = useUserStore();
        const user = userStore.currentUser;

        if (!user) {
          this.favorites = [];
          this.favoriteIds = [];
          return;
        }

        const { data } = await axios.get(
          `http://localhost:3000/api/users/${user.id}/favorites`
        );

        const serverFavorites = Array.isArray(data.favorites)
          ? data.favorites
          : [];

        this.favorites = serverFavorites;

        if (Array.isArray(data.favoriteIds)) {
          this.favoriteIds = data.favoriteIds.map((id) => String(id));
        } else {
          this.favoriteIds = serverFavorites.map((f) => String(f.gameId));
        }

        console.log("Favoritos cargados store:", this.favorites);
        console.log("favoriteIds store:", this.favoriteIds);
      } catch (err) {
        console.error("Error al cargar favoritos:", err);
        this.error = "No se pudieron cargar tus favoritos";
        this.favorites = [];
        this.favoriteIds = [];
      } finally {
        this.loading = false;
      }
    },

    async addFavorite(game) {
      this.error = null;

      try {
        const userStore = useUserStore();
        const user = userStore.currentUser;

        if (!user) {
          throw new Error("NO_AUTH");
        }

        const gameId = String(game.id);

        if (this.favoriteIds.includes(gameId)) {
          return;
        }

        await axios.post(
          `http://localhost:3000/api/users/${user.id}/favorites`,
          { gameId }
        );

        this.favoriteIds.push(gameId);
        this.favorites.push({
          gameId,
          createdAt: new Date().toISOString(),
        });

        console.log("Favorito agregado en store:", game.titulo, gameId);
      } catch (err) {
        console.error("Error al agregar favorito:", err);
        this.error = "No se pudo agregar a favoritos";
        throw err;
      }
    },
  },
});
