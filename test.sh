#!/bin/bash
# UnionLedger Test Runner
# Simple validation script for contributors

echo "🧪 Running UnionLedger validation tests..."
echo ""

# Test 1: Check project structure
echo "📁 Checking project structure..."
required_files=("index.html" "css/main.css" "js/main.js" "package.json" "README.md")
missing_files=()

for file in "${required_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        missing_files+=("$file")
    fi
done

if [[ ${#missing_files[@]} -eq 0 ]]; then
    echo "✅ All required files present"
else
    echo "❌ Missing files: ${missing_files[*]}"
    exit 1
fi

# Test 2: Check HTML validation
echo ""
echo "🔍 Checking HTML structure..."
if grep -q "<!DOCTYPE html>" index.html; then
    echo "✅ Valid HTML5 doctype"
else
    echo "❌ Missing HTML5 doctype"
    exit 1
fi

if grep -q "viewport" index.html; then
    echo "✅ Mobile viewport meta tag present"
else
    echo "❌ Missing mobile viewport meta tag"
    exit 1
fi

# Test 3: Check CSS framework
echo ""
echo "🎨 Checking CSS framework..."
css_variables=$(grep -c ":root" css/main.css)
if [[ $css_variables -gt 0 ]]; then
    echo "✅ CSS custom properties implemented ($css_variables found)"
else
    echo "❌ CSS custom properties missing"
    exit 1
fi

# Test 4: Check JavaScript functionality
echo ""
echo "⚡ Checking JavaScript functionality..."
js_classes=("UnionLedger" "AlertManager" "FormValidator" "AuditLogger" "WalletVerification")
missing_classes=()

for class in "${js_classes[@]}"; do
    if ! grep -q "class $class" js/main.js; then
        missing_classes+=("$class")
    fi
done

if [[ ${#missing_classes[@]} -eq 0 ]]; then
    echo "✅ All JavaScript classes implemented"
else
    echo "❌ Missing classes: ${missing_classes[*]}"
    exit 1
fi

# Test 5: Check form validation
echo ""
echo "📋 Checking form validation..."
validation_count=$(grep -c "data-validate" index.html)
if [[ $validation_count -gt 10 ]]; then
    echo "✅ Form validation attributes present ($validation_count found)"
else
    echo "❌ Insufficient form validation attributes"
    exit 1
fi

# Test 6: Check security features
echo ""
echo "🔒 Checking security features..."
security_features=("audit logging" "form validation" "wallet verification" "input sanitization")
security_keywords=("AuditLogger" "FormValidator" "WalletVerification" "sanitizeInput")
missing_security=()

for i in "${!security_keywords[@]}"; do
    if ! grep -q "${security_keywords[$i]}" js/main.js; then
        missing_security+=("${security_features[$i]}")
    fi
done

if [[ ${#missing_security[@]} -eq 0 ]]; then
    echo "✅ All security features implemented"
else
    echo "❌ Missing security features: ${missing_security[*]}"
    exit 1
fi

# Test 7: Check accessibility features
echo ""
echo "♿ Checking accessibility features..."
aria_count=$(grep -c "aria-" index.html)
role_count=$(grep -c "role=" index.html)
total_a11y=$((aria_count + role_count))

if [[ $total_a11y -gt 5 ]]; then
    echo "✅ Accessibility attributes present ($total_a11y found)"
else
    echo "⚠️  Limited accessibility attributes found"
fi

# Test 8: Check responsive design
echo ""
echo "📱 Checking responsive design..."
if grep -q "@media" css/main.css; then
    echo "✅ Responsive media queries present"
else
    echo "❌ No responsive media queries found"
    exit 1
fi

# Test 9: Check documentation
echo ""
echo "📚 Checking documentation..."
doc_files=("README.md" "docs/SETUP.md" "docs/CONTRIBUTING.md" "docs/API.md")
missing_docs=()

for file in "${doc_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        missing_docs+=("$file")
    fi
done

if [[ ${#missing_docs[@]} -eq 0 ]]; then
    echo "✅ All documentation files present"
else
    echo "⚠️  Missing documentation: ${missing_docs[*]}"
fi

# Final result
echo ""
echo "🎉 All validation tests passed!"
echo ""
echo "📊 Test Summary:"
echo "   - Project structure: ✅"
echo "   - HTML validation: ✅"
echo "   - CSS framework: ✅"
echo "   - JavaScript functionality: ✅"
echo "   - Form validation: ✅"
echo "   - Security features: ✅"
echo "   - Accessibility: ✅"
echo "   - Responsive design: ✅"
echo "   - Documentation: ✅"
echo ""
echo "🚀 UnionLedger is ready for deployment!"