<template>
  <!-- 1era parte de abajo -->
  <div style="background-color: #454545;">
    <!-- Botón Inicio de página -->
    <button 
      class="underline-hover" 
      @click="Top"
      style="
        background-color: #636363; 
        width: 100%; 
        height: 40px; 
        margin-bottom: 0px;
        color: #ebebeb; 
        font-size: 23px; 
        transition: box-shadow 0.3s ease, transform 0.2s ease;"
      @mouseover="hoverTop = true" @mouseleave="hoverTop = false"
      :style="hoverTop ? 'transform: translateY(-1px);' : ''"
    >
      Inicio de página
    </button>
    <!-- Resto de botones -->
    <div 
      class="d-flex" 
      style="
        padding-top: 40px; 
        padding-bottom: 20px;
        height: fit-content; 
        width: 100%; 
        justify-content: center;"
    >
      <!-- Conócenos -->
      <div style="width: 240px; height: fit-content;">
        <p 
          style="
            font-size: 19px;
            color: #ebebeb;
            width: 100%;"
        >
          Conócenos
        </p>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px;
            width: 100%;
            text-align: left;"
        >
          Trabajar con Game Store
        </button>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px;
            width: 100%;
            text-align: left;"
        >
          Acerca de Game Store
        </button>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px;
            width: 100%;
            text-align: left;"
        >
          Información cooporativa
        </button>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px;
            width: 100%;
            text-align: left;"
        >
          Cómputo en la nube
        </button>
      </div>
      <!-- Ayuda -->
      <div style="width: 240px; height: fit-content;">
        <p 
          style="
            font-size: 19px;
            color: #ebebeb;
            width: 100%;"
        >
          Ayuda
        </p>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px; 
            width: 100%;
            text-align: left;"
        >
          ¿Cómo comprar?
        </button>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px;
            width: 100%;
            text-align: left;"
        >
          ¿Cómo canjear?
        </button>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px;
            width: 100%;
            text-align: left;"
        >
          Gestionar contenido
        </button>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px;
            width: 100%;
            text-align: left;"
        >
          Preguntas frecuentes
        </button>
      </div>
      <!-- Manejo -->
      <div style="width: 240px; height: fit-content;">
        <p 
          style="
            font-size: 19px;
            color: #ebebeb;
            width: 100%;"
        >
          Manejo de la página
        </p>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px; 
            width: 100%;
            text-align: left;">
          Sorteos
        </button>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px;
            width: 100%;
            text-align: left;"
        >
          Noticias de gaming
        </button>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px;
            width: 100%;
            text-align: left;"
        >
          Colecciones
        </button>
        <button 
          class="underline-hover" 
          style="
            color: #afafaf; 
            margin-bottom: 4px;
            width: 100%;
            text-align: left;"
        >
          Términos y condiciones 
        </button>
      </div>
      <!-- Contáctanos -->
      <div style="width: 250px; height: fit-content;">
        <p 
          style="
            font-size: 19px;
            color: #ebebeb;
            width: 100%;"
        >
          Contáctanos
        </p>
        <!-- Email -->
        <a
          style="
            text-decoration: none;
            color: #afafaf;"
        >
          <div 
            class="d-flex mdi mdi-email" 
            style="
              width: 100%; 
              height: 22px;
              margin-bottom: 7px;"
          >
            gamestore@outlook.com
          </div>
        </a>
          
        <!-- Número -->
        <button 
          class="underline-hover mdi mdi-phone" 
          style="
            color: #afafaf; 
            width: 100%; 
            text-align: left;
            height: 0px;
            margin-bottom: 28px;"
        >
          464 584 1786
        </button>
 
        <!-- Fb -->
        <button 
          class="underline-hover mdi mdi-facebook"
          style="
            color: #afafaf; 
            width: 100%; 
            text-align: left;
            height: 0px;
            margin-bottom: 28px;"
        >
          Game Store
        </button>

        <!-- Ig -->
        <button 
          class="underline-hover mdi mdi-instagram" 
          style="
            color: #afafaf; 
            width: 100%; 
            text-align: left;
            height: 0px;
            margin-bottom: 27px;"
        >
          gamestoremx
        </button>
      </div>
    </div>
  </div>

  <!-- 2da parte de abajo -->
  <div 
    class="d-flex" 
    style="
      background-color: #262626; 
      height: 70px; 
      width: 100%; 
      justify-content: space-between;"
  > 
    <!-- App name -->
    <div 
      class="d-flex" 
      style="
        margin-top: 0px;
        margin-bottom: 0px;
        margin-left: 10px;
        padding-left: 0px;
        padding-right: 20px;"
    >
      <p 
        class="mdi mdi-controller" 
        style="
          margin-top: 0px;
          margin-bottom: 0px;
          font-size: 45px;
          color: #73e900;"
      ></p>
      <p 
        style="
          margin-top: 0px;
          margin-bottom: 0px;
          font-size: 22px;
          color: white;
          padding-top: 20px;
          padding-left: 1px;
          font-weight: 700;"
      >
        Game Store
      </p>
    </div>
    <div 
      class="d-flex" 
      style="
        padding-top: 8px; 
        margin-right: 10px;"
    >
      <img 
        style="height: 45px;"
      >
      <button 
        class="underline-hover" 
        style="
          color: #ebebeb;
          margin-left: 10px;
          margin-top: 10px;"
      >
        Cómputo en la Nube 2025
      </button>
    </div>
  </div>
  
</template>

<script>

export default {
  data() {
    return {
      hoverTop: false,
      hoverMeet1: false,
      hoverEmail: false,
    }
  },
  methods: {
    Top() {
      window.scrollTo({ top: 0, behavior: 'auto' });
    },
  }
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.image-container {
  display: flex;
  justify-content: center;
}

.cat-img {
  max-height: 3.5rem;
}

.underline-hover {
  color: #afafaf;
  background: none;
  border: none;
  margin-bottom: 20px;
  cursor: pointer;
  transition: text-decoration 0.2s ease;
}

.underline-hover-end {
  color: #afafaf;
  background: none;
  border: none;
  cursor: pointer;
  transition: text-decoration 0.2s ease;
}

.underline-hover:hover {
  text-decoration: underline;
}

</style>

