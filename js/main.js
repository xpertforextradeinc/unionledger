/**
 * UnionLedger - Core JavaScript Framework
 * Provides utilities for form validation, alerts, navigation, and module loading
 */

class UnionLedger {
  constructor() {
    this.modules = {};
    this.alerts = new AlertManager();
    this.validator = new FormValidator();
    this.logger = new AuditLogger();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadStoredData();
    console.log('UnionLedger initialized');
  }

  setupEventListeners() {
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-nav]')) {
        e.preventDefault();
        this.navigate(e.target.dataset.nav);
      }
    });

    // Handle form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.matches('[data-validate]')) {
        e.preventDefault();
        this.handleFormSubmit(e.target);
      }
    });
  }

  navigate(page) {
    const currentPage = document.querySelector('.module.active');
    const targetPage = document.querySelector(`[data-module="${page}"]`);
    
    if (currentPage) {
      currentPage.classList.remove('active');
    }
    
    if (targetPage) {
      targetPage.classList.add('active');
      this.updateNavigation(page);
      this.logger.log('navigation', { page, timestamp: new Date() });
    } else {
      this.alerts.show('Page not found', 'danger');
    }
  }

  updateNavigation(activePage) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.nav === activePage);
    });
  }

  handleFormSubmit(form) {
    const validation = this.validator.validateForm(form);
    
    if (validation.isValid) {
      this.processForm(form);
    } else {
      this.displayValidationErrors(form, validation.errors);
    }
  }

  processForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const formType = form.dataset.validate;

    switch (formType) {
      case 'registration':
        this.handleRegistration(data);
        break;
      case 'transfer':
        this.handleTransfer(data);
        break;
      case 'kyc':
        this.handleKYC(data);
        break;
      default:
        console.log('Form submitted:', data);
    }
  }

  handleRegistration(data) {
    // Simulate registration process
    this.alerts.show('Registration submitted for review', 'info');
    this.logger.log('registration_attempt', data);
    
    setTimeout(() => {
      this.alerts.show('Welcome to UnionLedger! Please verify your wallet.', 'success');
      this.navigate('dashboard');
    }, 2000);
  }

  handleTransfer(data) {
    // Simulate transfer process
    if (parseFloat(data.amount) > 10000) {
      this.alerts.show('Large transfers require additional verification', 'warning');
      return;
    }
    
    this.alerts.show('Transfer initiated successfully', 'success');
    this.logger.log('transfer_initiated', data);
  }

  handleKYC(data) {
    // Simulate KYC process
    this.alerts.show('KYC documents submitted for review', 'info');
    this.logger.log('kyc_submission', data);
    
    setTimeout(() => {
      this.alerts.show('KYC verification completed!', 'success');
    }, 3000);
  }

  displayValidationErrors(form, errors) {
    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(error => error.remove());
    form.querySelectorAll('.form-control.error').forEach(control => {
      control.classList.remove('error');
    });

    // Display new errors
    errors.forEach(error => {
      const field = form.querySelector(`[name="${error.field}"]`);
      if (field) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = error.message;
        field.parentNode.appendChild(errorDiv);
      }
    });
  }

  loadStoredData() {
    // Load user session or demo data
    const demoUser = {
      name: 'Demo User',
      email: 'demo@unionledger.com',
      balance: 5420.50,
      accountNumber: 'UL-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };
    
    this.currentUser = JSON.parse(localStorage.getItem('unionledger_user') || JSON.stringify(demoUser));
    this.updateDashboard();
  }

  updateDashboard() {
    // Update dashboard with user data
    const balanceElement = document.querySelector('[data-balance]');
    const nameElement = document.querySelector('[data-user-name]');
    const accountElement = document.querySelector('[data-account-number]');
    
    if (balanceElement) {
      balanceElement.textContent = `$${this.currentUser.balance.toLocaleString()}`;
    }
    if (nameElement) {
      nameElement.textContent = this.currentUser.name;
    }
    if (accountElement) {
      accountElement.textContent = this.currentUser.accountNumber;
    }
  }

  registerModule(name, module) {
    this.modules[name] = module;
    console.log(`Module registered: ${name}`);
  }
}

/**
 * Alert Management System
 */
