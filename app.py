import os
import json
import requests
import re
from datetime import datetime
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from supabase import create_client, Client
import sqlite3
import threading
import jwt
import bcrypt
from functools import wraps

# Optional imports for professional APIs (graceful fallback if not installed)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("Note: python-dotenv not installed. Create .env file manually for API keys.")

try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    print("Note: google-generativeai not installed. Using demo mode for AI analysis.")
    genai = None
    GEMINI_AVAILABLE = False

try:
    import praw
    REDDIT_AVAILABLE = True
except ImportError:
    print("Note: praw not installed. Using demo mode for Reddit sentiment.")
    praw = None
    REDDIT_AVAILABLE = False

app = Flask(__name__)
app.secret_key = 'nexus_mvp_2024_secure_key'

# Supabase Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'demo_url')
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY', 'demo_key')

# Initialize Supabase client
supabase: Client = None
if SUPABASE_URL != 'demo_url' and SUPABASE_KEY != 'demo_key':
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("✅ Supabase configured successfully")
    except Exception as e:
        print(f"⚠️ Supabase configuration failed: {e}")

# API Configuration
BRAVE_API_KEY = os.getenv('BRAVE_API_KEY', 'demo_key')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'demo_key')
REDDIT_CLIENT_ID = os.getenv('REDDIT_CLIENT_ID', 'demo_id')
REDDIT_CLIENT_SECRET = os.getenv('REDDIT_CLIENT_SECRET', 'demo_secret')
REDDIT_USER_AGENT = os.getenv('REDDIT_USER_AGENT', 'nexus_intelligence_bot/1.0')
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', 'demo_token')

# Initialize APIs conditionally
if GEMINI_AVAILABLE and genai and GEMINI_API_KEY != 'demo_key':
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        print("✅ Gemini AI configured successfully")
    except Exception as e:
        print(f"⚠️ Gemini AI configuration failed: {e}")

# Reddit API setup
reddit = None
if REDDIT_AVAILABLE and praw and REDDIT_CLIENT_ID != 'demo_id':
    try:
        reddit = praw.Reddit(
            client_id=REDDIT_CLIENT_ID,
            client_secret=REDDIT_CLIENT_SECRET,
            user_agent=REDDIT_USER_AGENT
        )
        print("✅ Reddit API configured successfully")
    except Exception as e:
        print(f"⚠️ Reddit API configuration failed: {e}")
        reddit = None

print("🚀 Nexus MVP - Project Roadmap Generator")

# === AUTHENTICATION HELPERS ===

def get_current_user():
    """Get current authenticated user"""
    if 'user' in session:
        return session['user']
    return None

def is_authenticated():
    """Check if user is authenticated"""
    return get_current_user() is not None

def get_user_usage_limits():
    """Get usage limits for current user"""
    user = get_current_user()
    if not user:
        return {'max_projects': 1, 'current_projects': 0}
    
    # Get user's project count from Supabase
    if supabase:
        try:
            result = supabase.table('projects').select('id').eq('user_id', user['id']).execute()
            current_projects = len(result.data)
        except:
            current_projects = 0
    else:
        current_projects = 0
    
    # Free users get 3 projects, premium users get unlimited
    max_projects = 3 if user.get('plan', 'free') == 'free' else 999
    
    return {
        'max_projects': max_projects,
        'current_projects': current_projects,
        'can_create': current_projects < max_projects
    }

# === PROJECT GENERATION CORE ===

def generate_visual_roadmap(project_idea):
    """Generate the visual project roadmap with phases"""
    try:
        phases = [
            {
                'id': 1,
                'title': 'Market Validation & MVP',
                'duration': '4-8 weeks',
                'description': 'Validate your idea and build core features',
                'key_activities': [
                    'Market research and competitor analysis',
                    'User interviews and feedback collection',
                    'MVP feature definition and prioritization',
                    'Technical architecture planning'
                ],
                'deliverables': ['Market validation report', 'MVP feature list', 'Technical specifications'],
                'status': 'ready'
            },
            {
                'id': 2,
                'title': 'Development & Testing',
                'duration': '8-16 weeks',
                'description': 'Build, test, and refine your product',
                'key_activities': [
                    'Frontend and backend development',
                    'Database design and implementation',
                    'User testing and feedback integration',
                    'Performance optimization'
                ],
                'deliverables': ['Working MVP', 'Test reports', 'User feedback analysis'],
                'status': 'upcoming'
            },
            {
                'id': 3,
                'title': 'Launch & Growth',
                'duration': '12+ weeks',
                'description': 'Launch publicly and scale your user base',
                'key_activities': [
                    'Product launch strategy',
                    'User acquisition campaigns',
                    'Analytics and metrics tracking',
                    'Feature expansion based on usage'
                ],
                'deliverables': ['Public launch', 'User acquisition metrics', 'Growth strategy'],
                'status': 'future'
            }
        ]
        
        return {
            'project_name': f"{project_idea} - Strategic Roadmap",
            'estimated_timeline': '6-12 months',
            'phases': phases,
            'success_metrics': [
                'User acquisition rate',
                'Product-market fit indicators',
                'Revenue growth (if applicable)',
                'User engagement metrics'
            ]
        }
    except Exception as e:
        print(f"Error generating roadmap: {e}")
        return None

