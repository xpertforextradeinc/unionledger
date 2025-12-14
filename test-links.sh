#!/bin/bash

# Link Testing Script for UnionLedger
# This script tests all page routes to ensure they're accessible

echo "🧪 Testing UnionLedger Page Links..."
echo "=================================="
echo ""

# Check if server is running
if ! curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "❌ Server is not running on port 8080"
    echo "   Please start the server with: npm run dev"
    exit 1
fi

# Array of pages to test
pages=(
    "/"
    "/about"
    "/contact"
    "/testimonials"
    "/faq"
    "/dashboard"
    "/register"
    "/transfer"
    "/trading"
    "/audit"
)

# Test each page
success=0
failed=0

for page in "${pages[@]}"; do
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080$page)
    
    if [ "$response" = "200" ]; then
        echo "✅ $page - OK (HTTP $response)"
        ((success++))
    else
        echo "❌ $page - FAILED (HTTP $response)"
        ((failed++))
    fi
done

echo ""
echo "=================================="
echo "📊 Test Results:"
echo "   Passed: $success"
echo "   Failed: $failed"
echo ""

# Test CSS accessibility
css_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/assets/styles/main.css)
if [ "$css_response" = "200" ]; then
    echo "✅ CSS file accessible (HTTP $css_response)"
else
    echo "❌ CSS file not accessible (HTTP $css_response)"
    ((failed++))
fi

echo ""

# Exit with error if any tests failed
if [ $failed -gt 0 ]; then
    echo "❌ Some tests failed"
    exit 1
else
    echo "✅ All tests passed!"
    exit 0
fi
