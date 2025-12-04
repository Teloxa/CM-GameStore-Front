<template>
  <div 
    style="
      background-color: #fcf0ef;
      height: auto;
      width: 100%;
      padding-top: 60px;"
  >
    <div 
      style="
        background-color: blue; 
        width: 100%;
        max-width: 1480px;
        margin: 0 auto;"
    >
      <p
        style="
          font-size: 30px;
          font-weight: 600;
          width: 1440px;
          margin-bottom: 6px;"
      >
        Juegos Principales
      </p>
      <div 
        v-if="loading" 
        class="alert alert-info"  
        style="
          height: 60px; 
          font-style: italic;"
      >
        Cargando...
      </div>
      <div 
        v-if="error" 
        class="alert alert-danger" 
        style="
          height: 60px; 
          font-style: italic;"
      >
        {{ error }}
      </div>
      <div
        style="
          background-color: red;
          width: 100%;
          text-align: center;"
      >
        <button
          v-for="game in games"
          :key="game.id"
          style="
            width: 275px;
            height: 600px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 10px;"
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
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useGamesStore } from '../stores/gamesStore.js'

export default {
  name: 'CatalogView',

  computed: {
    ...mapState(useGamesStore, ['games', 'loading', 'error']),
  },

  methods: {
    ...mapActions(useGamesStore, ['fetchGames']),

    normalizeScreenshot(url) {
      if (!url) return ''
      if (url.startsWith('//')) return 'https:' + url
      return url
    },

    localImageUrl(game) {
      if (!game || !game.slug) return null
      return `http://localhost:3000/images/games/${game.slug}.jpg`
    },
  },

  mounted() {
    this.fetchGames()
    console.log('Juegos:', this.games)
  },
}
</script>

<style>
</style>