class AlertManager {
  constructor() {
    this.container = null;
    this.createContainer();
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.id = 'alert-container';
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      max-width: 400px;
    `;
    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration = 5000) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.style.cssText = `
      margin-bottom: 10px;
      animation: slideInRight 0.3s ease-out;
    `;
    alert.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>${message}</span>
        <button type="button" style="background: none; border: none; font-size: 18px; cursor: pointer;">&times;</button>
      </div>
    `;

    // Add close button functionality
    alert.querySelector('button').onclick = () => this.remove(alert);

    this.container.appendChild(alert);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => this.remove(alert), duration);
    }

    return alert;
  }

  remove(alert) {
    if (alert && alert.parentNode) {
      alert.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => {
        if (alert.parentNode) {
          alert.parentNode.removeChild(alert);
        }
      }, 300);
    }
  }
}

/**
 * Form Validation System
 */
class FormValidator {
  constructor() {
    this.rules = {
      required: (value) => value.trim() !== '',
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      phone: (value) => /^\+?[\d\s\-\(\)]+$/.test(value),
      password: (value) => value.length >= 8,
      amount: (value) => /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) > 0,
      accountNumber: (value) => /^[A-Z0-9\-]+$/.test(value)
    };

    this.messages = {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
      password: 'Password must be at least 8 characters long',
      amount: 'Please enter a valid amount',
      accountNumber: 'Please enter a valid account number'
    };
  }

  validateForm(form) {
    const errors = [];
    const fields = form.querySelectorAll('[data-validate-rule]');

    fields.forEach(field => {
      const rules = field.dataset.validateRule.split('|');
      const fieldName = field.name || field.id;
      const value = field.value;

      rules.forEach(rule => {
        const [ruleName, param] = rule.split(':');
        if (this.rules[ruleName] && !this.rules[ruleName](value, param)) {
          errors.push({
            field: fieldName,
            rule: ruleName,
            message: this.messages[ruleName] || `Invalid ${fieldName}`
          });
        }
      });
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

/**
 * Input Sanitization Utilities
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/<[^>]*>/g, '');
}

/**
 * Audit Logging System
 */
class AuditLogger {
  constructor() {
    this.logs = JSON.parse(localStorage.getItem('unionledger_audit_logs') || '[]');
  }

  log(action, data = {}) {
    const logEntry = {
      id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      action,
      data,
      userAgent: navigator.userAgent,
      ip: 'Client-side' // In production, this would be server-side
    };

    this.logs.unshift(logEntry);
    
    // Keep only last 1000 entries
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(0, 1000);
    }

    localStorage.setItem('unionledger_audit_logs', JSON.stringify(this.logs));
    console.log('Audit log:', logEntry);
  }

  getLogs(limit = 50) {
    return this.logs.slice(0, limit);
  }

  getLogsByAction(action, limit = 50) {
    return this.logs
      .filter(log => log.action === action)
      .slice(0, limit);
  }

  exportLogs() {
    const dataStr = JSON.stringify(this.logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `unionledger-audit-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }
}

/**
 * Wallet Verification System
 */
class WalletVerification {
  constructor(unionLedger) {
    this.app = unionLedger;
    this.supportedWallets = ['MetaMask', 'Trust Wallet', 'Coinbase Wallet'];
  }

  async verifyWallet(address) {
    // Simulate wallet verification
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = /^0x[a-fA-F0-9]{40}$/.test(address);
        resolve({
          isValid,
          address,
          balance: isValid ? Math.random() * 1000 : 0,
          verifiedAt: new Date().toISOString()
        });
      }, 1500);
    });
  }

  async connectWallet(walletType) {
    this.app.alerts.show('Connecting to wallet...', 'info');
    
    // Simulate wallet connection
    return new Promise((resolve) => {
      setTimeout(() => {
        const address = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        this.app.alerts.show(`Connected to ${walletType}`, 'success');
        resolve({ address, walletType });
      }, 2000);
    });
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.module {
  display: none;
}

.module.active {
  display: block;
}
`;
document.head.appendChild(style);

// Initialize UnionLedger when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.unionLedger = new UnionLedger();
  window.walletVerification = new WalletVerification(window.unionLedger);
});