# Contributing to UnionLedger

Welcome to UnionLedger! We're excited that you're interested in contributing to our digital banking platform. This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions
We welcome various types of contributions:

- **Bug Reports**: Report issues you encounter
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit bug fixes or new features
- **Documentation**: Improve or add documentation
- **Design**: Contribute to UI/UX improvements
- **Testing**: Help test features and report findings

### Getting Started

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/UnionLedger/unionledger.git
   cd unionledger
   ```

2. **Set Up Development Environment**
   Follow the [Setup Guide](SETUP.md) to get your local environment ready.

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes:
   git checkout -b bugfix/issue-description
   ```

## 📋 Development Guidelines

### Code Style Standards

#### HTML Standards
- Use semantic HTML5 elements
- Include proper ARIA attributes for accessibility
- Maintain proper indentation (2 spaces)
- Use descriptive `id` and `class` names

```html
<!-- Good -->
<section class="dashboard-summary" role="region" aria-labelledby="balance-heading">
  <h2 id="balance-heading">Account Balance</h2>
  <div class="balance-amount" data-balance>$0.00</div>
</section>

<!-- Avoid -->
<div class="box">
  <div class="title">Balance</div>
  <div class="amount">$0.00</div>
</div>
```

#### CSS Standards
- Use CSS custom properties (variables) for consistency
- Follow BEM methodology for class naming
- Write mobile-first responsive code
- Group related properties together

```css
/* Good */
.card {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Appearance */
  background-color: var(--background-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  
  /* Spacing */
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.card__header {
  border-bottom: 1px solid var(--border-light);
  padding-bottom: var(--spacing-md);
}
```

#### JavaScript Standards
- Use ES6+ features appropriately
- Write clear, descriptive function names
- Include JSDoc comments for complex functions
- Follow consistent error handling patterns

```javascript
/**
 * Validates a form and returns validation results
 * @param {HTMLFormElement} form - The form element to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
validateForm(form) {
  const errors = [];
  const fields = form.querySelectorAll('[data-validate-rule]');
  
  // Validation logic here
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

### Accessibility Requirements

All contributions must meet accessibility standards:

- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Screen Reader Support**: Use proper ARIA labels and descriptions
- **Color Contrast**: Maintain WCAG AA contrast ratios (4.5:1 minimum)
- **Focus Management**: Visible focus indicators on all focusable elements

```html
<!-- Accessible form example -->
<div class="form-group">
  <label for="amount" class="form-label">Transfer Amount</label>
  <input 
    type="number" 
    id="amount" 
    name="amount" 
    class="form-control"
    aria-describedby="amount-help amount-error"
    data-validate-rule="required|amount"
    required>
  <div id="amount-help" class="form-help">Enter amount in USD</div>
  <div id="amount-error" class="form-error" aria-live="polite"></div>
