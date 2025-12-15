#!/usr/bin/env python3
"""
Gemini-Powered Auto-Posting Script with OpenAI Fallback
For GLOBAL SPORTS WATCH

This module:
- Loads Gemini API key securely via GitHub Secrets
- Parses RSS feed for contributor-submitted sports content
- Applies XML overlay templates based on Ko-fi tier
- Uses Gemini Flash for branded summaries and thumbnails
- Falls back to OpenAI if Gemini fails or returns incomplete output
- Logs publishing actions for audit tracking and monetization flags
"""

import os
import sys
import json
import logging
import requests
from datetime import datetime
from typing import Optional, Dict, Any, List
from dataclasses import dataclass, asdict
import xml.etree.ElementTree as ET
import feedparser

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('auto_post_audit.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


@dataclass
class Post:
    """Represents a sports content post"""
    title: str
    content: str
    contributor: str
    tier: str  # 'free', 'bronze', 'silver', 'gold'
    summary: Optional[str] = None
    thumbnail_url: Optional[str] = None
    published_at: Optional[str] = None
    monetization_flag: bool = False
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


class APIConfig:
    """Configuration for API keys and endpoints"""
    
    def __init__(self):
        # Load from environment (GitHub Secrets)
        self.gemini_api_key = os.getenv('GEMINI_API_KEY', '')
        self.openai_api_key = os.getenv('OPENAI_API_KEY', '')
        self.rss_feed_url = os.getenv('RSS_FEED_URL', 'https://example.com/sports/feed.xml')
        self.kofi_api_key = os.getenv('KOFI_API_KEY', '')
        
        # API endpoints
        self.gemini_endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
        self.openai_endpoint = 'https://api.openai.com/v1/chat/completions'
        
    def validate(self) -> bool:
        """Validate required API keys are present"""
        if not self.gemini_api_key and not self.openai_api_key:
            logger.error("❌ Neither Gemini nor OpenAI API key configured")
            return False
        if not self.gemini_api_key:
            logger.warning("⚠️ Gemini API key not configured - will use OpenAI only")
        if not self.openai_api_key:
            logger.warning("⚠️ OpenAI API key not configured - no fallback available")
        return True


class GeminiClient:
    """Client for Google Gemini API"""
    
    def __init__(self, api_key: str, endpoint: str):
        self.api_key = api_key
        self.endpoint = endpoint
        
    def generate_summary(self, content: str, title: str) -> Optional[str]:
        """Generate branded summary using Gemini Flash"""
        if not self.api_key:
            logger.warning("🔑 Gemini API key not available")
            return None
            
        try:
            prompt = f"""Create a compelling, branded summary for this sports article:

Title: {title}

Content: {content}

Generate a 2-3 sentence summary that:
- Highlights key points and excitement
- Uses engaging sports language
- Includes relevant emojis (⚽🏀🏈⚾🎾)
- Drives reader interest and affiliate clicks
- Stays under 150 characters for social media"""

            payload = {
                "contents": [{
                    "parts": [{
                        "text": prompt
                    }]
                }],
                "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 200
                }
            }
            
            headers = {
                "Content-Type": "application/json"
            }
            
            url = f"{self.endpoint}?key={self.api_key}"
            
            logger.info("🤖 Calling Gemini API for summary generation...")
            response = requests.post(url, json=payload, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            if 'candidates' in data and len(data['candidates']) > 0:
                summary = data['candidates'][0]['content']['parts'][0]['text'].strip()
                logger.info(f"✅ Gemini generated summary: {summary[:50]}...")
                return summary
            else:
                logger.warning("⚠️ Gemini returned empty response")
                return None
                
        except requests.RequestException as e:
            logger.error(f"❌ Gemini API error: {e}")
            return None
        except (KeyError, IndexError) as e:
            logger.error(f"❌ Gemini response parsing error: {e}")
            return None
    
    def generate_thumbnail_prompt(self, title: str, summary: str) -> Optional[str]:
        """Generate thumbnail description for image generation"""
        if not self.api_key:
            return None
            
        try:
            prompt = f"""Based on this sports article, create a detailed thumbnail image description:

Title: {title}
Summary: {summary}

Generate a vivid, specific image description (50-75 words) that:
- Describes a dynamic, eye-catching sports scene
- Includes specific visual elements, colors, and action
- Emphasizes energy and excitement
- Would work well as a blog thumbnail or social media image"""

            payload = {
                "contents": [{
                    "parts": [{
                        "text": prompt
                    }]
                }],
                "generationConfig": {
                    "temperature": 0.8,
                    "maxOutputTokens": 150
                }
            }
            
            headers = {
                "Content-Type": "application/json"
            }
            
            url = f"{self.endpoint}?key={self.api_key}"
            
            logger.info("🎨 Calling Gemini API for thumbnail prompt...")
            response = requests.post(url, json=payload, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            if 'candidates' in data and len(data['candidates']) > 0:
                thumbnail_desc = data['candidates'][0]['content']['parts'][0]['text'].strip()
                logger.info(f"✅ Gemini generated thumbnail prompt: {thumbnail_desc[:50]}...")
                return thumbnail_desc
            else:
                return None
                
        except Exception as e:
            logger.error(f"❌ Gemini thumbnail generation error: {e}")
            return None


class OpenAIClient:
    """Client for OpenAI API (fallback)"""
    
    def __init__(self, api_key: str, endpoint: str):
        self.api_key = api_key
        self.endpoint = endpoint
        
    def generate_summary(self, content: str, title: str) -> Optional[str]:
        """Generate branded summary using OpenAI"""
        if not self.api_key:
            logger.warning("🔑 OpenAI API key not available")
            return None
            
        try:
            prompt = f"""Create a compelling, branded summary for this sports article:

Title: {title}

Content: {content}

Generate a 2-3 sentence summary that:
- Highlights key points and excitement
- Uses engaging sports language
- Includes relevant emojis (⚽🏀🏈⚾🎾)
- Drives reader interest and affiliate clicks
- Stays under 150 characters for social media"""

            payload = {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {"role": "system", "content": "You are a sports content writer focused on creating engaging, conversion-optimized summaries."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.7,
                "max_tokens": 200
            }
            
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}"
            }
            
            logger.info("🔄 Calling OpenAI API (fallback) for summary generation...")
            response = requests.post(self.endpoint, json=payload, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            if 'choices' in data and len(data['choices']) > 0:
                summary = data['choices'][0]['message']['content'].strip()
                logger.info(f"✅ OpenAI generated summary: {summary[:50]}...")
                return summary
            else:
                logger.warning("⚠️ OpenAI returned empty response")
                return None
                
        except requests.RequestException as e:
            logger.error(f"❌ OpenAI API error: {e}")
            return None
        except (KeyError, IndexError) as e:
            logger.error(f"❌ OpenAI response parsing error: {e}")
            return None


class RSSParser:
    """Parse RSS feeds for contributor content"""
    
    def __init__(self, feed_url: str):
        self.feed_url = feed_url
        
    def fetch_posts(self) -> List[Post]:
        """Fetch and parse RSS feed"""
        try:
            logger.info(f"📡 Fetching RSS feed from: {self.feed_url}")
            feed = feedparser.parse(self.feed_url)
            
            posts = []
            for entry in feed.entries[:10]:  # Limit to 10 most recent
                post = Post(
                    title=entry.get('title', 'Untitled'),
                    content=entry.get('summary', entry.get('description', '')),
                    contributor=entry.get('author', 'Unknown'),
                    tier=self._extract_tier(entry),
                    published_at=entry.get('published', datetime.now().isoformat())
                )
                posts.append(post)
                
            logger.info(f"✅ Parsed {len(posts)} posts from RSS feed")
            return posts
            
        except Exception as e:
            logger.error(f"❌ RSS parsing error: {e}")
            return []
    
    def _extract_tier(self, entry: Dict[str, Any]) -> str:
        """Extract Ko-fi tier from entry metadata"""
        # Look for tier in tags or custom fields
        tags = entry.get('tags', [])
        for tag in tags:
            tag_term = tag.get('term', '').lower()
            if 'gold' in tag_term:
                return 'gold'
            elif 'silver' in tag_term:
                return 'silver'
            elif 'bronze' in tag_term:
                return 'bronze'
        
        # Check for tier in custom fields
        tier = entry.get('kofi_tier', entry.get('tier', 'free')).lower()
        return tier if tier in ['free', 'bronze', 'silver', 'gold'] else 'free'


class XMLTemplateGenerator:
    """Generate XML overlays based on Ko-fi tier"""
    
    TIER_CONFIG = {
        'free': {
            'overlay': 'basic',
            'watermark': True,
            'ads_enabled': True,
            'priority': 4
        },
        'bronze': {
            'overlay': 'standard',
            'watermark': True,
            'ads_enabled': True,
            'priority': 3
        },
        'silver': {
            'overlay': 'premium',
            'watermark': False,
            'ads_enabled': False,
            'priority': 2
        },
        'gold': {
            'overlay': 'elite',
            'watermark': False,
            'ads_enabled': False,
            'priority': 1
        }
    }
    
    @staticmethod
    def generate_overlay(post: Post) -> str:
        """Generate XML overlay template based on tier"""
        tier_config = XMLTemplateGenerator.TIER_CONFIG.get(post.tier, XMLTemplateGenerator.TIER_CONFIG['free'])
        
        root = ET.Element('post')
        root.set('tier', post.tier)
        root.set('priority', str(tier_config['priority']))
        
        # Metadata
        metadata = ET.SubElement(root, 'metadata')
        ET.SubElement(metadata, 'title').text = post.title
        ET.SubElement(metadata, 'contributor').text = post.contributor
        ET.SubElement(metadata, 'published').text = post.published_at or datetime.now().isoformat()
        
        # Content
        content = ET.SubElement(root, 'content')
        ET.SubElement(content, 'summary').text = post.summary or ''
        ET.SubElement(content, 'body').text = post.content
        
        # Overlay settings
        overlay = ET.SubElement(root, 'overlay')
        ET.SubElement(overlay, 'template').text = tier_config['overlay']
        ET.SubElement(overlay, 'watermark').text = str(tier_config['watermark']).lower()
        
        # Monetization
        monetization = ET.SubElement(root, 'monetization')
        ET.SubElement(monetization, 'ads_enabled').text = str(tier_config['ads_enabled']).lower()
        ET.SubElement(monetization, 'affiliate_links').text = 'true'
        ET.SubElement(monetization, 'tier_badge').text = post.tier.upper()
        
        # Thumbnail
        if post.thumbnail_url:
            media = ET.SubElement(root, 'media')
            ET.SubElement(media, 'thumbnail').text = post.thumbnail_url
        
        return ET.tostring(root, encoding='unicode', method='xml')


class AuditLogger:
    """Log publishing actions for audit tracking"""
    
    def __init__(self, log_file: str = 'publishing_audit.json'):
        self.log_file = log_file
        
    def log_action(self, action: str, post: Post, success: bool, details: Optional[Dict] = None):
        """Log a publishing action"""
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'action': action,
            'success': success,
            'post': {
                'title': post.title,
                'contributor': post.contributor,
                'tier': post.tier,
                'monetization_flag': post.monetization_flag
            },
            'details': details or {}
        }
        
        # Append to JSON log file
        try:
            logs = []
            if os.path.exists(self.log_file):
                with open(self.log_file, 'r') as f:
                    logs = json.load(f)
            
            logs.append(log_entry)
            
            with open(self.log_file, 'w') as f:
                json.dump(logs, f, indent=2)
                
            logger.info(f"📝 Logged action: {action} - {'✅ Success' if success else '❌ Failed'}")
            
        except Exception as e:
            logger.error(f"❌ Audit logging error: {e}")


class AutoPoster:
    """Main auto-posting orchestrator"""
    
    def __init__(self, config: APIConfig):
        self.config = config
        self.gemini = GeminiClient(config.gemini_api_key, config.gemini_endpoint)
        self.openai = OpenAIClient(config.openai_api_key, config.openai_endpoint)
        self.rss_parser = RSSParser(config.rss_feed_url)
        self.audit_logger = AuditLogger()
        
    def process_posts(self):
        """Main processing loop"""
        logger.info("🚀 Starting auto-posting workflow...")
        
        # Fetch posts from RSS
        posts = self.rss_parser.fetch_posts()
        
        if not posts:
            logger.warning("⚠️ No posts found in RSS feed")
            return
        
        for i, post in enumerate(posts):
            logger.info(f"\n{'='*60}")
            logger.info(f"📄 Processing post {i+1}/{len(posts)}: {post.title}")
            logger.info(f"👤 Contributor: {post.contributor} | 🎖️ Tier: {post.tier}")
            
            try:
                # Generate summary with Gemini, fallback to OpenAI
                summary = self._generate_summary_with_fallback(post)
                
                if summary:
                    post.summary = summary
                    post.monetization_flag = True
                else:
                    logger.warning(f"⚠️ No summary generated for: {post.title}")
                    post.monetization_flag = False
                
                # Generate XML overlay
                xml_overlay = XMLTemplateGenerator.generate_overlay(post)
                logger.info(f"📋 Generated XML overlay for tier: {post.tier}")
                
                # Save overlay to file
                overlay_filename = f"overlay_{post.tier}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xml"
                with open(overlay_filename, 'w') as f:
                    f.write(xml_overlay)
                logger.info(f"💾 Saved overlay to: {overlay_filename}")
                
                # Log successful processing
                self.audit_logger.log_action(
                    'process_post',
                    post,
                    success=True,
                    details={
                        'summary_generated': bool(summary),
                        'overlay_file': overlay_filename
                    }
                )
                
                # Display summary
                self._display_post_summary(post)
                
            except Exception as e:
                logger.error(f"❌ Error processing post: {e}")
                self.audit_logger.log_action(
                    'process_post',
                    post,
                    success=False,
                    details={'error': str(e)}
                )
        
        logger.info(f"\n{'='*60}")
        logger.info(f"✅ Completed processing {len(posts)} posts")
    
    def _generate_summary_with_fallback(self, post: Post) -> Optional[str]:
        """Generate summary with Gemini, fallback to OpenAI"""
        # Try Gemini first
        if self.config.gemini_api_key:
            logger.info("🤖 Attempting summary generation with Gemini...")
            summary = self.gemini.generate_summary(post.content, post.title)
            
            if summary and len(summary) > 20:  # Validate output
                logger.info("✅ Gemini summary successful")
                return summary
            else:
                logger.warning("⚠️ Gemini returned incomplete output, trying fallback...")
        
        # Fallback to OpenAI
        if self.config.openai_api_key:
            logger.info("🔄 Using OpenAI fallback...")
            summary = self.openai.generate_summary(post.content, post.title)
            
            if summary and len(summary) > 20:
                logger.info("✅ OpenAI fallback successful")
                return summary
        
        logger.error("❌ Both Gemini and OpenAI failed to generate summary")
        return None
    
    def _display_post_summary(self, post: Post):
        """Display formatted post summary"""
        print(f"\n{'─'*60}")
        print(f"📰 TITLE: {post.title}")
        print(f"👤 CONTRIBUTOR: {post.contributor}")
        print(f"🎖️ TIER: {post.tier.upper()}")
        print(f"💰 MONETIZATION: {'✅ Enabled' if post.monetization_flag else '❌ Disabled'}")
        if post.summary:
            print(f"\n📝 SUMMARY:\n{post.summary}")
        print(f"{'─'*60}\n")


def main():
    """Main entry point"""
    print("""
╔═══════════════════════════════════════════════════════════╗
║  🏆 GLOBAL SPORTS WATCH - Auto-Posting Script           ║
║  Powered by Gemini Flash with OpenAI Fallback            ║
╚═══════════════════════════════════════════════════════════╝
    """)
    
    # Load configuration
    config = APIConfig()
    
    if not config.validate():
        logger.error("❌ Configuration validation failed")
        sys.exit(1)
    
    # Initialize and run auto-poster
    auto_poster = AutoPoster(config)
    auto_poster.process_posts()
    
    logger.info("\n✅ Auto-posting workflow complete!")


if __name__ == '__main__':
    main()
