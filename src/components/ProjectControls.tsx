
import React from 'react';
import { TechStack } from '../types/project';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Download, Package, Sparkles, Clock } from 'lucide-react';

interface ProjectControlsProps {
  projectName: string;
  techStack: TechStack;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const ProjectControls: React.FC<ProjectControlsProps> = ({
  projectName,
  techStack,
  onGenerate,
  isGenerating
}) => {
  return (
    <Card className="bg-gradient-to-r from-card to-secondary/50 border border-primary/20">
      <CardContent className="p-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Package className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Ready to Generate</h2>
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>

          <div className="mb-8">
            <p className="text-lg text-muted-foreground mb-4">
              Your project is configured and ready to download
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">Project:</span>
                <Badge variant="secondary" className="font-mono">
                  {projectName || 'unnamed-project'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">Tech Stack:</span>
                <Badge variant="outline" className="gap-1">
                  <span>{techStack.icon}</span>
                  {techStack.name}
                </Badge>
              </div>
            </div>
          </div>

          <Button
            onClick={onGenerate}
            disabled={isGenerating || !projectName.trim()}
            size="lg"
            className="text-lg px-8 py-6 gap-3 hover:scale-105 transition-all duration-300"
          >
            {isGenerating ? (
              <>
                <Clock className="h-6 w-6 animate-spin" />
                Generating Project...
              </>
            ) : (
              <>
                <Download className="h-6 w-6" />
                Generate & Download Project
              </>
            )}
          </Button>

          {!projectName.trim() && (
            <p className="text-sm text-destructive mt-3">
              Please enter a project name to continue
            </p>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Production-ready code</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Proper file linking</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Complete project structure</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-primary/10">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> After downloading, extract the ZIP file and follow the README instructions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