def generate_opportunity_analysis(project_idea):
    """Generate market opportunity analysis"""
    try:
        # This would use real APIs in production
        return {
            'market_size': 'Large and growing market with significant potential',
            'target_audience': 'Identified based on market research and competitor analysis',
            'pain_points': [
                'Current solutions are outdated or difficult to use',
                'Lack of comprehensive features in existing products',
                'High cost barriers in current market offerings',
                'Poor user experience in competitor products'
            ],
            'opportunity_score': 8.5,
            'market_trends': [
                'Increasing demand for digital solutions',
                'Growing mobile-first user base',
                'Rising expectations for seamless user experience'
            ],
            'validation_sources': ['Reddit discussions', 'Industry reports', 'User surveys']
        }
    except Exception as e:
        print(f"Error generating opportunity analysis: {e}")
        return {}

def generate_competitive_landscape(project_idea):
    """Generate competitive analysis"""
    try:
        return {
            'direct_competitors': [
                {
                    'name': 'Market Leader A',
                    'strengths': ['Large user base', 'Established brand'],
                    'weaknesses': ['Outdated UI', 'Limited features'],
                    'market_share': '35%'
                },
                {
                    'name': 'Growing Competitor B',
                    'strengths': ['Modern design', 'Good marketing'],
                    'weaknesses': ['High pricing', 'Limited scalability'],
                    'market_share': '20%'
                }
            ],
            'indirect_competitors': [
                'Alternative solution providers',
                'Manual/traditional approaches',
                'DIY tools and platforms'
            ],
            'competitive_advantages': [
                'Unique feature combination',
                'Better user experience',
                'More affordable pricing',
                'Superior technology stack'
            ],
            'market_gap': 'Opportunity for a more user-friendly, comprehensive solution'
        }
    except Exception as e:
        print(f"Error generating competitive analysis: {e}")
        return {}

def generate_mvp_blueprint(project_idea):
    """Generate MVP feature blueprint"""
    try:
        return {
            'core_features': [
                {
                    'name': 'User Authentication',
                    'priority': 'High',
                    'description': 'Secure user registration and login system',
                    'effort': '1-2 weeks'
                },
                {
                    'name': 'Main Dashboard',
                    'priority': 'High',
                    'description': 'Central hub for user activities and data',
                    'effort': '2-3 weeks'
                },
                {
                    'name': 'Core Functionality',
                    'priority': 'High',
                    'description': 'Primary value-adding features for users',
                    'effort': '4-6 weeks'
                },
                {
                    'name': 'Data Management',
                    'priority': 'Medium',
                    'description': 'CRUD operations for user data',
                    'effort': '2-3 weeks'
                }
            ],
            'nice_to_have_features': [
                'Advanced analytics and reporting',
                'Social sharing capabilities',
                'Mobile app version',
                'Third-party integrations'
            ],
            'technical_requirements': [
                'Responsive web design',
                'RESTful API architecture',
                'Database optimization',
                'Security best practices'
            ]
        }
    except Exception as e:
        print(f"Error generating MVP blueprint: {e}")
        return {}

