<template>
  <div
    style="
      background-color: #fcf0ef; 
      position: sticky;
      top: 0;
      z-index: 1000;
      height: fit-content;
      width: 100%;
      justify-content: center;">
    <!-- Primera parte -->
    <div class="d-flex" style="justify-content: center; padding-left: 0px; margin-bottom: 5px;">
      <!-- App name -->
      <div 
        class="d-flex" 
        style="
          margin-top: -5px;
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
            padding-top: 20px;
            padding-left: 1px;
            font-weight: 700;"
        >
          Game Store
        </p>
      </div>
      <!-- Opciones -->
      <div class="d-flex">
        <div class="d-flex" style="padding-top: 24px; padding-left: 20px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 10px;">Novedades</p>
          <p class="mdi mdi-chevron-down"></p>
        </div>
        <div class="d-flex" style="padding-top: 24px; padding-left: 15px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 10px;">GOtY's</p>
          <p class="mdi mdi-chevron-down"></p>
        </div>
        <div class="d-flex" style="padding-top: 24px; padding-left: 20px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 10px;">Steam</p>
          <p class="mdi mdi-chevron-down"></p>
        </div>
        <div class="d-flex" style="padding-top: 24px; padding-left: 15px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 10px;">Xbox</p>
          <p class="mdi mdi-chevron-down"></p>
        </div>
        <div class="d-flex" style="padding-top: 24px; padding-left: 15px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 10px;">PS</p>
          <p class="mdi mdi-chevron-down"></p>
        </div>
        <div class="d-flex" style="padding-top: 24px; padding-left: 15px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 10px;">Nintendo</p>
          <p class="mdi mdi-chevron-down"></p>
        </div>
        <div class="d-flex" style="padding-top: 24px; padding-left: 15px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 10px;">Suscripciones</p>
          <p class="mdi mdi-chevron-down"></p>
        </div>
        <div class="d-flex" style="padding-top: 24px; padding-left: 15px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 10px;">Tarjetas de Regalo</p>
          <p class="mdi mdi-chevron-down"></p>
        </div>
      </div>
      <!-- Licencia y precios -->
      <div class="d-flex" style="margin-left: 80px;">
        <p style="padding-top: 24px; font-size: 14px; color: #595959; margin-right: 25px; font-weight: 500;">Carrito</p>
        <p style="padding-top: 24px; font-size: 14px; color: #595959; margin-right: 25px; font-weight: 500;">Monedero</p>
      </div>
      <!-- Botón descargas -->
      <button
        style="
          background-color: #73e900;
          height: 45px;
          border-radius: 5px;
          border: 0px;
          margin-top: 14px;
          font-weight: 600;
          width: 240px;
          font-size: 17px;
          padding-top: 0px;">
        Obtén descargas ilimitadas
      </button>
      <!-- foto de perfil -->
      <div>
        <p 
          class="mdi mdi-account-circle"
          style="
            font-size: 35px;
            margin-bottom: 0px;
            margin-top: 10px;
            margin-left: 20px;"  
        >
        </p>
      </div>
    </div>
    <!-- Segunda parte -->
    <div class="d-flex" style="padding-bottom: 15px; justify-content: center;">
      <!-- Search bar -->
      <div 
        class="d-flex"
        style="
          margin-top: 0px;
          padding-left: 20px;
          padding-right: 20px;"
        >
        <div
          class="d-flex" 
          style="
            background-color: white;
            font-size: 16px;
            border: 2px solid #cecece;
            border-right: 0px;
            border-radius: 40px 0px 0px 40px;
            padding-inline-start: 20px;
            padding-inline-end: 20px;
            padding-top: 11px;
            height: 50px;"
        >
          <p style="margin-right: 10px;">
            Todos los artículos
          </p>
          <p class="mdi mdi-chevron-down"></p>
        </div>
        <div 
          class="d-flex"
          style="
            background-color: white;
            font-size: 18px;
            border: 2px solid #cecece;
            border-left: 0px;
            border-radius: 0px 40px 40px 0px;
            padding-inline-start: 0px;
            padding-inline-end: 20px;
            height: 50px;"
        >
          <p
            style="
              font-size: 26px;
              color: #cecece;
              font-weight: 200;"
          >
            |
          </p>
          <p 
            class="mdi mdi-magnify"
            style="
              font-size: 28px;
              padding-top: 1px;
              padding-left: 18px;"
          >
          </p>
          <input 
            type="text"
            placeholder="Buscar"
            style="
              border: 0px;
              font-size: 16px;
              padding-left: 7px;
              width: 910px;
              margin-right: 5px;"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>