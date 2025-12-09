<template>
  <section class="pos-view">
    <div class="pos-container">
      <!-- Left: Product Selection & Search -->
      <div class="products-section">
        <div class="section-header">
          <h2>Product Selection</h2>
          <div class="search-filter">
            <input type="text" placeholder="Search products..." class="search-input" />
            <select class="category-select">
              <option>All Categories</option>
              <option>Consoles</option>
              <option>Games</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>

        <div class="products-grid">
          <article
            v-for="product in products"
            :key="product.id"
            class="product-item"
            @click="addToCart(product)"
          >
            <div class="product-badge">{{ product.stock }} in stock</div>
            <div class="product-icon">{{ product.icon }}</div>
            <h4>{{ product.name }}</h4>
            <p class="product-category">{{ product.category }}</p>
            <p class="product-price">${{ product.price.toFixed(2) }}</p>
            <button class="add-btn">Add to Cart</button>
          </article>
        </div>
      </div>

      <!-- Right: Cart & Checkout -->
      <div class="checkout-section">
        <div class="section-header sticky">
          <h2>Current Order</h2>
          <span class="item-count">{{ cartItems.length }} items</span>
        </div>

        <div class="cart-items">
          <div v-if="cartItems.length === 0" class="empty-cart">
            <p>No items added yet</p>
          </div>
          <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <div class="item-info">
              <h5>{{ item.name }}</h5>
              <p class="item-price">${{ item.price.toFixed(2) }}</p>
            </div>
            <div class="item-controls">
              <button @click="decrementItem(index)" class="qty-btn">−</button>
              <span class="qty">{{ item.qty }}</span>
              <button @click="incrementItem(index)" class="qty-btn">+</button>
            </div>
            <div class="item-total">${{ (item.qty * item.price).toFixed(2) }}</div>
            <button @click="removeItem(index)" class="remove-btn">✕</button>
          </div>
        </div>

        <div class="order-summary">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Tax ({{ taxRate }}%)</span>
            <span>${{ tax.toFixed(2) }}</span>
          </div>
          <div v-if="discount > 0" class="summary-row discount">
            <span>Discount</span>
            <span>-${{ discount.toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <div class="admin-controls">
          <input
            v-model.number="discountValue"
            type="number"
            placeholder="Discount %"
            class="discount-input"
          />
          <button @click="applyDiscount" class="discount-btn">Apply Discount</button>
        </div>

        <div class="payment-methods">
          <h4>Payment Method</h4>
          <div class="payment-options">
            <button
              :class="{ active: paymentMethod === 'cash' }"
              @click="paymentMethod = 'cash'"
              class="payment-btn"
            >
              💵 Cash
            </button>
            <button
              :class="{ active: paymentMethod === 'card' }"
              @click="paymentMethod = 'card'"
              class="payment-btn"
            >
              💳 Card
            </button>
            <button
              :class="{ active: paymentMethod === 'digital' }"
              @click="paymentMethod = 'digital'"
              class="payment-btn"
            >
              📱 Digital
            </button>
          </div>
        </div>

        <button
          :disabled="cartItems.length === 0"
          class="checkout-btn"
          @click="completeTransaction"
        >
          Complete Transaction
        </button>
        <button class="clear-btn" @click="clearCart">Clear Order</button>
      </div>
    </div>

    <!-- Transaction Summary Modal -->
    <div v-if="showTransactionModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Transaction Receipt</h2>
          <button class="close-btn" @click="closeModal">✕</button>
        </div>

        <div class="receipt">
          <div class="receipt-header">
            <h3>GameStore Admin</h3>
            <p>Receipt #{{ transactionId }}</p>
            <p class="date">{{ transactionDate }}</p>
          </div>

          <div class="receipt-items">
            <div class="receipt-title">Items Purchased</div>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cartItems" :key="index">
                  <td>{{ item.name }}</td>
                  <td class="text-center">{{ item.qty }}</td>
                  <td class="text-right">${{ item.price.toFixed(2) }}</td>
                  <td class="text-right">${{ (item.qty * item.price).toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="receipt-summary">
            <div class="summary-line">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div v-if="discount > 0" class="summary-line discount">
              <span>Discount ({{ discountValue }}%)</span>
              <span>-${{ discount.toFixed(2) }}</span>
            </div>
            <div class="summary-line">
              <span>Tax ({{ taxRate }}%)</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="summary-line total">
              <span>Total Amount</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>

          <div class="receipt-payment">
            <div class="payment-info">
              <span class="label">Payment Method:</span>
              <span class="value">{{ paymentMethodLabel }}</span>
            </div>
            <div class="payment-status">
              <div class="status-badge success">✓ Transaction Successful</div>
            </div>
          </div>

          <div class="receipt-footer">
            <p>Thank you for your purchase!</p>
            <p class="small">Please keep this receipt for your records</p>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn-print" @click="printReceipt">🖨️ Print Receipt</button>
          <button class="btn-new" @click="newTransaction">Start New Transaction</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { id: 1, name: 'PlayStation 5', category: 'Consoles', price: 499.99, stock: 5, icon: '🎮' },
  { id: 2, name: 'Xbox Series X', category: 'Consoles', price: 499.99, stock: 3, icon: '🎮' },
  { id: 3, name: 'Elden Ring', category: 'Games', price: 59.99, stock: 15, icon: '⚔️' },
  {
    id: 4,
    name: 'DualSense Controller',
    category: 'Accessories',
    price: 74.99,
    stock: 20,
    icon: '🎮',
  },
  { id: 5, name: 'Gaming Headset', category: 'Accessories', price: 149.99, stock: 12, icon: '🎧' },
  { id: 6, name: 'Gift Card $100', category: 'Gift', price: 100, stock: 50, icon: '🎁' },
  { id: 7, name: 'Switch OLED', category: 'Consoles', price: 349.99, stock: 4, icon: '📱' },
  { id: 8, name: 'Pro Controller', category: 'Accessories', price: 69.99, stock: 18, icon: '🎮' },
])

const cartItems = ref([])
const taxRate = ref(8)
const discountValue = ref(0)
const discount = ref(0)
const paymentMethod = ref('cash')
const showTransactionModal = ref(false)
const transactionId = ref('')
const transactionDate = ref('')

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.qty * item.price, 0)
})

