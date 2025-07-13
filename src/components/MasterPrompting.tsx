import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Send, Bot, User, Sparkles, MessageSquare, Lightbulb } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MasterPromptingProps {
  onProjectSuggestion: (suggestion: ProjectSuggestion) => void;
}

interface ProjectSuggestion {
  name: string;
  techStack: string;
  description: string;
  features: string[];
  structure?: any;
}

export const MasterPrompting: React.FC<MasterPromptingProps> = ({ onProjectSuggestion }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI project planning assistant. Tell me about the project you want to build and I'll help you plan the structure, choose the right tech stack, and outline the features you'll need. What's your project idea?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI responses - In a real app, this would call an API
  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMessage = userMessage.toLowerCase();
    
    // Project type detection and responses
    if (lowerMessage.includes('e-commerce') || lowerMessage.includes('shop') || lowerMessage.includes('store')) {
      return `Great! An e-commerce project is a fantastic choice. Based on your description, I recommend:

**Tech Stack**: React with Node.js backend
**Key Features**:
- Product catalog with search and filters
- Shopping cart and checkout system
- User authentication and profiles
- Payment integration (Stripe/PayPal)
- Admin dashboard for inventory management
- Order tracking and history

**Project Structure**:
- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: MongoDB or PostgreSQL
- Authentication: JWT tokens
- File uploads: Cloudinary/AWS S3

Would you like me to create this project structure for you? Or do you want to discuss any specific features?`;
    }

    if (lowerMessage.includes('blog') || lowerMessage.includes('cms') || lowerMessage.includes('content')) {
      return `Perfect! A blog/CMS project is an excellent way to showcase content. Here's what I suggest:

**Tech Stack**: Django (Python) - ideal for content management
**Key Features**:
- Rich text editor for posts
- Category and tag system
- User authentication and roles
- Comment system with moderation
- SEO optimization
- Admin panel for content management

**Project Structure**:
- Django with built-in admin panel
- PostgreSQL database
- Bootstrap for responsive design
- Django REST framework for API
- Media handling for images

This would give you a professional blog with a powerful admin interface. Shall I generate this structure?`;
    }

    if (lowerMessage.includes('dashboard') || lowerMessage.includes('analytics') || lowerMessage.includes('chart')) {
      return `Excellent! A dashboard project is perfect for data visualization. Here's my recommendation:

**Tech Stack**: React with modern charting libraries
**Key Features**:
- Interactive charts and graphs (Chart.js/Recharts)
- Real-time data updates
- Responsive grid layout
- Data filtering and export
- User authentication and permissions
- API integration for data sources

**Project Structure**:
- React with TypeScript
- Recharts for visualizations
- Node.js backend for API
- WebSocket for real-time updates
- MongoDB for data storage

Would you like me to set up this dashboard structure with sample charts and components?`;
    }

    if (lowerMessage.includes('portfolio') || lowerMessage.includes('personal website')) {
      return `A portfolio website is a great way to showcase your skills! Here's what I recommend:

**Tech Stack**: React for modern, interactive design
**Key Features**:
- Responsive design with smooth animations
- Project showcase with live demos
- About section with skills display
- Contact form with email integration
- Blog section for articles
- Dark/light theme toggle

**Project Structure**:
- React with TypeScript
- Modern CSS animations
- Optimized images and assets
- Contact form backend
- SEO optimization

This will create a professional portfolio that stands out. Want me to generate this structure?`;
    }

    // Generic helpful response
    return `That sounds like an interesting project! To help you better, I need a bit more information:

**Questions to help me assist you**:
1. What type of application is this? (web app, API, dashboard, etc.)
2. Who are your target users?
3. What are the main features you want to include?
4. Do you have any tech stack preferences?
5. Will this need user authentication?
6. Do you need a database for data storage?

Based on your answers, I can recommend the perfect tech stack and create a detailed project structure with all the files and code you'll need to get started quickly!

Feel free to describe your project idea in more detail, and I'll provide specific recommendations.`;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Check if the response contains a project suggestion
      if (aiResponse.includes('**Tech Stack**') || aiResponse.includes('Shall I generate')) {
        toast({
          title: "Project Plan Ready!",
          description: "I've analyzed your requirements. You can use the suggested structure below or ask for modifications.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    "I want to build an e-commerce website",
    "Help me create a blog with admin panel",
    "I need a dashboard with analytics",
    "Build a portfolio website for me",
    "Create a social media app",
    "I want to make a task management tool"
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Master Prompting - AI Project Planner
          <Badge variant="secondary" className="ml-auto">
            <Bot className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Describe your project idea and get personalized tech stack recommendations and project structure
        </p>
      </CardHeader>

      <Separator />

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Quick Prompts */}
        <div className="p-4 border-b">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Lightbulb className="h-3 w-3" />
            Quick Start Ideas:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => handleQuickPrompt(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-white text-sm
                  ${message.role === 'user' 
                    ? 'bg-primary' 
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }
                `}>
                  {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`
                  max-w-[80%] rounded-lg px-3 py-2 text-sm
                  ${message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                  }
                `}>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Describe your project idea..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </CardContent>
    </Card>
  );
};