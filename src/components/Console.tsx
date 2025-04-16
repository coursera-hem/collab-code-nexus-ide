
import { useState, useRef, useEffect } from "react";

interface ConsoleProps {
  projectId: string;
  currentFile: { id: string; type: string } | null;
}

const Console = ({ projectId, currentFile }: ConsoleProps) => {
  const [output, setOutput] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Simulated code execution
  const runCode = () => {
    setOutput([...output, "> Running code...", "Hello, World!", "Code execution completed."]);
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

  return (
    <div 
      className={`bg-gray-900 text-white border-t border-gray-700 ${
        isExpanded ? "h-1/2" : "h-64"
      } transition-height duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
        <h3 className="text-sm font-medium">Console</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearOutput}
            className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
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
          <p className="text-gray-500">Run your code to see output here</p>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-800 border-t border-gray-700">
        <button 
          onClick={runCode}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm"
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default Console;