</div>
```

### Security Considerations

When contributing, keep these security principles in mind:

- **Input Validation**: Always validate user input
- **XSS Prevention**: Properly escape output
- **CSRF Protection**: Include appropriate tokens
- **Audit Logging**: Log security-relevant actions

```javascript
// Good: Proper input validation
function sanitizeInput(input) {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

// Good: Audit logging
this.logger.log('transfer_attempt', {
  amount: sanitizeInput(data.amount),
  recipient: sanitizeInput(data.recipient),
  timestamp: new Date().toISOString()
});
```

## 🧪 Testing Requirements

### Manual Testing
Before submitting a pull request, test your changes:

1. **Cross-browser Testing**: Chrome, Firefox, Safari, Edge
2. **Responsive Testing**: Mobile, tablet, and desktop viewports
3. **Accessibility Testing**: Keyboard navigation and screen reader compatibility
4. **Form Validation**: Test all validation rules and error states

### Testing Checklist
- [ ] Feature works as expected
- [ ] No console errors or warnings
- [ ] Responsive design maintained
- [ ] Accessibility requirements met
- [ ] Forms validate properly
- [ ] Navigation flows correctly

### Browser Testing Commands
```bash
# Test on different ports to simulate different environments
python3 -m http.server 8080  # Main testing
python3 -m http.server 3000  # Secondary testing
```

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages following conventional commits:

### Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(transfer): add real-time fee calculation

Add dynamic fee calculation based on transfer type and amount.
Includes validation for maximum transfer limits.

Fixes #123

fix(validation): correct email validation regex

The previous regex didn't handle plus signs in email addresses.
Updated to support all valid email formats.

docs(setup): add Docker deployment instructions

Include step-by-step Docker setup and troubleshooting guide.
```

## 🔄 Pull Request Process

### Before Submitting
1. **Update Documentation**: Ensure README and docs are current
2. **Test Thoroughly**: Run through all testing checklists
3. **Check Code Style**: Follow the established patterns
4. **Verify Accessibility**: Test with keyboard and screen readers

### Pull Request Template
When creating a pull request, include:

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested on mobile
- [ ] Accessibility tested

## Screenshots (if applicable)
Include screenshots of UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Changes tested thoroughly
```

### Review Process
1. **Automated Checks**: Ensure all checks pass
2. **Code Review**: Wait for maintainer review
3. **Address Feedback**: Make requested changes
4. **Final Approval**: Merge after approval

## 🐛 Bug Reports

### Before Reporting
1. **Search Existing Issues**: Check if already reported
2. **Test in Multiple Browsers**: Verify it's not browser-specific
3. **Clear Browser Cache**: Ensure it's not a caching issue

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- Browser: Chrome 95
- OS: Windows 10
- Screen size: 1920x1080

**Screenshots**
If applicable, add screenshots.

**Additional Context**
Any other relevant information.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Summary**
Brief description of the feature.

**Problem Statement**
What problem would this solve?

**Proposed Solution**
Detailed description of how it should work.

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Mockups, examples, or references.
```

## 📚 Documentation Contributions

### Types of Documentation
- **Code Documentation**: JSDoc comments and inline documentation
- **User Documentation**: README, setup guides, tutorials
- **API Documentation**: Endpoint and method descriptions
- **Contributing Guidelines**: This document and related guides

### Documentation Standards
- Use clear, concise language
- Include code examples where helpful
- Keep information up-to-date
- Use consistent formatting and structure

## 🏆 Recognition

### Contributors
We recognize contributors in several ways:
- GitHub Contributors page
- README contributors section
- Release notes mentions
- Community highlights

### Contribution Levels
- **First-time Contributor**: Welcome badge and mentorship
- **Regular Contributor**: Recognition in documentation
- **Core Contributor**: Direct collaboration opportunities
- **Maintainer**: Repository access and decision-making input

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Email**: contribute@unionledger.com
- **Documentation**: Comprehensive guides and references

### Support Process
1. **Check Documentation**: Review existing docs first
2. **Search Issues**: Look for similar questions
3. **Ask Questions**: Create a discussion or issue
4. **Get Response**: Maintainers will respond within 48 hours

### Mentorship Program
New contributors can request mentorship:
- Guidance on first contributions
- Code review and feedback
- Architecture and design discussions
- Career development advice

## 📋 Code Review Guidelines

### For Contributors
- **Self-Review**: Review your own code before submitting
- **Small Changes**: Keep pull requests focused and manageable
- **Clear Description**: Explain what and why, not just what
- **Address Feedback**: Respond to review comments promptly

### For Reviewers
- **Be Constructive**: Provide helpful, specific feedback
- **Be Timely**: Review within reasonable timeframes
- **Be Thorough**: Check functionality, style, and accessibility
- **Be Encouraging**: Recognize good work and improvement

## 📄 License

By contributing to UnionLedger, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to UnionLedger!** 

Your contributions help build a better digital banking platform for everyone. If you have questions about contributing, don't hesitate to reach out through our support channels.