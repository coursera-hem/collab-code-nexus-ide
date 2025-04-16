
import { useState } from "react";

interface AIAssistantProps {
  currentCode: string;
}

const AIAssistant = ({ currentCode }: AIAssistantProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! I'm your AI coding assistant. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;
    
    // Add user message to conversation
    setConversation([...conversation, { role: "user", content: prompt }]);
    
    // Clear input field
    setPrompt("");
    
    // Set loading state
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would call the OpenAI API)
    setTimeout(() => {
      const responses = [
        "I've analyzed your code and found a few potential optimizations you could make.",
        "Let me help you debug that error. The problem seems to be in your loop condition.",
        "Here's how you could refactor that function to be more concise and readable.",
        "That's a great approach! One thing to consider might be handling edge cases.",
        "I can help you implement that feature. Let's start by breaking it down into steps."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setConversation(prevConversation => [
        ...prevConversation, 
        { role: "assistant", content: randomResponse }
      ]);
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div 
      className={`fixed right-0 bottom-0 z-10 w-80 ${
        isExpanded ? "h-[600px]" : "h-[400px]"
      } bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-lg shadow-lg transition-height duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium">AI Assistant</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-6 w-6 text-gray-400 hover:text-gray-800 dark:hover:text-white rounded"
        >
          {isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minimize-2"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" x2="21" y1="10" y2="3"></line><line x1="3" x2="10" y1="21" y2="14"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" x2="14" y1="3" y2="10"></line><line x1="3" x2="10" y1="21" y2="14"></line></svg>
          )}
        </button>
      </div>
      
      <div className="h-[calc(100%-6rem)] overflow-auto p-3">
        {conversation.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-3 ${
              msg.role === "user" 
                ? "bg-blue-50 dark:bg-blue-900 ml-6 rounded-lg p-2" 
                : "bg-gray-50 dark:bg-gray-700 mr-6 rounded-lg p-2"
            }`}
          >
            <p className="text-sm">{msg.content}</p>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center justify-center p-2 bg-gray-50 dark:bg-gray-700 mr-6 rounded-lg">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask me anything about your code..."
            className="resize-none w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handlePromptSubmit();
              }
            }}
          />
          <button
            onClick={handlePromptSubmit}
            className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
            disabled={!prompt.trim() || isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
