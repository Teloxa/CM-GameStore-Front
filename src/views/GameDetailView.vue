<template>
  <div
    style="
      background-color: #fcf0ef;
      min-height: 100vh;
      width: 100%;
      padding-top: 40px;
      padding-bottom: 60px;"
  >
    <div
      style="
        width: 1510px;
        margin: 0px auto;
        display: flex;
        gap: 30px;"
    >
      <!-- Si está cargando -->
      <div v-if="loading" style="font-style: italic; font-size: 20px;">
        Cargando juego...
      </div>

      <!-- Si hubo error -->
      <div v-else-if="error" style="color: red; font-size: 18px;">
        {{ error }}
      </div>

      <!-- Si no hay juego -->
      <div v-else-if="!game">
        No se encontró el juego.
      </div>

      <!-- Detalle del juego -->
      <div
        v-else
        style="
          display: flex; 
          justify-content: center;
          width: 100%; 
      "
      >
        <!-- Columna izquierda -->
        <div style="width: 300px; margin-right: 30px;">
          <!-- Imagen principal -->
          <div
            style="
              width: 300px;
              height: auto;
              background-color: black;
              border-radius: 10px;
              overflow: hidden;
              border: 2px solid #b1b1b1;"
          >
            <img
              v-if="mainImage"
              :src="mainImage"
              :alt="game.titulo"
              style="
                width: 100%; 
                height: 460px; 
                object-fit: cover;"
            />
          </div>
        </div>

        <!-- Columna derecha -->
        <div 
          style="
            width: 1100px; 
            background-color: white; 
            border-radius: 10px; 
            padding: 20px; 
            border: 1px solid #b1b1b1;"
        >
          <!-- Título -->
          <p 
            style="
              margin: 0px; 
              font-size: 30px; 

              height: 45px; 
              width: 1060px;
              font-weight: 500;"
          >
            {{ game.titulo }}
          </p>
          <!-- Plataformas -->
          <div 
            class="d-flex" 
            style="
              margin-bottom: 0px;  
              height: 36px;"
          >
            <p 
              style="
                font-weight: 600; 
                padding-top: 4px;
                margin-right: 8px;"
            >
              Plataformas:
            </p>
            <i
              v-for="(iconClass, idx) in platformIconClasses(game)"
              :key="idx"
              :class="iconClass"
              style="font-size: 24px; margin-right: 8px; color: grey;"
            ></i>
          </div>
          <!-- Calificación favoritos -->
          <div 
            class="d-flex" 
            style="
              align-items: center; 
              margin-bottom: 5px;
              height: 36px;"
          >
            <div 
              class="d-flex"
              style="
                height: 100%;
                margin-right: 20px;"
            >
              <p style="font-weight: 600; margin: 0px; padding-top: 4px;">Calificación:</p>
              <p style="margin-left: 10px; font-size: 18px; padding-top: 3px;">
                 {{ game.calificacion || 'N/A' }} ⭐
              </p>
            </div>
            <div 
              class="d-flex" 
              style="
                height: 100%;"
            >
              <p style="font-weight: 600; margin: 0px; font-weight: 600; padding-top: 4px;">Favoritos:</p>
              <p style="margin: 0px; margin-left: 5px; margin-right: 5px; padding-top: 4px; font-size: 18px;">{{ game.favoritosCount || 0 }}</p>
              <p class="mdi mdi-heart" style="color: #73e900; font-size: 22px; margin: 0px;"></p>
            </div>
          </div>
          <!-- Precio -->
          <div style="margin-bottom: 10px;">
            <span style="font-weight: 600; color: #b1b1b1;">Precio</span>
            <p style="margin: 0px; font-size: 24px; font-weight: 700;">
              {{ game.precio }}.00 MXN
            </p>
          </div>
          <!-- Sinopsis -->
          <div style="margin-bottom: 10px; height: 160px;">
            <p style="font-weight: 600; margin-bottom: 5px;">
              Sinopsis
            </p>
            <p style="margin: 0px; max-height: 140px; overflow-y: auto;">
              {{ game.sinopsis || 'Sin sinopsis disponible.' }}
            </p>
          </div>
          <!-- Botones de acción -->
          <div style="margin-top: 20px; display: flex; justify-content: end; width: 100%; ">
            <!-- Botón carrito -->
            <button
              class="d-flex "
              style="
                background-color: #73e900;
                font-size: 18px;
                font-weight: 600;
                color: black;
                padding-top: 9px;
                margin-right: 20px;
                border: 2px solid black;
                border-radius: 5px;
                width: 240px;
                height: 50px;
                justify-content: center;
                transition: box-shadow 0.3s ease, transform 0.2s ease;"
                  @mouseover="hoverShop = true" @mouseleave="hoverShop = false"
                  :style="hoverShop ? 'border: 3px solid black; transform: translateY(-2px);' : ''"
            >
              <p style="margin: 0px;">Agregar al Carrito</p>
              <p class="mdi mdi-cart-outline" style="margin: 0px; margin-left: 5px;"></p>
            </button>

            <!-- Botón agregar favorito -->
            <button
              class="d-flex"
              style="
                background-color: #ececec;
                font-size: 18px;
                font-weight: 600;
                padding-top: 9px;
                border: 2px solid black;
                border-radius: 5px;
                width: 240px;
                height: 50px;
                justify-content: center;
                transition: box-shadow 0.3s ease, transform 0.2s ease;"
                  @mouseover="hoverFav = true" @mouseleave="hoverFav = false"
                  :style="hoverFav ? 'border: 3px solid black; transform: translateY(-2px);' : ''"
            >
              <p style="margin: 0px;">Agregar a Favoritos</p>
              <p class="mdi mdi-heart-outline" style="margin: 0px; margin-left: 5px;"></p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGamesStore } from "../stores/gamesStore.js";

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
};