def generate_tech_stack_recommendation(project_idea):
    """Generate technology stack recommendations"""
    try:
        return {
            'frontend': {
                'primary': 'React',
                'reasoning': 'Large ecosystem, excellent documentation, industry standard',
                'alternatives': ['Vue.js', 'Angular'],
                'supporting_tools': ['TypeScript', 'Tailwind CSS', 'Vite']
            },
            'backend': {
                'primary': 'Node.js with Express',
                'reasoning': 'JavaScript ecosystem consistency, scalable, extensive libraries',
                'alternatives': ['Python with FastAPI', 'Go', 'PHP with Laravel'],
                'supporting_tools': ['JWT for auth', 'Helmet for security', 'Morgan for logging']
            },
            'database': {
                'primary': 'PostgreSQL',
                'reasoning': 'Robust, scalable, excellent for complex queries',
                'alternatives': ['MongoDB', 'MySQL'],
                'supporting_tools': ['Prisma ORM', 'Redis for caching']
            },
            'deployment': {
                'primary': 'Vercel/Netlify + Railway/Heroku',
                'reasoning': 'Easy deployment, good free tiers, scalable',
                'alternatives': ['AWS', 'DigitalOcean', 'Google Cloud'],
                'supporting_tools': ['Docker', 'GitHub Actions', 'CloudFlare']
            },
            'development_timeline': '12-20 weeks for full stack development'
        }
    except Exception as e:
        print(f"Error generating tech stack: {e}")
        return {}

def generate_learning_hub(tech_stack):
    """Generate curated learning resources"""
    try:
        resources = {
            'React': [
                {
                    'title': 'Official React Documentation',
                    'url': 'https://react.dev/learn',
                    'type': 'Documentation',
                    'rating': '★★★★★'
                },
                {
                    'title': 'React - The Complete Guide (Udemy)',
                    'url': 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
                    'type': 'Course',
                    'rating': '★★★★★'
                }
            ],
            'Node.js': [
                {
                    'title': 'Node.js Official Guides',
                    'url': 'https://nodejs.org/en/docs/guides/',
                    'type': 'Documentation',
                    'rating': '★★★★★'
                },
                {
                    'title': 'Node.js Crash Course (YouTube)',
                    'url': 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
                    'type': 'Video',
                    'rating': '★★★★☆'
                }
            ],
            'PostgreSQL': [
                {
                    'title': 'PostgreSQL Tutorial',
                    'url': 'https://www.postgresql.org/docs/current/tutorial.html',
                    'type': 'Documentation',
                    'rating': '★★★★★'
                }
            ]
        }
        
        return {
            'beginner_path': [
                'Start with HTML/CSS/JavaScript fundamentals',
                'Learn React basics and component architecture',
                'Understand backend concepts with Node.js',
                'Database design with PostgreSQL'
            ],
            'intermediate_path': [
                'Advanced React patterns and state management',
                'RESTful API design and implementation',
                'Database optimization and relationships',
                'Authentication and security practices'
            ],
            'advanced_path': [
                'Performance optimization techniques',
                'Microservices architecture',
                'DevOps and deployment strategies',
                'Scaling and monitoring'
            ],
            'resources_by_technology': resources,
            'estimated_learning_time': '6-12 months for full proficiency'
        }
    except Exception as e:
        print(f"Error generating learning hub: {e}")
        return {}

def generate_complete_project_report(project_idea):
    """Generate the complete Nexus Intelligence report"""
    try:
        # Generate all sections
        roadmap = generate_visual_roadmap(project_idea)
        opportunity = generate_opportunity_analysis(project_idea)
        competitive = generate_competitive_landscape(project_idea)
        mvp = generate_mvp_blueprint(project_idea)
        tech_stack = generate_tech_stack_recommendation(project_idea)
        learning = generate_learning_hub(tech_stack)
        
        return {
            'project_idea': project_idea,
            'generated_at': datetime.now().isoformat(),
            'visual_roadmap': roadmap,
            'nexus_intelligence': {
                'opportunity_analysis': opportunity,
                'competitive_landscape': competitive,
                'mvp_blueprint': mvp,
                'tech_stack': tech_stack,
                'learning_hub': learning
            }
        }
    except Exception as e:
        print(f"Error generating complete report: {e}")
        return None

# === DATABASE HELPERS ===

db_lock = threading.Lock()

