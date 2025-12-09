<template>
  <div 
    style="
      background-color: #fcf0ef;
      height: auto;
      width: 100%;
      padding-top: 60px;
      padding-bottom: 100px;"
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

      <!-- Juegos principales -->
      <div
        style="
          width: 100%;
          height: 1160px;
          overflow: hidden;
          text-align: center;"
      >
        <div
          v-for="game in filteredGames"
          :key="game.id"
          class="game-card"
          @click="goToGame(game.id)"
        >
          <div class="game-card-inner">
            <img
              v-if="localImageUrl(game)"
              :src="localImageUrl(game)"
              alt="Screenshot local"
              @error="
                $event.target.src =
                  game.screenshots && game.screenshots.length
                    ? normalizeScreenshot(game.screenshots[0])
                    : ''
              "
              class="game-image"
            />
            <div
              v-if="isFavorite(game.id)"
              class="favorite-banner"
            >
              ★ En favoritos
            </div>

            <div class="game-info">
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
              <div style="background-color: rgba(115, 233, 0, 0.5); padding: 3px 5px;">
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

              <!-- Botones -->
              <div class="game-actions">
                <!-- Botón carrito -->
                <button
                  class="d-flex"
                  @click.stop="handleAddToCart(game)"
                  style="
                    background-color: #73e900;
                    font-size: 18px;
                    font-weight: 600;
                    margin-top: 10px;
                    color: black;
                    padding-top: 4px;
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
                  v-if="!isFavorite(game.id)"
                  class="d-flex"
                  @click.stop="handleAddFavorite(game)"
                  style="
                    background-color: #ececec;
                    margin-top: 8px;
                    font-size: 18px;
                    font-weight: 600;
                    padding-top: 4px;
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
        </div>
      </div>

      <!-- Juegos mejor calificados -->
      <div
        style="
          margin-top: 50px;
          width: 100%;
          height: 1260px;
          overflow: hidden;
          text-align: center;"
      >
        <!-- Título -->
        <p
          style="
            font-size: 30px;
            font-weight: 600;
            padding-inline-start: 16px;
            width: 100%;
            margin-bottom: 6px;
            text-align: left;"
        >
          Mejor calificados
        </p>

        <div
          v-for="game in filteredTopRatedGames"
          :key="game.id"
          class="game-card"
          @click="goToGame(game.id)"
        >
          <div class="game-card-inner">
            <img
              v-if="localImageUrl(game)"
              :src="localImageUrl(game)"
              alt="Screenshot local"
              @error="
                $event.target.src =
                  game.screenshots && game.screenshots.length
                    ? normalizeScreenshot(game.screenshots[0])
                    : ''
              "
              class="game-image"
            />
            <div
              v-if="isFavorite(game.id)"
              class="favorite-banner"
            >
              ★ En favoritos
            </div>

            <div class="game-info">
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
              <div style="background-color: rgba(115, 233, 0, 0.5); padding: 3px 5px;">
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

              <!-- Botones -->
              <div class="game-actions">
                <!-- Botón carrito -->
                <button
                  class="d-flex"
                  @click.stop="handleAddToCart(game)"
                  style="
                    background-color: #73e900;
                    font-size: 18px;
                    font-weight: 600;
                    margin-top: 10px;
                    color: black;
                    padding-top: 4px;
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
                  v-if="!isFavorite(game.id)"
                  class="d-flex"
                  @click.stop="handleAddFavorite(game)"
                  style="
                    background-color: #ececec;
                    margin-top: 8px;
                    font-size: 18px;
                    font-weight: 600;
                    padding-top: 4px;
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
        </div>
      </div>

      <!-- Suscripciones -->
      <div
        style="
          background-color: rgba(115, 233, 0, 0.5);
          width: 100%;
          padding-top: 10px;
          height: 535px;
          overflow: hidden;
          text-align: center;"
      >
        <!-- Título -->
        <p
          style="
            font-size: 30px;
            font-weight: 600;
            padding-inline-start: 16px;
            width: 100%;
            margin-bottom: 6px;
            text-align: left;"
        >
          Suscripciones
        </p>

        <!-- Suscripcion 1 -->
        <button class="suscripcion-card">
          <div class="suscripcion-card-inner">
            <img
              alt="Screenshot local"
              class="game-image"
              src="/imgs/amazon.jpg"
            />
            <div class="suscripcion-info">
              <div style="height: 40px;">
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
                  Amazon
                </p>
              </div>
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
                  50.00 MXN - 20,000 MXN
                </p>
              </div>
            </div>
          </div>
        </button>

        <!-- Suscripcion 2 -->
        <button class="suscripcion-card">
          <div class="suscripcion-card-inner">
            <img
              alt="Screenshot local"
              class="game-image"
              src="/imgs/netflix.jpg"
            />
            <div class="suscripcion-info">
              <div style="height: 40px;">
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
                  Netflix
                </p>
              </div>
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
                  300.00 MXN - 1,000 MXN
                </p>
              </div>
            </div>
          </div>
        </button>

        <!-- Suscripcion 3 -->
        <button class="suscripcion-card">
          <div class="suscripcion-card-inner">
            <img
              alt="Screenshot local"
              class="game-image"
              src="/imgs/apple.jpg"
            />
            <div class="suscripcion-info">
              <div style="height: 40px;">
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
                  iTunes
                </p>
              </div>
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
                  60.00 MXN - 2,000 MXN
                </p>
              </div>
            </div>
          </div>
        </button>

        <!-- Suscripcion 4 -->
        <button class="suscripcion-card">
          <div class="suscripcion-card-inner">
            <img
              alt="Screenshot local"
              class="game-image"
              src="/imgs/spotify.jpg"
            />
            <div class="suscripcion-info">
              <div style="height: 40px;">
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
                  Spotify
                </p>
              </div>
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
                  130.00 MXN - 1,350 MXN
                </p>
              </div>
            </div>
          </div>
        </button>

        <!-- Suscripcion 5 -->
        <button class="suscripcion-card">
          <div class="suscripcion-card-inner">
            <img
              alt="Screenshot local"
              class="game-image"
              src="/imgs/discord.jpg"
            />
            <div class="suscripcion-info">
              <div style="height: 40px;">
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
                  Discord Nitro
                </p>
              </div>
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
                  150.00 MXN - 1,500 MXN
                </p>
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
import { useUserStore } from '../stores/userStore.js'
import { useFavoritesStore } from '../stores/favoritesStore.js'
import { useSearchStore } from '../stores/searchStore.js'
import { useCartStore } from '../stores/cartStore.js'

