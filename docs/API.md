# API Documentation - UnionLedger

This document provides comprehensive API documentation for UnionLedger's JavaScript framework and component system.

## Core Classes

### UnionLedger Main Class

The primary application class that manages modules, navigation, and core functionality.

```javascript
class UnionLedger {
  constructor()
  init()
  navigate(page)
  updateNavigation(activePage)
  handleFormSubmit(form)
  processForm(form)
  registerModule(name, module)
}
```

#### Constructor
```javascript
const app = new UnionLedger();
```

Initializes the application with:
- Alert management system
- Form validation utilities
- Audit logging
- Event listeners for navigation and forms

#### Methods

##### `navigate(page: string): void`
Navigates between application modules.

```javascript
// Navigate to dashboard
unionLedger.navigate('dashboard');

// Navigate to transfer module
unionLedger.navigate('transfer');
```

**Parameters:**
- `page` (string): Module name to navigate to

**Example:**
```javascript
// Navigation via JavaScript
unionLedger.navigate('registration');

// Navigation via HTML attributes
<button data-nav="dashboard">Go to Dashboard</button>
```

##### `registerModule(name: string, module: object): void`
Registers a custom module with the application.

```javascript
const customModule = {
  init() {
    console.log('Custom module initialized');
  },
  
  render() {
    return '<div>Custom module content</div>';
  }
};

unionLedger.registerModule('custom', customModule);
```

##### `handleFormSubmit(form: HTMLFormElement): void`
Processes form submissions with validation.

**Automatic Usage:**
Forms with `data-validate` attribute are automatically handled:

```html
<form data-validate="registration">
  <!-- form fields -->
</form>
```

### AlertManager Class

Manages user notifications and alerts throughout the application.

```javascript
class AlertManager {
  show(message, type, duration)
  remove(alert)
  createContainer()
}
```

#### Methods

##### `show(message: string, type: string = 'info', duration: number = 5000): HTMLElement`
Displays an alert notification.

```javascript
// Success message
unionLedger.alerts.show('Transfer completed successfully!', 'success');

// Error message
unionLedger.alerts.show('Invalid account number', 'danger');

// Warning with custom duration
unionLedger.alerts.show('Session expires in 5 minutes', 'warning', 10000);

// Info message (default)
unionLedger.alerts.show('Processing your request...');
```

**Parameters:**
- `message` (string): Alert message text
- `type` (string): Alert type - 'success', 'danger', 'warning', 'info'
- `duration` (number): Auto-hide duration in milliseconds (0 = no auto-hide)

**Returns:** HTMLElement - The created alert element

**Alert Types:**
- `success`: Green background, success icon
- `danger`: Red background, error styling
- `warning`: Yellow background, warning styling  
- `info`: Blue background, information styling

### FormValidator Class

Provides comprehensive form validation with customizable rules.

```javascript
class FormValidator {
  validateForm(form)
  rules: object
  messages: object
}
```

#### Validation Rules

The validator includes built-in validation rules:

```javascript
const rules = {
  required: (value) => value.trim() !== '',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^\+?[\d\s\-\(\)]+$/.test(value),
  password: (value) => value.length >= 8,
  amount: (value) => /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) > 0,
  accountNumber: (value) => /^[A-Z0-9\-]+$/.test(value)
};
```

#### Usage in HTML

Add validation rules to form fields using `data-validate-rule` attribute:

```html
<!-- Single rule -->
<input type="email" data-validate-rule="email" name="email">

<!-- Multiple rules -->
<input type="password" data-validate-rule="required|password" name="password">

<!-- Custom validation -->
<input type="number" data-validate-rule="required|amount" name="transferAmount">
```

#### Method: `validateForm(form: HTMLFormElement): object`

```javascript
const validation = unionLedger.validator.validateForm(form);

if (validation.isValid) {
  // Process form
  console.log('Form is valid');
} else {
  // Display errors
  validation.errors.forEach(error => {
    console.log(`${error.field}: ${error.message}`);
  });
}
```

**Returns:**
```javascript
{
  isValid: boolean,
  errors: Array<{
    field: string,
    rule: string,
    message: string
  }>
}
```

### AuditLogger Class

Provides security and compliance logging for all user actions.

```javascript
class AuditLogger {
  log(action, data)
  getLogs(limit)
  getLogsByAction(action, limit)
  exportLogs()
}
```

#### Methods

##### `log(action: string, data: object = {}): void`
Records an audit log entry.

