import React, { useState } from 'react';
import { FileNode } from '../types/project';
import { 
  ChevronRight, 
  ChevronDown, 
  File, 
  Folder, 
  FolderOpen,
  Plus,
  FolderPlus,
  FilePlus,
  Trash2,
  Edit
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ui/context-menu';

interface FileTreeProps {
  structure: FileNode[];
  selectedFileId?: string;
  onFileSelect: (fileId: string) => void;
  onStructureChange: (structure: FileNode[]) => void;
  onAddFolder: (parentId?: string) => void;
  onAddFile: (parentId?: string) => void;
  onDelete: (nodeId: string) => void;
}

interface TreeNodeProps {
  node: FileNode;
  level: number;
  selectedFileId?: string;
  onFileSelect: (fileId: string) => void;
  onToggle: (nodeId: string) => void;
  onRename: (nodeId: string, newName: string) => void;
  onAddFolder: (parentId?: string) => void;
  onAddFile: (parentId?: string) => void;
  onDelete: (nodeId: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  selectedFileId,
  onFileSelect,
  onToggle,
  onRename,
  onAddFolder,
  onAddFile,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);

  const handleRename = () => {
    if (editName.trim() && editName !== node.name) {
      onRename(node.id, editName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setEditName(node.name);
      setIsEditing(false);
    }
  };

  const isSelected = selectedFileId === node.id;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={`tree-node flex items-center gap-2 py-2 px-3 ${
              isSelected ? 'selected' : ''
            }`}
            style={{ marginLeft: `${level * 20}px` }}
            onClick={() => {
              if (node.type === 'file') {
                onFileSelect(node.id);
              } else {
                onToggle(node.id);
              }
            }}
          >
            {/* Expand/Collapse Icon */}
            {node.type === 'folder' && (
              <button
                className="flex-shrink-0 p-1 hover:bg-muted rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(node.id);
                }}
              >
                {node.isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
            
            {/* File/Folder Icon */}
            <div className="flex-shrink-0">
              {node.type === 'folder' ? (
                node.isOpen ? (
                  <FolderOpen className="h-4 w-4 text-accent" />
                ) : (
                  <Folder className="h-4 w-4 text-accent" />
                )
              ) : (
                <File className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            {/* Name */}
            {isEditing ? (
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyPress}
                className="h-6 text-sm py-0 px-2"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="flex-1 text-sm truncate cursor-pointer">
                {node.name}
              </span>
            )}
          </div>
        </ContextMenuTrigger>
        
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Rename
          </ContextMenuItem>
          
          {node.type === 'folder' && (
            <>
              <ContextMenuItem onClick={() => onAddFolder(node.id)}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Add Folder
              </ContextMenuItem>
              <ContextMenuItem onClick={() => onAddFile(node.id)}>
                <FilePlus className="h-4 w-4 mr-2" />
                Add File
              </ContextMenuItem>
            </>
          )}
          
          <ContextMenuItem 
            onClick={() => onDelete(node.id)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Children */}
      {node.type === 'folder' && node.isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              selectedFileId={selectedFileId}
              onFileSelect={onFileSelect}
              onToggle={onToggle}
              onRename={onRename}
              onAddFolder={onAddFolder}
              onAddFile={onAddFile}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree: React.FC<FileTreeProps> = ({
  structure,
  selectedFileId,
  onFileSelect,
  onStructureChange,
  onAddFolder,
  onAddFile,
  onDelete
}) => {
  const handleToggle = (nodeId: string) => {
    const toggleNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: toggleNode(node.children) };
        }
        return node;
      });
    };

    onStructureChange(toggleNode(structure));
  };

  const handleRename = (nodeId: string, newName: string) => {
    const renameNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, name: newName };
        }
        if (node.children) {
          return { ...node, children: renameNode(node.children) };
        }
        return node;
      });
    };

    onStructureChange(renameNode(structure));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Folder className="h-5 w-5 text-accent" />
          Project Structure
        </h3>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddFolder()}
            className="gap-2"
          >
            <FolderPlus className="h-4 w-4" />
            Folder
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddFile()}
            className="gap-2"
          >
            <FilePlus className="h-4 w-4" />
            File
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-secondary/30 rounded-lg p-4 overflow-auto min-h-80">
        {structure.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No files yet. Add some files to get started!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {structure.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                level={0}
                selectedFileId={selectedFileId}
                onFileSelect={onFileSelect}
                onToggle={handleToggle}
                onRename={handleRename}
                onAddFolder={onAddFolder}
                onAddFile={onAddFile}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};