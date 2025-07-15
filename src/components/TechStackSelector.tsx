
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TechStack } from '../types/project';
import { Code, Layers } from 'lucide-react';

interface TechStackSelectorProps {
  selectedTechStack: string;
  onTechStackChange: (techStackId: string) => void;
  techStacks: TechStack[];
}

export const TechStackSelector: React.FC<TechStackSelectorProps> = ({
  selectedTechStack,
  onTechStackChange,
  techStacks
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          Choose Your Tech Stack
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select a technology stack to load the appropriate project structure and boilerplate code
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStacks.map((stack) => (
            <Button
              key={stack.id}
              variant={selectedTechStack === stack.id ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-start gap-2 ${
                selectedTechStack === stack.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onTechStackChange(stack.id)}
            >
              <div className="flex items-center gap-2 w-full">
                <span className="text-2xl">{stack.icon}</span>
                <span className="font-semibold">{stack.name}</span>
                {selectedTechStack === stack.id && (
                  <Badge variant="secondary" className="ml-auto">
                    Selected
                  </Badge>
                )}
              </div>
              <p className="text-xs text-left opacity-80">
                {stack.description}
              </p>
            </Button>
          ))}
        </div>

        {selectedTechStack && (
          <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4 text-primary" />
              <span className="font-medium">Tech Stack Loaded</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {techStacks.find(s => s.id === selectedTechStack)?.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