const tax = computed(() => {
  return (subtotal.value - discount.value) * (taxRate.value / 100)
})

const total = computed(() => {
  return subtotal.value - discount.value + tax.value
})

const paymentMethodLabel = computed(() => {
  const methods = {
    cash: '💵 Cash',
    card: '💳 Credit/Debit Card',
    digital: '📱 Digital Payment',
  }
  return methods[paymentMethod.value] || paymentMethod.value
})

const addToCart = (product) => {
  const existing = cartItems.value.find((item) => item.id === product.id)
  if (existing) {
    existing.qty++
  } else {
    cartItems.value.push({ ...product, qty: 1 })
  }
}

const incrementItem = (index) => {
  cartItems.value[index].qty++
}

const decrementItem = (index) => {
  if (cartItems.value[index].qty > 1) {
    cartItems.value[index].qty--
  } else {
    removeItem(index)
  }
}

const removeItem = (index) => {
  cartItems.value.splice(index, 1)
}

const applyDiscount = () => {
  discount.value = (subtotal.value * discountValue.value) / 100
}

const completeTransaction = () => {
  // Generate transaction ID and date
  transactionId.value = 'TXN-' + Date.now()
  transactionDate.value = new Date().toLocaleString()
  showTransactionModal.value = true
}

const closeModal = () => {
  showTransactionModal.value = false
}

const printReceipt = () => {
  window.print()
}

const newTransaction = () => {
  clearCart()
  closeModal()
}

const clearCart = () => {
  cartItems.value = []
  discountValue.value = 0
  discount.value = 0
}
</script>

<style scoped>
.pos-view {
  width: 100%;
  height: 100%;
  background: #0b0c10;
  color: #e2e8f0;
  padding: 0;
  border: none;
  border-radius: 0;
}

.pos-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  height: 100%;
  padding: 1.5rem;
  overflow: hidden;
}

