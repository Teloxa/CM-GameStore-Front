<template>
  <section class="inventory-view">
    <header class="inventory-header">
      <div>
        <h1>Inventory Management</h1>
        <p class="muted">Monitor and manage your product stock levels.</p>
      </div>
      <button class="primary-btn" @click="openAddStockModal">+ Add Stock</button>
    </header>

    <div class="inventory-container">
      <div class="controls">
        <div class="filter-group">
          <select class="filter-select">
            <option>All Stock Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
        <div class="search-box">
          <input type="text" placeholder="Search inventory..." />
        </div>
      </div>

      <table class="inventory-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Current Stock</th>
            <th>Reorder Level</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventory" :key="item.id" class="inventory-row">
            <td class="product-name">
              <div class="product-icon">{{ item.icon }}</div>
              <span>{{ item.product }}</span>
            </td>
            <td class="sku">{{ item.sku }}</td>
            <td class="stock-qty" :class="{ low: item.current < item.reorder }">
              {{ item.current }}
            </td>
            <td>{{ item.reorder }}</td>
            <td>
              <span :class="['stock-badge', `status-${item.status.toLowerCase()}`]">
                {{ item.status }}
              </span>
            </td>
            <td class="date">{{ item.lastUpdated }}</td>
            <td class="actions">
              <button class="action-btn adjust-btn" @click="openAdjustModal(item)">Adjust</button>
              <button class="action-btn reorder-btn" @click="openReorderModal(item)">
                Reorder
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Stock Modal -->
    <div v-if="showAddStockModal" class="modal-overlay" @click.self="closeAddStockModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add Stock</h2>
          <button class="close-btn" @click="closeAddStockModal">✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Select Product</label>
            <select v-model="newStock.productId" class="form-select">
              <option value="" disabled>Choose a product...</option>
              <option v-for="item in inventory" :key="item.id" :value="item.id">
                {{ item.product }} (Current: {{ item.current }})
              </option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Quantity to Add</label>
              <input
                v-model.number="newStock.quantity"
                type="number"
                min="1"
                placeholder="Enter quantity"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Reason</label>
              <select v-model="newStock.reason" class="form-select">
                <option>New Purchase</option>
                <option>Stock Return</option>
                <option>Adjustment</option>
                <option>Restock</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Notes</label>
            <textarea
              v-model="newStock.notes"
              placeholder="Add notes about this stock adjustment..."
              rows="3"
              class="form-textarea"
            ></textarea>
          </div>

          <div class="stock-preview" v-if="selectedProduct">
            <h4>Preview</h4>
            <div class="preview-item">
              <span>Product:</span>
              <strong>{{ selectedProduct.product }}</strong>
            </div>
            <div class="preview-item">
              <span>Current Stock:</span>
              <strong>{{ selectedProduct.current }}</strong>
            </div>
            <div class="preview-item">
              <span>New Stock:</span>
              <strong class="new-stock">{{
                selectedProduct.current + (newStock.quantity || 0)
              }}</strong>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeAddStockModal">Cancel</button>
          <button
            class="btn-save"
            @click="saveAddStock"
            :disabled="!newStock.productId || !newStock.quantity"
          >
            Add Stock
          </button>
        </div>
      </div>
    </div>

    <!-- Adjust Stock Modal -->
    <div v-if="showAdjustModal" class="modal-overlay" @click.self="closeAdjustModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Adjust Stock</h2>
          <button class="close-btn" @click="closeAdjustModal">✕</button>
        </div>

        <div class="modal-body">
          <div class="product-display">
            <h4>{{ adjustItem.product }}</h4>
            <p class="current-stock">
              Current Stock: <strong>{{ adjustItem.current }}</strong>
            </p>
          </div>

          <div class="form-group">
            <label>Adjustment Type</label>
            <select v-model="adjustStock.type" class="form-select">
              <option value="add">Add Stock</option>
              <option value="remove">Remove Stock</option>
            </select>
          </div>

          <div class="form-group">
            <label>Quantity</label>
            <input
              v-model.number="adjustStock.quantity"
              type="number"
              min="1"
              placeholder="Enter quantity"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>Reason</label>
            <select v-model="adjustStock.reason" class="form-select">
              <option>Inventory Count</option>
              <option>Damage/Loss</option>
              <option>Correction</option>
              <option>Other</option>
            </select>
          </div>

          <div class="form-group">
            <label>Notes</label>
            <textarea
              v-model="adjustStock.notes"
              placeholder="Add adjustment notes..."
              rows="3"
              class="form-textarea"
            ></textarea>
          </div>

          <div class="adjustment-preview">
            <h4>Preview</h4>
            <div class="preview-item">
              <span>Current:</span>
              <strong>{{ adjustItem.current }}</strong>
            </div>
            <div class="preview-item">
              <span>Adjustment:</span>
              <strong :class="adjustStock.type === 'add' ? 'positive' : 'negative'">
                {{ adjustStock.type === 'add' ? '+' : '-' }}{{ adjustStock.quantity || 0 }}
              </strong>
            </div>
            <div class="preview-item total">
              <span>New Stock:</span>
              <strong class="new-value">
                {{
                  adjustStock.type === 'add'
                    ? adjustItem.current + (adjustStock.quantity || 0)
                    : adjustItem.current - (adjustStock.quantity || 0)
                }}
              </strong>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeAdjustModal">Cancel</button>
          <button class="btn-save" @click="saveAdjustment" :disabled="!adjustStock.quantity">
            Apply Adjustment
          </button>
        </div>
      </div>
    </div>

    <!-- Reorder Stock Modal -->
    <div v-if="showReorderModal" class="modal-overlay" @click.self="closeReorderModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Reorder Stock</h2>
          <button class="close-btn" @click="closeReorderModal">✕</button>
        </div>

        <div class="modal-body">
          <div class="product-display">
            <h4>{{ reorderItem.product }}</h4>
            <p class="current-stock">
              Current Stock: <strong>{{ reorderItem.current }}</strong> / Reorder Level:
              <strong>{{ reorderItem.reorder }}</strong>
            </p>
          </div>

          <div class="form-group">
            <label>Quantity to Reorder</label>
            <input
              v-model.number="reorderStock.quantity"
              type="number"
              min="1"
              :placeholder="`Suggested: ${Math.max(0, reorderItem.reorder - reorderItem.current + 10)}`"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>Supplier</label>
            <select v-model="reorderStock.supplier" class="form-select">
              <option>Select Supplier</option>
              <option>Default Supplier</option>
              <option>Backup Supplier</option>
              <option>Direct Import</option>
            </select>
          </div>

          <div class="form-group">
            <label>Priority</label>
            <select v-model="reorderStock.priority" class="form-select">
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          <div class="form-group">
            <label>Notes</label>
            <textarea
              v-model="reorderStock.notes"
              placeholder="Add reorder notes..."
              rows="3"
              class="form-textarea"
            ></textarea>
          </div>

          <div class="reorder-preview">
            <h4>Reorder Summary</h4>
            <div class="preview-item">
              <span>Current Stock:</span>
              <strong>{{ reorderItem.current }}</strong>
            </div>
            <div class="preview-item">
              <span>Reorder Quantity:</span>
              <strong class="positive">+{{ reorderStock.quantity || 0 }}</strong>
            </div>
            <div class="preview-item total">
              <span>Expected Stock After:</span>
              <strong class="new-value">
                {{ reorderItem.current + (reorderStock.quantity || 0) }}
              </strong>
            </div>
            <div class="preview-item">
              <span>Priority:</span>
              <strong
                :class="{
                  urgent: reorderStock.priority === 'Urgent',
                  high: reorderStock.priority === 'High',
                }"
              >
                {{ reorderStock.priority }}
              </strong>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeReorderModal">Cancel</button>
          <button
            class="btn-save"
            @click="saveReorder"
            :disabled="!reorderStock.quantity || !reorderStock.supplier"
          >
            Create Reorder
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const inventory = ref([
  {
    id: 1,
    product: 'PlayStation 5',
    icon: '🎮',
    sku: 'PS5-001',
    current: 8,
    reorder: 10,
    status: 'Low Stock',
    lastUpdated: '2024-01-20',
  },
  {
    id: 2,
    product: 'Xbox Series X',
    icon: '🎮',
    sku: 'XBX-001',
    current: 5,
    reorder: 8,
    status: 'Low Stock',
    lastUpdated: '2024-01-19',
  },
  {
    id: 3,
    product: 'Elden Ring',
    icon: '⚔️',
    sku: 'ELR-001',
    current: 24,
    reorder: 15,
    status: 'In Stock',
    lastUpdated: '2024-01-21',
  },
  {
    id: 4,
    product: 'DualSense Controller',
    icon: '🎮',
    sku: 'DSC-001',
    current: 42,
    reorder: 20,
    status: 'In Stock',
    lastUpdated: '2024-01-18',
  },
  {
    id: 5,
    product: 'Gaming Headset Pro',
    icon: '🎧',
    sku: 'GHP-001',
    current: 3,
    reorder: 5,
    status: 'Out of Stock',
    lastUpdated: '2024-01-15',
  },
  {
    id: 6,
    product: 'The Legend of Zelda',
    icon: '🗡️',
    sku: 'TLZ-001',
    current: 31,
    reorder: 20,
    status: 'In Stock',
    lastUpdated: '2024-01-17',
  },
  {
    id: 7,
    product: 'Gift Card $25',
    icon: '🎁',
    sku: 'GCA-025',
    current: 0,
    reorder: 10,
    status: 'Out of Stock',
    lastUpdated: '2024-01-14',
  },
  {
    id: 8,
    product: 'Nintendo Switch OLED',
    icon: '📱',
    sku: 'NSW-001',
    current: 12,
    reorder: 10,
    status: 'In Stock',
    lastUpdated: '2024-01-21',
  },
])

