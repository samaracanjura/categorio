// 1. DATA STORAGE AND MANAGEMENT
class TransactionStorage {
  constructor() {
    this.STORAGE_KEY = 'categorio_transactions';
    this.initializeData();
  }

  initializeData() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const sampleData = [
        {
          id: 1670000001,
          merchant: "Pizza Palace",
          amount: 24.50,
          category: "food",
          date: "2025-12-06",
          type: "expense",
          verified: true
        },
        {
          id: 1670000002,
          merchant: "Starbucks",
          amount: 6.75,
          category: "food",
          date: "2025-12-06",
          type: "expense",
          verified: true
        },
        {
          id: 1670000003,
          merchant: "Uber",
          amount: 15.20,
          category: "transport",
          date: "2025-12-06",
          type: "expense",
          verified: true
        },
        {
          id: 1670000004,
          merchant: "Salary Deposit",
          amount: 3200.00,
          category: "income",
          date: "2025-12-05",
          type: "income",
          verified: true
        },
        {
          id: 1670000005,
          merchant: "Fashion Store",
          amount: 156.99,
          category: "shopping",
          date: "2025-12-05",
          type: "expense",
          verified: true
        },
        {
          id: 1670000006,
          merchant: "Electric Bill",
          amount: 89.00,
          category: "utilities",
          date: "2025-12-05",
          type: "expense",
          verified: true
        },
        {
          id: 1670000007,
          merchant: "McDonald's",
          amount: 12.45,
          category: "food",
          date: "2025-12-05",
          type: "expense",
          verified: true
        },
        {
          id: 1670000008,
          merchant: "PlayStation Store",
          amount: 29.99,
          category: "entertainment",
          date: "2025-12-05",
          type: "expense",
          verified: true
        }
      ];
      this.saveTransactions(sampleData);
    }
  }

  getAllTransactions() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addTransaction(transaction) {
    const transactions = this.getAllTransactions();
    transaction.id = Date.now();
    transaction.verified = true;
    transactions.unshift(transaction);
    this.saveTransactions(transactions);
    return transaction;
  }

  saveTransactions(transactions) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(transactions));
  }

  getBalance() {
    const transactions = this.getAllTransactions();
    return transactions.reduce((sum, t) => {
      return t.type === 'income' ? sum + t.amount : sum - t.amount;
    }, 5750.00);
  }

  getThisMonthSpending() {
    const transactions = this.getAllTransactions();
    const thisMonth = transactions.filter(t => {
      const date = new Date(t.date);
      const now = new Date();
      return date.getMonth() === now.getMonth() && 
             date.getFullYear() === now.getFullYear() &&
             t.type === 'expense';
    });
    return thisMonth.reduce((sum, t) => sum + t.amount, 0);
  }

  getCategoryTotals() {
    const transactions = this.getAllTransactions();
    const totals = {};
    transactions.forEach(t => {
      if (t.type === 'expense') {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
      }
    });
    return totals;
  }

  getTopCategory() {
    const totals = this.getCategoryTotals();
    const entries = Object.entries(totals);
    if (entries.length === 0) return null;
    return entries.sort((a, b) => b[1] - a[1])[0];
  }
}

// 2. UTILITY FUNCTIONS

const Utils = {
  getCategoryColor(category) {
    const colors = {
      food: '#EF4444',
      shopping: '#EC4899',
      transport: '#8B5CF6',
      utilities: '#06B6D4',
      entertainment: '#6366F1',
      income: '#10B981'
    };
    return colors[category] || '#64748B';
  },

  getCategoryIcon(category) {
    const icons = {
      food: '🍕',
      shopping: '🛍️',
      transport: '🚗',
      utilities: '💡',
      entertainment: '🎮',
      income: '💰'
    };
    return icons[category] || '📝';
  },

  formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  },

  formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
  }
};

// 3. NAVIGATION HANDLER

class Navigation {
  constructor() {
    this.setupNavigation();
  }

  setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const label = item.querySelector('.nav-label')?.textContent.toLowerCase();
        this.navigateTo(label);
      });
    });
  }

  navigateTo(page) {
    const pageMap = {
      'home': 'index.html',
      'transactions': 'transactions.html',
      'add': 'add-transaction.html',
      'insights': 'insights.html',
      'profile': 'profile.html'
    };
    
    if (pageMap[page]) {
      window.location.href = pageMap[page];
    }
  }
}

// 4. DASHBOARD PAGE

class Dashboard {
  constructor() {
    this.storage = new TransactionStorage();
    this.render();
  }

