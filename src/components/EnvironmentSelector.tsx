
import { useState } from "react";
import { Environment, environmentOptions } from "@/lib/environmentOptions";
import { useIsMobile } from "@/hooks/use-mobile";

interface EnvironmentSelectorProps {
  onSelectEnvironment: (environmentId: Environment) => void;
}

const EnvironmentSelector = ({ onSelectEnvironment }: EnvironmentSelectorProps) => {
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | null>(null);
  const isMobile = useIsMobile();

  const handleSelect = (environmentId: Environment) => {
    setSelectedEnvironment(environmentId);
    onSelectEnvironment(environmentId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Select your development environment</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {environmentOptions.map((env) => (
          <button
            key={env.id}
            onClick={() => handleSelect(env.id as Environment)}
            className={`p-4 rounded-lg border transition-all ${
              selectedEnvironment === env.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
                {env.id === 'web' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M2 12h10"/><path d="M9 4v16"/><path d="m10 4 8 8-8 8"/></svg>
                )}
                {env.id === 'python' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M11.667 6c-2 0-3.333.667-3.333 2v4.667h6.666v2h-10V8.667c0-4 2.667-6 6.667-6h2V6h-2z"/><path d="M7.333 10.667H14c2 0 3.333.667 3.333 2v4.666H14v2h2v2h-2c-2 0-3.333-.666-3.333-2V14h-10v-2c0-4 2.667-6 6.667-6h2v2.667z"/><path d="M10 0v2.667"/><path d="M14 21.333V24"/></svg>
                )}
                {env.id === 'java' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M2 14c.178.159.884.719 2 1a5.673 5.673 0 0 0 4 0c1.116-.281 1.822-.841 2-1"/><path d="M6 10c-.5-.5-.5-2 0-2.5.5-.5 1.5-.5 2 0s1 1.5 1 2c0 .5 0 1-.5 1.5"/><path d="M10 9.5c.5-.5.5-1.5 0-2-.5-.5-1.5-.5-2 0s-1 1.5-1 2c0 .5 0 1 .5 1.5"/><path d="M2 18.5c4.5-1.5 3.5-6 6-6.5 0 0-1 4.5-1 6.5"/><path d="M5 21c1-1 1.5-5 1-7"/><path d="M15 12c1-2 3-2 4-2 1 2 2 3 0 7"/><path d="M18 10c1-4-2-6-2-6"/><path d="M16 21c.5-1 1.5-3 2-5"/><path d="M7 18h7"/><path d="M7 14h8"/></svg>
                )}
                {env.id === 'c' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M9.9 9.84a3.05 3.05 0 0 0-4.9 2.64v0a3.05 3.05 0 0 0 4.9 2.64l7.34-4.27a3.05 3.05 0 0 0 0-5.29l-7.34-4.27a3.05 3.05 0 0 0-4.9 2.65v0"/></svg>
                )}
                {env.id === 'cpp' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M9.9 9.84a3.05 3.05 0 0 0-4.9 2.64v0a3.05 3.05 0 0 0 4.9 2.64l7.34-4.27a3.05 3.05 0 0 0 0-5.29l-7.34-4.27a3.05 3.05 0 0 0-4.9 2.65v0"/><path d="M16 9h.01"/><path d="M19 9h.01"/><path d="M16 15h.01"/><path d="M19 15h.01"/></svg>
                )}
              </div>
              <h3 className="font-medium text-base sm:text-lg">{env.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">{env.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentSelector;
