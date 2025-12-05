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
        width: 1510px;
        margin: 0 auto;"
    >
      <!-- Título -->
      <p
        style="
          font-size: 30px;
          font-weight: 600;
          padding-inline-start: 16px;
          width: 100%;
          margin-bottom: 6px;"
      >
        Juegos Principales
      </p>
      <!-- Alerta, cargando... -->
      <div 
        v-if="loading" 
        class="alert alert-info"  
        style="
          height: 60px; 
          font-style: italic;"
      >
        Cargando...
      </div>
      <!-- Alerta, no se pudo cargar-->
      <div 
        v-if="error" 
        class="alert alert-danger" 
        style="
          height: 60px; 
          font-style: italic;"
      >
        {{ error }}
      </div>
      <!-- Juegos Principales -->
      <div
        style="
          width: 100%;
          height: auto;
          text-align: center;"
      >
        <button
          v-for="game in games"
          :key="game.id"
          style="
            width: 275px;
            height: 560px;
            margin-top: 0px;
            margin-left: 13px;
            margin-right: 13px;
            margin-bottom: 20px;
            border-radius: 10px;
            display: inline-block;
            vertical-align: top;"
        >
          <div
            style="
              background-color: white;
              height: 560px;
              width: 275px;
              border-radius: 10px;"
          >
            <img
              v-if="localImageUrl(game)"
              :src="localImageUrl(game)"
              alt="Screenshot local"
              @error="$event.target.src = game.screenshots && game.screenshots.length
                ? normalizeScreenshot(game.screenshots[0])
                : ''"
              style="
                height: 380px;
                width: 275px;
                justify-items: center;
                border-radius: 10px 10px 0px 0px;
                border: 2px solid #b1b1b1;"
            />
            <!-- Descripción -->
            <div
              style="
                height: 290px;
                border: 2px solid #b1b1b1;
                border-radius: 0px 0px 10px 10px"
            >
              <!-- Título -->
              <div style="height: 64px;">
                <p
                  style="
                    font-weight: 500;
                    width: 100%;
                    overflow: hidden;
                    height: auto;
                    max-height: 64px;
                    text-align: left;
                    font-size: 20px;
                    padding-left: 5px;
                    padding-right: 10px;"
                >
                  {{ game.titulo }}
                </p>
              </div>
              <!-- Precio -->
              <div 
                style="
                  width: 100%; 
                  text-align: left; 
                  padding-left: 5px;
                  font-size: 18px;"
              >
                <p
                  style="
                    margin: 0px;
                    margin-bottom: -5px;
                    color: #b1b1b1;"
                >
                  Precio
                </p>
                <p
                  style="
                    margin: 0px;
                    font-weight: 500;"
                >
                  {{ game.precio }}.00 MXN
                </p>
              </div>
              <!-- Cuenta favoritos -->
              <div
                class="d-flex"
                style="padding-left: 5px; padding-right: 5px;"
              >  
                <!-- Botón -->
                <div style="font-size: 18px; color: #73e900;">
                  <button class="mdi mdi-heart"></button>
                </div>
                <p
                  style="
                    margin: 0px;
                    font-size: 18px;
                    margin-left: 4px;
                    color: grey;"
                >
                  {{ game.favoritosCount }}
                </p>
              </div>
              <!-- Plataformas -->
              <div style="background-color: rgba(115, 233, 0, 0.5);">
                <i
                  v-for="(iconClass, idx) in platformIconClasses(game)"
                  :key="idx"
                  :class="iconClass"
                  style="
                    font-size: 25px; 
                    margin-right: 8px; 
                    color: grey;"
                ></i>
              </div>
              <!-- Botones if si el cursos pasa sobre el juego -->
              <div 
                style="
                  width: 100%;
                  align-items: center;
                  flex-direction: column;
                  display: flex;
                  margin: 0px;"
              >
                <!-- Botón carrito -->
                <button
                  class="d-flex"
                  style="
                    background-color: #73e900;
                    font-size: 21px;
                    font-weight: 600;
                    margin-top: 10px;
                    color: black;
                    padding-top: 1px;
                    border: 2px solid black;
                    border-radius: 5px;
                    width: 230px;
                    height: 40px;
                    justify-content: center;"
                >
                  <p style="margin: 0px;">Agregar al Carrito</p>
                  <p class="mdi mdi-cart-outline" style="margin: 0px; margin-left: 5px;"></p>
                </button>
                <!-- Botón agregar favorito -->
                <button
                  class="d-flex"
                  style="
                    background-color: #ececec;
                    margin-top: 10px;
                    font-size: 21px;
                    font-weight: 600;
                    padding-top: 1px;
                    border: 2px solid black;
                    border-radius: 5px;
                    width: 230px;
                    height: 40px;
                    justify-content: center;"
                >
                  <p style="margin: 0px;">Agregar a Favoritos</p>
                  <p class="mdi mdi-heart-outline" style="margin: 0px; margin-left: 5px;"></p>
                </button>
              </div>
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

const PLATFORM_ICONS = {
  "PS5": "mdi mdi-sony-playstation",
  "PS4": "mdi mdi-sony-playstation",
  "PS3": "mdi mdi-sony-playstation",
  "PS2": "mdi mdi-sony-playstation",
  "XBOX": "mdi mdi-microsoft-xbox",
  "Xbox 360": "mdi mdi-microsoft-xbox",
  "Xbox One": "mdi mdi-microsoft-xbox",
  "Xbox Series S/X": "mdi mdi-microsoft-xbox",
  "Nintendo Switch": "mdi mdi-nintendo-switch",
  "Nintendo Switch 2": "mdi mdi-nintendo-switch",
  "Wii": "mdi mdi-nintendo-wii",
  "Wii U": "mdi mdi-nintendo-wiiu",
  "PC": "mdi mdi-laptop",
  "Windows": "mdi mdi-microsoft-windows",
  "Linux": "mdi mdi-linux",
  "Steam": "mdi mdi-steam"
}

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

    platformIconClasses(game) {
      if (!game.plataformas) return []

      const uniqueClasses = new Set()

      game.plataformas.forEach(p => {
        const iconClass = PLATFORM_ICONS[p]
        if (iconClass) {
          uniqueClasses.add(iconClass)
        }
      })

      return Array.from(uniqueClasses)
    },
  },

  mounted() {
    this.fetchGames()
  },
}
</script>

<style>
</style>