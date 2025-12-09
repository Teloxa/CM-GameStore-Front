<template>
  <section class="orders-view">
    <header class="orders-header">
      <div>
        <h1>Orders</h1>
        <p class="muted">Manage and track all customer orders.</p>
      </div>
      <button class="primary-btn" @click="openNewOrderForm">+ New Order</button>
    </header>

    <div class="orders-container">
      <div class="controls">
        <div class="filter-group">
          <select class="filter-select">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
        <div class="search-box">
          <input type="text" placeholder="Search orders..." />
        </div>
      </div>

      <table class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="order-row">
            <td class="order-id">{{ order.id }}</td>
            <td>{{ order.customer }}</td>
            <td class="amount">${{ order.amount.toFixed(2) }}</td>
            <td>
              <span :class="['status-badge', `status-${order.status.toLowerCase()}`]">
                {{ order.status }}
              </span>
            </td>
            <td class="date">{{ order.date }}</td>
            <td class="actions">
              <button class="action-btn view-btn" @click="openOrder(order, 'view')">View</button>
              <button class="action-btn edit-btn" @click="openOrder(order, 'edit')">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Order Detail Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ modalMode === 'view' ? 'Order Details' : 'Edit Order' }}</h2>
          <button class="close-btn" @click="closeModal">✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Order ID</label>
            <input type="text" v-model="selectedOrder.id" :disabled="modalMode === 'view'" />
          </div>

          <div class="form-group">
            <label>Customer Name</label>
            <input type="text" v-model="selectedOrder.customer" :disabled="modalMode === 'view'" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Amount</label>
              <input
                type="number"
                v-model.number="selectedOrder.amount"
                :disabled="modalMode === 'view'"
              />
            </div>
            <div class="form-group">
              <label>Status</label>
              <select v-model="selectedOrder.status" :disabled="modalMode === 'view'">
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Order Date</label>
            <input type="date" v-model="selectedOrder.date" :disabled="modalMode === 'view'" />
          </div>

          <div class="form-group">
            <label>Notes</label>
            <textarea
              v-model="selectedOrder.notes"
              :disabled="modalMode === 'view'"
              placeholder="Add order notes..."
              rows="4"
            ></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeModal">Cancel</button>
          <button v-if="modalMode === 'edit'" class="btn-save" @click="saveOrder">
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- New Order Form Modal -->
    <div v-if="showNewOrderModal" class="modal-overlay" @click.self="closeNewOrderModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Create New Order</h2>
          <button class="close-btn" @click="closeNewOrderModal">✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Customer Name</label>
            <input type="text" v-model="newOrder.customer" placeholder="Enter customer name" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Amount</label>
              <input
                type="number"
                v-model.number="newOrder.amount"
                placeholder="0.00"
                step="0.01"
              />
            </div>
            <div class="form-group">
              <label>Status</label>
              <select v-model="newOrder.status">
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Order Date</label>
            <input type="date" v-model="newOrder.date" />
          </div>

          <div class="form-group">
            <label>Notes</label>
            <textarea v-model="newOrder.notes" placeholder="Add order notes..." rows="4"></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeNewOrderModal">Cancel</button>
          <button class="btn-save" @click="createNewOrder">Create Order</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  {
    id: '#ORD-001',
    customer: 'Marco Aurelio Ramirez',
    amount: 149.99,
    status: 'Delivered',
    date: '2024-01-15',
    notes: 'Express delivery requested',
  },
  {
    id: '#ORD-002',
    customer: 'Rodolfo Perez',
    amount: 89.5,
    status: 'Shipped',
    date: '2024-01-18',
    notes: 'Gift wrapping included',
  },
  {
    id: '#ORD-003',
    customer: 'David Morales',
    amount: 249.99,
    status: 'Processing',
    date: '2024-01-19',
    notes: '',
  },
  {
    id: '#ORD-004',
    customer: 'Natalia Palacios',
    amount: 75.25,
    status: 'Pending',
    date: '2024-01-20',
    notes: 'Awaiting payment confirmation',
  },
  {
    id: '#ORD-005',
    customer: 'Carlos Eduardo',
    amount: 199.75,
    status: 'Delivered',
    date: '2024-01-16',
    notes: 'Returned to warehouse for inspection',
  },
  {
    id: '#ORD-006',
    customer: 'David Zapien',
    amount: 129.99,
    status: 'Shipped',
    date: '2024-01-17',
    notes: 'Standard shipping',
  },
])

