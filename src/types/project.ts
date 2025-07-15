// Project Structure Types

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  isOpen?: boolean;
  parentId?: string;
}

export interface TechStack {
  id: string;
  name: string;
  description: string;
  icon: string;
  structure: FileNode[];
}

export interface ProjectConfig {
  name: string;
  techStack: string;
  structure: FileNode[];
  selectedFileId?: string;
}

// Tech Stack Templates
export const TECH_STACKS: TechStack[] = [
  {
    id: 'html-css-js',
    name: 'HTML/CSS/JS',
    description: 'Pure web development with HTML, CSS, and JavaScript',
    icon: '🌐',
    structure: [
      {
        id: '1',
        name: 'index.html',
        type: 'file',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{PROJECT_NAME}}</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <header>
        <h1>Welcome to {{PROJECT_NAME}}</h1>
    </header>
    
    <main>
        <div class="container">
            <p>Your project is ready to go!</p>
            <button id="demo-btn" class="btn">Click Me</button>
        </div>
    </main>
    
    <footer>
        <p>&copy; 2024 {{PROJECT_NAME}}</p>
    </footer>
    
    <script src="scripts/main.js"></script>
</body>
</html>`
      },
      {
        id: '2',
        name: 'styles',
        type: 'folder',
        isOpen: true,
        children: [
          {
            id: '3',
            name: 'main.css',
            type: 'file',
            parentId: '2',
            content: `/* {{PROJECT_NAME}} - Main Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f4f4f4;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

header {
    background: #333;
    color: white;
    padding: 1rem 0;
    text-align: center;
}

main {
    padding: 2rem 0;
    min-height: 60vh;
}

.btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;
}

.btn:hover {
    background: #0056b3;
}

footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 1rem 0;
    margin-top: auto;
}`
          }
        ]
      },
      {
        id: '4',
        name: 'scripts',
        type: 'folder',
        isOpen: true,
        children: [
          {
            id: '5',
            name: 'main.js',
            type: 'file',
            parentId: '4',
            content: `// {{PROJECT_NAME}} - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('{{PROJECT_NAME}} loaded successfully!');
    
    const demoBtn = document.getElementById('demo-btn');
    
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            alert('Hello from {{PROJECT_NAME}}!');
        });
    }
    
    // Add your custom JavaScript here
});

// Utility functions
function createElement(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
}

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}`
          }
        ]
      },
      {
        id: '6',
        name: 'README.md',
        type: 'file',
        content: `# {{PROJECT_NAME}}

A modern web project built with HTML, CSS, and JavaScript.

## Getting Started

1. Open \`index.html\` in your browser
2. Start coding!

## Project Structure

\`\`\`
{{PROJECT_NAME}}/
├── index.html          # Main HTML file
├── styles/
│   └── main.css       # Main stylesheet
├── scripts/
│   └── main.js        # Main JavaScript file
└── README.md          # This file
\`\`\`

## Features

- Responsive design
- Modern CSS with Flexbox/Grid
- Vanilla JavaScript
- Clean project structure

## License

MIT License`
      }
    ]
  },
  {
    id: 'react',
    name: 'React',
    description: 'Modern React application with TypeScript',
    icon: '⚛️',
    structure: [
      {
        id: '1',
        name: 'package.json',
        type: 'file',
        content: `{
  "name": "{{PROJECT_NAME}}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`
      },
      {
        id: '2',
        name: 'public',
        type: 'folder',
        isOpen: true,
        children: [
          {
            id: '3',
            name: 'index.html',
            type: 'file',
            parentId: '2',
            content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="{{PROJECT_NAME}} - React App" />
    <title>{{PROJECT_NAME}}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`
          }
        ]
      },
      {
        id: '4',
        name: 'src',
        type: 'folder',
        isOpen: true,
        children: [
          {
            id: '5',
            name: 'App.tsx',
            type: 'file',
            parentId: '4',
            content: `import React from 'react';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to {{PROJECT_NAME}}</h1>
        <p>
          Your React application is ready to go!
        </p>
        <div className="counter">
          <button onClick={() => setCount(count - 1)}>-</button>
          <span>Count: {count}</span>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      </header>
    </div>
  );
}

export default App;`
          },
          {
            id: '6',
            name: 'App.css',
            type: 'file',
            parentId: '4',
            content: `.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}

.counter {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 1.2rem;
}

.counter button {
  background: #61dafb;
  border: none;
  color: #282c34;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background 0.3s ease;
}

.counter button:hover {
  background: #21a9cc;
}`
          },
          {
            id: '7',
            name: 'index.tsx',
            type: 'file',
            parentId: '4',
            content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
          },
          {
            id: '8',
            name: 'index.css',
            type: 'file',
            parentId: '4',
            content: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: 'Courier New', monospace;
}

* {
  box-sizing: border-box;
}`
          }
        ]
      },
      {
        id: '9',
        name: 'README.md',
        type: 'file',
        content: `# {{PROJECT_NAME}}

A React application built with TypeScript.

## Getting Started

\`\`\`bash
npm install
npm start
\`\`\`

## Available Scripts

- \`npm start\` - Runs the app in development mode
- \`npm build\` - Builds the app for production
- \`npm test\` - Launches the test runner

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).`
      }
    ]
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'Backend API with Express and TypeScript',
    icon: '🟢',
    structure: [
      {
        id: '1',
        name: 'package.json',
        type: 'file',
        content: `{
  "name": "{{PROJECT_NAME}}",
  "version": "1.0.0",
  "description": "{{PROJECT_NAME}} - Node.js API",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/cors": "^2.8.13",
    "@types/node": "^20.4.5",
    "typescript": "^5.1.6",
    "nodemon": "^3.0.1",
    "ts-node": "^10.9.1"
  }
}`
      },
      {
        id: '2',
        name: 'src',
        type: 'folder',
        isOpen: true,
        children: [
          {
            id: '3',
            name: 'index.ts',
            type: 'file',
            parentId: '2',
            content: `import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { routes } from './routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: '{{PROJECT_NAME}} API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(\`🚀 {{PROJECT_NAME}} server running on port \${PORT}\`);
});`
          },
          {
            id: '4',
            name: 'routes',
            type: 'folder',
            isOpen: true,
            parentId: '2',
            children: [
              {
                id: '5',
                name: 'index.ts',
                type: 'file',
                parentId: '4',
                content: `import { Router } from 'express';
import { userRoutes } from './users';

const router = Router();

// Mount route modules
router.use('/users', userRoutes);

// Default API route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to {{PROJECT_NAME}} API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/api/users'
    }
  });
});

export { router as routes };`
              },
              {
                id: '6',
                name: 'users.ts',
                type: 'file',
                parentId: '4',
                content: `import { Router } from 'express';

const router = Router();

// Mock user data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET /api/users
router.get('/', (req, res) => {
  res.json({ users });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({ user });
});

// POST /api/users
router.post('/', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json({ user: newUser });
});

export { router as userRoutes };`
              }
            ]
          }
        ]
      },
      {
        id: '7',
        name: 'tsconfig.json',
        type: 'file',
        content: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`
      },
      {
        id: '8',
        name: '.env.example',
        type: 'file',
        content: `# {{PROJECT_NAME}} Environment Variables

# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
# DATABASE_URL=your_database_url_here

# JWT Configuration
# JWT_SECRET=your_jwt_secret_here

# API Keys
# API_KEY=your_api_key_here`
      },
      {
        id: '9',
        name: 'README.md',
        type: 'file',
        content: `# {{PROJECT_NAME}}

A Node.js API built with Express and TypeScript.

## Getting Started

\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

## Scripts

- \`npm run dev\` - Start development server with hot reload
- \`npm run build\` - Build for production
- \`npm start\` - Start production server
- \`npm test\` - Run tests

## API Endpoints

- \`GET /health\` - Health check
- \`GET /api\` - API information
- \`GET /api/users\` - Get all users
- \`GET /api/users/:id\` - Get user by ID
- \`POST /api/users\` - Create new user

## Project Structure

\`\`\`
{{PROJECT_NAME}}/
├── src/
│   ├── index.ts       # Main server file
│   └── routes/        # API routes
├── dist/              # Compiled output
├── package.json
└── tsconfig.json
\`\`\``
      }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Python application with Flask and virtual environment',
    icon: '🐍',
    structure: [
      {
        id: '1',
        name: 'app.py',
        type: 'file',
        content: `#!/usr/bin/env python3
"""
{{PROJECT_NAME}} - Flask Application
"""

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import os

# Create Flask app
app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
app.config['DEBUG'] = os.environ.get('FLASK_ENV') == 'development'

# Sample data
users = [
    {'id': 1, 'name': 'John Doe', 'email': 'john@example.com'},
    {'id': 2, 'name': 'Jane Smith', 'email': 'jane@example.com'}
]

@app.route('/')
def home():
    """Home page"""
    return render_template('index.html', project_name='{{PROJECT_NAME}}')

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'OK',
        'message': '{{PROJECT_NAME}} is running!',
        'version': '1.0.0'
    })

@app.route('/api/users', methods=['GET'])
def get_users():
    """Get all users"""
    return jsonify({'users': users})

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get user by ID"""
    user = next((u for u in users if u['id'] == user_id), None)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'user': user})

@app.route('/api/users', methods=['POST'])
def create_user():
    """Create new user"""
    data = request.get_json()
    
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({'error': 'Name and email are required'}), 400
    
    new_user = {
        'id': len(users) + 1,
        'name': data['name'],
        'email': data['email']
    }
    
    users.append(new_user)
    return jsonify({'user': new_user}), 201

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])`
      },
      {
        id: '2',
        name: 'requirements.txt',
        type: 'file',
        content: `Flask==2.3.3
Flask-CORS==4.0.0
python-dotenv==1.0.0
gunicorn==21.2.0`
      },
      {
        id: '3',
        name: 'templates',
        type: 'folder',
        isOpen: true,
        children: [
          {
            id: '4',
            name: 'index.html',
            type: 'file',
            parentId: '3',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{project_name}}</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body>
    <header>
        <h1>Welcome to {{project_name}}</h1>
    </header>
    
    <main>
        <div class="container">
            <section class="hero">
                <h2>Your Flask Application is Ready!</h2>
                <p>This is a sample Flask application with API endpoints.</p>
                <button id="fetch-users" class="btn">Load Users</button>
            </section>
            
            <section id="users-section" class="users hidden">
                <h3>Users</h3>
                <div id="users-list"></div>
            </section>
        </div>
    </main>
    
    <footer>
        <p>&copy; 2024 {{project_name}}</p>
    </footer>
    
    <script src="{{ url_for('static', filename='js/main.js') }}"></script>
</body>
</html>`
          }
        ]
      },
      {
        id: '5',
        name: 'static',
        type: 'folder',
        isOpen: true,
        children: [
          {
            id: '6',
            name: 'css',
            type: 'folder',
            isOpen: true,
            parentId: '5',
            children: [
              {
                id: '7',
                name: 'style.css',
                type: 'file',
                parentId: '6',
                content: `/* {{PROJECT_NAME}} - Stylesheet */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f8f9fa;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem 0;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

main {
    padding: 3rem 0;
}

.hero {
    text-align: center;
    margin-bottom: 3rem;
}

.hero h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
}

.hero p {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin-bottom: 2rem;
}

.btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.users {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

.users h3 {
    margin-bottom: 1.5rem;
    color: #2c3e50;
}

.user-card {
    background: #f8f9fa;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    border-left: 4px solid #667eea;
}

.hidden {
    display: none;
}

footer {
    background: #2c3e50;
    color: white;
    text-align: center;
    padding: 2rem 0;
    margin-top: 3rem;
}`
              }
            ]
          },
          {
            id: '8',
            name: 'js',
            type: 'folder',
            isOpen: true,
            parentId: '5',
            children: [
              {
                id: '9',
                name: 'main.js',
                type: 'file',
                parentId: '8',
                content: `// {{PROJECT_NAME}} - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('{{PROJECT_NAME}} loaded successfully!');
    
    const fetchUsersBtn = document.getElementById('fetch-users');
    const usersSection = document.getElementById('users-section');
    const usersList = document.getElementById('users-list');
    
    if (fetchUsersBtn) {
        fetchUsersBtn.addEventListener('click', fetchUsers);
    }
    
    async function fetchUsers() {
        try {
            fetchUsersBtn.textContent = 'Loading...';
            fetchUsersBtn.disabled = true;
            
            const response = await fetch('/api/users');
            const data = await response.json();
            
            if (data.users) {
                displayUsers(data.users);
                usersSection.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            usersList.innerHTML = '<p>Error loading users. Please try again.</p>';
            usersSection.classList.remove('hidden');
        } finally {
            fetchUsersBtn.textContent = 'Load Users';
            fetchUsersBtn.disabled = false;
        }
    }
    
    function displayUsers(users) {
        usersList.innerHTML = users.map(user => \`
            <div class="user-card">
                <h4>\${user.name}</h4>
                <p>Email: \${user.email}</p>
                <small>ID: \${user.id}</small>
            </div>
        \`).join('');
    }
});`
              }
            ]
          }
        ]
      },
      {
        id: '10',
        name: '.env.example',
        type: 'file',
        content: `# {{PROJECT_NAME}} Environment Variables

# Flask Configuration
FLASK_ENV=development
SECRET_KEY=your-secret-key-here

# Server Configuration
PORT=5000

# Database Configuration
# DATABASE_URL=sqlite:///{{PROJECT_NAME}}.db`
      },
      {
        id: '11',
        name: 'README.md',
        type: 'file',
        content: `# {{PROJECT_NAME}}

A Python Flask web application.

## Getting Started

### Prerequisites
- Python 3.7+
- pip

### Installation

1. Create virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
\`\`\`

2. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. Set up environment:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Run the application:
\`\`\`bash
python app.py
\`\`\`

Visit http://localhost:5000

## API Endpoints

- \`GET /\` - Home page
- \`GET /health\` - Health check
- \`GET /api/users\` - Get all users
- \`GET /api/users/<id>\` - Get user by ID
- \`POST /api/users\` - Create new user

## Project Structure

\`\`\`
{{PROJECT_NAME}}/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── templates/          # HTML templates
│   └── index.html
├── static/            # Static files
│   ├── css/
│   └── js/
└── README.md
\`\`\`

## Deployment

For production deployment with Gunicorn:

\`\`\`bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
\`\`\``
      }
    ]
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Start with an empty structure and build your own',
    icon: '⚙️',
    structure: [
      {
        id: '1',
        name: 'README.md',
        type: 'file',
        content: `# {{PROJECT_NAME}}

A custom project structure.

## Getting Started

Add your project documentation here.

## Structure

Customize this structure to fit your needs.`
      }
    ]
  },
  {
    id: 'django',
    name: 'Django',
    description: 'Full-stack Python web framework with admin panel',
    icon: '🎸',
    structure: [
      {
        id: '1',
        name: 'manage.py',
        type: 'file',
        content: `#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', '{{project_name}}.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()`
      },
      {
        id: '2',
        name: '{{project_name}}',
        type: 'folder',
        isOpen: true,
        children: [
          {
            id: '3',
            name: '__init__.py',
            type: 'file',
            parentId: '2',
            content: ''
          },
          {
            id: '4',
            name: 'settings.py',
            type: 'file',
            parentId: '2',
            content: `"""Django settings for {{PROJECT_NAME}} project."""

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-change-this-in-production'
DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main',  # Main app
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = '{{project_name}}.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = '{{project_name}}.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / "static"]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'`
          },
          {
            id: '5',
            name: 'urls.py',
            type: 'file',
            parentId: '2',
            content: `"""{{PROJECT_NAME}} URL Configuration"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
]`
          }
        ]
      },
      {
        id: '6',
        name: 'main',
        type: 'folder',
        isOpen: true,
        children: [
          {
            id: '7',
            name: 'models.py',
            type: 'file',
            parentId: '6',
            content: `from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title`
          },
          {
            id: '8',
            name: 'views.py',
            type: 'file',
            parentId: '6',
            content: `from django.shortcuts import render
from .models import Post

def home(request):
    posts = Post.objects.all()[:5]
    return render(request, 'main/home.html', {'posts': posts})`
          },
          {
            id: '9',
            name: 'urls.py',
            type: 'file',
            parentId: '6',
            content: `from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
    path('', views.home, name='home'),
]`
          }
        ]
      },
      {
        id: '10',
        name: 'requirements.txt',
        type: 'file',
        content: `Django>=4.2.0,<5.0.0
Pillow>=9.0.0`
      }
    ]
  }
];