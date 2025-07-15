
import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Sparkles, Folder } from 'lucide-react';

interface ProjectHeaderProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  projectName,
  onProjectNameChange
}) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Folder className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Project Structure Generator
        </h1>
        <Sparkles className="h-6 w-6 text-accent animate-pulse" />
      </div>
      
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Create and download custom project structures for any tech stack. 
        Plan, build, and export your project boilerplate in minutes.
      </p>

      <div className="max-w-md mx-auto">
        <Label htmlFor="project-name" className="text-base font-medium">
          Project Name
        </Label>
        <Input
          id="project-name"
          type="text"
          placeholder="Enter your project name..."
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          className="mt-2 text-center text-lg h-12"
        />
      </div>
    </div>
  );
};
