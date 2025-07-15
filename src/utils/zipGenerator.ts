
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FileNode, ProjectConfig } from '../types/project';

const replacePlaceholders = (content: string, projectName: string): string => {
  return content
    .replace(/\{\{PROJECT_NAME\}\}/g, projectName)
    .replace(/\{\{project_name\}\}/g, projectName.toLowerCase().replace(/\s+/g, '-'));
};

const addToZip = (
  zip: JSZip, 
  nodes: FileNode[], 
  projectName: string, 
  currentPath: string = ''
): void => {
  for (const node of nodes) {
    const nodePath = currentPath ? `${currentPath}/${node.name}` : node.name;
    
    if (node.type === 'folder') {
      zip.folder(nodePath);
      
      if (node.children && node.children.length > 0) {
        addToZip(zip, node.children, projectName, nodePath);
      }
    } else if (node.type === 'file') {
      const content = node.content || '';
      const processedContent = replacePlaceholders(content, projectName);
      zip.file(nodePath, processedContent);
    }
  }
};

export const generateProjectZip = async (projectConfig: ProjectConfig): Promise<void> => {
  const { name, structure } = projectConfig;
  
  if (!name.trim()) {
    throw new Error('Project name is required');
  }

  if (!structure || structure.length === 0) {
    throw new Error('Project structure is empty');
  }

  try {
    const zip = new JSZip();
    const projectFolder = zip.folder(name);
    
    if (!projectFolder) {
      throw new Error('Failed to create project folder');
    }

    addToZip(projectFolder, structure, name);
    
    const blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6
      }
    });
    
    saveAs(blob, `${name}.zip`);
    
  } catch (error) {
    console.error('Error generating project ZIP:', error);
    throw new Error('Failed to generate project ZIP file');
  }
};