const PLATFORM_ICONS = {
  PS5: 'mdi mdi-sony-playstation',
  PS4: 'mdi mdi-sony-playstation',
  PS3: 'mdi mdi-sony-playstation',
  PS2: 'mdi mdi-sony-playstation',
  XBOX: 'mdi mdi-microsoft-xbox',
  'Xbox 360': 'mdi mdi-microsoft-xbox',
  'Xbox One': 'mdi mdi-microsoft-xbox',
  'Xbox Series S/X': 'mdi mdi-microsoft-xbox',
  'Nintendo Switch': 'mdi mdi-nintendo-switch',
  'Nintendo Switch 2': 'mdi mdi-nintendo-switch',
  Wii: 'mdi mdi-nintendo-wii',
  'Wii U': 'mdi mdi-nintendo-wiiu',
  PC: 'mdi mdi-laptop',
  Windows: 'mdi mdi-microsoft-windows',
  Linux: 'mdi mdi-linux',
  Steam: 'mdi mdi-steam'
}

export default {
  name: 'CatalogView',

  computed: {
    // juegos, loading, error
    ...mapState(useGamesStore, ['games', 'loading', 'error']),
    // usuario actual
    ...mapState(useUserStore, ['currentUser']),
    // ids de favoritos
    ...mapState(useFavoritesStore, ['favoriteIds']),
    // texto que viene del buscador
    ...mapState(useSearchStore, { searchTerm: 'term' }),

    // TOP 10 mejor calificados (sin filtro)
    topRatedGames() {
      if (!this.games || !this.games.length) return []

      return [...this.games]
        .sort((a, b) => {
          const ca = Number(a.calificacion) || 0
          const cb = Number(b.calificacion) || 0
          return cb - ca
        })
        .slice(0, 10)
    },

    // Lista principal filtrada
    filteredGames() {
      const term = (this.searchTerm || '').trim().toLowerCase()

      if (!term) return this.games

      return this.games.filter((game) => {
        const titulo = (game.titulo || '').toLowerCase()
        const plataformas = Array.isArray(game.plataformas)
          ? game.plataformas.join(' ').toLowerCase()
          : ''
        const precio = String(game.precio || '')

        return (
          titulo.includes(term) ||
          plataformas.includes(term) ||
          precio.includes(term)
        )
      })
    },

    // Lista “Mejor calificados” filtrada
    filteredTopRatedGames() {
      const term = (this.searchTerm || '').trim().toLowerCase()
      const base = this.topRatedGames

      if (!term) return base

      return base.filter((game) => {
        const titulo = (game.titulo || '').toLowerCase()
        const plataformas = Array.isArray(game.plataformas)
          ? game.plataformas.join(' ').toLowerCase()
          : ''
        const precio = String(game.precio || '')

        return (
          titulo.includes(term) ||
          plataformas.includes(term) ||
          precio.includes(term)
        )
      })
    }
  },

  methods: {
    ...mapActions(useGamesStore, ['fetchGames']),
    ...mapActions(useFavoritesStore, ['loadFavorites', 'addFavorite']),

    normalizeScreenshot(rawUrl) {
      if (!rawUrl) return ''
      if (rawUrl.startsWith('//')) return 'https:' + rawUrl
      return rawUrl
    },

    localImageUrl(game) {
      if (!game || !game.slug) return null
      return `http://localhost:3000/images/games/${game.slug}.jpg`
    },

    platformIconClasses(game) {
      if (!game || !Array.isArray(game.plataformas)) return []

      const uniqueClasses = new Set()

      game.plataformas.forEach((platform) => {
        const iconClass = PLATFORM_ICONS[platform]
        if (iconClass) {
          uniqueClasses.add(iconClass)
        }
      })

      return Array.from(uniqueClasses)
    },

    goToGame(id) {
      this.$router.push({ name: 'game-detail', params: { id } })
      window.scrollTo({ top: 0, behavior: 'auto' })
    },

    isFavorite(gameId) {
      const idStr = String(gameId)
      const arr = Array.isArray(this.favoriteIds) ? this.favoriteIds : []
      return arr.includes(idStr)
    },

    async handleAddFavorite(game) {
      console.log('CLICK FAVORITO sobre:', game.id, game.titulo)

      if (!this.currentUser) {
        console.log('No hay usuario, redirigiendo a login')
        this.$router.push({ name: 'login' })
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }

      if (this.isFavorite(game.id)) {
        console.log('Ya está en favoritos, no hago nada')
        return
      }

      try {
        await this.addFavorite(game)
        console.log('Juego agregado a favoritos en store')
      } catch (e) {
        console.error('Error en handleAddFavorite:', e)
      }
    },

    handleAddToCart(game) {
        const cartStore = useCartStore();
        cartStore.addToCart(game);

        console.log("Agregado al carrito:", game.titulo);

      if (window.$toast && typeof window.$toast.show === "function") {
      window.$toast.show(`"${game.titulo}" agregado al carrito`);
     } else {
     console.warn("Toast no disponible", window.$toast);
     }
   }
  },

  async mounted() {
    await this.fetchGames()

    if (this.currentUser) {
      await this.loadFavorites()
      console.log('Favoritos cargados en mounted Catalog:', this.favoriteIds)
    }
  }
}
</script>