def init_db():
    """Initialize the database with required tables"""
    try:
        with db_lock:
            conn = sqlite3.connect('nexus_data.db')
            cursor = conn.cursor()
            
            # Users table for JWT authentication
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    name TEXT NOT NULL,
                    password_hash TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    is_active BOOLEAN DEFAULT TRUE,
                    email_verified BOOLEAN DEFAULT FALSE
                )
            ''')
            
            # Projects table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS projects (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    project_name TEXT NOT NULL,
                    project_idea TEXT NOT NULL,
                    report_data TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id)
                )
            ''')
            
            # Conversations table for chat interactions
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS conversations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    project_id INTEGER NOT NULL,
                    user_message TEXT NOT NULL,
                    ai_response TEXT NOT NULL,
                    refinements TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (project_id) REFERENCES projects (id)
                )
            ''')
            
            # User sessions table for token management
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS user_sessions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    token_hash TEXT NOT NULL,
                    expires_at TIMESTAMP NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    is_revoked BOOLEAN DEFAULT FALSE,
                    FOREIGN KEY (user_id) REFERENCES users (id)
                )
            ''')
            
            conn.commit()
            conn.close()
            print("✅ Database initialized successfully")
            
    except Exception as e:
        print(f"⚠️ Database initialization failed: {e}")

# === JWT AUTHENTICATION SYSTEM ===

def hash_password(password):
    """Hash a password with bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password, hashed):
    """Verify a password against its hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def generate_jwt_token(user_id, email):
    """Generate a JWT token for a user"""
    payload = {
        'user_id': user_id,
        'email': email,
        'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS),
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

def decode_jwt_token(token):
    """Decode and validate a JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def create_user(email, name, password):
    """Create a new user in the database"""
    try:
        with db_lock:
            conn = sqlite3.connect('nexus_data.db')
            cursor = conn.cursor()
            
            # Check if user already exists
            cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
            if cursor.fetchone():
                return None, "User with this email already exists"
            
            # Create new user
            password_hash = hash_password(password)
            cursor.execute('''
                INSERT INTO users (email, name, password_hash)
                VALUES (?, ?, ?)
            ''', (email, name, password_hash))
            
            user_id = cursor.lastrowid
            conn.commit()
            conn.close()
            
            return user_id, None
            
    except Exception as e:
        print(f"Error creating user: {e}")
        return None, "Failed to create user"

def authenticate_user(email, password):
    """Authenticate a user by email and password"""
    try:
        with db_lock:
            conn = sqlite3.connect('nexus_data.db')
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT id, email, name, password_hash, is_active
                FROM users WHERE email = ?
            ''', (email,))
            
            user = cursor.fetchone()
            conn.close()
            
            if not user:
                return None, "Invalid email or password"
            
            user_id, user_email, name, password_hash, is_active = user
            
            if not is_active:
                return None, "Account is deactivated"
            
            if not verify_password(password, password_hash):
                return None, "Invalid email or password"
            
            return {
                'id': user_id,
                'email': user_email,
                'name': name
            }, None
            
    except Exception as e:
        print(f"Error authenticating user: {e}")
        return None, "Authentication failed"

def get_user_by_id(user_id):
    """Get user information by ID"""
    try:
        with db_lock:
            conn = sqlite3.connect('nexus_data.db')
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT id, email, name, is_active
                FROM users WHERE id = ?
            ''', (user_id,))
            
            user = cursor.fetchone()
            conn.close()
            
            if user:
                return {
                    'id': user[0],
                    'email': user[1],
                    'name': user[2],
                    'is_active': user[3]
                }
            return None
            
    except Exception as e:
        print(f"Error getting user: {e}")
        return None

def require_auth(f):
    """Decorator to require authentication for routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        
        # Get token from Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(' ')[1]  # Bearer <token>
            except IndexError:
                return jsonify({'error': 'Invalid authorization header format'}), 401
        
        if not token:
            return jsonify({'error': 'Authentication token is missing'}), 401
        
        # Decode token
        payload = decode_jwt_token(token)
        if not payload:
            return jsonify({'error': 'Invalid or expired token'}), 401
        
        # Get user
        user = get_user_by_id(payload['user_id'])
        if not user or not user['is_active']:
            return jsonify({'error': 'User not found or inactive'}), 401
        
        # Add user to request context
        request.current_user = user
        return f(*args, **kwargs)
    
    return decorated_function

def save_conversation(project_id, user_message, ai_response, refinements=None):
    """Save a conversation exchange to the database"""
    try:
        with db_lock:
            conn = sqlite3.connect('nexus_data.db')
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO conversations (project_id, user_message, ai_response, refinements)
                VALUES (?, ?, ?, ?)
            ''', (project_id, user_message, ai_response, json.dumps(refinements) if refinements else None))
            
            conn.commit()
            conn.close()
            return cursor.lastrowid
            
    except Exception as e:
        print(f"Error saving conversation: {e}")
        return None

def get_conversation_history(project_id):
    """Get conversation history for a project"""
    try:
        with db_lock:
            conn = sqlite3.connect('nexus_data.db')
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT user_message, ai_response, refinements, created_at
                FROM conversations
                WHERE project_id = ?
                ORDER BY created_at ASC
            ''', (project_id,))
            
            conversations = []
            for row in cursor.fetchall():
                conversations.append({
                    'user_message': row[0],
                    'ai_response': row[1],
                    'refinements': json.loads(row[2]) if row[2] else None,
                    'created_at': row[3]
                })
            
            conn.close()
            return conversations
            
    except Exception as e:
        print(f"Error loading conversation history: {e}")
        return []

