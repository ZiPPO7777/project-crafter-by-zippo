import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FileNode, ProjectConfig } from '../types/project';

/**
 * Replaces placeholder tokens in content with actual values
 */
const replacePlaceholders = (content: string, projectName: string): string => {
  return content
    .replace(/\{\{PROJECT_NAME\}\}/g, projectName)
    .replace(/\{\{project_name\}\}/g, projectName.toLowerCase().replace(/\s+/g, '-'));
};

/**
 * Recursively adds files and folders to the ZIP
 */
const addToZip = (
  zip: JSZip, 
  nodes: FileNode[], 
  projectName: string, 
  currentPath: string = ''
): void => {
  for (const node of nodes) {
    const nodePath = currentPath ? `${currentPath}/${node.name}` : node.name;
    
    if (node.type === 'folder') {
      // Create folder in ZIP
      zip.folder(nodePath);
      
      // Recursively add children
      if (node.children && node.children.length > 0) {
        addToZip(zip, node.children, projectName, nodePath);
      }
    } else if (node.type === 'file') {
      // Add file content to ZIP
      const content = node.content || '';
      const processedContent = replacePlaceholders(content, projectName);
      zip.file(nodePath, processedContent);
    }
  }
};

/**
 * Generates and downloads a ZIP file containing the project structure
 */
export const generateProjectZip = async (projectConfig: ProjectConfig): Promise<void> => {
  const { name, structure } = projectConfig;
  
  if (!name.trim()) {
    throw new Error('Project name is required');
  }

  if (!structure || structure.length === 0) {
    throw new Error('Project structure is empty');
  }

  try {
    // Create new ZIP instance
    const zip = new JSZip();
    
    // Create project root folder
    const projectFolder = zip.folder(name);
    
    if (!projectFolder) {
      throw new Error('Failed to create project folder');
    }

    // Add all files and folders to the ZIP
    addToZip(projectFolder, structure, name);
    
    // Generate ZIP blob
    const blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6
      }
    });
    
    // Download the ZIP file
    saveAs(blob, `${name}.zip`);
    
  } catch (error) {
    console.error('Error generating project ZIP:', error);
    throw new Error('Failed to generate project ZIP file');
  }
};

/**
 * Preview project structure as a tree string (for debugging)
 */
export const previewProjectStructure = (
  structure: FileNode[], 
  projectName: string,
  indent: string = ''
): string => {
  let preview = '';
  
  structure.forEach((node, index) => {
    const isLast = index === structure.length - 1;
    const prefix = isLast ? '└── ' : '├── ';
    const nextIndent = indent + (isLast ? '    ' : '│   ');
    
    preview += `${indent}${prefix}${node.name}`;
    
    if (node.type === 'file' && node.content) {
      const lines = node.content.split('\n').length;
      const chars = node.content.length;
      preview += ` (${lines} lines, ${chars} chars)`;
    }
    
    preview += '\n';
    
    if (node.children && node.children.length > 0) {
      preview += previewProjectStructure(node.children, projectName, nextIndent);
    }
  });
  
  return preview;
};