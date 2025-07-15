
import React, { useState } from 'react';
import { FileNode } from '../types/project';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  File, 
  Folder, 
  FolderOpen, 
  Plus, 
  FileText, 
  Edit3, 
  Trash2, 
  ChevronRight, 
  ChevronDown,
  TreePine
} from 'lucide-react';

interface FileTreeProps {
  structure: FileNode[];
  selectedFileId?: string;
  onFileSelect: (fileId: string) => void;
  onStructureChange: (structure: FileNode[]) => void;
  onAddFolder: (parentId?: string) => void;
  onAddFile: (parentId?: string) => void;
  onDelete: (nodeId: string) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({
  structure,
  selectedFileId,
  onFileSelect,
  onStructureChange,
  onAddFolder,
  onAddFile,
  onDelete
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleToggleFolder = (nodeId: string) => {
    const toggleInStructure = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId && node.type === 'folder') {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: toggleInStructure(node.children) };
        }
        return node;
      });
    };

    onStructureChange(toggleInStructure(structure));
  };

  const handleRename = (nodeId: string, currentName: string) => {
    setEditingId(nodeId);
    setEditingName(currentName);
  };

  const handleSaveRename = () => {
    if (!editingId || !editingName.trim()) {
      setEditingId(null);
      return;
    }

    const renameInStructure = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === editingId) {
          return { ...node, name: editingName.trim() };
        }
        if (node.children) {
          return { ...node, children: renameInStructure(node.children) };
        }
        return node;
      });
    };

    onStructureChange(renameInStructure(structure));
    setEditingId(null);
    setEditingName('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveRename();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditingName('');
    }
  };

  const renderNode = (node: FileNode, depth: number = 0) => {
    const isSelected = selectedFileId === node.id;
    const isEditing = editingId === node.id;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`
            flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer group
            ${isSelected ? 'bg-primary/20 text-primary' : 'hover:bg-muted/50'}
          `}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {/* Toggle button for folders */}
          {node.type === 'folder' && (
            <button
              onClick={() => handleToggleFolder(node.id)}
              className="p-0.5 hover:bg-muted rounded"
            >
              {node.isOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}

          {/* Icon */}
          <div className="flex-shrink-0">
            {node.type === 'folder' ? (
              node.isOpen ? (
                <FolderOpen className="h-4 w-4 text-blue-500" />
              ) : (
                <Folder className="h-4 w-4 text-blue-600" />
              )
            ) : (
              <FileText className="h-4 w-4 text-green-600" />
            )}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0" onClick={() => node.type === 'file' && onFileSelect(node.id)}>
            {isEditing ? (
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleSaveRename}
                className="h-6 text-xs"
                autoFocus
              />
            ) : (
              <span className="text-sm truncate">{node.name}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 flex gap-1">
            {node.type === 'folder' && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => onAddFolder(node.id)}
                  title="Add Folder"
                >
                  <Folder className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => onAddFile(node.id)}
                  title="Add File"
                >
                  <FileText className="h-3 w-3" />
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={() => handleRename(node.id, node.name)}
              title="Rename"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              onClick={() => onDelete(node.id)}
              title="Delete"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Children */}
        {node.type === 'folder' && node.isOpen && node.children && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TreePine className="h-5 w-5 text-primary" />
          Project Structure
        </h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddFolder()}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Folder
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddFile()}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            File
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto border border-border rounded-lg p-2 bg-secondary/20">
        {structure.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <File className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No files yet</p>
            <p className="text-sm">Select a tech stack or add files manually</p>
          </div>
        ) : (
          <div className="space-y-1">
            {structure.map(node => renderNode(node))}
          </div>
        )}
      </div>
    </div>
  );
};
