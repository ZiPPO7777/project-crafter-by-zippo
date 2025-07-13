import React, { useState, useEffect } from 'react';
import { FileNode } from '../types/project';
import { File, Edit3, Save, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface FileEditorProps {
  structure: FileNode[];
  selectedFileId?: string;
  onContentChange: (fileId: string, content: string) => void;
}

export const FileEditor: React.FC<FileEditorProps> = ({
  structure,
  selectedFileId,
  onContentChange
}) => {
  const [editContent, setEditContent] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [originalContent, setOriginalContent] = useState('');

  // Find selected file recursively
  const findFile = (nodes: FileNode[], fileId: string): FileNode | null => {
    for (const node of nodes) {
      if (node.id === fileId) {
        return node;
      }
      if (node.children) {
        const found = findFile(node.children, fileId);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedFile = selectedFileId ? findFile(structure, selectedFileId) : null;

  // Update editor content when file selection changes
  useEffect(() => {
    if (selectedFile && selectedFile.type === 'file') {
      const content = selectedFile.content || '';
      setEditContent(content);
      setOriginalContent(content);
      setHasChanges(false);
    }
  }, [selectedFile]);

  // Track content changes
  useEffect(() => {
    setHasChanges(editContent !== originalContent);
  }, [editContent, originalContent]);

  const handleSave = () => {
    if (selectedFileId && hasChanges) {
      onContentChange(selectedFileId, editContent);
      setOriginalContent(editContent);
      setHasChanges(false);
    }
  };

  const handleRevert = () => {
    setEditContent(originalContent);
    setHasChanges(false);
  };

  const getFileExtension = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    return ext || 'txt';
  };

  const getLanguageFromExtension = (ext: string) => {
    const langMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'py': 'python',
      'json': 'json',
      'md': 'markdown',
      'yml': 'yaml',
      'yaml': 'yaml',
      'xml': 'xml',
      'txt': 'text'
    };
    return langMap[ext] || 'text';
  };

  if (!selectedFile) {
    return (
      <div className="h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Edit3 className="h-5 w-5 text-primary" />
          File Editor
        </h3>
        
        <div className="flex-1 bg-secondary/30 rounded-lg p-8 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <File className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No file selected</p>
            <p className="text-sm">Click on a file in the project structure to edit its content</p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedFile.type === 'folder') {
    return (
      <div className="h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Edit3 className="h-5 w-5 text-primary" />
          File Editor
        </h3>
        
        <div className="flex-1 bg-secondary/30 rounded-lg p-8 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <File className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">Folder selected</p>
            <p className="text-sm">Select a file to edit its content</p>
          </div>
        </div>
      </div>
    );
  }

  const fileExtension = getFileExtension(selectedFile.name);
  const language = getLanguageFromExtension(fileExtension);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-primary" />
            File Editor
          </h3>
          {hasChanges && (
            <Badge variant="secondary" className="text-xs">
              Unsaved changes
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          {hasChanges && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRevert}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Revert
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            disabled={!hasChanges}
            className="gap-2 btn-gradient-primary"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* File Info */}
      <div className="mb-4 p-3 bg-secondary rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{selectedFile.name}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {language}
          </Badge>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        <Label htmlFor="file-content" className="text-sm font-medium mb-2">
          File Content
        </Label>
        <Textarea
          id="file-content"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="flex-1 code-editor font-mono text-sm resize-none min-h-80"
          placeholder="Enter your code here..."
        />
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-muted-foreground text-center">
        Lines: {editContent.split('\n').length} | 
        Characters: {editContent.length} |
        Words: {editContent.trim().split(/\s+/).filter(w => w).length}
      </div>
    </div>
  );
};