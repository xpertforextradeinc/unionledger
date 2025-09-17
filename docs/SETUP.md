# Setup Guide - UnionLedger

This guide will help you set up the UnionLedger development environment and get the platform running locally.

## Prerequisites

Before setting up UnionLedger, ensure you have the following installed:

### Required
- **Web Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+
- **Git**: For version control and repository management
- **Python 3.x**: For running the local development server

### Optional (for advanced development)
- **Node.js**: For package management and build tools
- **Visual Studio Code**: Recommended code editor with extensions
- **Docker**: For containerized deployment

## Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/xpertforextradeinc/unionledger.git

# Navigate to the project directory
cd unionledger

# Check the current branch
git branch
```

### 2. Set Up Development Environment

#### Option A: Python HTTP Server (Recommended)
```bash
# Start the development server on port 8080
python3 -m http.server 8080

# Or use Python 2 if Python 3 is not available
python -m SimpleHTTPServer 8080
```

#### Option B: NPM Scripts
```bash
# If you have Node.js installed
npm start
# or
npm run dev
```

#### Option C: Using Docker
```bash
# Build the Docker image
docker build -t unionledger .

# Run the container
docker run -p 8080:8080 unionledger
```

### 3. Verify Installation

1. Open your web browser
2. Navigate to `http://localhost:8080`
3. You should see the UnionLedger homepage

## Development Configuration

### File Structure Overview
```
unionledger/
├── index.html              # Main application entry point
├── css/
│   └── main.css            # Global styles and CSS framework
├── js/
│   └── main.js             # Core JavaScript functionality
├── assets/
│   └── images/             # Static assets
├── docs/                   # Documentation files
├── package.json            # Project configuration
└── README.md               # Project documentation
```

### Environment Configuration

The application currently runs entirely client-side for demonstration purposes. For production deployment, you'll need to configure:

#### Backend Integration
- Set up API endpoints for user authentication
- Configure database connections for user data
- Implement server-side form validation
- Set up secure session management

#### Security Configuration
- Configure HTTPS certificates
- Set up Content Security Policy (CSP) headers
- Implement rate limiting for form submissions
- Configure secure cookie settings

### Local Development Workflow

1. **Make Changes**: Edit HTML, CSS, or JavaScript files
2. **Refresh Browser**: Changes are immediately visible (no build step required)
3. **Test Features**: Use browser developer tools for debugging
4. **Version Control**: Commit changes using Git

### Browser Developer Tools Setup

#### Chrome DevTools
1. Open DevTools (F12 or Ctrl+Shift+I)
2. Go to Application tab → Local Storage to view stored data
3. Use Console tab to interact with the UnionLedger JavaScript API
4. Network tab shows simulated API calls

#### Firefox Developer Tools
1. Open Developer Tools (F12)
2. Storage Inspector shows localStorage data
3. Console provides JavaScript debugging
4. Network Monitor tracks requests

## Testing Your Setup

### Manual Testing Checklist

#### Homepage Module
- [ ] Page loads without errors
- [ ] Navigation links work properly
- [ ] Feature cards display correctly
- [ ] Responsive design works on mobile

#### Registration Module
- [ ] Form validation works for all fields
- [ ] Error messages display properly
- [ ] Success message appears after submission
- [ ] Form resets after successful submission

#### Dashboard Module
- [ ] User data displays correctly
- [ ] Balance information loads
- [ ] Recent transactions appear
- [ ] Quick action buttons function

#### Transfer Module
- [ ] Amount validation works
- [ ] Fee calculation updates in real-time
- [ ] Transfer summary displays correctly
- [ ] Form submission triggers success message

### Browser Compatibility Testing

Test the application in multiple browsers:

```bash
# Test URLs for different browsers
http://localhost:8080  # Chrome
http://localhost:8080  # Firefox
http://localhost:8080  # Safari
http://localhost:8080  # Edge
```

### Performance Testing

#### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for Performance, Accessibility, Best Practices
4. Aim for scores above 90 in all categories

#### Mobile Testing
- Use browser device emulation
- Test on actual mobile devices when possible
- Verify touch interactions work properly

## Troubleshooting Common Issues

### Port Already in Use
```bash
# If port 8080 is busy, use a different port
python3 -m http.server 8081
```

### CORS Issues
If you encounter CORS errors:
- Ensure you're accessing via localhost, not file://
- Use the HTTP server instead of opening files directly
- Check browser console for specific CORS messages

### JavaScript Errors
- Open browser console (F12)
- Look for error messages
- Check that all JavaScript files are loading properly
- Verify no syntax errors in code

### CSS Not Loading
- Check that CSS file paths are correct
- Verify HTTP server is serving static files
- Clear browser cache (Ctrl+F5)

### LocalStorage Issues
- Check browser privacy settings
- Ensure localStorage is enabled
- Clear localStorage data if corrupted:
```javascript
localStorage.clear()
```

## Development Tips

### Code Editor Setup (VS Code)
Recommended extensions:
- Live Server: Auto-reload on file changes
- Prettier: Code formatting
- HTML CSS Support: Enhanced HTML/CSS IntelliSense
- JavaScript (ES6) code snippets

### Git Workflow
```bash
# Create a new feature branch
git checkout -b feature/new-feature

# Make your changes
# ... edit files ...

# Stage and commit changes
git add .
git commit -m "Add new feature"

# Push to remote repository
git push origin feature/new-feature
```

### Debugging JavaScript
```javascript
// Use console methods for debugging
console.log('Variable value:', variable);
console.error('Error occurred:', error);
console.table(arrayData);

// Set breakpoints in browser DevTools
debugger; // Execution will pause here
```

## Production Deployment

### Build Optimization
For production deployment:
1. Minify CSS and JavaScript files
2. Optimize images
3. Configure proper HTTP headers
4. Set up CDN for static assets

### Security Checklist
- [ ] Enable HTTPS
- [ ] Configure CSP headers
- [ ] Implement rate limiting
- [ ] Validate all inputs server-side
- [ ] Set secure cookie flags
- [ ] Configure CORS properly

## Getting Help

### Documentation
- [API Documentation](API.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [README.md](../README.md)

### Support Channels
- GitHub Issues: Report bugs and request features
- Email: support@unionledger.com
- Community discussions on GitHub

### Common Commands Reference

```bash
# Development server
npm start                    # Start development server
npm run dev                 # Alternative start command

# Version control
git status                  # Check repository status
git pull origin main        # Update from remote repository
git log --oneline           # View commit history

# Python server
python3 -m http.server 8080 # Start Python HTTP server
python3 -m http.server 3000 # Use different port

# Docker commands
docker build -t unionledger . # Build Docker image
docker run -p 8080:8080 unionledger # Run container
```

---

**Next Steps**: After completing setup, read the [Contributing Guidelines](CONTRIBUTING.md) to learn about code standards and development practices.