```javascript
// Log user action
unionLedger.logger.log('user_login', {
  email: 'user@example.com',
  timestamp: new Date()
});

// Log transaction
unionLedger.logger.log('transfer_initiated', {
  amount: 250.00,
  recipient: 'UL-123456789',
  transferType: 'standard'
});

// Log security event
unionLedger.logger.log('failed_login_attempt', {
  email: 'user@example.com',
  reason: 'invalid_password',
  ipAddress: 'client-side'
});
```

##### `getLogs(limit: number = 50): Array`
Retrieves recent audit logs.

```javascript
// Get last 10 logs
const recentLogs = unionLedger.logger.getLogs(10);

// Get all logs (up to 1000)
const allLogs = unionLedger.logger.getLogs(1000);
```

##### `getLogsByAction(action: string, limit: number = 50): Array`
Retrieves logs filtered by action type.

```javascript
// Get all transfer logs
const transfers = unionLedger.logger.getLogsByAction('transfer_initiated');

// Get login attempts
const logins = unionLedger.logger.getLogsByAction('user_login', 20);
```

##### `exportLogs(): void`
Downloads audit logs as JSON file.

```javascript
// Export all logs to file
unionLedger.logger.exportLogs();
```

### WalletVerification Class

Handles digital wallet integration and verification.

```javascript
class WalletVerification {
  constructor(unionLedgerInstance)
  verifyWallet(address)
  connectWallet(walletType)
  supportedWallets: Array<string>
}
```

#### Methods

##### `connectWallet(walletType: string): Promise<object>`
Connects to a digital wallet.

```javascript
// Connect to MetaMask
const connection = await walletVerification.connectWallet('MetaMask');
console.log('Connected:', connection.address);

// Connect to Trust Wallet  
const trustConnection = await walletVerification.connectWallet('Trust Wallet');
```

**Parameters:**
- `walletType` (string): Type of wallet to connect ('MetaMask', 'Trust Wallet', 'Coinbase Wallet')

**Returns:**
```javascript
Promise<{
  address: string,
  walletType: string
}>
```

##### `verifyWallet(address: string): Promise<object>`
Verifies a wallet address.

```javascript
const verification = await walletVerification.verifyWallet('0x742d35Cc6bC4C52e...');

if (verification.isValid) {
  console.log('Wallet verified:', verification.address);
  console.log('Balance:', verification.balance);
}
```

**Returns:**
```javascript
Promise<{
  isValid: boolean,
  address: string,
  balance: number,
  verifiedAt: string
}>
```

## HTML Data Attributes

### Navigation Attributes

#### `data-nav`
Triggers navigation when clicked.

```html
<button data-nav="dashboard">Go to Dashboard</button>
<a href="#" data-nav="transfer">Send Money</a>
```

### Form Attributes

#### `data-validate`
Marks forms for automatic validation and processing.

```html
<form data-validate="registration">
  <!-- Registration form -->
</form>

<form data-validate="transfer">
  <!-- Transfer form -->
</form>
```

#### `data-validate-rule`
Specifies validation rules for form fields.

```html
<!-- Single rule -->
<input data-validate-rule="required">

<!-- Multiple rules -->
<input data-validate-rule="required|email">
<input data-validate-rule="required|password|minLength:8">
```

### Data Display Attributes

#### `data-balance`
Elements with this attribute will display the current account balance.

```html
<span data-balance>$0.00</span>
<div data-balance class="balance-display"></div>
```

#### `data-user-name`
Displays the current user's name.

```html
<span data-user-name>User Name</span>
```

#### `data-account-number`
Displays the user's account number.

```html
<span data-account-number>UL-123456789</span>
```

### Module Attributes

#### `data-module`
Identifies page modules for navigation system.

```html
<div class="module" data-module="dashboard">
  <!-- Dashboard content -->
</div>

<div class="module" data-module="transfer">
  <!-- Transfer content -->
</div>
```

## CSS Classes

### Layout Classes

#### Container Classes
```css
.container        /* Max-width container with responsive padding */
.container-sm     /* Small container (640px max) */
.container-lg     /* Large container (1400px max) */
```

#### Module Classes
```css
.module           /* Base module styling, hidden by default */
.module.active    /* Active module, visible */
```

### Component Classes

#### Button Classes
```css
.btn              /* Base button styling */
.btn-primary      /* Primary action button (blue) */
.btn-secondary    /* Secondary action button (outlined) */
.btn-success      /* Success button (green) */
.btn-danger       /* Danger button (red) */
.btn-lg           /* Large button size */
```

#### Form Classes
```css
.form-group       /* Form field container */
.form-label       /* Form field label */
.form-control     /* Input field styling */
.form-control.error /* Error state styling */
.form-help        /* Help text styling */
.form-error       /* Error message styling */
```

