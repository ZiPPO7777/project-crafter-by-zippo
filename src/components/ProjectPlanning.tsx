import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CheckCircle, Circle, Clock, Star, Target, Zap, Users, Code, Database, Palette } from 'lucide-react';

interface ProjectPlanningProps {
  projectName: string;
  techStack: string;
}

interface Feature {
  id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'frontend' | 'backend' | 'database' | 'auth' | 'ui' | 'integration';
  completed: boolean;
  estimatedHours: number;
}

export const ProjectPlanning: React.FC<ProjectPlanningProps> = ({ projectName, techStack }) => {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: '1',
      name: 'User Authentication',
      description: 'Login, registration, password reset functionality',
      priority: 'high',
      category: 'auth',
      completed: false,
      estimatedHours: 8
    },
    {
      id: '2',
      name: 'Responsive Design',
      description: 'Mobile-first responsive layout and components',
      priority: 'high',
      category: 'ui',
      completed: false,
      estimatedHours: 12
    },
    {
      id: '3',
      name: 'Database Schema',
      description: 'Design and implement database models',
      priority: 'high',
      category: 'database',
      completed: false,
      estimatedHours: 6
    },
    {
      id: '4',
      name: 'API Endpoints',
      description: 'RESTful API for CRUD operations',
      priority: 'high',
      category: 'backend',
      completed: false,
      estimatedHours: 16
    },
    {
      id: '5',
      name: 'Dark Theme',
      description: 'Toggle between light and dark themes',
      priority: 'medium',
      category: 'ui',
      completed: false,
      estimatedHours: 4
    },
    {
      id: '6',
      name: 'Email Notifications',
      description: 'Automated email system for user actions',
      priority: 'medium',
      category: 'integration',
      completed: false,
      estimatedHours: 6
    },
    {
      id: '7',
      name: 'Search Functionality',
      description: 'Full-text search with filters',
      priority: 'medium',
      category: 'frontend',
      completed: false,
      estimatedHours: 10
    },
    {
      id: '8',
      name: 'Analytics Dashboard',
      description: 'Usage analytics and reporting',
      priority: 'low',
      category: 'frontend',
      completed: false,
      estimatedHours: 20
    }
  ]);

  const toggleFeature = (featureId: string) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { ...feature, completed: !feature.completed }
        : feature
    ));
  };

  const getCategoryIcon = (category: Feature['category']) => {
    switch (category) {
      case 'frontend': return <Code className="h-4 w-4" />;
      case 'backend': return <Zap className="h-4 w-4" />;
      case 'database': return <Database className="h-4 w-4" />;
      case 'auth': return <Users className="h-4 w-4" />;
      case 'ui': return <Palette className="h-4 w-4" />;
      case 'integration': return <Target className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: Feature['priority']) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
    }
  };

  const completedFeatures = features.filter(f => f.completed).length;
  const totalFeatures = features.length;
  const progressPercentage = (completedFeatures / totalFeatures) * 100;

  const totalHours = features.reduce((sum, feature) => sum + feature.estimatedHours, 0);
  const completedHours = features.filter(f => f.completed).reduce((sum, feature) => sum + feature.estimatedHours, 0);

  const featuresByCategory = features.reduce((acc, feature) => {
    if (!acc[feature.category]) acc[feature.category] = [];
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  const featuresByPriority = features.reduce((acc, feature) => {
    if (!acc[feature.priority]) acc[feature.priority] = [];
    acc[feature.priority].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Project Planning Dashboard
          <Badge variant="outline" className="ml-auto">
            {projectName || 'Untitled Project'}
          </Badge>
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Tech Stack: {techStack || 'Not selected'}</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Progress: {completedFeatures}/{totalFeatures} features</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Time: {completedHours}/{totalHours} hours</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="priority">By Priority</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{completedFeatures}</div>
                  <div className="text-sm text-muted-foreground">Completed Features</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">{totalFeatures - completedFeatures}</div>
                  <div className="text-sm text-muted-foreground">Pending Features</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">{Math.round(progressPercentage)}%</div>
                  <div className="text-sm text-muted-foreground">Progress</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Feature Categories</h3>
              {Object.entries(featuresByCategory).map(([category, categoryFeatures]) => {
                const completed = categoryFeatures.filter(f => f.completed).length;
                const total = categoryFeatures.length;
                const percentage = (completed / total) * 100;

                return (
                  <div key={category} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    {getCategoryIcon(category as Feature['category'])}
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="capitalize font-medium">{category}</span>
                        <span className="text-sm text-muted-foreground">{completed}/{total}</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-1.5">
                        <div 
                          className="bg-primary rounded-full h-1.5 transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-3">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  feature.completed ? 'bg-muted/50 border-primary/20' : 'bg-card border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto hover:bg-transparent"
                    onClick={() => toggleFeature(feature.id)}
                  >
                    {feature.completed ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={`font-medium ${feature.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {feature.name}
                      </h4>
                      <Badge variant={getPriorityColor(feature.priority)} className="text-xs">
                        {feature.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryIcon(feature.category)}
                        <span className="ml-1 capitalize">{feature.category}</span>
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {feature.estimatedHours}h
                      </Badge>
                    </div>
                    <p className={`text-sm ${feature.completed ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="priority" className="space-y-4">
            {(['high', 'medium', 'low'] as const).map((priority) => {
              const priorityFeatures = featuresByPriority[priority] || [];
              if (priorityFeatures.length === 0) return null;

              return (
                <div key={priority} className="space-y-3">
                  <h3 className="text-lg font-semibold capitalize flex items-center gap-2">
                    <Badge variant={getPriorityColor(priority)}>{priority} Priority</Badge>
                    <span className="text-sm text-muted-foreground">
                      ({priorityFeatures.filter(f => f.completed).length}/{priorityFeatures.length} completed)
                    </span>
                  </h3>
                  
                  <div className="grid gap-2">
                    {priorityFeatures.map((feature) => (
                      <div 
                        key={feature.id}
                        className="p-3 rounded border bg-card flex items-center gap-3"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto hover:bg-transparent"
                          onClick={() => toggleFeature(feature.id)}
                        >
                          {feature.completed ? (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${feature.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {feature.name}
                            </span>
                            {getCategoryIcon(feature.category)}
                            <Badge variant="secondary" className="text-xs">
                              {feature.estimatedHours}h
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <div className="text-center p-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Timeline View</h3>
              <p>Timeline and milestone tracking coming soon...</p>
              <p className="text-sm mt-2">
                Total estimated time: <strong>{totalHours} hours</strong>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};