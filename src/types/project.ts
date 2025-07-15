
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
});`
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
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
└── README.md
\`\`\``
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
  "name": "{{project_name}}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
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
    <title>{{PROJECT_NAME}}</title>
  </head>
  <body>
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
}

.counter {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 20px;
}

.counter button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

* {
  box-sizing: border-box;
}`
          }
        ]
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
  "name": "{{project_name}}",
  "version": "1.0.0",
  "description": "{{PROJECT_NAME}} - Node.js API",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "typescript": "^5.1.6",
    "nodemon": "^3.0.1"
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

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to {{PROJECT_NAME}} API!' });
});

app.listen(PORT, () => {
  console.log(\`🚀 {{PROJECT_NAME}} server running on port \${PORT}\`);
});`
          }
        ]
      },
      {
        id: '4',
        name: 'tsconfig.json',
        type: 'file',
        content: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}`
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
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', '{{project_name}}.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed?"
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
    'main',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
]

ROOT_URLCONF = '{{project_name}}.urls'

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

STATIC_URL = '/static/'`
          },
          {
            id: '4',
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
        id: '5',
        name: 'main',
        type: 'folder',
        isOpen: true,
        children: [
          {
            id: '6',
            name: 'models.py',
            type: 'file',
            parentId: '5',
            content: `from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title`
          },
          {
            id: '7',
            name: 'views.py',
            type: 'file',
            parentId: '5',
            content: `from django.shortcuts import render
from .models import Post

def home(request):
    posts = Post.objects.all()[:5]
    return render(request, 'main/home.html', {'posts': posts})`
          },
          {
            id: '8',
            name: 'urls.py',
            type: 'file',
            parentId: '5',
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
        id: '9',
        name: 'requirements.txt',
        type: 'file',
        content: `Django>=4.2.0,<5.0.0`
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

A custom project structure.`
      }
    ]
  }
];
