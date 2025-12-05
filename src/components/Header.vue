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
      <div class="d-flex options-actions">
        <button class="d-flex" style="padding-top: 24px; padding-left: 25px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 6px;">Windows</p>
          <p class="mdi mdi-microsoft-windows" style="font-size: 22px; margin-top: -6px;"></p>
        </button>
        <button class="d-flex" style="padding-top: 24px; padding-left: 25px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 6px;">Steam</p>
          <p class="mdi mdi-steam" style="font-size: 22px; margin-top: -6px;"></p>
        </button>
        <button class="d-flex" style="padding-top: 24px; padding-left: 25px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 6px;">Xbox</p>
          <p class="mdi mdi-microsoft-xbox" style="font-size: 22px; margin-top: -6px;"></p>
        </button>
        <button class="d-flex" style="padding-top: 24px; padding-left: 25px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 6px;">PS</p>
          <p class="mdi mdi-sony-playstation" style="font-size: 22px; margin-top: -6px;"></p>
        </button>
        <button class="d-flex" style="padding-top: 24px; padding-left: 25px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 6px;">Nintendo</p>
          <p class="mdi mdi-nintendo-switch" style="font-size: 22px; margin-top: -6px;"></p>
        </button>
        <button class="d-flex" style="padding-top: 24px; padding-left: 25px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 6px;">Suscripciones</p>
          <p class="mdi mdi-package-variant-plus" style="font-size: 22px; margin-top: -6px;"></p>
        </button>
        <button class="d-flex" style="padding-top: 24px; padding-left: 25px; font-size: 14px; color: #595959; font-weight: 500;">
          <p style="margin-right: 6px;">Tarjetas de Regalo</p>
          <p class="mdi mdi-wallet-giftcard" style="font-size: 22px; margin-top: -6px;"></p>
        </button>
      </div>
      <!-- Carrito -->
      <button class="d-flex shop" style="margin-left: 130px;">
        <p style="padding-top: 24px; font-size: 14px; color: #595959; margin-right: 10px; font-weight: 500;">Carrito</p>
        <p class="mdi mdi-cart-outline" style="font-size: 22px; margin-top: -6px; padding-top: 24px; margin-right: 20px;"></p>
      </button>
      <!-- Identifícate -->
      <button
        class="login"
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
        Idenfitícate o Regístrate
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
            font-size: 18px;
            border: 2px solid #cecece;
            border-radius: 40px;
            padding-inline-start: 0px;
            padding-inline-end: 20px;
            height: 50px;"
        >
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

<style>
.options-actions button {
  transition: all 0.2s ease;
  cursor: pointer;
}

.options-actions button:hover {
  transform: scale(1.03);
  filter: brightness(1.05);
}

.shop:hover {
  transform: scale(1.03);
  filter: brightness(1.05);
}

.login:hover {
  transform: scale(1.03);
  filter: brightness(1.05);
}
</style>