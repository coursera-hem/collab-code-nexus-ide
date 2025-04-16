
import { useState, useEffect } from "react";
import { File } from "lucide-react";
import { Environment, getEnvironmentSettings } from "@/lib/environmentOptions";
import { detectLanguage, fileTemplates } from "@/lib/languageOptions";

interface FileItem {
  id: string;
  name: string;
  content: string;
  type: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FileExplorerProps {
  projectId: string;
  environment: Environment | null;
  onFileSelect: (file: FileItem) => void;
  selectedFileId: string | null;
}

const FileExplorer = ({ projectId, environment, onFileSelect, selectedFileId }: FileExplorerProps) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [newFileName, setNewFileName] = useState("");
  const [isCreatingFile, setIsCreatingFile] = useState(false);

  // Initialize files based on the selected environment
  useEffect(() => {
    if (environment && projectId) {
      const envSettings = getEnvironmentSettings(environment);
      const defaultFiles = envSettings.defaultFiles.map((file, index) => ({
        id: `${environment}-${index}`,
        name: file.name,
        content: fileTemplates[file.type.split('.').pop() || 'txt'] || '',
        type: file.type,
        projectId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      
      setFiles(defaultFiles);
      
      // Auto-select the first file
      if (defaultFiles.length > 0) {
        onFileSelect(defaultFiles[0]);
      }
    }
  }, [environment, projectId, onFileSelect]);

  const createNewFile = () => {
    if (!newFileName || !environment) return;
    
    // Determine file type based on extension
    const extension = newFileName.split('.').pop()?.toLowerCase() || "";
    let fileType = "text";
    
    const typeMap: { [key: string]: string } = {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      py: "python",
      html: "html",
      css: "css",
      json: "json",
      md: "markdown",
      cpp: "cpp",
      c: "c",
      java: "java",
    };
    
    if (extension in typeMap) {
      fileType = typeMap[extension];
    }
    
    const newFile = {
      id: `file-${Date.now()}`,
      name: newFileName,
      content: fileTemplates[extension] || '',
      type: fileType,
      projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setFiles([...files, newFile]);
    setNewFileName("");
    setIsCreatingFile(false);
    
    // Auto-select the new file
    onFileSelect(newFile);
  };

  const deleteFile = (fileId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFiles(files.filter(file => file.id !== fileId));
  };

  if (!environment) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-sm p-4 text-center">
          Select an environment to see files
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold">
          {environment === 'web' ? 'Web Files' : `${environment.charAt(0).toUpperCase() + environment.slice(1)} Files`}
        </h2>
        <button
          onClick={() => setIsCreatingFile(true)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          aria-label="Create new file"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>
      </div>

      {isCreatingFile && (
        <div className="p-2 flex items-center">
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder={environment === 'web' ? "index.html" : environment === 'python' ? "main.py" : environment === 'java' ? "Main.java" : "main.c"}
            className="text-sm px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') createNewFile();
              if (e.key === 'Escape') {
                setIsCreatingFile(false);
                setNewFileName("");
              }
            }}
            autoFocus
          />
          <button
            onClick={createNewFile}
            className="ml-2 text-green-600 dark:text-green-400"
            aria-label="Confirm new file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
          </button>
        </div>
      )}

      <div className="p-2">
        {files.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 p-2">
            No files yet. Click + to create one.
          </p>
        ) : (
          <ul>
            {files.map((file) => (
              <li
                key={file.id}
                className={`p-2 cursor-pointer rounded flex items-center justify-between ${
                  selectedFileId === file.id
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
                onClick={() => onFileSelect(file)}
              >
                <div className="flex items-center">
                  <File size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                </div>
                <button
                  onClick={(e) => deleteFile(file.id, e)}
                  className="text-red-500 opacity-0 hover:opacity-100 group-hover:opacity-100 hover:text-red-700"
                  aria-label="Delete file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