const showAddStockModal = ref(false)
const newStock = ref({
  productId: '',
  quantity: null,
  reason: 'New Purchase',
  notes: '',
})

const selectedProduct = computed(() => {
  if (!newStock.value.productId) return null
  return inventory.value.find((item) => item.id === parseInt(newStock.value.productId))
})

const openAddStockModal = () => {
  newStock.value = {
    productId: '',
    quantity: null,
    reason: 'New Purchase',
    notes: '',
  }
  showAddStockModal.value = true
}

const closeAddStockModal = () => {
  showAddStockModal.value = false
}

const saveAddStock = () => {
  if (!newStock.value.productId || !newStock.value.quantity) {
    alert('Please fill in all required fields')
    return
  }

  const productIndex = inventory.value.findIndex(
    (item) => item.id === parseInt(newStock.value.productId),
  )
  if (productIndex !== -1) {
    inventory.value[productIndex].current += newStock.value.quantity
    inventory.value[productIndex].lastUpdated = new Date().toISOString().split('T')[0]

    // Update status based on stock level
    if (inventory.value[productIndex].current === 0) {
      inventory.value[productIndex].status = 'Out of Stock'
    } else if (inventory.value[productIndex].current < inventory.value[productIndex].reorder) {
      inventory.value[productIndex].status = 'Low Stock'
    } else {
      inventory.value[productIndex].status = 'In Stock'
    }
  }

  closeAddStockModal()
}