export default {
  name: "GameDetailView",

  data() {
    return {
      hoverShop: false,
      hoverFav: false,

      snackbar: false,
      snackbarMsg: "",
      snackbarColor: '',
    };
  },

  computed: {
    ...mapState(useGamesStore, ["selectedGame", "loading", "error"]),

    game() {
      return this.selectedGame;
    },

    mainImage() {
      if (!this.game) return null;
      // 1) intenta imagen local
      const local = this.localImageUrl(this.game);
      if (local) return local;

      // 2) fallback al primer screenshot
      if (this.game.screenshots && this.game.screenshots.length) {
        return this.normalizeScreenshot(this.game.screenshots[0]);
      }

      return null;
    },

    screenshots() {
      if (!this.game || !this.game.screenshots) return [];
      return this.game.screenshots;
    },

    reviews() {
      if (!this.game) return [];

      // según cómo lo guardes en Firestore: reseñas/resenas, string/array
      if (Array.isArray(this.game.reseñas)) return this.game.reseñas;
      if (Array.isArray(this.game.resenas)) return this.game.resenas;

      if (typeof this.game.reseñas === "string") return [this.game.reseñas];
      if (typeof this.game.resenas === "string") return [this.game.resenas];

      return [];
    },
  },

  methods: {
    ...mapActions(useGamesStore, ["fetchGameById"]),

    normalizeScreenshot(url) {
      if (!url) return "";
      if (url.startsWith("//")) return "https:" + url;
      return url;
    },

    localImageUrl(game) {
      if (!game || !game.slug) return null;
      return `http://localhost:3000/images/games/${game.slug}.jpg`;
    },

    platformIconClasses(game) {
      if (!game || !game.plataformas) return [];
      const uniqueClasses = new Set();
      game.plataformas.forEach((p) => {
        const iconClass = PLATFORM_ICONS[p];
        if (iconClass) uniqueClasses.add(iconClass);
      });
      return Array.from(uniqueClasses);
    },

    setMainImage(shot) {
      // si quieres que cambie la imagen principal al hacer click en un screenshot
      if (!shot) return;
      const url = this.normalizeScreenshot(shot);
      const img = document.querySelector("img[alt='" + this.game.titulo + "']");
      if (img) img.src = url;
    },
  },

  async mounted() {
    const id = this.$route.params.id;
    if (id) {
      await this.fetchGameById(id);
      console.log("🎮 Detalle de juego cargado:", this.game);
    }
  },
};
</script>

<style>
.game-actions {
  transition: all 0.2s ease;
  cursor: pointer;
}

.game-actions:hover {
  transform: scale(1.03);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  filter: brightness(1.05);
}
</style>
