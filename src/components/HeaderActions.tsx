
import { useState } from "react";

interface HeaderActionsProps {
  onShowProjects: () => void;
  projectName?: string;
}

const HeaderActions = ({ onShowProjects, projectName }: HeaderActionsProps) => {
  return (
    <div className="flex items-center space-x-4">
      {projectName && (
        <>
          <button
            onClick={onShowProjects}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
          </button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {projectName}
          </span>
        </>
      )}
    </div>
  );
};

export default HeaderActions;
