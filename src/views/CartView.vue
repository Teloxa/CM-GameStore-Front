<template>
  <div
    style="
      background-color: #fcf0ef;
      min-height: 100vh;
      padding: 40px 0;"
  >
    <div style="width: 1200px; margin: 0 auto;">
      <h2 style="font-size: 32px; font-weight: 600; margin-bottom: 20px;">
        Carrito de compras
      </h2>

      <!-- Si no hay nada en el carrito -->
      <div v-if="!cart.items.length">
        <p style="font-size: 18px;">
          Tu carrito está vacío 
        </p>
      </div>

      <!-- Si hay productos -->
      <div v-else>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="border-bottom: 2px solid #ddd; text-align: left;">
              <th style="padding: 10px;">Producto</th>
              <th style="padding: 10px;">Precio</th>
              <th style="padding: 10px;">Cantidad</th>
              <th style="padding: 10px;">Subtotal</th>
              <th style="padding: 10px;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in cart.items"
              :key="item.id"
              style="border-bottom: 1px solid #eee;"
            >
              <td style="padding: 10px; display: flex; align-items: center;">
                <img
                  v-if="item.imagen"
                  :src="`http://localhost:3000/images/games/${item.imagen}.jpg`"
                  alt=""
                  style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-right: 12px;"
                />
                <span style="font-size: 18px;">{{ item.titulo }}</span>
              </td>
              <td style="padding: 10px;">
                {{ item.precio }} MXN
              </td>
              <td style="padding: 10px;">
                <button @click="cart.updateQuantity(item.id, item.quantity - 1)" style="width: 28px;">-</button>
                <span style="margin: 0 8px;">{{ item.quantity }}</span>
                <button @click="cart.updateQuantity(item.id, item.quantity + 1)" style="width: 28px;">+</button>
              </td>
              <td style="padding: 10px;">
                {{ item.precio * item.quantity }} MXN
              </td>
              <td style="padding: 10px;">
                <button @click="cart.removeFromCart(item.id)">
                  Quitar
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          style="
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 20px;"
        >
          <div style="font-size: 18px;">
            <p style="margin: 0;">
              Artículos: <strong>{{ totalItems }}</strong>
            </p>
            <p style="margin: 0;">
              Total: <strong>{{ totalPrice }} MXN</strong>
            </p>
          </div>
          <button @click="cart.clearCart()">
            Vaciar carrito
          </button>
          <button style="background-color: #73e900; padding: 8px 18px; border-radius: 6px; border: 1px solid #000;">
            Proceder al pago 
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cart = useCartStore()

onMounted(() => {
  cart.loadFromLocalStorage()
})

const totalItems = computed(() => cart.items.reduce((acc, i) => acc + i.quantity, 0))
const totalPrice = computed(() =>
  cart.items.reduce((acc, i) => acc + i.quantity * i.precio, 0)
)
</script>