def count_user_projects(user_id):
    """Count the number of projects for a user"""
    try:
        with db_lock:
            conn = sqlite3.connect('nexus_data.db')
            cursor = conn.cursor()
            
            cursor.execute('SELECT COUNT(*) FROM projects WHERE user_id = ?', (user_id,))
            count = cursor.fetchone()[0]
            
            conn.close()
            return count
            
    except Exception as e:
        print(f"Error counting user projects: {e}")
        return 0

def save_project_to_db(user_id, project_idea, report):
    """Save a project to the database"""
    try:
        with db_lock:
            conn = sqlite3.connect('nexus_data.db')
            cursor = conn.cursor()
            
            # Extract project name from the idea (first 100 characters)
            project_name = project_idea[:100] + "..." if len(project_idea) > 100 else project_idea
            
            cursor.execute('''
                INSERT INTO projects (user_id, project_name, project_idea, report_data, created_at)
                VALUES (?, ?, ?, ?, ?)
            ''', (user_id, project_name, project_idea, json.dumps(report), datetime.now().isoformat()))
            
            project_id = cursor.lastrowid
            conn.commit()
            conn.close()
            
            print(f"✅ Project saved with ID: {project_id}")
            return project_id
            
    except Exception as e:
        print(f"Error saving project: {e}")
        return None

def update_project_report(project_id, updated_report):
    """Update project report with refined data"""
    try:
        with db_lock:
            conn = sqlite3.connect('nexus_data.db')
            cursor = conn.cursor()
            
            cursor.execute('''
                UPDATE projects 
                SET report_data = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            ''', (json.dumps(updated_report), project_id))
            
            conn.commit()
            conn.close()
            return True
            
    except Exception as e:
        print(f"Error updating project report: {e}")
        return False

# === AI REFINEMENT SYSTEM ===

def analyze_user_refinement_request(user_message, current_report):
    """Analyze what the user wants to refine about their project"""
    try:
        # Simple keyword analysis for now (can be enhanced with real AI)
        message_lower = user_message.lower()
        
        refinement_intent = {
            'type': 'general',
            'focus_areas': [],
            'modifications': []
        }
        
        # Detect what they want to change
        if any(word in message_lower for word in ['budget', 'cost', 'money', 'price', 'cheap', 'expensive']):
            refinement_intent['type'] = 'budget'
            refinement_intent['focus_areas'].append('cost_optimization')
            
        elif any(word in message_lower for word in ['time', 'faster', 'quick', 'timeline', 'deadline']):
            refinement_intent['type'] = 'timeline'
            refinement_intent['focus_areas'].append('timeline_optimization')
            
        elif any(word in message_lower for word in ['feature', 'functionality', 'add', 'remove', 'include']):
            refinement_intent['type'] = 'features'
            refinement_intent['focus_areas'].append('feature_modification')
            
        elif any(word in message_lower for word in ['tech', 'technology', 'stack', 'framework', 'language']):
            refinement_intent['type'] = 'technology'
            refinement_intent['focus_areas'].append('tech_stack_change')
            
        elif any(word in message_lower for word in ['market', 'competitor', 'audience', 'target']):
            refinement_intent['type'] = 'market'
            refinement_intent['focus_areas'].append('market_analysis')
            
        elif any(word in message_lower for word in ['learn', 'tutorial', 'course', 'education', 'skill']):
            refinement_intent['type'] = 'learning'
            refinement_intent['focus_areas'].append('learning_path')
            
        # Detect specific preferences
        if 'mobile' in message_lower:
            refinement_intent['modifications'].append('mobile_first')
        if 'web' in message_lower:
            refinement_intent['modifications'].append('web_focus')
        if 'simple' in message_lower or 'minimal' in message_lower:
            refinement_intent['modifications'].append('simplify')
        if 'advanced' in message_lower or 'complex' in message_lower:
            refinement_intent['modifications'].append('enhance')
        
        return refinement_intent
        
    except Exception as e:
        print(f"Error analyzing refinement request: {e}")
        return {'type': 'general', 'focus_areas': [], 'modifications': []}

