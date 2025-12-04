<template>
  <v-container 
    style="
      background-color: #fcf0ef;
      height: 2000px;
      display: grid;
      justify-content: center;
      width: 100%;
      padding-top: 70px;"
  >
    <p
      style="
        font-size: 28px;
        font-weight: 600;
        background-color: red;
        width: 1480px;">
      Juegos Principales
    </p>
    <div v-if="loading" class="alert alert-info">Cargando juegos...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="row">
      <div
        v-for="game in games"
        :key="game.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      >
        <div class="card h-100">
          <!-- 1) Intentar imagen local -->
          <img
            v-if="localImageUrl(game)"
            class="card-img-top"
            :src="localImageUrl(game)"
            alt="Screenshot local"
            @error="
              // si falla la local, que use la de IGDB como fallback
              $event.target.src =
                game.screenshots && game.screenshots.length
                  ? normalizeScreenshot(game.screenshots[0])
                  : ''
            "
          />

          <!-- Si quisieras, podrías dejar un v-else con la de IGDB directamente -->

          <div class="card-body">
            <h5 class="card-title">{{ game.titulo }}</h5>
            <p class="card-text">
              {{ game.sinopsis || "Sin sinopsis disponible" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useGamesStore } from "../stores/gamesStore.js";

const gamesStore = useGamesStore();

onMounted(() => {
  gamesStore.fetchGames();
});
console.log('Juegos:', gamesStore);

const normalizeScreenshot = (url) => {
  if (!url) return "";
  if (url.startsWith("//")) return "https:" + url;
  return url;
};

const localImageUrl = (game) => {
  if (!game.slug) return null;
  return `http://localhost:3000/images/games/${game.slug}.jpg`;
};

const games = computed(() => gamesStore.games);
const loading = computed(() => gamesStore.loading);
const error = computed(() => gamesStore.error);
</script>

<style>
</style>

