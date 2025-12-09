<template>
  <section class="products-view">
    <header class="products-header">
      <div>
        <h1>Products</h1>
        <p class="muted">Browse and manage your game store inventory.</p>
      </div>
      <button class="primary-btn" @click="openAddProductModal">+ Add Product</button>
    </header>

    <div class="products-container">
      <div class="controls">
        <div class="filter-group">
          <select class="filter-select">
            <option>All Categories</option>
            <option>Consoles</option>
            <option>Games</option>
            <option>Accessories</option>
            <option>Collectibles</option>
          </select>
        </div>
        <div class="search-box">
          <input type="text" placeholder="Search products..." />
        </div>
      </div>

      <div class="products-grid">
        <article v-for="product in products" :key="product.id" class="product-card">
          <div class="product-image">
            <div class="image-placeholder">{{ product.icon }}</div>
          </div>
          <div class="product-details">
            <h3>{{ product.name }}</h3>
            <p class="category">{{ product.category }}</p>
            <p class="description">{{ product.description }}</p>
            <div class="product-footer">
              <div class="price-stock">
                <span class="price">${{ product.price.toFixed(2) }}</span>
                <span class="stock" :class="{ low: product.stock < 10 }">
                  {{ product.stock }} in stock
                </span>
              </div>
              <div class="actions">
                <button class="action-btn edit-btn">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Add Product Modal -->
    <div v-if="showAddProductModal" class="modal-overlay" @click.self="closeAddProductModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add New Product</h2>
          <button class="close-btn" @click="closeAddProductModal">✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Product Name</label>
            <input
              v-model="newProduct.name"
              type="text"
              placeholder="Enter product name"
              class="form-input"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Category</label>
              <select v-model="newProduct.category" class="form-select">
                <option>Consoles</option>
                <option>Games</option>
                <option>Accessories</option>
                <option>Collectibles</option>
              </select>
            </div>
            <div class="form-group">
              <label>Icon/Emoji</label>
              <input
                v-model="newProduct.icon"
                type="text"
                placeholder="🎮"
                class="form-input"
                maxlength="2"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea
              v-model="newProduct.description"
              placeholder="Enter product description..."
              rows="3"
              class="form-textarea"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Price</label>
              <input
                v-model.number="newProduct.price"
                type="number"
                placeholder="0.00"
                step="0.01"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Stock Quantity</label>
              <input
                v-model.number="newProduct.stock"
                type="number"
                placeholder="0"
                class="form-input"
              />
            </div>
          </div>

          <div class="product-preview" v-if="newProduct.name">
            <h4>Preview</h4>
            <div class="preview-card">
              <div class="preview-icon">{{ newProduct.icon || '📦' }}</div>
              <div class="preview-info">
                <h5>{{ newProduct.name }}</h5>
                <p class="preview-category">{{ newProduct.category }}</p>
                <p class="preview-desc">{{ newProduct.description }}</p>
                <div class="preview-footer">
                  <span class="preview-price">${{ (newProduct.price || 0).toFixed(2) }}</span>
                  <span class="preview-stock">{{ newProduct.stock || 0 }} in stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeAddProductModal">Cancel</button>
          <button
            class="btn-save"
            @click="saveAddProduct"
            :disabled="!newProduct.name || !newProduct.price || !newProduct.stock"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    name: 'PlayStation 5',
    category: 'Consoles',
    description: 'Next-gen gaming console',
    price: 499.99,
    stock: 8,
    icon: '🎮',
  },
  {
    id: 2,
    name: 'Elden Ring',
    category: 'Games',
    description: 'Action RPG masterpiece',
    price: 59.99,
    stock: 24,
    icon: '⚔️',
  },
  {
    id: 3,
    name: 'Xbox Series X',
    category: 'Consoles',
    description: 'Powerful next-gen console',
    price: 499.99,
    stock: 5,
    icon: '🎮',
  },
  {
    id: 4,
    name: 'DualSense Controller',
    category: 'Accessories',
    description: 'Next-gen haptic feedback',
    price: 74.99,
    stock: 42,
    icon: '🎮',
  },
  {
    id: 5,
    name: 'The Legend of Zelda',
    category: 'Games',
    description: 'Adventure awaits',
    price: 69.99,
    stock: 31,
    icon: '🗡️',
  },
  {
    id: 6,
    name: 'Gaming Headset Pro',
    category: 'Accessories',
    description: '7.1 surround sound',
    price: 149.99,
    stock: 18,
    icon: '🎧',
  },
  {
    id: 7,
    name: 'Link Figurine',
    category: 'Collectibles',
    description: 'Premium collectible',
    price: 29.99,
    stock: 3,
    icon: '🧿',
  },
  {
    id: 8,
    name: 'Nintendo Switch OLED',
    category: 'Consoles',
    description: 'Portable gaming',
    price: 349.99,
    stock: 12,
    icon: '📱',
  },
])