.products-section,
.checkout-section {
  display: flex;
  flex-direction: column;
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 800;
}

.item-count {
  background: #2563eb;
  color: #fff;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
}

.search-filter {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.search-input,
.category-select {
  flex: 1;
  background: #0f172a;
  border: 1px solid #1f2937;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  outline: none;
}

.search-input:focus,
.category-select:focus {
  border-color: #2563eb;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.product-item {
  background: #0f172a;
  border: 2px solid #1f2937;
  border-radius: 10px;
  padding: 1rem 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.product-item:hover {
  border-color: #2563eb;
  background: #1a2744;
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.2);
}

.product-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #2563eb;
  color: #fff;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 700;
}

.product-icon {
  font-size: 3rem;
  margin: 0.5rem 0;
}

.product-item h4 {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  font-weight: 700;
}

.product-category {
  margin: 0.2rem 0;
  font-size: 0.75rem;
  color: #94a3b8;
}

.product-price {
  margin: 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #38bdf8;
}

.add-btn {
  margin-top: auto;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  border: none;
  color: #fff;
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.add-btn:hover {
  filter: brightness(1.05);
}

.checkout-section {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.checkout-section .section-header {
  position: sticky;
  top: 0;
  background: #111827;
  z-index: 10;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #1f2937;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-right: 0.5rem;
}

.empty-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  color: #71717a;
  font-size: 0.9rem;
}

.cart-item {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 0.75rem;
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 0.5rem;
  align-items: center;
}

.item-info h5 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
}

.item-price {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: #94a3b8;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.qty-btn {
  background: #1f2937;
  border: 1px solid #374151;
  color: #e2e8f0;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.qty-btn:hover {
  background: #2563eb;
}

.qty {
  font-weight: 700;
  min-width: 30px;
  text-align: center;
  font-size: 0.9rem;
}

.item-total {
  font-weight: 700;
  color: #38bdf8;
  min-width: 60px;
  text-align: right;
}

.remove-btn {
  background: #7f1d1d;
  border: none;
  color: #fff;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #991b1b;
}

.order-summary {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #e2e8f0;
}

.summary-row.total {
  border-top: 2px solid #1f2937;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: 800;
  color: #38bdf8;
}

.summary-row.discount {
  color: #86efac;
}

.admin-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.discount-input {
  flex: 1;
  background: #0f172a;
  border: 1px solid #1f2937;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
}

.discount-btn {
  background: #1f2937;
  border: 1px solid #374151;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s;
}

.discount-btn:hover {
  background: #2563eb;
}

.payment-methods {
  margin-bottom: 1rem;
}

.payment-methods h4 {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 0.5px;
}

.payment-options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
}

.payment-btn {
  background: #0f172a;
  border: 2px solid #1f2937;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s;
  font-size: 0.8rem;
}

.payment-btn:hover {
  border-color: #2563eb;
}

.payment-btn.active {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

.checkout-btn {
  width: 100%;
  background: linear-gradient(135deg, #22c55e, #10b981);
  border: none;
  color: #fff;
  border-radius: 8px;
  padding: 0.75rem;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 0.5rem;
}

.checkout-btn:hover:not(:disabled) {
  filter: brightness(1.05);
}

.checkout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clear-btn {
  width: 100%;
  background: #1f2937;
  border: 1px solid #374151;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.clear-btn:hover {
  background: #374151;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #1f2937;
  position: sticky;
  top: 0;
  background: #111827;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: #e2e8f0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #e2e8f0;
}

.receipt {
  padding: 2rem;
}

.receipt-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #1f2937;
}

.receipt-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 800;
  color: #e2e8f0;
}