<style>
.game-card {
  width: 275px;
  height: 560px;
  margin: 0 13px 20px;
  border-radius: 10px;
  display: inline-block;
  vertical-align: top;
  padding: 0;
  border: none;
  background: transparent;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.game-card-inner {
  background-color: white;
  height: 100%;
  width: 100%;
  border-radius: 10px;
}

.game-image {
  height: 380px;
  width: 275px;
  border-radius: 10px 10px 0 0;
  border: 2px solid #b1b1b1;
  display: block;
  object-fit: cover;
}

.game-info {
  height: 304px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  border-left: 2px solid #b1b1b1;
  border-right: 2px solid #b1b1b1;
  border-bottom: 2px solid #b1b1b1;
  border-radius: 0 0 10px 10px;
  padding-bottom: 10px;
  transform: translateY(120px);
  transition: transform 0.25s ease-out;
}

.game-card:hover .game-info {
  transform: translateY(0);
}

.game-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6px;
}

.game-actions button {
  transition: all 0.2s ease;
  cursor: pointer;
}

.game-actions button:hover {
  transform: scale(1.03);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  filter: brightness(1.05);
}

.suscripcion-card {
  width: 275px;
  height: 450px;
  margin: 0 13px 20px;
  border-radius: 10px;
  display: inline-block;
  vertical-align: top;
  padding: 0;
  border: none;
  background: transparent;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.suscripcion-card-inner {
  background-color: white;
  height: 100%;
  width: 100%;
  border-radius: 10px;
}

.suscripcion-info {
  height: 220px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  border-left: 2px solid #b1b1b1;
  border-right: 2px solid #b1b1b1;
  border-bottom: 2px solid #b1b1b1;
  border-radius: 0 0 10px 10px;
  padding-bottom: 10px;
  transform: translateY(120px);
  transition: transform 0.25s ease-out;
}

.favorite-banner {
  position: absolute;
  top: 10px;
  left: -40px;
  background-color: #73e900;
  color: black;
  font-weight: 700;
  padding: 4px 40px;
  transform: rotate(-20deg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  z-index: 2;
}
</style>