  render() {
    this.updateBalance();
    this.updateRecentTransactions();
  }

  updateBalance() {
    const balance = this.storage.getBalance();
    const balanceElement = document.querySelector('.balance-amount');
    if (balanceElement) {
      balanceElement.textContent = Utils.formatCurrency(balance);
    }

    const monthSpending = this.storage.getThisMonthSpending();
    const monthElement = document.querySelector('.month-spent');
    if (monthElement) {
      monthElement.textContent = Utils.formatCurrency(monthSpending);
    }
  }

  updateRecentTransactions() {
    const container = document.querySelector('.recent-transactions');
    if (!container) return;

    const transactions = this.storage.getAllTransactions().slice(0, 4);
    
    container.innerHTML = transactions.map(t => `
      <div class="transaction-card" style="--transaction-color: ${Utils.getCategoryColor(t.category)}">
        <div class="transaction-icon">
          ${Utils.getCategoryIcon(t.category)}
          <div class="transaction-verified">✓</div>
        </div>
        <div class="transaction-info">
          <div class="transaction-merchant">${t.merchant}</div>
          <div class="transaction-details">
            <span class="transaction-category" style="background: ${Utils.getCategoryColor(t.category)}">${t.category}</span>
            <span class="transaction-date">${Utils.formatDate(t.date)}</span>
          </div>
        </div>
        <div class="transaction-amount ${t.type === 'income' ? 'positive' : 'negative'}">
          ${t.type === 'income' ? '+' : '-'}${Utils.formatCurrency(t.amount)}
        </div>
      </div>
    `).join('');
  }
}

// 5. TRANSACTIONS LIST PAGE

class TransactionsList {
  constructor() {
    this.storage = new TransactionStorage();
    this.currentFilter = 'all';
    this.render();
    this.setupFilters();
  }

  render() {
    const container = document.querySelector('.transactions-list');
    if (!container) return;

    let transactions = this.storage.getAllTransactions();

    if (this.currentFilter !== 'all') {
      transactions = transactions.filter(t => t.category === this.currentFilter);
    }

    const grouped = this.groupByDate(transactions);
    
    container.innerHTML = '';

    Object.keys(grouped).forEach(dateLabel => {
      // Add date divider
      const divider = document.createElement('div');
      divider.className = 'date-divider';
      divider.innerHTML = `
        <div class="date-divider-line"></div>
        <div class="date-divider-text">${dateLabel}</div>
        <div class="date-divider-line"></div>
      `;
      container.appendChild(divider);

      // Add transactions
      grouped[dateLabel].forEach(t => {
        const card = document.createElement('div');
        card.className = 'transaction-card';
        card.style.setProperty('--transaction-color', Utils.getCategoryColor(t.category));
        card.innerHTML = `
          <div class="transaction-icon">
            ${Utils.getCategoryIcon(t.category)}
            <div class="transaction-verified">✓</div>
          </div>
          <div class="transaction-info">
            <div class="transaction-merchant">${t.merchant}</div>
            <div class="transaction-details">
              <span class="transaction-category" style="background: ${Utils.getCategoryColor(t.category)}">${t.category}</span>
              <span class="transaction-date">${Utils.formatDate(t.date)}</span>
            </div>
          </div>
          <div class="transaction-amount-wrapper">
            <div class="transaction-amount ${t.type === 'income' ? 'positive' : 'negative'}">
              ${t.type === 'income' ? '+' : '-'}${Utils.formatCurrency(t.amount)}
            </div>
            <span class="transaction-status status-completed">Paid</span>
          </div>
        `;
        container.appendChild(card);
      });
    });
  }

  groupByDate(transactions) {
    const grouped = {};
    transactions.forEach(t => {
      const label = Utils.formatDate(t.date);
      if (!grouped[label]) grouped[label] = [];
      grouped[label].push(t);
    });
    return grouped;
  }

  setupFilters() {
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        
        const text = chip.textContent.trim().toLowerCase();
        this.currentFilter = text === 'all' ? 'all' : text;
        this.render();
      });
    });
  }
}

// 6. TRANSACTION ADD PAGE
class AddTransaction {
  constructor() {
    this.storage = new TransactionStorage();
    this.selectedCategory = null;
    this.selectedType = 'expense';
    this.setupForm();
  }