const showModal = ref(false)
const modalMode = ref('view')
const selectedOrder = ref(null)
const originalOrder = ref(null)

const showNewOrderModal = ref(false)
const newOrder = ref({
  customer: '',
  amount: 0,
  status: 'Pending',
  date: new Date().toISOString().split('T')[0],
  notes: '',
})

const openOrder = (order, mode) => {
  modalMode.value = mode
  // Deep copy the order
  selectedOrder.value = JSON.parse(JSON.stringify(order))
  originalOrder.value = JSON.parse(JSON.stringify(order))
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedOrder.value = null
  originalOrder.value = null
}

const saveOrder = () => {
  // Find and update the order in the list
  const index = orders.value.findIndex((o) => o.id === selectedOrder.value.id)
  if (index !== -1) {
    orders.value[index] = { ...selectedOrder.value }
  }
  closeModal()
}

const openNewOrderForm = () => {
  newOrder.value = {
    customer: '',
    amount: 0,
    status: 'Pending',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  }
  showNewOrderModal.value = true
}

const closeNewOrderModal = () => {
  showNewOrderModal.value = false
}

const createNewOrder = () => {
  if (!newOrder.value.customer || newOrder.value.amount <= 0) {
    alert('Please fill in all required fields (Customer name and Amount)')
    return
  }

  const orderId = '#ORD-' + String(orders.value.length + 1).padStart(3, '0')
  const order = {
    id: orderId,
    customer: newOrder.value.customer,
    amount: newOrder.value.amount,
    status: newOrder.value.status,
    date: newOrder.value.date,
    notes: newOrder.value.notes,
  }

  orders.value.push(order)
  closeNewOrderModal()
}
</script>

<style scoped>
.orders-view {
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

.orders-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.orders-header h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
}

.muted {
  color: #94a3b8;
  margin: 0.3rem 0 0;
  font-size: 0.95rem;
}

.primary-btn {
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  border: none;
  color: #e2e8f0;
  border-radius: 10px;
  padding: 0.55rem 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
}

.primary-btn:hover {
  filter: brightness(1.05);
}

.orders-container {
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
}

.filter-select:focus {
  border-color: #2563eb;
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
}

.search-box input:focus {
  border-color: #2563eb;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.orders-table thead {
  border-bottom: 2px solid #1f2937;
}

.orders-table th {
  padding: 0.75rem;
  text-align: left;
  color: #cbd5e1;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.order-row {
  border-bottom: 1px solid #1f2937;
  transition: background-color 0.2s;
}

.order-row:hover {
  background-color: #0f172a;
}

.orders-table td {
  padding: 0.75rem;
}

.order-id {
  color: #38bdf8;
  font-weight: 700;
}

.amount {
  color: #38bdf8;
  font-weight: 700;
}

.date {
  color: #94a3b8;
}

.status-badge {
  display: inline-block;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-pending {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}

.status-processing {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

.status-shipped {
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
}

.status-delivered {
  background: rgba(34, 197, 94, 0.15);
  color: #86efac;
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
}

.view-btn {
  background: #0f172a;
  color: #38bdf8;
}

.view-btn:hover {
  background: #1f2937;
}

.edit-btn {
  background: #0f172a;
  color: #e2e8f0;
}

.edit-btn:hover {
  background: #1f2937;
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

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  background: #0f172a;
  border: 1px solid #1f2937;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #2563eb;
}

.form-group input:disabled,
.form-group select:disabled,
.form-group textarea:disabled {
  background: #0b0f1a;
  color: #71717a;
  cursor: not-allowed;
}

.form-group textarea {
  resize: vertical;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.btn-save:hover {
  filter: brightness(1.05);
}

@media (max-width: 900px) {
  .orders-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .controls {
    flex-direction: column;
  }

  .orders-table {
    font-size: 0.8rem;
  }

  .orders-table th,
  .orders-table td {
    padding: 0.5rem;
  }
}
</style>