#### Card Classes
```css
.card             /* Card container */
.card-header      /* Card header section */
.card-body        /* Main card content */
.card-footer      /* Card footer section */
```

#### Alert Classes
```css
.alert            /* Base alert styling */
.alert-success    /* Success alert (green) */
.alert-warning    /* Warning alert (yellow) */
.alert-danger     /* Error alert (red) */
.alert-info       /* Info alert (blue) */
```

### Navigation Classes

#### Navbar Classes
```css
.navbar           /* Main navigation bar */
.navbar-brand     /* Logo/brand link */
.navbar-nav       /* Navigation links container */
.nav-link         /* Individual navigation link */
.nav-link.active  /* Active navigation state */
```

### Utility Classes

#### Text Alignment
```css
.text-center      /* Center align text */
.text-left        /* Left align text */
.text-right       /* Right align text */
```

#### Spacing
```css
.mb-0, .mb-1, .mb-2, .mb-3, .mb-4   /* Margin bottom */
.mt-0, .mt-1, .mt-2, .mt-3, .mt-4   /* Margin top */
```

#### Display
```css
.d-flex                    /* Display flex */
.justify-content-between   /* Space between flex items */
.justify-content-center    /* Center flex items */
.align-items-center        /* Align flex items center */
```

#### Sizing
```css
.w-100            /* Width 100% */
.h-100            /* Height 100% */
```

## CSS Custom Properties (Variables)

UnionLedger uses CSS custom properties for consistent theming:

```css
:root {
  /* Brand Colors */
  --primary-blue: #1e40af;
  --secondary-gold: #f59e0b;
  --accent-green: #10b981;
  --danger-red: #ef4444;
  --warning-yellow: #f59e0b;
  
  /* Text Colors */
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-light: #9ca3af;
  
  /* Background Colors */
  --background-light: #f9fafb;
  --background-white: #ffffff;
  
  /* Border Colors */
  --border-light: #e5e7eb;
  --border-medium: #d1d5db;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## Events

### Custom Events

UnionLedger dispatches custom events for module communication:

```javascript
// Listen for navigation events
document.addEventListener('unionledger:navigate', (event) => {
  console.log('Navigated to:', event.detail.page);
});

// Listen for form submission events
document.addEventListener('unionledger:form-submit', (event) => {
  console.log('Form submitted:', event.detail.formType);
});

// Listen for alert events
document.addEventListener('unionledger:alert', (event) => {
  console.log('Alert shown:', event.detail.message);
});
```

## Error Handling

### Form Validation Errors

Form validation errors are automatically displayed:

```javascript
// Validation errors are automatically shown
const validation = unionLedger.validator.validateForm(form);

if (!validation.isValid) {
  validation.errors.forEach(error => {
    // Error automatically displayed in UI
    console.log(`Field ${error.field}: ${error.message}`);
  });
}
```

### API Error Patterns

For future API integration:

```javascript
// Recommended error handling pattern
try {
  const response = await fetch('/api/transfer', {
    method: 'POST',
    body: JSON.stringify(transferData)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const result = await response.json();
  unionLedger.alerts.show('Transfer successful!', 'success');
  
} catch (error) {
  unionLedger.logger.log('api_error', { error: error.message });
  unionLedger.alerts.show('Transfer failed. Please try again.', 'danger');
}
```

## Browser Support

UnionLedger is compatible with:

- **Chrome**: 90+
- **Firefox**: 88+  
- **Safari**: 14+
- **Edge**: 90+

### Feature Requirements

- **ES6+ Support**: Classes, arrow functions, template literals
- **CSS Grid & Flexbox**: Layout systems
- **CSS Custom Properties**: Theming system
- **LocalStorage**: Data persistence
- **Fetch API**: HTTP requests (future)

### Polyfills

For older browser support, include:

```html
<!-- For IE11 support -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
```

## Performance Considerations

### JavaScript Performance
- Classes are instantiated once on page load
- Event delegation reduces memory usage
- LocalStorage operations are batched

### CSS Performance  
- CSS custom properties reduce redundancy
- Minimal DOM manipulation for better performance
- CSS Grid and Flexbox for efficient layouts

### Best Practices

```javascript
// Good: Use event delegation
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-nav]')) {
    unionLedger.navigate(e.target.dataset.nav);
  }
});

// Avoid: Individual event listeners
document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', handler); // Creates many listeners
});
```

---

**This documentation is continuously updated.** For the latest information, check the source code and inline JSDoc comments.