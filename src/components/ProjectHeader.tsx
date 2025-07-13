import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Code2, Sparkles } from 'lucide-react';

interface ProjectHeaderProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  projectName,
  onProjectNameChange
}) => {
  return (
    <div className="text-center mb-12 fade-in">
      {/* Hero Section */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-primary glow-effect rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="h-12 w-12 text-primary" />
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Multi-Tech Project Generator
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create fully functional project structures for any tech stack. 
            Generate, customize, and download production-ready code in seconds.
          </p>
        </div>
      </div>

      {/* Project Name Input */}
      <div className="max-w-md mx-auto">
        <Label htmlFor="project-name" className="text-lg font-semibold mb-3 block">
          Project Name
        </Label>
        <Input
          id="project-name"
          type="text"
          placeholder="my-awesome-project"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          className="text-center text-lg h-12 bg-secondary border-primary/20 focus:border-primary"
        />
        <p className="text-sm text-muted-foreground mt-2">
          This will be your project folder name
        </p>
      </div>
    </div>
  );
};