def generate_refined_response(user_message, current_report, refinement_intent):
    """Generate AI response and refined recommendations"""
    try:
        response = {
            'message': '',
            'suggestions': [],
            'report_updates': {}
        }
        
        # Generate contextual response based on intent
        if refinement_intent['type'] == 'budget':
            response['message'] = "I'll help you optimize your project for budget constraints. Here are some cost-effective alternatives:"
            response['suggestions'] = [
                "Use free-tier cloud services (Vercel, Netlify, Firebase)",
                "Consider open-source alternatives to paid tools",
                "Start with a simpler MVP to reduce development time",
                "Use templates and pre-built components"
            ]
            
            # Update tech stack for budget optimization
            if 'nexus_intelligence' in current_report and 'tech_stack' in current_report['nexus_intelligence']:
                tech_stack = current_report['nexus_intelligence']['tech_stack'].copy()
                tech_stack['deployment'] = {
                    'primary': 'Vercel + PlanetScale (Free tier)',
                    'reasoning': 'Optimized for budget-conscious development with generous free tiers',
                    'alternatives': ['Netlify + Supabase', 'Firebase'],
                    'supporting_tools': ['GitHub Actions (free)', 'Cloudflare (free)']
                }
                response['report_updates']['tech_stack'] = tech_stack
                
        elif refinement_intent['type'] == 'timeline':
            response['message'] = "Let me help you accelerate your development timeline with these strategies:"
            response['suggestions'] = [
                "Use low-code/no-code solutions for rapid prototyping",
                "Implement pre-built UI component libraries",
                "Focus on core MVP features first",
                "Consider hiring freelancers for specific tasks"
            ]
            
            # Update timeline in roadmap
            if 'visual_roadmap' in current_report:
                roadmap = current_report['visual_roadmap'].copy()
                for phase in roadmap['phases']:
                    if phase['id'] == 1:
                        phase['duration'] = '2-4 weeks'
                        phase['description'] = 'Fast-track MVP development with pre-built components'
                    elif phase['id'] == 2:
                        phase['duration'] = '4-8 weeks'
                response['report_updates']['visual_roadmap'] = roadmap
                
        elif refinement_intent['type'] == 'features':
            response['message'] = "I can help you refine your feature set. What specific features would you like to add, remove, or modify?"
            response['suggestions'] = [
                "Prioritize features based on user value",
                "Consider progressive feature rollout",
                "Balance complexity vs. user needs",
                "Plan for feature scalability"
            ]
            
        elif refinement_intent['type'] == 'technology':
            response['message'] = "Let's explore different technology options for your project. What specific technologies are you interested in?"
            response['suggestions'] = [
                "Consider your team's expertise",
                "Evaluate learning curve vs. project timeline",
                "Think about long-term maintenance",
                "Factor in community support and ecosystem"
            ]
            
        elif refinement_intent['type'] == 'market':
            response['message'] = "I'll help you dive deeper into market analysis and competitive positioning:"
            response['suggestions'] = [
                "Analyze specific competitor features",
                "Identify underserved market segments",
                "Research user pain points in detail",
                "Validate your unique value proposition"
            ]
            
        elif refinement_intent['type'] == 'learning':
            response['message'] = "Let me customize your learning path based on your current skills and preferences:"
            response['suggestions'] = [
                "Assess your current skill level",
                "Set realistic learning milestones",
                "Mix theory with hands-on practice",
                "Join relevant communities for support"
            ]
            
        else:
            response['message'] = "I'm here to help refine your project roadmap. Could you be more specific about what you'd like to improve or change?"
            response['suggestions'] = [
                "Ask about budget optimization",
                "Request timeline adjustments",
                "Modify feature requirements",
                "Explore different technologies",
                "Dive deeper into market analysis",
                "Customize your learning path"
            ]
        
        return response
        
    except Exception as e:
        print(f"Error generating refined response: {e}")
        return {
            'message': "I encountered an error while processing your request. Please try rephrasing your question.",
            'suggestions': [],
            'report_updates': {}
        }