const showAdjustModal = ref(false)
const showReorderModal = ref(false)
const adjustItem = ref({})
const reorderItem = ref({})

const adjustStock = ref({
  type: 'add',
  quantity: null,
  reason: 'Inventory Count',
  notes: '',
})

const reorderStock = ref({
  quantity: null,
  supplier: '',
  priority: 'Normal',
  notes: '',
})

const openAdjustModal = (item) => {
  adjustItem.value = { ...item }
  adjustStock.value = {
    type: 'add',
    quantity: null,
    reason: 'Inventory Count',
    notes: '',
  }
  showAdjustModal.value = true
}

const closeAdjustModal = () => {
  showAdjustModal.value = false
}

const saveAdjustment = () => {
  if (!adjustStock.value.quantity) {
    alert('Please enter a quantity')
    return
  }

  const itemIndex = inventory.value.findIndex((item) => item.id === adjustItem.value.id)
  if (itemIndex !== -1) {
    let newStock = adjustItem.value.current
    if (adjustStock.value.type === 'add') {
      newStock += adjustStock.value.quantity
    } else {
      newStock -= adjustStock.value.quantity
      if (newStock < 0) newStock = 0
    }

    inventory.value[itemIndex].current = newStock
    inventory.value[itemIndex].lastUpdated = new Date().toISOString().split('T')[0]

    // Update status
    if (newStock === 0) {
      inventory.value[itemIndex].status = 'Out of Stock'
    } else if (newStock < inventory.value[itemIndex].reorder) {
      inventory.value[itemIndex].status = 'Low Stock'
    } else {
      inventory.value[itemIndex].status = 'In Stock'
    }
  }

  closeAdjustModal()
}

