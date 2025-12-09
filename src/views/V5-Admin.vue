<template>
  <section class="collaborators-view">
    <header class="collaborators-header">
      <div>
        <h1>Collaborators</h1>
        <p class="muted">Manage team members and their permissions.</p>
      </div>
      <button class="primary-btn">+ Invite Collaborator</button>
    </header>

    <div class="collaborators-container">
      <div class="controls">
        <div class="filter-group">
          <select class="filter-select">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>Staff</option>
            <option>Viewer</option>
          </select>
        </div>
        <div class="search-box">
          <input type="text" placeholder="Search collaborators..." />
        </div>
      </div>

      <table class="collaborators-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="collaborator in collaborators" :key="collaborator.id" class="collaborator-row">
            <td class="collaborator-name">
              <div class="avatar">{{ collaborator.initials }}</div>
              <span>{{ collaborator.name }}</span>
            </td>
            <td>{{ collaborator.email }}</td>
            <td>
              <span :class="['role-badge', `role-${collaborator.role.toLowerCase()}`]">
                {{ collaborator.role }}
              </span>
            </td>
            <td>
              <span :class="['status-badge', `status-${collaborator.status.toLowerCase()}`]">
                {{ collaborator.status }}
              </span>
            </td>
            <td class="date">{{ collaborator.joined }}</td>
            <td class="actions">
              <button class="action-btn edit-btn">Edit</button>
              <button class="action-btn remove-btn">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const collaborators = ref([
  {
    id: 1,
    name: 'Alex Johnson',
    initials: 'AJ',
    email: 'alex.johnson@example.com',
    role: 'Admin',
    status: 'Active',
    joined: '2023-01-15',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    initials: 'MG',
    email: 'maria.garcia@example.com',
    role: 'Manager',
    status: 'Active',
    joined: '2023-02-20',
  },
  {
    id: 3,
    name: 'James Wilson',
    initials: 'JW',
    email: 'james.wilson@example.com',
    role: 'Staff',
    status: 'Active',
    joined: '2023-03-10',
  },
  {
    id: 4,
    name: 'Sarah Chen',
    initials: 'SC',
    email: 'sarah.chen@example.com',
    role: 'Manager',
    status: 'Active',
    joined: '2023-04-05',
  },
  {
    id: 5,
    name: 'Robert Martinez',
    initials: 'RM',
    email: 'robert.martinez@example.com',
    role: 'Staff',
    status: 'Inactive',
    joined: '2023-05-12',
  },
  {
    id: 6,
    name: 'Emma Thompson',
    initials: 'ET',
    email: 'emma.thompson@example.com',
    role: 'Viewer',
    status: 'Active',
    joined: '2023-06-18',
  },
  {
    id: 7,
    name: 'David Lee',
    initials: 'DL',
    email: 'david.lee@example.com',
    role: 'Staff',
    status: 'Active',
    joined: '2023-07-22',
  },
])
</script>

<style scoped>
.collaborators-view {
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

.collaborators-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.collaborators-header h1 {
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

.collaborators-container {
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

.collaborators-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.collaborators-table thead {
  border-bottom: 2px solid #1f2937;
}

.collaborators-table th {
  padding: 0.75rem;
  text-align: left;
  color: #cbd5e1;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.collaborator-row {
  border-bottom: 1px solid #1f2937;
  transition: background-color 0.2s;
}

.collaborator-row:hover {
  background-color: #0f172a;
}

.collaborators-table td {
  padding: 0.75rem;
}

.collaborator-name {
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

.role-badge {
  display: inline-block;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.role-admin {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.role-manager {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

.role-staff {
  background: rgba(168, 85, 247, 0.15);
  color: #d8b4fe;
}

.role-viewer {
  background: rgba(107, 114, 128, 0.15);
  color: #d1d5db;
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
  background: rgba(107, 114, 128, 0.15);
  color: #d1d5db;
}

.date {
  color: #94a3b8;
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

.edit-btn {
  background: #0f172a;
  color: #38bdf8;
}

.edit-btn:hover {
  background: #1f2937;
  border-color: #38bdf8;
}

.remove-btn {
  background: #0f172a;
  color: #ef4444;
}

.remove-btn:hover {
  background: #7f1d1d;
  border-color: #ef4444;
}

@media (max-width: 900px) {
  .collaborators-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .controls {
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .collaborators-table {
    font-size: 0.8rem;
  }

  .collaborators-table th,
  .collaborators-table td {
    padding: 0.5rem;
  }

  .collaborator-name {
    gap: 0.5rem;
  }

  .avatar {
    width: 32px;
    height: 32px;
    font-size: 0.75rem;
  }
}
</style>
