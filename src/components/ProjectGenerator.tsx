import React, { useState, useCallback } from 'react';
import { FileNode, ProjectConfig, TECH_STACKS, TechStack } from '../types/project';
import { ProjectHeader } from './ProjectHeader';
import { TechStackSelector } from './TechStackSelector';
import { FileTree } from './FileTree';
import { FileEditor } from './FileEditor';
import { ProjectControls } from './ProjectControls';
import { MasterPrompting } from './MasterPrompting';
import { ProjectPlanning } from './ProjectPlanning';
import { generateProjectZip } from '../utils/zipGenerator';
import { useToast } from '../hooks/use-toast';

export const ProjectGenerator: React.FC = () => {
  const { toast } = useToast();
  
  const [projectConfig, setProjectConfig] = useState<ProjectConfig>({
    name: '',
    techStack: '',
    structure: [],
    selectedFileId: undefined
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Update project name
  const handleProjectNameChange = useCallback((name: string) => {
    setProjectConfig(prev => ({ ...prev, name }));
  }, []);

  // Update tech stack and load structure
  const handleTechStackChange = useCallback((techStackId: string) => {
    const techStack = TECH_STACKS.find(ts => ts.id === techStackId);
    if (techStack) {
      setProjectConfig(prev => ({
        ...prev,
        techStack: techStackId,
        structure: JSON.parse(JSON.stringify(techStack.structure)), // Deep clone
        selectedFileId: undefined
      }));
      
      toast({
        title: "Tech Stack Updated",
        description: `Loaded ${techStack.name} project structure`,
      });
    }
  }, [toast]);

  // Update file structure
  const handleStructureChange = useCallback((structure: FileNode[]) => {
    setProjectConfig(prev => ({ ...prev, structure }));
  }, []);

  // Select file for editing
  const handleFileSelect = useCallback((fileId: string) => {
    setProjectConfig(prev => ({ ...prev, selectedFileId: fileId }));
  }, []);

  // Update file content
  const handleFileContentChange = useCallback((fileId: string, content: string) => {
    const updateFileContent = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === fileId) {
          return { ...node, content };
        }
        if (node.children) {
          return { ...node, children: updateFileContent(node.children) };
        }
        return node;
      });
    };

    setProjectConfig(prev => ({
      ...prev,
      structure: updateFileContent(prev.structure)
    }));
  }, []);

  // Generate and download project ZIP
  const handleGenerateProject = useCallback(async () => {
    if (!projectConfig.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project name",
        variant: "destructive"
      });
      return;
    }

    if (!projectConfig.techStack) {
      toast({
        title: "Error",
        description: "Please select a tech stack",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      await generateProjectZip(projectConfig);
      
      toast({
        title: "Success!",
        description: `${projectConfig.name}.zip has been downloaded`,
      });
    } catch (error) {
      console.error('Error generating project:', error);
      toast({
        title: "Error",
        description: "Failed to generate project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  }, [projectConfig, toast]);

  // Add new folder
  const handleAddFolder = useCallback((parentId?: string) => {
    const newFolder: FileNode = {
      id: Date.now().toString(),
      name: 'New Folder',
      type: 'folder',
      children: [],
      isOpen: true,
      parentId
    };

    const addToStructure = (nodes: FileNode[]): FileNode[] => {
      if (!parentId) {
        return [...nodes, newFolder];
      }
      
      return nodes.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newFolder],
            isOpen: true
          };
        }
        if (node.children) {
          return { ...node, children: addToStructure(node.children) };
        }
        return node;
      });
    };

    setProjectConfig(prev => ({
      ...prev,
      structure: addToStructure(prev.structure)
    }));
  }, []);

  // Add new file
  const handleAddFile = useCallback((parentId?: string) => {
    const newFile: FileNode = {
      id: Date.now().toString(),
      name: 'new-file.txt',
      type: 'file',
      content: '// Add your content here\n',
      parentId
    };

    const addToStructure = (nodes: FileNode[]): FileNode[] => {
      if (!parentId) {
        return [...nodes, newFile];
      }
      
      return nodes.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newFile],
            isOpen: true
          };
        }
        if (node.children) {
          return { ...node, children: addToStructure(node.children) };
        }
        return node;
      });
    };

    setProjectConfig(prev => ({
      ...prev,
      structure: addToStructure(prev.structure),
      selectedFileId: newFile.id
    }));
  }, []);

  // Delete file/folder
  const handleDelete = useCallback((nodeId: string) => {
    const deleteFromStructure = (nodes: FileNode[]): FileNode[] => {
      return nodes.filter(node => {
        if (node.id === nodeId) {
          return false;
        }
        if (node.children) {
          node.children = deleteFromStructure(node.children);
        }
        return true;
      });
    };

    setProjectConfig(prev => ({
      ...prev,
      structure: deleteFromStructure(prev.structure),
      selectedFileId: prev.selectedFileId === nodeId ? undefined : prev.selectedFileId
    }));
  }, []);

  const selectedTechStack = TECH_STACKS.find(ts => ts.id === projectConfig.techStack);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <ProjectHeader 
          projectName={projectConfig.name}
          onProjectNameChange={handleProjectNameChange}
        />

        {/* Master Prompting Chat */}
        <div className="mb-8">
          <MasterPrompting 
            onProjectSuggestion={(suggestion) => {
              // Handle project suggestions from AI
              toast({
                title: "AI Suggestion Applied",
                description: `Applied suggestions for ${suggestion.name}`,
              });
            }}
          />
        </div>

        {/* Tech Stack Selection */}
        <div className="mb-8">
          <TechStackSelector
            selectedTechStack={projectConfig.techStack}
            onTechStackChange={handleTechStackChange}
            techStacks={TECH_STACKS}
          />
        </div>

        {/* Project Planning Dashboard */}
        {selectedTechStack && (
          <div className="mb-8">
            <ProjectPlanning 
              projectName={projectConfig.name}
              techStack={selectedTechStack.name}
            />
          </div>
        )}

        {/* Main Content */}
        {selectedTechStack && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* File Tree */}
            <div className="bg-card border border-border rounded-lg p-6">
              <FileTree
                structure={projectConfig.structure}
                selectedFileId={projectConfig.selectedFileId}
                onFileSelect={handleFileSelect}
                onStructureChange={handleStructureChange}
                onAddFolder={handleAddFolder}
                onAddFile={handleAddFile}
                onDelete={handleDelete}
              />
            </div>

            {/* File Editor */}
            <div className="bg-card border border-border rounded-lg p-6">
              <FileEditor
                structure={projectConfig.structure}
                selectedFileId={projectConfig.selectedFileId}
                onContentChange={handleFileContentChange}
              />
            </div>
          </div>
        )}

        {/* Generate Button */}
        {selectedTechStack && (
          <ProjectControls
            projectName={projectConfig.name}
            techStack={selectedTechStack}
            onGenerate={handleGenerateProject}
            isGenerating={isGenerating}
          />
        )}
      </div>
    </div>
  );
};