  setupForm() {
    // Set today's date
    const dateInput = document.getElementById('dateInput');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Category selection
    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.selectedCategory = pill.dataset.category;
      });
    });

    // Type toggle
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedType = btn.dataset.type;
      });
    });

    // Submit
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }

    // Close button
    const closeBtn = document.querySelector('.close-button');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }
  }

  handleSubmit() {
    const amount = parseFloat(document.getElementById('amountInput').value);
    const merchant = document.getElementById('merchantInput').value;
    const date = document.getElementById('dateInput').value;
    const notes = document.getElementById('notesInput').value;

    // Validation
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!merchant.trim()) {
      alert('Please enter merchant name');
      return;
    }

    if (!this.selectedCategory) {
      alert('Please select a category');
      return;
    }

    // Create transaction
    const transaction = {
      amount: amount,
      merchant: merchant,
      category: this.selectedCategory,
      date: date,
      notes: notes,
      type: this.selectedType
    };

    // Save
    this.storage.addTransaction(transaction);

    // Show success modal
    this.showSuccess();
  }

  showSuccess() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.classList.add('show');
    }

    // View transactions button
    const viewBtn = document.getElementById('viewTransactionsBtn');
    if (viewBtn) {
      viewBtn.addEventListener('click', () => {
        window.location.href = 'transactions.html';
      });
    }

    // Close modal on outside click
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
          window.location.href = 'transactions.html';
        }
      });
    }
  }
}

// 7. INSIGHTS PAGE

class Insights {
  constructor() {
    this.storage = new TransactionStorage();
    this.render();
  }

  render() {
    this.updateWidgets();
    this.updateCategoryBreakdown();
  }

  updateWidgets() {
    const totalSpent = this.storage.getThisMonthSpending();
    const totalElement = document.querySelector('.widget-value');
    if (totalElement) {
      totalElement.textContent = Utils.formatCurrency(totalSpent);
    }

    const topCategory = this.storage.getTopCategory();
    if (topCategory) {
      const [category, amount] = topCategory;
      const categoryElement = document.querySelectorAll('.widget-value')[1];
      if (categoryElement) {
        categoryElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryElement.style.color = Utils.getCategoryColor(category);
      }
    }
  }

  updateCategoryBreakdown() {
    const container = document.querySelector('.category-breakdown');
    if (!container) return;

    const totals = this.storage.getCategoryTotals();
    const totalAmount = Object.values(totals).reduce((sum, v) => sum + v, 0);

    // Update center total
    const centerTotal = document.querySelector('.donut-total-amount');
    if (centerTotal) {
      centerTotal.textContent = Utils.formatCurrency(totalAmount);
    }

    container.innerHTML = Object.entries(totals).map(([category, amount]) => `
      <div class="category-item">
        <div class="category-info">
          <div class="category-dot" style="background: ${Utils.getCategoryColor(category)}"></div>
          <span class="category-name">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
        </div>
        <span class="category-amount">${Utils.formatCurrency(amount)}</span>
      </div>
    `).join('');
  }
}

// 8. PROFILE PAGE

class Profile {
  constructor() {
    this.storage = new TransactionStorage();
    this.render();
  }

  render() {
    const balance = this.storage.getBalance();
    const balanceElement = document.querySelector('.balance-amount');
    if (balanceElement) {
      balanceElement.textContent = Utils.formatCurrency(balance);
    }

    const monthSpending = this.storage.getThisMonthSpending();
    const monthElement = document.querySelector('.month-amount');
    if (monthElement) {
      monthElement.textContent = Utils.formatCurrency(monthSpending);
    }

    // Calculate progress
    const budget = 3000; // Example budget
    const progress = (monthSpending / budget) * 100;
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.width = `${Math.min(progress, 100)}%`;
    }
  }
}

// 9. INITIALIZATION

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const page = path.split('/').pop();

  // Initialize navigation on all pages
  new Navigation();

  // Initialize page-specific functionality
  if (page === 'index.html' || page === '' || page === '/') {
    new Dashboard();
  } else if (page === 'transactions.html') {
    new TransactionsList();
  } else if (page === 'add-transaction.html') {
    new AddTransaction();
  } else if (page === 'insights.html') {
    new Insights();
  } else if (page === 'profile.html') {
    new Profile();
  }

  console.log('✅ Categorio App Initialized');
});

// 10. ACCESSIBILITY - KEYBOARD NAVIGATION

document.addEventListener('keydown', (e) => {
  // Escape closes modals
  if (e.key === 'Escape') {
    document.querySelectorAll('.success-modal').forEach(modal => {
      modal.classList.remove('show');
    });
  }

  // Enter submits forms
  if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
    e.target.click();
  }
});