
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Environment, getEnvironmentName } from "@/lib/environmentOptions";

interface HeaderActionsProps {
  onShowProjects: () => void;
  projectName?: string;
  environment?: Environment | null;
  onChangeEnvironment?: () => void;
}

const HeaderActions = ({ 
  onShowProjects, 
  projectName, 
  environment, 
  onChangeEnvironment 
}: HeaderActionsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      {projectName && (
        <>
          <button
            onClick={onShowProjects}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1 transition-colors duration-150"
            aria-label="Show projects"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "16" : "18"} height={isMobile ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
          </button>
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px] xs:max-w-[150px] sm:max-w-full">
            {projectName}
          </span>
          
          {environment && (
            <>
              <span className="text-gray-400 dark:text-gray-600 mx-1">|</span>
              <div className="flex items-center">
                <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium truncate max-w-[100px] xs:max-w-[120px] sm:max-w-full">
                  {getEnvironmentName(environment)}
                </span>
                {onChangeEnvironment && (
                  <button 
                    onClick={onChangeEnvironment}
                    className="ml-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1"
                    aria-label="Change environment"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HeaderActions;
