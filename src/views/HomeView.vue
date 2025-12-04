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
</template>

<script setup>
import CatalogView from '../views/CatalogView.vue';

</script>

<style>
</style>