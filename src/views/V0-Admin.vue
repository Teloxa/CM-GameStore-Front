<template>
  <section class="dashboard-view">
    <header class="dashboard-header">
      <div>
        <h1>Dashboard Overview</h1>
        <p class="muted">Welcome back! Here's your sales performance.</p>
      </div>
      <div class="date-filter">
        <select class="filter-select">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select>
      </div>
    </header>

    <div class="kpi-grid">
      <article v-for="kpi in kpis" :key="kpi.id" class="kpi-card">
        <div class="kpi-icon" :style="{ background: kpi.color }">
          {{ kpi.icon }}
        </div>
        <div class="kpi-content">
          <p class="kpi-label">{{ kpi.label }}</p>
          <h3 class="kpi-value">{{ kpi.value }}</h3>
          <p class="kpi-change" :class="{ positive: kpi.change > 0 }">
            {{ kpi.change > 0 ? '+' : '' }}{{ kpi.change }}% from last month
          </p>
        </div>
      </article>
    </div>

    <div class="charts-grid">
      <div class="chart-container">
        <div class="chart-header">
          <h2>Revenue Trend</h2>
          <span class="chart-legend">Last 6 months</span>
        </div>
        <div class="chart-placeholder">
          <div class="mini-chart">
            <div class="bar" style="height: 40%"></div>
            <div class="bar" style="height: 55%"></div>
            <div class="bar" style="height: 72%"></div>
            <div class="bar" style="height: 85%"></div>
            <div class="bar" style="height: 78%"></div>
            <div class="bar" style="height: 92%"></div>
          </div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-header">
          <h2>Top Products</h2>
          <span class="chart-legend">By sales</span>
        </div>
        <ul class="product-list">
          <li v-for="(product, index) in topProducts" :key="index" class="product-item">
            <div class="product-rank">{{ index + 1 }}</div>
            <div class="product-info">
              <span class="product-name">{{ product.name }}</span>
              <div class="product-bar">
                <div class="bar-fill" :style="{ width: product.percentage + '%' }"></div>
              </div>
            </div>
            <span class="product-sales">${{ product.sales }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="recent-orders">
      <div class="section-header">
        <h2>Recent Orders</h2>
        <router-link to="/dashboard/orders" class="view-all">View All →</router-link>
      </div>
      <table class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in recentOrders" :key="order.id">
            <td class="order-id">{{ order.id }}</td>
            <td>{{ order.customer }}</td>
            <td class="amount">${{ order.amount.toFixed(2) }}</td>
            <td>
              <span :class="['status-badge', `status-${order.status.toLowerCase()}`]">
                {{ order.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const kpis = ref([
  {
    id: 1,
    label: 'Total Revenue',
    value: '$12,584.50',
    change: 12,
    icon: '💰',
    color: 'rgba(34, 197, 94, 0.15)',
  },
  {
    id: 2,
    label: 'Total Orders',
    value: '284',
    change: 8,
    icon: '📦',
    color: 'rgba(59, 130, 246, 0.15)',
  },
  {
    id: 3,
    label: 'Total Customers',
    value: '284',
    change: 15,
    icon: '👥',
    color: 'rgba(168, 85, 247, 0.15)',
  },
  {
    id: 4,
    label: 'Avg Order Value',
    value: '$44.35',
    change: 5,
    icon: '📈',
    color: 'rgba(245, 158, 11, 0.15)',
  },
])

const topProducts = ref([
  { name: 'Gamepad Pro', sales: 1249.99, percentage: 95 },
  { name: 'XR Headset', sales: 980.5, percentage: 75 },
  { name: 'Gift Card $25', sales: 750.0, percentage: 57 },
  { name: 'Plus Membership', sales: 599.75, percentage: 45 },
])

const recentOrders = ref([
  { id: '#ORD-284', customer: 'Marco Aurelio Ramirez', amount: 249.99, status: 'Delivered' },
  { id: '#ORD-283', customer: 'Natalia Palacios', amount: 149.5, status: 'Shipped' },
  { id: '#ORD-282', customer: 'David Morales', amount: 89.99, status: 'Processing' },
  { id: '#ORD-281', customer: 'Rodolfo Perez', amount: 199.75, status: 'Delivered' },
])
</script>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.dashboard-header h1 {
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

.date-filter {
  flex-shrink: 0;
}

.filter-select {
  background: #0b1220;
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

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.kpi-card {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition: all 0.2s ease;
}

.kpi-card:hover {
  border-color: #2563eb;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.15);
}

.kpi-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.kpi-content {
  flex: 1;
}

.kpi-label {
  margin: 0;
  font-size: 0.85rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.kpi-value {
  margin: 0.3rem 0 0;
  font-size: 1.6rem;
  font-weight: 800;
  color: #e2e8f0;
}

.kpi-change {
  margin: 0.4rem 0 0;
  font-size: 0.85rem;
  color: #ef4444;
}

.kpi-change.positive {
  color: #86efac;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.chart-container {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 1.5rem;
}

.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.chart-header h2 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #e2e8f0;
}

.chart-legend {
  font-size: 0.85rem;
  color: #94a3b8;
}

.chart-placeholder {
  min-height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.mini-chart {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 150px;
}

.bar {
  flex: 1;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  border-radius: 6px 6px 0 0;
  min-height: 10px;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.bar:hover {
  opacity: 1;
}

.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-rank {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}

.product-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e2e8f0;
}

.product-bar {
  width: 100%;
  height: 6px;
  background: #0f172a;
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #38bdf8);
  border-radius: 3px;
}

.product-sales {
  font-size: 0.9rem;
  font-weight: 700;
  color: #38bdf8;
  flex-shrink: 0;
}

.recent-orders {
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
}

.section-header h2 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #e2e8f0;
}

.view-all {
  font-size: 0.9rem;
  color: #38bdf8;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.view-all:hover {
  color: #60a5fa;
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

.orders-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #1f2937;
}

.order-id {
  color: #38bdf8;
  font-weight: 700;
}

.amount {
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

@media (max-width: 900px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .kpi-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