# === ROUTES ===

@app.route('/')
def index():
    """Main landing page"""
    user = get_current_user()
    usage = get_user_usage_limits()
    
    return render_template('index.html', 
                         user=user, 
                         usage=usage,
                         authenticated=is_authenticated())

@app.route('/generate', methods=['POST'])
@require_auth
def generate_project():
    """Generate a new project roadmap"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
            
        project_idea = data.get('project_idea', '').strip()
        
        if not project_idea:
            return jsonify({'success': False, 'message': 'Project idea is required'}), 400
        
        # Get authenticated user
        user = request.current_user
        
        # Check if user can create more projects (basic freemium logic)
        user_projects_count = count_user_projects(user['id'])
        max_projects = 3  # Free tier limit
        
        if user_projects_count >= max_projects:
            return jsonify({
                'success': False,
                'message': f"You've reached your limit of {max_projects} projects. Please delete existing projects to create new ones."
            }), 403
        
        # Generate the complete report
        report = generate_complete_project_report(project_idea)
        
        if not report:
            return jsonify({'success': False, 'message': 'Failed to generate project report'}), 500
        
        # Save to database
        project_id = save_project_to_db(user['id'], project_idea, report)
        
        if not project_id:
            return jsonify({'success': False, 'message': 'Failed to save project'}), 500
        
        return jsonify({
            'success': True,
            'project_id': project_id,
            'message': 'Project roadmap generated successfully!'
        })
        
    except Exception as e:
        print(f"Error in generate_project: {e}")
        return jsonify({'success': False, 'message': 'Internal server error'}), 500

@app.route('/dashboard')
def dashboard():
    """User dashboard with saved projects"""
    if not is_authenticated():
        return redirect(url_for('index'))
    
    user = get_current_user()
    projects = []
    
    if supabase:
        try:
            result = supabase.table('projects').select('*').eq('user_id', user['id']).order('created_at', desc=True).execute()
            projects = result.data
        except Exception as e:
            print(f"Error loading projects: {e}")
    
    usage = get_user_usage_limits()
    
    return render_template('dashboard.html', 
                         user=user, 
                         projects=projects,
                         usage=usage)

@app.route('/project/<int:project_id>')
def view_project(project_id):
    """View a specific project report"""
    if not is_authenticated():
        return redirect(url_for('index'))
    
    user = get_current_user()
    
    if supabase:
        try:
            result = supabase.table('projects').select('*').eq('id', project_id).eq('user_id', user['id']).execute()
            
            if result.data:
                project = result.data[0]
                return render_template('project.html', 
                                     project=project,
                                     report=project['report_data'])
            else:
                return "Project not found", 404
                
        except Exception as e:
            print(f"Error loading project: {e}")
            return "Error loading project", 500
    
    return "Database not available", 500

@app.route('/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
        
        email = data.get('email', '').strip().lower()
        name = data.get('name', '').strip()
        password = data.get('password', '')
        
        # Validation
        if not email or not name or not password:
            return jsonify({'success': False, 'message': 'All fields are required'}), 400
        
        if len(password) < 6:
            return jsonify({'success': False, 'message': 'Password must be at least 6 characters'}), 400
        
        # Email format validation
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, email):
            return jsonify({'success': False, 'message': 'Invalid email format'}), 400
        
        # Create user
        user_id, error = create_user(email, name, password)
        
        if error:
            return jsonify({'success': False, 'message': error}), 400
        
        # Generate JWT token
        token = generate_jwt_token(user_id, email)
        
        return jsonify({
            'success': True,
            'message': 'Account created successfully!',
            'token': token,
            'user': {
                'id': user_id,
                'email': email,
                'name': name
            }
        })
        
    except Exception as e:
        print(f"Registration error: {e}")
        return jsonify({'success': False, 'message': 'Registration failed'}), 500

@app.route('/auth/login', methods=['POST'])
def login():
    """Authenticate user and return JWT token"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
        
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({'success': False, 'message': 'Email and password are required'}), 400
        
        # Authenticate user
        user, error = authenticate_user(email, password)
        
        if error:
            return jsonify({'success': False, 'message': error}), 401
        
        # Generate JWT token
        token = generate_jwt_token(user['id'], user['email'])
        
        return jsonify({
            'success': True,
            'message': 'Login successful!',
            'token': token,
            'user': user
        })
        
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'success': False, 'message': 'Login failed'}), 500

