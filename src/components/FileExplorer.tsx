
import { useState } from "react";
import { File } from "lucide-react";

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
  onFileSelect: (file: FileItem) => void;
  selectedFileId: string | null;
}

const FileExplorer = ({ projectId, onFileSelect, selectedFileId }: FileExplorerProps) => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "index.html",
      content: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>",
      type: "html",
      projectId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "styles.css",
      content: "body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background-color: #f5f5f5;\n}",
      type: "css",
      projectId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "script.js",
      content: "// JavaScript code\nconsole.log('Hello world!');\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}",
      type: "javascript",
      projectId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [newFileName, setNewFileName] = useState("");
  const [isCreatingFile, setIsCreatingFile] = useState(false);

  const createNewFile = () => {
    if (!newFileName) return;
    
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
      content: "",
      type: fileType,
      projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setFiles([...files, newFile]);
    setNewFileName("");
    setIsCreatingFile(false);
  };

  const deleteFile = (fileId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFiles(files.filter(file => file.id !== fileId));
  };

  return (
    <div className="h-full overflow-auto bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold">Files</h2>
        <button
          onClick={() => setIsCreatingFile(true)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
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
            placeholder="filename.js"
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
                  className="text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-700"
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
