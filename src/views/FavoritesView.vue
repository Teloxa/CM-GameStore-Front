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
      
      <!-- Título -->
      <h1 style="font-size: 32px; font-weight: 700; margin-bottom: 20px;">
        Mis Favoritos 💚
      </h1>

      <!-- Si no hay usuario -->
      <div v-if="!currentUser" class="alert alert-warning">
        Debes iniciar sesión para ver tus favoritos.
      </div>

      <!-- Cargando -->
      <div v-if="loading" class="alert alert-info">Cargando favoritos...</div>

      <!-- Si no hay favoritos -->
      <div
        v-if="!loading && favorites.length === 0"
        class="alert alert-secondary"
      >
        Aún no tienes videojuegos en favoritos.
      </div>

      <!-- Lista de juegos favoritos -->
      <div v-if="favorites.length > 0" class="favorite-list">

        <div
          v-for="game in favorites"
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

            <p style="margin-top: 8px; color: #73e900; font-weight: bold;">
              Añadido a favoritos
            </p>
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

export default {
  name: "FavoritesView",

  computed: {
    ...mapState(useFavoritesStore, ["favorites", "loading"]),
    ...mapState(useUserStore, ["currentUser"]),
  },

  methods: {
    ...mapActions(useFavoritesStore, ["loadFavorites"]),

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
  },

  mounted() {
    if (this.currentUser) {
      this.loadFavorites();
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
