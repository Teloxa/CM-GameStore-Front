<template>
  <div
    style="
      background-color: #fcf0ef;
      height: auto;
      width: 100%;
      justify-content: center;"
  >
    <!-- Banner ofertas -->
    <div 
      class="d-flex" 
      style="
        background-color: #73e900;
        height: 60px;
        font-size: 20px;
        font-weight: 500;
        justify-content: center;
        padding-top: 13px;"
    >
      <p>Aprovecha nuestros descuentos en toda la tienda, del 3 al 24 de noviembre del 2025</p>
      <p class="mdi mdi-percent" style="margin-left: 10px;"></p>
    </div>
    <!-- Imagen Promocional -->
    <div 
      class="d-flex"
      style="
        width: 100%;
        justify-content: center;
        margin-top: 20px;"
    >
      <img 
        src="/public/imgs//promo-banner.png"
        style="
          border-radius: 10px;
          width: 1480px;"
      >
    </div>
  </div>
  <CatalogView />
  <div
    style="
      background-color: #fcf0ef;
      height: 250px;
      text-align: center;"
  >
    <p 
      style="
        font-size: 40px;
        font-weight: 600;"
    >
      Con la confianza de las mejores marcas y compañías
    </p>
    <!-- Marcas -->
    <div 
      style="
        height: 130px;
        width: 100%; 
        text-align: center; 
        display: flex;
        flex-direction: column;
        align-items: center;"
    >
      <div class="d-flex">
        <img src="/imgs/linux.jpg" alt="" style="height: 200px; margin-right: 40px; margin-top: -40px;">
        <img src="/imgs/microsoft.png" alt="" style="height: 50px; margin-top: 30px;">
        <img src="/imgs/nintendo.png" alt="" style="height: 50px; margin-top: 30px; margin-left: 40px;">
        <img src="/imgs/sony.png" alt="" style="height: 30px; margin-top: 38px; margin-left: 40px;">
        <img src="/imgs/steam.png" alt="" style="height: 80px; margin-top: 14px; margin-left: 40px;">
      </div>
    </div>
  </div>
</template>

<script setup>
import CatalogView from '../views/CatalogView.vue';

</script>

<style>
</style>