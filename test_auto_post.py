#!/usr/bin/env python3
"""
Test script for auto_post.py functionality
Validates installation, configuration, and basic operations
"""

import sys
import os
from typing import List, Tuple

# Color codes for terminal output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'

def print_header(text: str):
    """Print formatted header"""
    print(f"\n{BLUE}{'='*60}{RESET}")
    print(f"{BLUE}{text}{RESET}")
    print(f"{BLUE}{'='*60}{RESET}")

def print_success(text: str):
    """Print success message"""
    print(f"{GREEN}✅ {text}{RESET}")

def print_error(text: str):
    """Print error message"""
    print(f"{RED}❌ {text}{RESET}")

def print_warning(text: str):
    """Print warning message"""
    print(f"{YELLOW}⚠️  {text}{RESET}")

def print_info(text: str):
    """Print info message"""
    print(f"ℹ️  {text}")

def test_python_version() -> bool:
    """Test Python version >= 3.8"""
    print_info("Testing Python version...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print_success(f"Python {version.major}.{version.minor}.{version.micro}")
        return True
    else:
        print_error(f"Python {version.major}.{version.minor} detected. Requires Python 3.8+")
        return False

def test_dependencies() -> Tuple[bool, List[str]]:
    """Test if required dependencies are installed"""
    print_info("Testing dependencies...")
    missing = []
    
    required_packages = {
        'requests': 'requests',
        'feedparser': 'feedparser',
    }
    
    for package_name, import_name in required_packages.items():
        try:
            __import__(import_name)
            print_success(f"{package_name} installed")
        except ImportError:
            print_error(f"{package_name} not installed")
            missing.append(package_name)
    
    return len(missing) == 0, missing

def test_module_import() -> bool:
    """Test if auto_post module can be imported"""
    print_info("Testing auto_post.py import...")
    try:
        import auto_post
        print_success("auto_post module imported successfully")
        return True
    except ImportError as e:
        print_error(f"Failed to import auto_post: {e}")
        return False
    except Exception as e:
        print_error(f"Error importing auto_post: {e}")
        return False

def test_configuration() -> bool:
    """Test configuration loading"""
    print_info("Testing configuration...")
    
    try:
        from auto_post import APIConfig
        config = APIConfig()
        
        has_gemini = bool(config.gemini_api_key)
        has_openai = bool(config.openai_api_key)
        
        if has_gemini:
            print_success("Gemini API key configured")
        else:
            print_warning("Gemini API key not configured")
        
        if has_openai:
            print_success("OpenAI API key configured (fallback)")
        else:
            print_warning("OpenAI API key not configured")
        
        if not has_gemini and not has_openai:
            print_error("No API keys configured - script will fail")
            print_info("Add GEMINI_API_KEY or OPENAI_API_KEY to environment")
            return False
        
        if config.rss_feed_url:
            print_success(f"RSS feed URL: {config.rss_feed_url}")
        else:
            print_warning("RSS feed URL not configured")
        
        return True
        
    except Exception as e:
        print_error(f"Configuration test failed: {e}")
        return False

def test_classes() -> bool:
    """Test main classes can be instantiated"""
    print_info("Testing class instantiation...")
    
    try:
        from auto_post import (
            APIConfig, GeminiClient, OpenAIClient, 
            RSSParser, XMLTemplateGenerator, AuditLogger, AutoPoster
        )
        
        config = APIConfig()
        print_success("APIConfig instantiated")
        
        gemini = GeminiClient(config.gemini_api_key, config.gemini_endpoint)
        print_success("GeminiClient instantiated")
        
        openai = OpenAIClient(config.openai_api_key, config.openai_endpoint)
        print_success("OpenAIClient instantiated")
        
        rss_parser = RSSParser(config.rss_feed_url)
        print_success("RSSParser instantiated")
        
        audit_logger = AuditLogger()
        print_success("AuditLogger instantiated")
        
        auto_poster = AutoPoster(config)
        print_success("AutoPoster instantiated")
        
        return True
        
    except Exception as e:
        print_error(f"Class instantiation failed: {e}")
        return False

def test_xml_generation() -> bool:
    """Test XML overlay generation"""
    print_info("Testing XML overlay generation...")
    
    try:
        from auto_post import Post, XMLTemplateGenerator
        
        test_post = Post(
            title="Test Sports Article",
            content="This is a test article about sports.",
            contributor="Test User",
            tier="gold",
            summary="Test summary",
            published_at="2023-12-15T00:00:00"
        )
        
        xml = XMLTemplateGenerator.generate_overlay(test_post)
        
        if xml and '<post tier="gold"' in xml:
            print_success("XML overlay generated successfully")
            return True
        else:
            print_error("XML overlay generation failed")
            return False
            
    except Exception as e:
        print_error(f"XML generation test failed: {e}")
        return False

def main():
    """Run all tests"""
    print(f"""
{BLUE}╔═══════════════════════════════════════════════════════════╗
║  🧪 Auto-Post Script Test Suite                          ║
║  Validating installation and configuration                ║
╚═══════════════════════════════════════════════════════════╝{RESET}
    """)
    
    results = []
    
    # Run tests
    print_header("1. Python Version Check")
    results.append(("Python Version", test_python_version()))
    
    print_header("2. Dependency Check")
    deps_ok, missing = test_dependencies()
    results.append(("Dependencies", deps_ok))
    if not deps_ok:
        print_info(f"Install missing packages: pip install {' '.join(missing)}")
    
    print_header("3. Module Import Test")
    results.append(("Module Import", test_module_import()))
    
    print_header("4. Configuration Test")
    results.append(("Configuration", test_configuration()))
    
    print_header("5. Class Instantiation Test")
    results.append(("Class Instantiation", test_classes()))
    
    print_header("6. XML Generation Test")
    results.append(("XML Generation", test_xml_generation()))
    
    # Summary
    print_header("Test Summary")
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = f"{GREEN}PASS{RESET}" if result else f"{RED}FAIL{RESET}"
        print(f"  {test_name}: {status}")
    
    print(f"\n{BLUE}Results: {passed}/{total} tests passed{RESET}")
    
    if passed == total:
        print_success("\n🎉 All tests passed! Script is ready to use.")
        print_info("\nNext steps:")
        print_info("1. Configure API keys in .env file")
        print_info("2. Set RSS_FEED_URL to your sports content feed")
        print_info("3. Run: python auto_post.py")
        return 0
    else:
        print_error(f"\n⚠️  {total - passed} test(s) failed. Please fix issues before running.")
        return 1

if __name__ == '__main__':
    sys.exit(main())
