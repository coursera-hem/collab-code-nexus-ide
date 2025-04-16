
import { useState, useRef, useEffect } from "react";
import { Environment } from "@/lib/environmentOptions";

interface ConsoleProps {
  projectId: string;
  environment: Environment | null;
  currentFile: { id: string; type: string } | null;
}

const Console = ({ projectId, environment, currentFile }: ConsoleProps) => {
  const [output, setOutput] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Simulated code execution
  const runCode = () => {
    if (!environment) return;

    setOutput([...output, `> Running ${environment} code...`]);
    
    // Different outputs based on environment
    switch(environment) {
      case 'web':
        setOutput(prev => [...prev, "Starting live server...", "Server running at http://localhost:3000"]);
        break;
      case 'python':
        setOutput(prev => [...prev, "Hello, World!", "Python execution completed."]);
        break;
      case 'java':
        setOutput(prev => [...prev, "Compiling Java code...", "Hello, World!", "Java execution completed."]);
        break;
      case 'c':
        setOutput(prev => [...prev, "Compiling C code...", "Hello, World!", "C execution completed."]);
        break;
      case 'cpp':
        setOutput(prev => [...prev, "Compiling C++ code...", "Hello, World!", "C++ execution completed."]);
        break;
      default:
        setOutput(prev => [...prev, "Code execution completed."]);
    }
  };

  // Clear console output
  const clearOutput = () => {
    setOutput([]);
  };

  // Auto scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const getRunButtonText = () => {
    if (!environment) return "Run";
    
    switch(environment) {
      case 'web':
        return "Run Live Server";
      case 'python':
        return "Run Python";
      case 'java':
        return "Compile & Run";
      case 'c':
      case 'cpp':
        return "Compile & Run";
      default:
        return "Run";
    }
  };

  return (
    <div 
      className={`bg-gray-900 text-white border-t border-gray-700 ${
        isExpanded ? "h-1/2" : "h-64"
      } transition-height duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
        <h3 className="text-sm font-medium">
          {environment === 'web' ? 'Console & Live Server' : 'Console'}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearOutput}
            className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
            aria-label="Clear console"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
            aria-label={isExpanded ? "Minimize console" : "Maximize console"}
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minimize-2"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" x2="21" y1="10" y2="3"></line><line x1="3" x2="10" y1="21" y2="14"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" x2="14" y1="3" y2="10"></line><line x1="3" x2="10" y1="21" y2="14"></line></svg>
            )}
          </button>
        </div>
      </div>
      
      <div 
        ref={outputRef}
        className="h-[calc(100%-4rem)] overflow-auto p-4 font-mono text-sm"
      >
        {output.length > 0 ? (
          output.map((line, index) => (
            <div key={index} className="mb-1">
              {line}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            {environment === 'web' 
              ? 'Run live server to see output here' 
              : 'Run your code to see output here'}
          </p>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-800 border-t border-gray-700">
        <button 
          onClick={runCode}
          disabled={!environment}
          className={`${
            environment === 'web' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
          } text-white px-4 py-1 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label={getRunButtonText()}
        >
          {getRunButtonText()}
        </button>
        
        {environment === 'web' && (
          <button 
            onClick={() => window.open('about:blank', '_blank')}
            className="ml-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded text-sm"
          >
            Open in New Tab
          </button>
        )}
      </div>
    </div>
  );
};

export default Console;
