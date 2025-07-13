import React from 'react';
import { TechStack } from '../types/project';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2 } from 'lucide-react';

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
    <div className="fade-in">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>Choose Your Tech Stack</span>
        {selectedTechStack && <CheckCircle2 className="h-6 w-6 text-primary" />}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {techStacks.map((techStack) => {
          const isSelected = selectedTechStack === techStack.id;
          
          return (
            <Card
              key={techStack.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                isSelected 
                  ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onTechStackChange(techStack.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{techStack.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{techStack.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {techStack.description}
                </p>
                
                {isSelected && (
                  <Badge className="mt-3 btn-gradient-primary">
                    Selected
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {selectedTechStack && (
        <div className="mt-6 p-4 bg-secondary rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground text-center">
            ✨ Great choice! Your project structure is ready to customize below.
          </p>
        </div>
      )}
    </div>
  );
};