<template>
  <section class="customers-view">
    <header class="customers-header">
      <div>
        <h1>Customers</h1>
        <p class="muted">Manage and view all customer accounts and details.</p>
      </div>
      <button class="primary-btn">+ Add Customer</button>
    </header>

    <div class="customers-container">
      <div class="controls">
        <div class="filter-group">
          <select class="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </select>
        </div>
        <div class="search-box">
          <input type="text" placeholder="Search customers..." />
        </div>
      </div>

      <table class="customers-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Orders</th>
            <th>Total Spent</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id" class="customer-row">
            <td class="customer-name">
              <div class="avatar">{{ customer.initials }}</div>
              <span>{{ customer.name }}</span>
            </td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td class="orders">{{ customer.orders }}</td>
            <td class="spent">${{ customer.spent.toFixed(2) }}</td>
            <td>
              <span :class="['status-badge', `status-${customer.status.toLowerCase()}`]">
                {{ customer.status }}
              </span>
            </td>
            <td class="actions">
              <button class="action-btn view-btn">View</button>
              <button class="action-btn edit-btn">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const customers = ref([
  {
    id: 1,
    name: 'Marco Aurelio Ramirez',
    initials: 'MA',
    email: 'marco.ramirez@example.com',
    phone: '+1 (555) 123-4567',
    orders: 12,
    spent: 1249.99,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Rodolfo Perez',
    initials: 'RP',
    email: 'rodolfo.perez@example.com',
    phone: '+1 (555) 234-5678',
    orders: 8,
    spent: 749.5,
    status: 'Active',
  },
  {
    id: 3,
    name: 'David Morales',
    initials: 'DM',
    email: 'david.morales@example.com',
    phone: '+1 (555) 345-6789',
    orders: 5,
    spent: 425.75,
    status: 'Active',
  },
  {
    id: 4,
    name: 'Natalia Palacios',
    initials: 'NP',
    email: 'natalia.palacios@example.com',
    phone: '+1 (555) 456-7890',
    orders: 15,
    spent: 2149.25,
    status: 'Active',
  },
  {
    id: 5,
    name: 'Carlos Eduardo',
    initials: 'CE',
    email: 'carlos.eduardo@example.com',
    phone: '+1 (555) 567-8901',
    orders: 3,
    spent: 199.99,
    status: 'Inactive',
  },
  {
    id: 6,
    name: 'David Zapien',
    initials: 'DZ',
    email: 'david.zapien@example.com',
    phone: '+1 (555) 678-9012',
    orders: 22,
    spent: 3549.75,
    status: 'Active',
  },
])
</script>

<style scoped>
.customers-view {
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

.customers-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.customers-header h1 {
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

.customers-container {
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

.customers-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.customers-table thead {
  border-bottom: 2px solid #1f2937;
}

.customers-table th {
  padding: 0.75rem;
  text-align: left;
  color: #cbd5e1;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.customer-row {
  border-bottom: 1px solid #1f2937;
  transition: background-color 0.2s;
}

.customer-row:hover {
  background-color: #0f172a;
}

.customers-table td {
  padding: 0.75rem;
}

.customer-name {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  color: #e2e8f0;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.orders,
.spent {
  color: #38bdf8;
  font-weight: 700;
}

.status-badge {
  display: inline-block;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-active {
  background: rgba(34, 197, 94, 0.15);
  color: #86efac;
}

.status-inactive {
  background: rgba(156, 163, 175, 0.15);
  color: #d1d5db;
}

.status-suspended {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
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

@media (max-width: 900px) {
  .customers-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .controls {
    flex-direction: column;
  }

  .customers-table {
    font-size: 0.8rem;
  }

  .customers-table th,
  .customers-table td {
    padding: 0.5rem;
  }

  .customer-name {
    gap: 0.5rem;
  }

  .avatar {
    width: 32px;
    height: 32px;
    font-size: 0.75rem;
  }
}
</style>
