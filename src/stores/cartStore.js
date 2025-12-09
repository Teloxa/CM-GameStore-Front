import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [], 
  }),

  actions: {
    addToCart(game) {
      const exists = this.items.find((item) => item.id === game.id);

      if (exists) {
        exists.quantity += 1;
      } else {
        this.items.push({
          id: game.id,
          titulo: game.titulo,
          precio: game.precio,
          imagen: game.slug,
          quantity: 1,
        });
      }

      this.saveToLocalStorage();
    },

    removeFromCart(gameId) {
      this.items = this.items.filter((item) => item.id !== gameId);
      this.saveToLocalStorage();
    },

    updateQuantity(gameId, quantity) {
      const item = this.items.find((i) => i.id === gameId);
      if (!item) return;

      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(gameId);
      }

      this.saveToLocalStorage();
    },

    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },

    loadFromLocalStorage() {
      const stored = localStorage.getItem("cart");
      if (stored) {
        this.items = JSON.parse(stored);
      }
    },
  },
});