const showAddProductModal = ref(false)
const newProduct = ref({
  name: '',
  category: 'Accessories',
  icon: '📦',
  description: '',
  price: null,
  stock: null,
})

const openAddProductModal = () => {
  newProduct.value = {
    name: '',
    category: 'Accessories',
    icon: '📦',
    description: '',
    price: null,
    stock: null,
  }
  showAddProductModal.value = true
}

const closeAddProductModal = () => {
  showAddProductModal.value = false
}

const saveAddProduct = () => {
  if (!newProduct.value.name || !newProduct.value.price || newProduct.value.stock === null) {
    alert('Please fill in all required fields')
    return
  }

  const product = {
    id: Math.max(...products.value.map((p) => p.id), 0) + 1,
    name: newProduct.value.name,
    category: newProduct.value.category,
    description: newProduct.value.description,
    price: newProduct.value.price,
    stock: newProduct.value.stock,
    icon: newProduct.value.icon || '📦',
  }

  products.value.push(product)
  closeAddProductModal()
}
</script>

<style scoped>
.products-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #0b0c10;
  color: #e2e8f0;
  padding: 1.5rem;
  border: 1px solid #1f2937;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.25);
}

.products-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.products-header h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
  color: #e2e8f0;
}

.muted {
  color: #94a3b8;
  margin: 0.3rem 0 0;
  font-size: 0.95rem;
}

.primary-btn {
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  border: none;
  color: #fff;
  border-radius: 10px;
  padding: 0.55rem 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
}

.primary-btn:hover {
  filter: brightness(1.05);
  transform: translateY(-2px);
}

.products-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-group {
  flex: 0 0 auto;
}

.filter-select {
  background: #0f172a;
  border: 1px solid #1f2937;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
}

.filter-select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-box {
  flex: 1;
}

.search-box input {
  width: 100%;
  background: #0f172a;
  border: 1px solid #1f2937;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s;
}

.search-box input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
  cursor: pointer;
}

.product-card:hover {
  border-color: #2563eb;
  box-shadow:
    0 12px 24px rgba(37, 99, 235, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #1f2937;
  position: relative;
  overflow: hidden;
}

.product-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), transparent);
  pointer-events: none;
}

.image-placeholder {
  font-size: 4rem;
  z-index: 1;
  transition: transform 0.2s ease;
}

.product-card:hover .image-placeholder {
  transform: scale(1.1);
}

.product-details {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.product-details h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #e2e8f0;
  letter-spacing: -0.3px;
}

.category {
  margin: 0;
  font-size: 0.8rem;
  color: #38bdf8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.description {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: #94a3b8;
  flex: 1;
  line-height: 1.4;
}

.product-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #0f172a;
}

.price-stock {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #38bdf8;
  line-height: 1;
}

.stock {
  font-size: 0.75rem;
  color: #86efac;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.stock.low {
  color: #fbbf24;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.4rem 0.75rem;
  border: 1px solid #1f2937;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.edit-btn {
  background: #0f172a;
  color: #38bdf8;
}

.edit-btn:hover {
  background: #1f2937;
  border-color: #38bdf8;
}

.delete-btn {
  background: #0f172a;
  color: #ef4444;
}

.delete-btn:hover {
  background: #7f1d1d;
  border-color: #ef4444;
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
  display: flex;
  flex-direction: column;
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

.modal-body {
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #cbd5e1;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  background: #0f172a;
  border: 1px solid #1f2937;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: all 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-textarea {
  resize: vertical;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.product-preview {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.product-preview h4 {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #111827;
  border-radius: 8px;
  border: 1px solid #1f2937;
}

.preview-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.preview-info {
  flex: 1;
}

.preview-info h5 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #e2e8f0;
}

.preview-category {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: #38bdf8;
  font-weight: 600;
}

.preview-desc {
  margin: 0.3rem 0;
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.3;
}

.preview-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #1f2937;
}

.preview-price {
  font-size: 1.1rem;
  font-weight: 800;
  color: #38bdf8;
}

.preview-stock {
  font-size: 0.75rem;
  color: #86efac;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #1f2937;
  background: #0f172a;
}

.btn-cancel,
.btn-save {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.btn-cancel {
  background: #1f2937;
  color: #e2e8f0;
}

.btn-cancel:hover {
  background: #374151;
}

.btn-save {
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  color: #fff;
}

.btn-save:hover:not(:disabled) {
  filter: brightness(1.05);
}

.btn-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  .products-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .controls {
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .product-image {
    height: 140px;
  }

  .image-placeholder {
    font-size: 3rem;
  }
}
</style>