@app.route('/auth/validate', methods=['GET'])
def validate_token():
    """Validate JWT token and return user info"""
    try:
        token = None
        
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(' ')[1]  # Bearer <token>
            except IndexError:
                return jsonify({'success': False, 'message': 'Invalid authorization header'}), 401
        
        if not token:
            return jsonify({'success': False, 'message': 'Token missing'}), 401
        
        # Decode token
        payload = decode_jwt_token(token)
        if not payload:
            return jsonify({'success': False, 'message': 'Invalid or expired token'}), 401
        
        # Get user
        user = get_user_by_id(payload['user_id'])
        if not user or not user['is_active']:
            return jsonify({'success': False, 'message': 'User not found or inactive'}), 401
        
        return jsonify({
            'success': True,
            'user': user
        })
        
    except Exception as e:
        print(f"Token validation error: {e}")
        return jsonify({'success': False, 'message': 'Token validation failed'}), 500

@app.route('/auth/logout', methods=['POST'])
def logout():
    """Handle user logout"""
    # For JWT, logout is handled client-side by removing the token
    # Server-side, we could add the token to a blacklist, but for simplicity
    # we'll just return success
    return jsonify({
        'success': True,
        'message': 'Logged out successfully'
    })

# === NEW ROUTES FOR CHAT INTERACTION ===

@app.route('/project/<int:project_id>/chat', methods=['POST'])
def chat_with_project(project_id):
    """Handle chat interactions for project refinement"""
    try:
        if not is_authenticated():
            return jsonify({'error': 'Authentication required'}), 401
        
        user = get_current_user()
        user_message = request.json.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Get current project
        if supabase:
            try:
                result = supabase.table('projects').select('*').eq('id', project_id).eq('user_id', user['id']).execute()
                if not result.data:
                    return jsonify({'error': 'Project not found'}), 404
                
                project = result.data[0]
                current_report = project['report_data']
                
            except Exception as e:
                print(f"Error loading project: {e}")
                return jsonify({'error': 'Failed to load project'}), 500
        else:
            return jsonify({'error': 'Database not available'}), 500
        
        # Analyze refinement intent
        refinement_intent = analyze_user_refinement_request(user_message, current_report)
        
        # Generate AI response
        ai_response_data = generate_refined_response(user_message, current_report, refinement_intent)
        
        # Update project report if there are refinements
        updated_report = current_report.copy()
        if ai_response_data['report_updates']:
            updated_report['nexus_intelligence'].update(ai_response_data['report_updates'])
            
            # Update in database
            if supabase:
                try:
                    supabase.table('projects').update({
                        'report_data': updated_report,
                        'updated_at': datetime.now().isoformat()
                    }).eq('id', project_id).execute()
                except Exception as e:
                    print(f"Error updating project: {e}")
        
        # Save conversation
        save_conversation(
            project_id, 
            user_message, 
            ai_response_data['message'],
            ai_response_data['report_updates']
        )
        
        return jsonify({
            'success': True,
            'message': ai_response_data['message'],
            'suggestions': ai_response_data['suggestions'],
            'has_updates': bool(ai_response_data['report_updates']),
            'updated_report': updated_report if ai_response_data['report_updates'] else None
        })
        
    except Exception as e:
        print(f"Error in chat: {e}")
        return jsonify({'error': 'Chat processing failed'}), 500

@app.route('/project/<int:project_id>/conversations')
def get_project_conversations(project_id):
    """Get conversation history for a project"""
    try:
        if not is_authenticated():
            return jsonify({'error': 'Authentication required'}), 401
        
        user = get_current_user()
        
        # Verify project ownership
        if supabase:
            try:
                result = supabase.table('projects').select('id').eq('id', project_id).eq('user_id', user['id']).execute()
                if not result.data:
                    return jsonify({'error': 'Project not found'}), 404
            except Exception as e:
                print(f"Error verifying project: {e}")
                return jsonify({'error': 'Verification failed'}), 500
        
        conversations = get_conversation_history(project_id)
        
        return jsonify({
            'success': True,
            'conversations': conversations
        })
        
    except Exception as e:
        print(f"Error loading conversations: {e}")
        return jsonify({'error': 'Failed to load conversations'}), 500

if __name__ == '__main__':
    # Initialize database if it doesn't exist
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000) 