.receipt-header p {
  margin: 0.3rem 0 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.receipt-header .date {
  font-size: 0.85rem;
  color: #71717a;
  margin-top: 0.5rem;
}

.receipt-items {
  margin-bottom: 1.5rem;
}

.receipt-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.items-table thead {
  border-bottom: 1px solid #1f2937;
}

.items-table th {
  padding: 0.5rem 0;
  text-align: left;
  color: #94a3b8;
  font-weight: 700;
  font-size: 0.85rem;
}

.items-table td {
  padding: 0.5rem 0;
  color: #e2e8f0;
  border-bottom: 1px solid #0f172a;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.receipt-summary {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #e2e8f0;
}

.summary-line.discount {
  color: #86efac;
}

.summary-line.total {
  border-top: 2px solid #1f2937;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
  font-size: 1.1rem;
  font-weight: 800;
  color: #38bdf8;
}

.receipt-payment {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.payment-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.payment-info .label {
  font-weight: 700;
  color: #cbd5e1;
}

.payment-info .value {
  color: #38bdf8;
  font-weight: 600;
}

.payment-status {
  text-align: center;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
}

.status-badge.success {
  background: rgba(34, 197, 94, 0.15);
  color: #86efac;
}

.receipt-footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #1f2937;
}

.receipt-footer p {
  margin: 0.3rem 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.receipt-footer .small {
  font-size: 0.8rem;
  color: #71717a;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #1f2937;
  background: #0f172a;
}

.btn-print,
.btn-new {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.btn-print {
  background: #1f2937;
  color: #e2e8f0;
}

.btn-print:hover {
  background: #374151;
}

.btn-new {
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  color: #fff;
}

.btn-new:hover {
  filter: brightness(1.05);
}

@media print {
  body,
  html {
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Hide everything except the receipt */
  body * {
    visibility: hidden;
  }

  .modal-overlay,
  .modal-overlay * {
    visibility: visible;
  }

  .pos-view {
    width: 100%;
    height: auto;
    background: #fff !important;
    color: #000 !important;
    padding: 0 !important;
    border: none !important;
  }

  .pos-container {
    display: none !important;
  }

  .modal-overlay {
    position: static !important;
    background: transparent !important;
    backdrop-filter: none !important;
    display: block !important;
    z-index: auto !important;
  }

  .modal-content {
    background: #fff !important;
    border: none !important;
    border-radius: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
    max-height: none !important;
    overflow: visible !important;
    box-shadow: none !important;
    display: block !important;
  }

  .modal-header,
  .modal-actions {
    display: none !important;
  }

  .receipt {
    padding: 0.5in !important;
    background: #fff !important;
    color: #000 !important;
  }

  .receipt * {
    background: transparent !important;
    color: #000 !important;
    border-color: #000 !important;
  }

  .receipt-header {
    text-align: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #000;
  }

  .receipt-header h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .receipt-header p {
    margin: 0.2rem 0 0;
    font-size: 0.9rem;
  }

  .receipt-header .date {
    font-size: 0.8rem;
    margin-top: 0.3rem;
  }

  .receipt-items {
    margin-bottom: 1rem;
  }

  .receipt-title {
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
  }

  .items-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }

  .items-table thead {
    border-bottom: 1px solid #000;
  }

  .items-table th {
    padding: 0.4rem 0;
    text-align: left;
    font-weight: 700;
    font-size: 0.8rem;
    border-bottom: 1px solid #000;
  }

  .items-table td {
    padding: 0.3rem 0;
    border-bottom: 1px solid #ccc;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .receipt-summary {
    border: 1px solid #000;
    border-radius: 0;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  .summary-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    font-size: 0.85rem;
  }

  .summary-line.total {
    border-top: 2px solid #000;
    padding-top: 0.3rem;
    margin-top: 0.3rem;
    font-size: 1rem;
    font-weight: 700;
  }

  .receipt-payment {
    border: 1px solid #000;
    border-radius: 0;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  .payment-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
  }

  .payment-info .label {
    font-weight: 700;
  }

  .payment-info .value {
    font-weight: 600;
  }

  .payment-status {
    text-align: center;
  }

  .status-badge {
    display: inline-block;
    padding: 0.3rem 0.6rem;
    border-radius: 0;
    font-weight: 700;
    font-size: 0.8rem;
    border: 1px solid #000;
  }

  .receipt-footer {
    text-align: center;
    padding-top: 0.5rem;
    border-top: 1px solid #000;
  }

  .receipt-footer p {
    margin: 0.2rem 0;
    font-size: 0.85rem;
  }

  .receipt-footer .small {
    font-size: 0.75rem;
  }
}
</style>
