
import { useState, useEffect } from "react";
import { Environment } from "@/lib/environmentOptions";

interface CodeEditorProps {
  file: {
    id: string;
    name: string;
    content: string;
    type: string;
  } | null;
  environment: Environment | null;
}

const CodeEditor = ({ file, environment }: CodeEditorProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (file) {
      setCode(file.content);
      setIsLoading(false);
    }
  }, [file]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">
          {environment ? 
            `Select a file or create a new one to start coding in ${environment}` : 
            'Select an environment to start coding'}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin h-6 w-6 text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="h-8 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4">
        <span className="text-sm font-medium">{file.name}</span>
        {environment === 'web' && file.type === 'html' && (
          <span className="ml-auto text-xs text-blue-600 dark:text-blue-400">
            Live Preview Available
          </span>
        )}
      </div>
      <textarea
        className="w-full h-[calc(100%-2rem)] p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm focus:outline-none resize-none code-font"
        value={code}
        onChange={handleCodeChange}
        spellCheck={false}
        placeholder={`Start coding in ${environment || 'selected environment'}...`}
      />
    </div>
  );
};

export default CodeEditor;
