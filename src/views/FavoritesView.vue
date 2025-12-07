<template>
  <div
    style="
      background-color: #fcf0ef;
      min-height: 100vh;
      padding-top: 40px;
      padding-bottom: 60px;
    "
  >
    <div style="width: 1200px; margin: 0 auto">
      <h1 style="font-size: 32px; font-weight: 700; margin-bottom: 10px;">
        Mis Favoritos 💚
      </h1>
      <p
        v-if="favoriteGames.length > 0"
        style="margin-top: 0; margin-bottom: 20px; font-size: 16px; color: #555;"
      >
        Has marcado <strong>{{ favoriteGames.length }}</strong> juego<span v-if="favoriteGames.length !== 1">s</span> como favoritos.
      </p>
      <div v-if="!currentUser" class="alert alert-warning">
        Debes iniciar sesión para ver tus favoritos.
      </div>
      <div v-if="loading" class="alert alert-info">Cargando favoritos...</div>
      <div
        v-if="!loading && currentUser && favoriteGames.length === 0"
        class="alert alert-secondary"
      >
        Aún no tienes videojuegos en favoritos.
      </div>
      <div v-if="favoriteGames.length > 0" class="favorite-list">
        <div
          v-for="game in favoriteGames"
          :key="game.id"
          class="favorite-card"
          @click="goToGame(game.id)"
        >
          <img
            class="game-img"
            :src="localImageUrl(game)"
            @error="
              $event.target.src =
                game.screenshots?.length
                  ? normalizeScreenshot(game.screenshots[0])
                  : ''
            "
          />
          <div class="info">
            <h2>{{ game.titulo }}</h2>
            <p style="margin: 0; font-size: 16px; color: grey;">
              ⭐ {{ game.calificacion }}
            </p>
            <p style="margin: 5px 0; font-weight: 600; font-size: 18px;">
              ${{ game.precio }} MXN
            </p>
            <p style="margin-top: 4px; color: #73e900; font-weight: bold;">
              En tu lista de favoritos
            </p>
            <button
              @click.stop="handleRemoveFavorite(game.id)"
              style="
                margin-top: 8px;
                padding: 6px 12px;
                background-color: #ff4444;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
              "
            >
              Eliminar de favoritos
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useFavoritesStore } from "../stores/favoritesStore";
import { useUserStore } from "../stores/userStore";
import { useGamesStore } from "../stores/gamesStore";

export default {
  name: "FavoritesView",

  computed: {
    ...mapState(useFavoritesStore, ["favorites", "loading"]),
    ...mapState(useUserStore, ["currentUser"]),
    ...mapState(useGamesStore, ["games"]),

    favoriteGames() {
      if (!this.favorites || !this.favorites.length || !this.games || !this.games.length) {
        return [];
      }

      const favIds = this.favorites.map((f) => String(f.gameId));

      return this.games.filter((g) => favIds.includes(String(g.id)));
    },
  },

  methods: {
    ...mapActions(useFavoritesStore, ["loadFavorites", "removeFavorite"]),
    ...mapActions(useGamesStore, ["fetchGames"]),

    goToGame(id) {
      this.$router.push({ name: "game-detail", params: { id } });
      window.scrollTo({ top: 0, behavior: "auto" });
    },

    localImageUrl(game) {
      if (!game.slug) return "";
      return `http://localhost:3000/images/games/${game.slug}.jpg`;
    },

    normalizeScreenshot(url) {
      if (!url) return "";
      return url.startsWith("//") ? "https:" + url : url;
    },

    async handleRemoveFavorite(gameId) {
      try {
        await this.removeFavorite(gameId);   
        await this.loadFavorites();          
      } catch (e) {
        console.error("Error al eliminar favorito:", e);
      }
    },
  },

  async mounted() {
    if (this.currentUser) {
      await Promise.all([
        this.fetchGames(),
        this.loadFavorites(),
      ]);
    }
  },
};
</script>

<style scoped>
.favorite-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.favorite-card {
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #ccc;
  padding: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.favorite-card:hover {
  transform: scale(1.02);
  border-color: #73e900;
}

.game-img {
  width: 180px;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 18px;
  border: 2px solid #b1b1b1;
}

.info h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}
</style>