const openReorderModal = (item) => {
  reorderItem.value = { ...item }
  reorderStock.value = {
    quantity: Math.max(0, item.reorder - item.current + 10),
    supplier: '',
    priority: 'Normal',
    notes: '',
  }
  showReorderModal.value = true
}

const closeReorderModal = () => {
  showReorderModal.value = false
}

const saveReorder = () => {
  if (!reorderStock.value.quantity || !reorderStock.value.supplier) {
    alert('Please fill in all required fields')
    return
  }

  alert(
    `Reorder created successfully!\n\nProduct: ${reorderItem.value.product}\nQuantity: ${reorderStock.value.quantity}\nSupplier: ${reorderStock.value.supplier}\nPriority: ${reorderStock.value.priority}`,
  )

  closeReorderModal()
}
</script>

<style scoped>
.inventory-view {
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

.inventory-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.inventory-header h1 {
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

.inventory-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
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

.inventory-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.inventory-table thead {
  border-bottom: 2px solid #1f2937;
}

.inventory-table th {
  padding: 0.75rem;
  text-align: left;
  color: #cbd5e1;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.inventory-row {
  border-bottom: 1px solid #1f2937;
  transition: background-color 0.2s;
}

.inventory-row:hover {
  background-color: #0f172a;
}

.inventory-table td {
  padding: 0.75rem;
}

.product-name {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  color: #e2e8f0;
}

.product-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.sku {
  color: #38bdf8;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
}

.stock-qty {
  font-weight: 700;
  color: #86efac;
}

.stock-qty.low {
  color: #fbbf24;
}

.stock-badge {
  display: inline-block;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-in-stock {
  background: rgba(34, 197, 94, 0.15);
  color: #86efac;
}

.status-low-stock {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}

.status-out-of-stock {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.date {
  color: #94a3b8;
  font-size: 0.85rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.35rem 0.65rem;
  border: 1px solid #1f2937;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.adjust-btn {
  background: #0f172a;
  color: #38bdf8;
}

.adjust-btn:hover {
  background: #1f2937;
  border-color: #38bdf8;
}

.reorder-btn {
  background: #0f172a;
  color: #fbbf24;
}

.reorder-btn:hover {
  background: #1f2937;
  border-color: #fbbf24;
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
  max-width: 500px;
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

.stock-preview {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.stock-preview h4 {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #1f2937;
  font-size: 0.9rem;
}

.preview-item:last-child {
  border-bottom: none;
}

.preview-item span {
  color: #94a3b8;
}

.preview-item strong {
  color: #e2e8f0;
  font-weight: 700;
}

.preview-item .new-stock {
  color: #86efac;
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

.product-display {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.product-display h4 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #e2e8f0;
}

.current-stock {
  margin: 0;
  font-size: 0.9rem;
  color: #94a3b8;
}

.current-stock strong {
  color: #38bdf8;
}

.adjustment-preview,
.reorder-preview {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.adjustment-preview h4,
.reorder-preview h4 {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #1f2937;
  font-size: 0.9rem;
}

.preview-item:last-child {
  border-bottom: none;
}

.preview-item span {
  color: #94a3b8;
}

.preview-item strong {
  color: #e2e8f0;
  font-weight: 700;
}

.preview-item.total {
  border-top: 2px solid #1f2937;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
}

.preview-item .positive {
  color: #86efac;
}

.preview-item .negative {
  color: #fca5a5;
}

.preview-item .new-value {
  color: #38bdf8;
  font-size: 1.1rem;
}

.preview-item .urgent {
  color: #ef4444;
}

.preview-item .high {
  color: #fbbf24;
}

@media (max-width: 900px) {
  .inventory-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .controls {
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .inventory-table {
    font-size: 0.8rem;
  }

  .inventory-table th,
  .inventory-table td {
    padding: 0.5rem;
  }

  .product-name {
    gap: 0.5rem;
  }

  .product-icon {
    font-size: 1rem;
  }
}
</style>
